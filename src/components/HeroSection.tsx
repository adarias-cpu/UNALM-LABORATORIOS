import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  FileCheck2, 
  Layers, 
  Droplet,
  Wind,
  ArrowRight,
  MapPin,
  FlaskConical,
  Plus,
  ChevronDown
} from 'lucide-react';
import { Laboratory, Parameter } from '../types';
import { advancedParamMatch } from '../utils/searchUtils';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigateToReservation: () => void;
  onNavigateToResults: () => void;
  onNavigateToProtocols: () => void;
  onNavigateToLocation?: () => void;
  selectedMatrixFilter: string;
  setSelectedMatrixFilter: (matrix: string) => void;
  laboratories?: Laboratory[];
  onSelectParameterForReservation?: (param: Parameter) => void;
  onNavigateToParameter?: (paramId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onNavigateToReservation,
  onNavigateToResults,
  onNavigateToProtocols,
  onNavigateToLocation,
  selectedMatrixFilter,
  setSelectedMatrixFilter,
  laboratories = [],
  onSelectParameterForReservation,
  onNavigateToParameter
}) => {
  const matrices = ['Todos', 'Agua', 'Suelo y Sedimento', 'Aire y Emisiones', 'Biomasa / Vegetal', 'Residuos Sólidos'];
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Compute matching parameters for live autocomplete
  const liveMatches = useMemo(() => {
    if (!searchQuery.trim() || laboratories.length === 0) return [];
    const results: { param: Parameter; lab: Laboratory }[] = [];
    for (const lab of laboratories) {
      for (const param of lab.parameters) {
        if (selectedMatrixFilter !== 'Todos' && param.matrix !== selectedMatrixFilter) {
          continue;
        }
        if (advancedParamMatch(searchQuery, param, lab)) {
          results.push({ param, lab });
        }
      }
    }
    return results;
  }, [searchQuery, laboratories, selectedMatrixFilter]);

  // Handle clicking outside to close autocomplete dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Direct parameter navigation or fallback to catalog
  const handleTriggerSearch = () => {
    setIsDropdownOpen(false);
    if (liveMatches.length > 0 && onNavigateToParameter) {
      onNavigateToParameter(liveMatches[0].param.id);
    } else {
      const catalogElement = document.getElementById('lab-catalog-section');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Automatically take the user directly to the matched parameter after a short pause while typing!
  useEffect(() => {
    if (searchQuery.trim().length >= 3 && liveMatches.length > 0 && onNavigateToParameter) {
      const timer = setTimeout(() => {
        onNavigateToParameter(liveMatches[0].param.id);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, liveMatches, onNavigateToParameter]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTriggerSearch();
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  // Smart reservation trigger from search bar
  const handleSmartReserve = () => {
    if (liveMatches.length > 0 && onSelectParameterForReservation) {
      onSelectParameterForReservation(liveMatches[0].param);
    } else {
      onNavigateToReservation();
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs sm:text-sm font-medium backdrop-blur shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Sistema Integral de Servicios Analíticos y Gestión Ambiental • UNALM</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Servicios Analíticos y Ensayos de <br className="hidden sm:inline" />
            <span className="text-amber-300">Laboratorios Ambientales</span> UNALM
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Plataforma oficial para la reserva de turnos, recepción de muestras, consulta de informes certificados con estándares ECA-MINAM y cumplimiento estricto de bioseguridad en el Campus La Molina.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative" ref={searchContainerRef}>
              <div className="relative flex items-center bg-white rounded-xl shadow-xl p-1.5 border border-stone-200 text-stone-900 z-30">
                <button 
                  type="button" 
                  onClick={handleTriggerSearch}
                  title="Buscar y ubicar parámetro"
                  className="p-1 hover:bg-stone-100 rounded-lg transition-colors ml-1 text-emerald-800"
                >
                  <Search className="w-5 h-5 shrink-0" />
                </button>

              <input
                id="global-parameter-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!isDropdownOpen) setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar parámetro o ensayo (ej. DBO5, Metales ICP, Textura, PM2.5, Coliformes)..."
                className="w-full px-3 py-2 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsDropdownOpen(false);
                  }}
                  className="px-2 py-1 text-xs text-stone-400 hover:text-stone-700 mr-2 font-medium"
                >
                  Limpiar
                </button>
              )}

              <button
                id="search-view-results-btn"
                type="button"
                onClick={handleTriggerSearch}
                className="flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg shrink-0 transition-colors mr-1"
                title="Ubicar parámetro en el catálogo"
              >
                <span>Buscar</span>
              </button>

              <button
                id="search-reserve-action-btn"
                type="button"
                onClick={handleSmartReserve}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors shadow-xs"
                title={liveMatches.length > 0 ? `Reservar ${liveMatches[0].param.name}` : 'Ir a Reservas'}
              >
                <span>Reservar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct Match Notification Banner */}
            {liveMatches.length > 0 && searchQuery.trim().length >= 2 && (
              <div className="mt-2.5 p-3 bg-emerald-900/90 border border-emerald-400/40 backdrop-blur-md rounded-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg animate-in fade-in">
                <div className="flex items-center gap-2.5 min-w-0 text-left">
                  <span className="flex h-3 w-3 relative shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-300 font-semibold uppercase tracking-wider text-[10px]">Ensayo coincidente:</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-800 text-[10px] font-mono border border-emerald-700">{liveMatches[0].param.code}</span>
                      <span className="text-amber-300 font-bold">S/ {liveMatches[0].param.pricePEN.toFixed(2)}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                      {liveMatches[0].param.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToParameter) onNavigateToParameter(liveMatches[0].param.id);
                      setIsDropdownOpen(false);
                    }}
                    className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Llevarme al ensayo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {onSelectParameterForReservation && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectParameterForReservation(liveMatches[0].param);
                      }}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg border border-emerald-600/60 transition-colors"
                    >
                      + Reservar
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Live Autocomplete Dropdown */}
            {isDropdownOpen && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-stone-200 text-stone-800 text-left z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {liveMatches.length > 0 ? (
                  <>
                    <div className="bg-stone-50 px-4 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-900">
                          {liveMatches.length} {liveMatches.length === 1 ? 'ensayo encontrado' : 'ensayos encontrados'}
                        </span>
                        <span className="text-stone-400">• Coincidencia exacta o por sinónimo</span>
                      </div>
                      <span className="text-[11px] text-stone-500">Presione Enter o haga clic para ubicar</span>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                      {liveMatches.slice(0, 6).map(({ param, lab }) => (
                        <div
                          key={param.id}
                          onClick={() => {
                            if (onNavigateToParameter) onNavigateToParameter(param.id);
                            setIsDropdownOpen(false);
                          }}
                          className="p-3.5 hover:bg-emerald-50/70 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                                {param.code}
                              </span>
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-100/80 text-emerald-800">
                                {param.matrix}
                              </span>
                              {param.accreditedINACAL && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-0.5">
                                  <ShieldCheck className="w-2.5 h-2.5 text-amber-600" />
                                  INACAL
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-emerald-900 transition-colors truncate">
                              {param.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                              <span className="truncate">{lab.shortName}</span>
                              <span>•</span>
                              <span className="font-mono text-stone-600">{param.methodology}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="text-right mr-1">
                              <span className="text-[10px] text-stone-400 block">Tarifa</span>
                              <span className="text-xs sm:text-sm font-bold text-emerald-950">
                                S/ {param.pricePEN.toFixed(2)}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectParameterForReservation) {
                                  onSelectParameterForReservation(param);
                                }
                                setIsDropdownOpen(false);
                              }}
                              className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                              title="Agregar a reserva de turno"
                            >
                              <Plus className="w-3 h-3" />
                              <span className="hidden sm:inline">Reservar</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onNavigateToParameter) {
                                  onNavigateToParameter(param.id);
                                } else {
                                  handleTriggerSearch();
                                }
                                setIsDropdownOpen(false);
                              }}
                              className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold transition-colors"
                              title="Ubicar parámetro en el catálogo"
                            >
                              Ubicar ↓
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-stone-50 px-4 py-2.5 border-t border-stone-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleTriggerSearch}
                        className="text-xs text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 transition-colors"
                      >
                        <span>Ver todos los resultados en el Catálogo ({liveMatches.length})</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(false)}
                        className="text-xs text-stone-500 hover:text-stone-700"
                      >
                        Cerrar vista previa
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-5 text-center">
                    <p className="text-xs sm:text-sm text-stone-700 font-medium">
                      No se encontraron ensayos para <span className="font-bold text-emerald-950">"{searchQuery}"</span>
                      {selectedMatrixFilter !== 'Todos' && (
                        <span> en la matriz <span className="font-bold">{selectedMatrixFilter}</span></span>
                      )}.
                    </p>
                    {selectedMatrixFilter !== 'Todos' && (
                      <button
                        type="button"
                        onClick={() => setSelectedMatrixFilter('Todos')}
                        className="mt-2 text-xs text-emerald-800 hover:text-emerald-950 font-bold underline"
                      >
                        Buscar en todas las matrices
                      </button>
                    )}
                    <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                      Sugerencias: Pruebe con términos como <button type="button" onClick={() => setSearchQuery('DBO5')} className="text-emerald-800 font-bold underline">DBO5</button>, <button type="button" onClick={() => setSearchQuery('Metales')} className="text-emerald-800 font-bold underline">Metales</button>, <button type="button" onClick={() => setSearchQuery('pH')} className="text-emerald-800 font-bold underline">pH</button>, <button type="button" onClick={() => setSearchQuery('Textura')} className="text-emerald-800 font-bold underline">Textura</button> o <button type="button" onClick={() => setSearchQuery('Coliformes')} className="text-emerald-800 font-bold underline">Coliformes</button>.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

            {/* Quick Matrix Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs">
              <span className="text-emerald-300/80 mr-1 font-medium hidden sm:inline">Filtrar matriz:</span>
              {matrices.map((matrix) => (
                <button
                  key={matrix}
                  id={`filter-matrix-${matrix.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedMatrixFilter(matrix)}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                    selectedMatrixFilter === matrix
                      ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs'
                      : 'bg-emerald-950/70 text-emerald-200 hover:bg-emerald-800 border border-emerald-700/60'
                  }`}
                >
                  {matrix}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              id="hero-btn-reserve"
              onClick={onNavigateToReservation}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm rounded-xl shadow-md transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-emerald-900" />
              <span>Sistema de Reservas en Línea</span>
            </button>

            {onNavigateToLocation && (
              <button
                id="hero-btn-location"
                onClick={onNavigateToLocation}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl border border-emerald-600/70 backdrop-blur transition-transform hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>Mapa y Ubicación en Campus</span>
              </button>
            )}

            <button
              id="hero-btn-results"
              onClick={onNavigateToResults}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 font-medium text-sm rounded-xl border border-emerald-800/80 backdrop-blur transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-amber-300" />
              <span>Consultar Informes</span>
            </button>

            <button
              id="hero-btn-protocols"
              onClick={onNavigateToProtocols}
              className="flex items-center gap-2 px-4 py-2.5 bg-stone-800/80 hover:bg-stone-800 text-stone-200 font-medium text-sm rounded-xl border border-stone-700 backdrop-blur transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bioseguridad y EPP</span>
            </button>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10 pt-8 border-t border-emerald-800/60 text-stone-200">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">ISO/IEC 17025</h4>
              <p className="text-[11px] text-stone-400 leading-tight">Ensayos acreditados ante INACAL y trazabilidad metrológica.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
            <Droplet className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">Agua, Suelo y Aire</h4>
              <p className="text-[11px] text-stone-400 leading-tight">Caracterización completa de matrices ambientales.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">Tarifas Comunitarias</h4>
              <p className="text-[11px] text-stone-400 leading-tight">Hasta 35% de subsidio para tesistas y alumnos UNALM.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
            <FileCheck2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">Informes con ECA</h4>
              <p className="text-[11px] text-stone-400 leading-tight">Dictámenes técnicos contrastados con D.S. MINAM.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
