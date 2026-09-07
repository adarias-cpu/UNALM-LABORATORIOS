/**
 * Utility functions for accent-insensitive, token-based, and synonym-aware search
 */

/**
 * Normalizes text: removes accents/diacritics, converts to lowercase, trims whitespace
 * e.g., "Demanda Bioquímica de Oxígeno" -> "demanda bioquimica de oxigeno"
 */
export function normalizeText(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accent marks
    .toLowerCase()
    .trim();
}

/**
 * Checks if search text matches target text, supporting:
 * - Accent insensitivity (bioquimica matches bioquímica)
 * - Multi-token / multi-word matching (all typed tokens must appear in the combined targets)
 */
export function matchesSearch(
  query: string,
  ...targetFields: (string | null | undefined)[]
): boolean {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) return true;

  const combinedTarget = targetFields
    .map(field => normalizeText(field))
    .join(' ');

  // Direct substring match first (fast path)
  if (combinedTarget.includes(cleanQuery)) {
    return true;
  }

  // Multi-token match: all tokens in query must match somewhere in target
  const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 0);
  if (tokens.length === 0) return true;

  // Filter out very short prepositions in Spanish if there are other tokens
  const filteredTokens = tokens.length > 1 
    ? tokens.filter(t => !['de', 'la', 'el', 'en', 'y', 'del', 'los', 'las', 'un', 'una', 'al'].includes(t))
    : tokens;

  const effectiveTokens = filteredTokens.length > 0 ? filteredTokens : tokens;

  return effectiveTokens.every(token => combinedTarget.includes(token));
}

/**
 * Expanded synonyms and keywords mapping for common laboratory terms
 */
const ACRONYM_SYNONYMS: Record<string, string[]> = {
  'dbo': ['demanda bioquimica de oxigeno', 'dbo5', 'oxigeno', 'materia organica'],
  'dbo5': ['demanda bioquimica de oxigeno', 'dbo', 'oxigeno'],
  'dqo': ['demanda quimica de oxigeno', 'quimica', 'oxigeno'],
  'ph': ['potencial hidrogeno', 'acidez', 'alcalinidad'],
  'ce': ['conductividad electrica', 'salinidad'],
  'sst': ['solidos suspendidos totales', 'solidos'],
  'st': ['solidos totales'],
  'icp': ['metales pesados', 'plomo', 'cadmio', 'arsenico', 'espectrometria'],
  'ntk': ['nitrogeno total kjeldahl', 'nitrogeno'],
  'coliformes': ['escherichia coli', 'fecales', 'totales', 'microbiologia'],
  'ndvi': ['indice vegetacion', 'multiespectral', 'teledeteccion', 'drones'],
  'ndre': ['borde rojo', 'clorofila', 'multiespectral'],
  'compost': ['residuos solidos', 'materia organica', 'biomasa'],
  'metales': ['plomo', 'cadmio', 'cobre', 'zinc', 'arsenico', 'icp-oes'],
  'textura': ['bouyoucos', 'arenas', 'limos', 'arcillas', 'suelo'],
};

/**
 * Advanced matcher that checks both direct text and known environmental lab acronyms
 */
export function advancedParamMatch(
  query: string,
  param: {
    name: string;
    code: string;
    methodology: string;
    category: string;
    matrix: string;
    description?: string;
  },
  lab?: {
    fullName: string;
    shortName: string;
  }
): boolean {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) return true;

  // 1. Direct match on standard fields
  if (matchesSearch(
    cleanQuery,
    param.name,
    param.code,
    param.methodology,
    param.category,
    param.matrix,
    param.description,
    lab?.fullName,
    lab?.shortName
  )) {
    return true;
  }

  // 2. Check synonyms/acronyms
  const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);
  for (const token of queryTokens) {
    const expansions = ACRONYM_SYNONYMS[token];
    if (expansions) {
      for (const expansion of expansions) {
        if (matchesSearch(
          expansion,
          param.name,
          param.code,
          param.methodology,
          param.category,
          param.matrix,
          lab?.fullName,
          lab?.shortName
        )) {
          return true;
        }
      }
    }
  }

  return false;
}
