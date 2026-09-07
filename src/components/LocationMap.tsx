import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Footprints, 
  Car, 
  Clock, 
  Phone, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Printer, 
  AlertCircle, 
  ChevronRight,
  Droplets,
  Layers,
  Wind,
  Activity,
  Recycle,
  Sparkles,
  Info,
  CalendarCheck
} from 'lucide-react';
import { LABORATORIES_DATA } from '../data/laboratoriesData';
import { CAMPUS_POINTS_DATA, CAMPUS_WALKING_ROUTES } from '../data/campusMapData';
import { Laboratory, CampusMapPoint } from '../types';
import { matchesSearch } from '../utils/searchUtils';

interface LocationMapProps {
  onSelectLabForReservation?: (labId: string) => void;
  initialSelectedLabId?: string | null;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  onSelectLabForReservation,
  initialSelectedLabId
}) => {
  const [selectedPointId, setSelectedPointId] = useState<string>(() => {
    if (initialSelectedLabId) {
      const match = CAMPUS_POINTS_DATA.find(p => p.labIdRef === initialSelectedLabId);
      if (match) return match.id;
    }
    return 'loc-lab-agua';
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'laboratory' | 'gate' | 'parking' | 'landmark'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'map' | 'routes' | 'pickupInfo'>('map');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedOriginGate, setSelectedOriginGate] = useState<string>('gate-puerta-1');

  const selectedPoint = CAMPUS_POINTS_DATA.find(p => p.id === selectedPointId) || CAMPUS_POINTS_DATA[0];
  const selectedLabDetail: Laboratory | undefined = LABORATORIES_DATA.find(l => l.id === selectedPoint.labIdRef);

  const filteredPoints = CAMPUS_POINTS_DATA.filter(point => {
    const matchesCategory = activeCategory === 'all' || point.type === activeCategory;
    if (!matchesCategory) return false;
    if (searchQuery.trim()) {
      return matchesSearch(
        searchQuery,
        point.name,
        point.buildingName,
        point.code,
        point.shortName,
        point.description
      );
    }
    return true;
  });

  const handleCopyAddress = () => {
    const address = "Universidad Nacional Agraria La Molina (UNALM), Av. La Molina s/n, Distrito de La Molina, Lima 15024, Perú";
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const getLabIcon = (labIdRef?: string) => {
    switch (labIdRef) {
      case 'lab-agua': return Droplets;
      case 'lab-suelos': return Layers;
      case 'lab-aire': return Wind;
      case 'lab-toxicologia': return Activity;
      case 'lab-residuos': return Recycle;
      case 'lab-geomatica': return Navigation;
      default: return Building2;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-700/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none hidden lg:block">
          <Compass className="w-64 h-64 text-amber-300" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Guía de Acceso y Campus UNALM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            Mapa de Ubicación de Laboratorios
          </h1>
          <p className="mt-2.5 text-emerald-100 text-sm sm:text-base leading-relaxed">
            Localice con precisión cada pabellón, ventanilla de recepción de muestras frías y punto de recojo de informes de ensayo dentro del Campus Universitario UNALM (La Molina, Lima).
          </p>

          {/* Quick Info Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2 bg-emerald-900/90 border border-emerald-700/60 px-3.5 py-1.5 rounded-lg text-emerald-200">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Av. La Molina s/n, La Molina, Lima 15024</span>
            </div>
            <button 
              id="copy-campus-address-btn"
              onClick={handleCopyAddress}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 px-3 py-1.5 rounded-lg text-white font-medium transition-colors"
              title="Copiar dirección para taxi o GPS"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">¡Dirección Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-300" />
                  <span>Copiar Dirección</span>
                </>
              )}
            </button>
            <a
              id="open-google-maps-header-btn"
              href="https://www.google.com/maps/search/?api=1&query=-12.0833,-76.9472"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-emerald-950 font-bold px-3.5 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir en Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-2">
        <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
          <button
            id="tab-campus-map-interactive"
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'map'
                ? 'bg-white text-emerald-950 shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Plano Interactivo del Campus</span>
          </button>
          <button
            id="tab-campus-walking-routes"
            onClick={() => setActiveTab('routes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'routes'
                ? 'bg-white text-emerald-950 shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Footprints className="w-4 h-4 text-emerald-700" />
            <span>Rutas y Cómo Llegar</span>
          </button>
          <button
            id="tab-campus-pickup-windows"
            onClick={() => setActiveTab('pickupInfo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'pickupInfo'
                ? 'bg-white text-emerald-950 shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Ventanillas y Horarios de Recojo</span>
          </button>
        </div>

        {/* Search and Print */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar laboratorio o pabellón..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-800"
            />
          </div>
          <button
            id="print-campus-guide-btn"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors"
            title="Imprimir hoja de ruta para la entrega"
          >
            <Printer className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE MAP & DETAILS */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left / Main: SVG & Interactive Campus Map */}
          <div className="lg:col-span-8 space-y-4">
            {/* Filter Category Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-stone-500 mr-1">Filtrar por:</span>
              {[
                { id: 'all', label: 'Todos los Puntos', icon: Building2 },
                { id: 'laboratory', label: 'Laboratorios (6)', icon: Droplets },
                { id: 'gate', label: 'Puertas de Acceso', icon: Navigation },
                { id: 'parking', label: 'Estacionamientos', icon: Car },
                { id: 'landmark', label: 'Puntos Clave / BAN', icon: LandmarkIcon }
              ].map(cat => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`filter-map-${cat.id}`}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-emerald-900 text-white shadow-xs'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-stone-500'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Visual Vector Schematic Map of UNALM */}
            <div className="relative bg-emerald-950/5 rounded-2xl border-2 border-emerald-900/20 overflow-hidden shadow-inner p-2 sm:p-4 min-h-[460px] flex flex-col justify-between">
              {/* Map Top Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-xl border border-stone-200/80 shadow-xs z-10 text-xs">
                <div className="flex items-center gap-2 text-stone-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></div>
                  <span className="font-semibold text-emerald-950">Campus Universitario UNALM</span>
                  <span className="text-stone-400">|</span>
                  <span className="text-stone-500 hidden sm:inline">Haga clic en un marcador para ver la ruta y ventanilla</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-stone-600 font-bold">
                  <span className="flex items-center gap-1.5 bg-yellow-100 text-yellow-950 px-2 py-0.5 rounded-full border border-yellow-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-800 inline-block animate-pulse"></span>
                    Laboratorios (Destacados)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-white inline-block"></span>
                    Puertas
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600 border border-white inline-block"></span>
                    Parqueo
                  </span>
                </div>
              </div>

              {/* Vector SVG Blueprint */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] my-2 bg-gradient-to-br from-emerald-50 via-stone-100 to-amber-50/40 rounded-xl border border-stone-300/80 overflow-hidden shadow-xs select-none">
                {/* SVG Roads, Green Areas & Campus Landmarks */}
                <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
                  <defs>
                    <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  
                  {/* Grid background */}
                  <rect width="1000" height="600" fill="url(#campus-grid)" />

                  {/* Campus Outline Zone */}
                  <path d="M 50 150 L 250 80 L 850 100 L 960 450 L 820 560 L 150 560 Z" fill="rgba(240, 253, 244, 0.7)" stroke="#16a34a" strokeWidth="2" strokeDasharray="6 4" />

                  {/* Main Roads */}
                  {/* Av. La Molina (External Western Boundary) */}
                  <line x1="60" y1="50" x2="60" y2="580" stroke="#78716c" strokeWidth="14" strokeLinecap="round" />
                  <line x1="60" y1="50" x2="60" y2="580" stroke="#f5f5f4" strokeWidth="2" strokeDasharray="10 8" />

                  {/* Av. Los Gavilanes (North-East Access) */}
                  <line x1="650" y1="40" x2="720" y2="180" stroke="#78716c" strokeWidth="12" />

                  {/* Alameda Central UNALM (Internal spine road) */}
                  <path d="M 120 200 L 380 200 L 620 260 L 850 480" fill="none" stroke="#d6d3d1" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 120 200 L 380 200 L 620 260 L 850 480" fill="none" stroke="#a8a29e" strokeWidth="10" strokeLinecap="round" />

                  {/* Secondary Paths to Laboratories (Highlighted in Golden Amber) */}
                  {/* Route to Waters Lab */}
                  <path d="M 320 200 L 380 200 L 380 220" fill="none" stroke="#eab308" strokeWidth="4" strokeDasharray="4 3" />
                  {/* Route to Soils Lab */}
                  <path d="M 620 200 L 620 270" fill="none" stroke="#eab308" strokeWidth="4" strokeDasharray="4 3" />
                  {/* Route to Air & Meteo */}
                  <path d="M 620 260 L 780 430" fill="none" stroke="#eab308" strokeWidth="4" strokeDasharray="4 3" />
                  {/* Route to Residuos Planta Piloto */}
                  <path d="M 780 430 L 860 500" fill="none" stroke="#eab308" strokeWidth="4" strokeDasharray="4 3" />
                  {/* Route to Ecotox */}
                  <path d="M 380 200 L 440 120" fill="none" stroke="#eab308" strokeWidth="4" strokeDasharray="4 3" />

                  {/* Highlighted Building Zones for Laboratories in Bright Yellow */}
                  {/* Pabellón Aguas */}
                  <rect x="340" y="170" width="75" height="50" rx="6" fill="#fef08a" stroke="#eab308" strokeWidth="2" opacity="0.9" />
                  <text x="377" y="198" fontSize="9" fill="#713f12" fontWeight="bold" textAnchor="middle">PAB. AGUAS</text>

                  {/* Edificio Suelos */}
                  <rect x="585" y="245" width="80" height="50" rx="6" fill="#fef08a" stroke="#eab308" strokeWidth="2" opacity="0.9" />
                  <text x="625" y="273" fontSize="9" fill="#713f12" fontWeight="bold" textAnchor="middle">PAB. SUELOS</text>

                  {/* Pabellón Biología / Ecotox */}
                  <rect x="405" y="85" width="75" height="45" rx="6" fill="#fef08a" stroke="#eab308" strokeWidth="2" opacity="0.9" />
                  <text x="442" y="110" fontSize="9" fill="#713f12" fontWeight="bold" textAnchor="middle">ECOTOX</text>

                  {/* Pabellón Forestal / SIG */}
                  <rect x="245" y="235" width="75" height="45" rx="6" fill="#fef08a" stroke="#eab308" strokeWidth="2" opacity="0.9" />
                  <text x="282" y="260" fontSize="9" fill="#713f12" fontWeight="bold" textAnchor="middle">SIG / FORESTAL</text>

                  {/* Green Zones & Experimental Fields */}
                  {/* Vivero Central & Arboretum */}
                  <rect x="300" y="270" width="120" height="90" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" opacity="0.85" />
                  <text x="360" y="320" fontSize="11" fill="#14532d" fontWeight="bold" textAnchor="middle">Vivero Central</text>

                  {/* Campos Experimentales Agronomía */}
                  <rect x="520" y="320" width="220" height="130" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" opacity="0.7" />
                  <text x="630" y="380" fontSize="12" fill="#b45309" fontWeight="bold" textAnchor="middle">Campos Experimentales</text>

                  {/* Arboretum El Huayo (Forestales) */}
                  <circle cx="820" cy="350" r="60" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" opacity="0.75" />
                  <text x="820" y="355" fontSize="11" fill="#052e16" fontWeight="bold" textAnchor="middle">Arboretum</text>

                  {/* Canchas Deportivas */}
                  <rect x="490" y="80" width="80" height="45" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" opacity="0.7" />
                  <text x="530" y="105" fontSize="10" fill="#4338ca" fontWeight="bold" textAnchor="middle">Canchas Dep.</text>

                  {/* Road Labels */}
                  <text x="25" y="320" fontSize="11" fill="#44403c" fontWeight="bold" transform="rotate(-90 25 320)">AV. LA MOLINA</text>
                  <text x="700" y="110" fontSize="10" fill="#78716c" fontWeight="bold">Av. Los Gavilanes</text>
                  <text x="220" y="190" fontSize="10" fill="#14532d" fontWeight="bold">Alameda Central</text>
                </svg>

                {/* Interactive Dynamic Pins */}
                {filteredPoints.map((point) => {
                  const isSelected = selectedPoint.id === point.id;
                  const isLab = point.type === 'laboratory';
                  const isGate = point.type === 'gate';
                  const isParking = point.type === 'parking';

                  let pinBg = 'bg-stone-700 text-white';
                  if (isLab) {
                    pinBg = isSelected 
                      ? 'bg-yellow-300 text-stone-950 ring-4 ring-yellow-400 scale-130 z-30 shadow-2xl border-stone-900 animate-bounce-subtle' 
                      : 'bg-yellow-400 text-stone-950 hover:bg-yellow-300 ring-2 ring-yellow-500/80 hover:scale-120 z-25 shadow-lg border-stone-900';
                  } else if (isGate) {
                    pinBg = isSelected ? 'bg-amber-600 text-white ring-4 ring-amber-300/50 scale-125 z-30' : 'bg-amber-700 text-white hover:scale-110';
                  } else if (isParking) {
                    pinBg = isSelected ? 'bg-sky-600 text-white ring-4 ring-sky-300/50 scale-125 z-30' : 'bg-sky-700 text-white hover:scale-110';
                  }

                  const IconComp = isLab ? getLabIcon(point.labIdRef) : (isGate ? Navigation : (isParking ? Car : Building2));

                  return (
                    <button
                      key={point.id}
                      id={`campus-pin-${point.id}`}
                      onClick={() => setSelectedPointId(point.id)}
                      style={{
                        left: `${point.xPercent}%`,
                        top: `${point.yPercent}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`absolute transition-all duration-200 cursor-pointer group flex flex-col items-center ${isLab ? 'z-25' : 'z-20'}`}
                      title={`${point.name} (${point.buildingName})`}
                    >
                      {/* Pulse beacon effect on laboratories and active point */}
                      {isLab && (
                        <span className="absolute -top-1.5 -left-1.5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-yellow-400/40 animate-ping pointer-events-none"></span>
                      )}
                      {isSelected && !isLab && (
                        <span className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-emerald-500/30 animate-ping pointer-events-none"></span>
                      )}

                      {/* Marker Icon Bubble */}
                      <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md border-2 transition-transform font-bold ${pinBg}`}>
                        <IconComp className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isLab ? 'stroke-[2.5]' : ''}`} />
                      </div>

                      {/* Label under pin */}
                      <div className={`mt-1 px-1.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-black whitespace-nowrap shadow-xs transition-all ${
                        isLab
                          ? isSelected
                            ? 'bg-stone-950 text-yellow-300 border-2 border-yellow-400 shadow-lg scale-105'
                            : 'bg-yellow-400 text-stone-950 border border-yellow-600 shadow group-hover:scale-105'
                          : isSelected 
                            ? 'bg-emerald-950 text-white border border-emerald-600 shadow-md scale-105' 
                            : 'bg-white/90 text-stone-800 border border-stone-300/80 group-hover:bg-white group-hover:shadow'
                      }`}>
                        {point.shortName}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Guide Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 px-3.5 py-2.5 rounded-xl border border-stone-200 shadow-xs z-10 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-stone-700 font-medium">
                    <strong>Pase de Visita:</strong> Muestre su documento de identidad y código de reserva en la Garita de Puerta 1 o 2.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-500">¿Dudas de ubicación?</span>
                  <a href="tel:+5116147800" className="font-bold text-emerald-800 hover:text-emerald-950 underline">
                    Central: (01) 614-7800
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right / Sidebar: Selected Point Detailed Information */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4 sticky top-24">
              {/* Header of selected item */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    selectedPoint.type === 'laboratory' 
                      ? 'bg-yellow-100 text-yellow-950 border border-yellow-400' 
                      : (selectedPoint.type === 'gate' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-sky-100 text-sky-900 border border-sky-300')
                  }`}>
                    {selectedPoint.type === 'laboratory' ? 'Laboratorio Especializado' : (selectedPoint.type === 'gate' ? 'Acceso / Garita' : 'Instalación')}
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {selectedPoint.code}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-emerald-950 leading-snug">
                  {selectedPoint.name}
                </h3>
                <p className="text-xs font-medium text-emerald-800 mt-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{selectedPoint.buildingName}</span>
                </p>
              </div>

              {/* Photo / Thumbnail if available */}
              {selectedPoint.imageUrl && (
                <div className="relative h-32 rounded-xl overflow-hidden border border-stone-200 shadow-inner">
                  <img
                    src={selectedPoint.imageUrl}
                    alt={selectedPoint.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-white text-[11px] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-300" />
                      {selectedPoint.floorInfo || 'Pabellón UNALM'}
                    </span>
                  </div>
                </div>
              )}

              {/* Exact Window and Floor Details */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 space-y-2.5 text-xs text-stone-700">
                {selectedPoint.officeCode && (
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                      <DoorIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block">Ventanilla de Atención:</span>
                      <span className="text-emerald-900 font-semibold">{selectedPoint.officeCode}</span>
                      {selectedPoint.floorInfo && <span className="text-stone-500 block text-[11px]">({selectedPoint.floorInfo})</span>}
                    </div>
                  </div>
                )}

                {selectedPoint.sampleReceptionWindow && (
                  <div className="flex items-start gap-2 pt-2 border-t border-stone-200/80">
                    <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block">Recepción de Muestras:</span>
                      <span className="text-stone-800">{selectedPoint.sampleReceptionWindow}</span>
                    </div>
                  </div>
                )}

                {selectedPoint.reportsDeliveryWindow && (
                  <div className="flex items-start gap-2 pt-2 border-t border-stone-200/80">
                    <div className="w-5 h-5 rounded-md bg-sky-100 text-sky-900 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block">Entrega de Informes:</span>
                      <span className="text-stone-800">{selectedPoint.reportsDeliveryWindow}</span>
                    </div>
                  </div>
                )}

                {selectedPoint.parkingNear && (
                  <div className="flex items-start gap-2 pt-2 border-t border-stone-200/80">
                    <div className="w-5 h-5 rounded-md bg-stone-200 text-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Car className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block">Estacionamiento Cercano:</span>
                      <span className="text-stone-600">{selectedPoint.parkingNear}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Route from Gate 1 */}
              <div className="border-l-2 border-emerald-700 pl-3 py-1 space-y-1">
                <span className="text-[11px] font-bold text-emerald-950 uppercase flex items-center gap-1">
                  <Footprints className="w-3.5 h-3.5 text-emerald-700" />
                  Cómo ingresar desde Puerta 1:
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {selectedPoint.routeFromGate1}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {selectedPoint.labIdRef && onSelectLabForReservation && (
                  <button
                    id={`reserve-from-map-${selectedPoint.labIdRef}`}
                    onClick={() => onSelectLabForReservation(selectedPoint.labIdRef!)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <CalendarCheck className="w-4 h-4 text-amber-300" />
                    <span>Reservar Análisis en este Laboratorio</span>
                  </button>
                )}

                <a
                  id="google-maps-direct-pin-btn"
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedPoint.lat},${selectedPoint.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-300 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ver Coordenadas GPS en Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STEP-BY-STEP ROUTES & WALKING ASSISTANT */}
      {activeTab === 'routes' && (
        <div className="space-y-6">
          {/* Origin Gate Selector */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-700" />
              <span>Seleccione su Puerta de Ingreso al Campus</span>
            </h3>
            <p className="text-xs text-stone-600">
              El campus de la UNALM cuenta con múltiples puertas de acceso según el tipo de transporte y el peso de las muestras.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'gate-puerta-1',
                  name: 'Puerta N° 1 (Principal - Av. La Molina)',
                  type: 'Peatonal y Vehicular',
                  recommend: 'Para Calidad de Aguas, Ecotoxicología, SIG y Trámites VRI',
                  timeNote: 'Paradero principal de buses y taxis'
                },
                {
                  id: 'gate-puerta-2',
                  name: 'Puerta N° 2 (Av. Los Gavilanes)',
                  type: 'Vehicular y Carga Ligera',
                  recommend: '¡Acceso directo a Suelos (LASAP) y Biología!',
                  timeNote: 'Menos de 2 min al Dpto. de Suelos'
                },
                {
                  id: 'gate-puerta-3',
                  name: 'Puerta N° 3 (Río Seco / Av. El Sol)',
                  type: 'Vehículos Pesados / Camiones',
                  recommend: 'Para descarga en Planta Piloto de Compostaje y Residuos',
                  timeNote: 'Acceso sur agropecuario'
                }
              ].map(gate => {
                const isSelected = selectedOriginGate === gate.id;
                return (
                  <button
                    key={gate.id}
                    id={`gate-select-${gate.id}`}
                    onClick={() => setSelectedOriginGate(gate.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/50'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {gate.type}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                    </div>
                    <div className="font-bold text-sm leading-tight">{gate.name}</div>
                    <p className={`text-xs mt-1.5 ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                      {gate.recommend}
                    </p>
                    <div className={`text-[11px] mt-2 pt-2 border-t font-medium ${
                      isSelected ? 'border-emerald-800 text-emerald-200' : 'border-stone-200 text-stone-600'
                    }`}>
                      {gate.timeNote}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* List of Detailed Walking Routes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CAMPUS_WALKING_ROUTES.map((route, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Ruta Recomendada</span>
                    <h4 className="font-serif font-bold text-stone-900 text-base">{route.to}</h4>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      {route.walkingMinutes} min
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">({route.distanceMeters} metros)</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {route.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3 text-xs text-stone-700">
                      <span className="w-5 h-5 rounded-full bg-stone-100 border border-stone-300 font-bold text-stone-700 flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                        {sIdx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Footprints className="w-3.5 h-3.5 text-emerald-700" />
                    Paseo asfaltado libre de gradas
                  </span>
                  <span className="font-semibold text-emerald-800">Apto para carretillas/coolers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT PICKUP & DROP-OFF PROTOCOL & WINDOWS */}
      {activeTab === 'pickupInfo' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Sample Reception Checklist */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                1. Entrega de Muestras
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Para garantizar la viabilidad del ensayo analítico
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Cadena de Custodia:</strong> Traer formato debidamente firmado y rotulado con fecha/hora de muestreo.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Cadena de Frío (4°C):</strong> Muestras de agua y bioensayos deben transportarse en cooler térmico con gel refrigerante.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Rotulado Indeleble:</strong> Identificador claro en cada frasco o bolsa coincidente con su reserva.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Horario Límite Muestras Frías:</strong> Hasta las 13:00 hrs para procesamiento en el mismo día.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Certified Report Pickup */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                2. Recojo de Informes Físicos
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Informes certificados con sello INACAL y firma del Director
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Documento Requerido:</strong> DNI físico del solicitante o carta poder simple si recoge un tercero.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Código de Reserva / Informe:</strong> Presentar el comprobante emitido por la plataforma en ventanilla.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Descarga Digital QR:</strong> Si no puede asistir presencialmente, use la pestaña "Consulta de Resultados" con su código.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Horario de Entrega:</strong> Lunes a Viernes de 08:30 a 16:30 hrs en horario corrido.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Security & Campus Logistics */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                3. Ingreso y Estacionamiento
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Facilidades de acceso vehicular dentro del campus
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Garita de Seguridad:</strong> Indicar en Puerta 1 o 2: <em>"Visita a Laboratorios Ambientales UNALM"</em>.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Descarga Rápida:</strong> Se permite estacionamiento provisional de 20 minutos frente al Vivero (P-1) o Suelos (P-3).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Taxis Autorizados:</strong> Pueden ingresar hasta la rotonda central del Rectorado para dejar al cliente.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span><strong>Velocidad Máxima:</strong> 25 km/h en vías internas del campus por protección de fauna y peatones.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

function LandmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Building2 {...props} />;
}

function DoorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M14 12v.01" />
    </svg>
  );
}
