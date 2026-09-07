import React from 'react';
import altairLogo from '../assets/images/aguila_altair_emblem_1788614588868.jpg';
import { 
  FlaskConical, 
  CalendarCheck, 
  ShieldAlert, 
  FileText, 
  GraduationCap, 
  Calculator, 
  Phone, 
  BookmarkCheck,
  Menu,
  X,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'reservation' | 'protocols' | 'results' | 'researchers' | 'location';
  setActiveTab: (tab: 'catalog' | 'reservation' | 'protocols' | 'results' | 'researchers' | 'location') => void;
  reservationCount: number;
  onOpenMyReservations: () => void;
  onOpenQuickQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  reservationCount,
  onOpenMyReservations,
  onOpenQuickQuote
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'catalog', label: 'Servicios y Ensayos', icon: FlaskConical },
    { id: 'reservation', label: 'Reservar Análisis', icon: CalendarCheck },
    { id: 'location', label: 'Mapa y Ubicación', icon: MapPin },
    { id: 'protocols', label: 'Protocolos y Seguridad', icon: ShieldAlert },
    { id: 'results', label: 'Consulta de Resultados', icon: FileText },
    { id: 'researchers', label: 'Investigadores', icon: GraduationCap }
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200 shadow-xs">
      {/* Institutional Top Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wider text-amber-400">UNALM</span>
            <span className="text-emerald-300/80">|</span>
            <span>Universidad Nacional Agraria La Molina • Vicerrectorado de Investigación</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Acreditación INACAL NTP-ISO/IEC 17025
            </span>
            <span className="text-emerald-300/80 hidden sm:inline">|</span>
            <a href="tel:+5116147800" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Campus La Molina: (01) 614-7800 Anx. 3421</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div 
            id="brand-logo-btn"
            onClick={() => setActiveTab('catalog')} 
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none shrink-0"
          >
            {/* Águila Altair Análisis Logo Badge */}
            <div className="flex items-center gap-2 sm:gap-2.5 pr-2.5 sm:pr-3.5 border-r border-stone-200">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform bg-stone-50 border border-stone-100">
                <img 
                  src={altairLogo} 
                  alt="Águila Altair Análisis" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-semibold text-stone-500 uppercase">
                  ÁGUILA
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-stone-900 tracking-tight leading-tight">
                  Altair
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-sky-600 tracking-wide">
                  Análisis
                </span>
              </div>
            </div>

            {/* LAB-AMBIENTE UNALM */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-400 shadow-md border border-emerald-700/50 group-hover:scale-105 transition-transform shrink-0">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-emerald-950 leading-none">
                    LAB-AMBIENTE
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 border border-emerald-300/60 uppercase">
                    UNALM
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium leading-tight mt-0.5">
                  Red de Laboratorios Ambientales
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-emerald-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              id="quick-quote-header-btn"
              onClick={onOpenQuickQuote}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              title="Calcular presupuesto rápido de ensayos"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-700" />
              <span>Cotizador</span>
            </button>

            <button
              id="my-reservations-header-btn"
              onClick={onOpenMyReservations}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors"
              title="Ver mis reservas y estados de entrega"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Mis Reservas</span>
              {reservationCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center ml-0.5 shadow-xs">
                  {reservationCount}
                </span>
              )}
            </button>

            <button
              id="cta-reserve-header-btn"
              onClick={() => setActiveTab('reservation')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-sm hover:shadow transition-all border border-emerald-700"
            >
              <CalendarCheck className="w-4 h-4 text-amber-300" />
              <span className="hidden xs:inline">Reservar Turno</span>
              <span className="xs:hidden">Reservar</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-900 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenQuickQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Cotizador Rápido de Ensayos</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
