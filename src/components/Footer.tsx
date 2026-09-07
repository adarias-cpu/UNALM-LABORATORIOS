import React from 'react';
import altairLogo from '../assets/images/aguila_altair_emblem_1788614588868.jpg';
import { 
  FlaskConical, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Award,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'catalog' | 'reservation' | 'protocols' | 'results' | 'researchers' | 'location') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Institutional info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-900 border border-stone-700 flex items-center justify-center shrink-0">
                <img 
                  src={altairLogo} 
                  alt="Águila Altair Análisis" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">ÁGUILA</span>
                  <span className="font-serif text-sm font-bold text-white leading-none">Altair</span>
                  <span className="text-[10px] font-semibold text-sky-400">Análisis</span>
                </div>
                <span className="text-[11px] text-stone-400 font-medium block mt-0.5">
                  UNALM • Red de Laboratorios Ambientales
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Centro de excelencia analítica e investigación ambiental de la Universidad Nacional Agraria La Molina. Ensayos acreditados bajo norma NTP-ISO/IEC 17025:2017 ante INACAL.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Registro INACAL N° LE-089</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
              Secciones del Portal
            </h4>
            <ul className="space-y-1.5 text-stone-400 text-xs">
              <li>
                <button onClick={() => onNavigateTab('catalog')} className="hover:text-amber-300 transition-colors">
                  • Catálogo de Servicios y Ensayos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('reservation')} className="hover:text-amber-300 transition-colors">
                  • Reservar Análisis en Línea
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('location')} className="hover:text-amber-300 transition-colors text-amber-300/90 font-medium">
                  • Mapa de Ubicación y Sedes (UNALM)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('protocols')} className="hover:text-amber-300 transition-colors">
                  • Protocolos de Bioseguridad y EPP
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('results')} className="hover:text-amber-300 transition-colors">
                  • Consulta de Informes de Ensayo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('researchers')} className="hover:text-amber-300 transition-colors">
                  • Perfiles de Investigadores RENACYT
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Location & Hours */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
              Ubicación y Atención
            </h4>
            <div className="space-y-2 text-[11px] text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Campus Universitario UNALM, Av. La Molina s/n, Distrito de La Molina, Lima 15024, Perú.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Lunes a Viernes: 08:00 - 16:30 hrs<br />
                  Recepción de muestras: 08:30 - 13:00 hrs
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Extensions */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
              Contacto Institucional
            </h4>
            <div className="space-y-2 text-[11px] text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Central: (01) 614-7800 Anx. 3421 / 2105</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a href="mailto:laboratorios.ambiente@lamolina.edu.pe" className="hover:text-white transition-colors">
                  laboratorios.ambiente@lamolina.edu.pe
                </a>
              </div>
              <div className="p-2.5 bg-stone-900 rounded-lg border border-stone-800 text-[10px] text-stone-300 space-y-0.5">
                <span className="font-bold text-amber-300 block">Línea de Emergencias Campus:</span>
                <span>Anexo 3333 (Seguridad UNALM / Tópico)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Universidad Nacional Agraria La Molina (UNALM). Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Vicerrectorado de Investigación (VRI)</span>
            <span>•</span>
            <span>Dirección de Gestión de la Investigación</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
