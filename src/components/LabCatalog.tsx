import React, { useState, useMemo, useEffect } from 'react';
import { 
  Laboratory, 
  Parameter 
} from '../types';
import { 
  FlaskConical, 
  Droplets, 
  Layers, 
  Wind, 
  Activity, 
  Recycle, 
  MapPin, 
  Clock, 
  Mail, 
  Phone, 
  CheckCircle, 
  Info, 
  Plus, 
  Check, 
  FileSpreadsheet, 
  ExternalLink,
  ShieldCheck,
  Building,
  HelpCircle,
  X,
  Search,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { advancedParamMatch } from '../utils/searchUtils';

interface LabCatalogProps {
  laboratories: Laboratory[];
  searchQuery: string;
  selectedMatrixFilter: string;
  highlightedParamId?: string | null;
  onSelectParameterForReservation: (param: Parameter, lab: Laboratory) => void;
  onViewResearcher: (researcherId: string) => void;
  onNavigateToLocation?: (labId?: string) => void;
  onClearSearch?: () => void;
  onSearchQueryChange?: (query: string) => void;
  onSelectMatrixFilter?: (matrix: string) => void;
}

export const LabCatalog: React.FC<LabCatalogProps> = ({
  laboratories,
  searchQuery,
  selectedMatrixFilter,
  highlightedParamId,
  onSelectParameterForReservation,
  onViewResearcher,
  onNavigateToLocation,
  onClearSearch,
  onSearchQueryChange,
  onSelectMatrixFilter
}) => {
  const [selectedLabId, setSelectedLabId] = useState<string>('all');
  const [detailModalParam, setDetailModalParam] = useState<{ param: Parameter; lab: Laboratory } | null>(null);
  const [addedParamIds, setAddedParamIds] = useState<Set<string>>(new Set());

  // Auto-reveal laboratory and scroll into view when a parameter is highlighted
  useEffect(() => {
    if (highlightedParamId) {
      const targetLab = laboratories.find(l => l.parameters.some(p => p.id === highlightedParamId));
      if (targetLab && selectedLabId !== 'all' && selectedLabId !== targetLab.id) {
        setSelectedLabId('all');
      }

      const attemptScroll = (attempts = 0) => {
        const el = document.getElementById(`param-item-${highlightedParamId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (attempts < 8) {
          setTimeout(() => attemptScroll(attempts + 1), 60);
        }
      };

      const timer = setTimeout(() => attemptScroll(), 50);
      return () => clearTimeout(timer);
    }
  }, [highlightedParamId, laboratories, selectedLabId]);

  // Icon mapping
  const getLabIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Wind': return <Wind className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Recycle': return <Recycle className="w-5 h-5" />;
      case 'MapPin': return <MapPin className="w-5 h-5" />;
      default: return <FlaskConical className="w-5 h-5" />;
    }
  };

  const handleAddParam = (param: Parameter, lab: Laboratory) => {
    onSelectParameterForReservation(param, lab);
    setAddedParamIds(prev => new Set(prev).add(param.id));
    setTimeout(() => {
      setAddedParamIds(prev => {
        const next = new Set(prev);
        next.delete(param.id);
        return next;
      });
    }, 2500);
  };

  // Filter laboratories: when searching or when a param is highlighted, ensure target lab is included
  const filteredLaboratories = useMemo(() => {
    return laboratories.filter(lab => {
      if (highlightedParamId && lab.parameters.some(p => p.id === highlightedParamId)) {
        return true;
      }
      if (selectedLabId !== 'all' && lab.id !== selectedLabId) return false;
      return true;
    });
  }, [laboratories, selectedLabId, highlightedParamId]);

  const getFilteredParameters = (lab: Laboratory) => {
    return lab.parameters.filter(param => {
      // If this parameter is the highlighted target, always show it
      if (highlightedParamId && param.id === highlightedParamId) {
        return true;
      }
      // Matrix filter
      if (selectedMatrixFilter !== 'Todos' && param.matrix !== selectedMatrixFilter) {
        return false;
      }
      // Search Query filter with accent normalization, token matching & synonyms
      if (searchQuery.trim()) {
        return advancedParamMatch(searchQuery, param, lab);
      }
      return true;
    });
  };

  // Compute total matching parameters across all active laboratories
  const totalMatchesInView = useMemo(() => {
    return filteredLaboratories.reduce((acc, lab) => acc + getFilteredParameters(lab).length, 0);
  }, [filteredLaboratories, searchQuery, selectedMatrixFilter]);

  // Compute total matches across ALL laboratories (to warn if current lab tab hides results)
  const totalMatchesAcrossAllLabs = useMemo(() => {
    if (!searchQuery.trim() && selectedMatrixFilter === 'Todos') return 0;
    return laboratories.reduce((acc, lab) => {
      return acc + lab.parameters.filter(p => {
        if (selectedMatrixFilter !== 'Todos' && p.matrix !== selectedMatrixFilter) return false;
        if (searchQuery.trim()) return advancedParamMatch(searchQuery, p, lab);
        return true;
      }).length;
    }, 0);
  }, [laboratories, searchQuery, selectedMatrixFilter]);

  const totalParamsCount = laboratories.reduce((acc, lab) => acc + lab.parameters.length, 0);

  return (
    <div id="lab-catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4 text-emerald-700" />
            <span>Catálogo Oficial de Servicios Analíticos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Laboratorios Especializados de la UNALM
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Explore los ensayos fisicoquímicos, microbiológicos, toxicológicos e instrumentales disponibles en el campus universitario.
          </p>
        </div>

        {/* Quick stats pill */}
        <div className="flex items-center gap-3 text-xs bg-stone-50 border border-stone-200 px-3.5 py-2 rounded-xl text-stone-700">
          <div>
            <span className="font-bold text-emerald-900 text-sm">{laboratories.length}</span>
            <span className="text-stone-500 ml-1">Laboratorios</span>
          </div>
          <span className="text-stone-300">|</span>
          <div>
            <span className="font-bold text-emerald-900 text-sm">{totalParamsCount}</span>
            <span className="text-stone-500 ml-1">Ensayos Activos</span>
          </div>
        </div>
      </div>

      {/* Lab Tabs / Filter Bar */}
      <div className="flex overflow-x-auto gap-2 pb-2 mb-8 scrollbar-thin">
        <button
          id="tab-lab-all"
          onClick={() => setSelectedLabId('all')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedLabId === 'all'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Todos los Laboratorios ({laboratories.length})</span>
        </button>

        {laboratories.map((lab) => {
          const isSelected = selectedLabId === lab.id;
          return (
            <button
              key={lab.id}
              id={`tab-lab-${lab.id}`}
              onClick={() => setSelectedLabId(lab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {getLabIcon(lab.iconName)}
              <span>{lab.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Active Search & Filter Banner */}
      {(searchQuery.trim() || selectedMatrixFilter !== 'Todos') && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Filtro activo de búsqueda
                </span>
                {selectedMatrixFilter !== 'Todos' && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    Matriz: {selectedMatrixFilter}
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-800 mt-0.5">
                {searchQuery.trim() ? (
                  <>
                    Mostrando <strong className="text-emerald-950 font-bold">{totalMatchesInView}</strong> {totalMatchesInView === 1 ? 'ensayo coincidente' : 'ensayos coincidentes'} para <strong className="text-emerald-900 font-bold">"{searchQuery}"</strong>
                  </>
                ) : (
                  <>
                    Mostrando <strong className="text-emerald-950 font-bold">{totalMatchesInView}</strong> ensayos para la matriz <strong className="text-emerald-900 font-bold">{selectedMatrixFilter}</strong>
                  </>
                )}
                {selectedLabId !== 'all' && (
                  <span className="text-stone-500 ml-1">
                    en el laboratorio seleccionado.
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {selectedLabId !== 'all' && totalMatchesAcrossAllLabs > totalMatchesInView && (
              <button
                type="button"
                onClick={() => setSelectedLabId('all')}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                Ver todos los labs ({totalMatchesAcrossAllLabs} ensayos)
              </button>
            )}

            {onClearSearch && searchQuery.trim() && (
              <button
                type="button"
                onClick={onClearSearch}
                className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg border border-stone-300 transition-colors flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5 text-stone-500" />
                <span>Limpiar texto</span>
              </button>
            )}

            {selectedMatrixFilter !== 'Todos' && onSelectMatrixFilter && (
              <button
                type="button"
                onClick={() => onSelectMatrixFilter('Todos')}
                className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg border border-stone-300 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span>Todas las matrices</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Empty State when no matches */}
      {totalMatchesInView === 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center shadow-xs max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
            No se encontraron ensayos para "{searchQuery}"
          </h3>
          <p className="text-sm text-stone-600 mb-6 leading-relaxed">
            No encontramos parámetros analíticos, metodologías ni laboratorios que coincidan con su búsqueda
            {selectedMatrixFilter !== 'Todos' ? ` en la matriz "${selectedMatrixFilter}"` : ''}
            {selectedLabId !== 'all' ? ' en el laboratorio actual' : ''}.
          </p>

          {/* If there are matches across all labs, show quick button */}
          {selectedLabId !== 'all' && totalMatchesAcrossAllLabs > 0 && (
            <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium">
              ¡Se encontraron <strong>{totalMatchesAcrossAllLabs}</strong> coincidencias en otros laboratorios!
              <button
                type="button"
                onClick={() => setSelectedLabId('all')}
                className="block mx-auto mt-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg"
              >
                Mostrar resultados en todos los laboratorios
              </button>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {onClearSearch && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Restablecer y ver todos los ensayos
                </button>
              )}
              {selectedMatrixFilter !== 'Todos' && onSelectMatrixFilter && (
                <button
                  type="button"
                  onClick={() => onSelectMatrixFilter('Todos')}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl border border-stone-200 transition-colors"
                >
                  Buscar en todas las matrices
                </button>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="pt-6 border-t border-stone-100">
              <span className="text-xs text-stone-400 block mb-2 font-medium">
                Pruebe haciendo clic en alguna de las búsquedas frecuentes:
              </span>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {['DBO5', 'Metales ICP', 'Textura', 'pH', 'Coliformes', 'PM2.5', 'DQO', 'Materia Orgánica'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (onSearchQueryChange) onSearchQueryChange(tag);
                      if (onSelectMatrixFilter) onSelectMatrixFilter('Todos');
                      setSelectedLabId('all');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 border border-stone-200 font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Laboratories Listing */}
      <div className="space-y-12">
        {filteredLaboratories.map((lab) => {
          const filteredParams = getFilteredParameters(lab);

          if (filteredParams.length === 0 && (searchQuery.trim() || selectedMatrixFilter !== 'Todos')) {
            return null;
          }

          return (
            <div 
              key={lab.id} 
              id={`lab-card-${lab.id}`}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
            >
              {/* Lab Header Banner */}
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white p-6 sm:p-7">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-800/90 border border-emerald-600/60 flex items-center justify-center text-amber-400 shrink-0 shadow-xs">
                      {getLabIcon(lab.iconName)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-400 text-emerald-950 uppercase">
                          {lab.faculty}
                        </span>
                        <span className="text-xs text-emerald-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          {lab.building}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                        {lab.fullName}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-3xl leading-relaxed">
                        {lab.description}
                      </p>
                    </div>
                  </div>

                  {/* Lab Meta & Researcher Contact */}
                  <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 text-xs border-t lg:border-t-0 border-emerald-800/80 pt-3 lg:pt-0">
                    <div className="flex items-center gap-1.5 text-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-medium text-[11px]">{lab.accreditation}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-300 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lab.operatingHours}</span>
                    </div>
                    {lab.floorAndOffice && (
                      <div className="text-[11px] text-amber-200/90 font-medium">
                        📍 {lab.floorAndOffice}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      {onNavigateToLocation && (
                        <button
                          id={`btn-view-map-lab-${lab.id}`}
                          onClick={() => onNavigateToLocation(lab.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-emerald-800/80 hover:bg-emerald-800 px-2.5 py-1 rounded-md border border-emerald-600/60 transition-colors"
                        >
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>Ver Ubicación en Campus</span>
                        </button>
                      )}
                      <button
                        onClick={() => onViewResearcher(lab.leadResearcherId)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-300 hover:text-white underline decoration-stone-400/50"
                      >
                        <span>Investigador Responsable</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab Parameters Table / Grid */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Ensayos y Análisis Disponibles ({filteredParams.length})
                  </h4>
                  <span className="text-xs text-stone-500">
                    Precios referenciales en Soles (PEN S/.) sin IGV
                  </span>
                </div>

                {filteredParams.length === 0 ? (
                  <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200">
                    <Info className="w-6 h-6 text-stone-400 mx-auto mb-2" />
                    <p className="text-sm text-stone-600 font-medium">No se encontraron ensayos con los filtros aplicados en este laboratorio.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredParams.map((param) => {
                      const isJustAdded = addedParamIds.has(param.id);
                      const isHighlighted = highlightedParamId === param.id;
                      return (
                        <div
                          key={param.id}
                          id={`param-item-${param.id}`}
                          className={`flex flex-col justify-between p-4 rounded-xl border transition-all group scroll-mt-32 ${
                            isHighlighted
                              ? 'border-emerald-600 bg-emerald-50/60 ring-4 ring-emerald-500/80 shadow-2xl shadow-emerald-950/20 scale-[1.01]'
                              : 'border-stone-200 hover:border-emerald-700/50 hover:shadow-sm bg-white'
                          }`}
                        >
                          <div>
                            {isHighlighted && (
                              <div className="mb-2.5 px-2.5 py-1.5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white text-[11px] font-bold rounded-lg flex items-center justify-between shadow-xs animate-in fade-in">
                                <span className="flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                                  <span>Ensayo buscado y ubicado</span>
                                </span>
                                <span className="text-[10px] bg-amber-400 text-emerald-950 font-extrabold px-1.5 py-0.5 rounded">
                                  En foco
                                </span>
                              </div>
                            )}

                            {/* Top badges */}
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                                  {param.code}
                                </span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                                  {param.matrix}
                                </span>
                              </div>
                              {param.accreditedINACAL && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                                  INACAL
                                </span>
                              )}
                            </div>

                            {/* Parameter Name */}
                            <h5 className="text-sm font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                              {param.name}
                            </h5>

                            {/* Methodology & Detection Limit */}
                            <div className="mt-2 space-y-1 text-xs text-stone-600">
                              <p className="line-clamp-1 font-mono text-[11px] text-stone-700">
                                <span className="text-stone-400 font-sans">Método:</span> {param.methodology}
                              </p>
                              <p className="text-[11px]">
                                <span className="text-stone-400">Límite detección:</span> {param.limitOfDetection} ({param.unit})
                              </p>
                              <p className="text-[11px] text-stone-500 line-clamp-1">
                                <span className="text-stone-400">Muestra:</span> {param.sampleVolumeRequired} en {param.containerType}
                              </p>
                            </div>
                          </div>

                          {/* Footer Actions and Pricing */}
                          <div className="flex items-center justify-between pt-4 mt-3 border-t border-stone-100">
                            <div>
                              <div className="text-[11px] text-stone-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-emerald-700" />
                                <span>{param.turnaroundDays} días hábiles</span>
                              </div>
                              <div className="text-base font-bold text-emerald-950">
                                S/ {param.pricePEN.toFixed(2)}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                id={`view-param-detail-${param.id}`}
                                onClick={() => setDetailModalParam({ param, lab })}
                                className="p-2 text-stone-500 hover:text-emerald-900 hover:bg-stone-100 rounded-lg text-xs font-medium transition-colors"
                                title="Ver ficha técnica completa del ensayo"
                              >
                                <Info className="w-4 h-4" />
                              </button>

                              <button
                                id={`add-param-to-res-${param.id}`}
                                onClick={() => handleAddParam(param, lab)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                  isJustAdded
                                    ? 'bg-emerald-700 text-white shadow-xs'
                                    : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs hover:shadow'
                                }`}
                              >
                                {isJustAdded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>¡Agregado!</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Reservar</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Parameter Detail Modal */}
      {detailModalParam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-5 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-400 text-emerald-950 uppercase">
                  {detailModalParam.param.code} • {detailModalParam.param.matrix}
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-1">
                  {detailModalParam.param.name}
                </h3>
                <p className="text-xs text-emerald-300 mt-0.5">
                  {detailModalParam.lab.fullName}
                </p>
              </div>
              <button
                onClick={() => setDetailModalParam(null)}
                className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 text-xs sm:text-sm text-stone-700">
              <div>
                <h4 className="font-bold text-stone-900 mb-1">Descripción y Fundamento:</h4>
                <p className="text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200">
                  {detailModalParam.param.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-stone-400 text-xs block">Norma y Metodología:</span>
                  <span className="font-mono text-xs font-bold text-stone-800">{detailModalParam.param.methodology}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-stone-400 text-xs block">Límite de Detección:</span>
                  <span className="font-bold text-stone-800">{detailModalParam.param.limitOfDetection} ({detailModalParam.param.unit})</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-100">
                <h4 className="font-bold text-stone-900">Requisitos de Muestreo y Envío al Campus:</h4>
                
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-stone-900 min-w-28">Volumen Mínimo:</span>
                    <span>{detailModalParam.param.sampleVolumeRequired}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-stone-900 min-w-28">Tipo de Recipiente:</span>
                    <span>{detailModalParam.param.containerType}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-stone-900 min-w-28">Preservación:</span>
                    <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-medium">{detailModalParam.param.preservation}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-stone-900 min-w-28">Plazo de Entrega:</span>
                    <span>{detailModalParam.param.turnaroundDays} días hábiles tras recepción conforme.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400">Tarifa Referencial:</span>
                  <div className="text-xl font-bold text-emerald-950">
                    S/ {detailModalParam.param.pricePEN.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddParam(detailModalParam.param, detailModalParam.lab);
                    setDetailModalParam(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar al Sistema de Reservas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
