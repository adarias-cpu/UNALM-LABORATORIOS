import React, { useState } from 'react';
import { Researcher } from '../types';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  ExternalLink, 
  Mail, 
  Phone, 
  Clock, 
  Building, 
  FolderGit2, 
  Sparkles, 
  CheckCircle2, 
  Send,
  X,
  Search
} from 'lucide-react';
import { matchesSearch } from '../utils/searchUtils';

interface ResearchersDirectoryProps {
  researchers: Researcher[];
  selectedResearcherId?: string | null;
}

export const ResearchersDirectory: React.FC<ResearchersDirectoryProps> = ({
  researchers,
  selectedResearcherId
}) => {
  const [facultyFilter, setFacultyFilter] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [contactModalResearcher, setContactModalResearcher] = useState<Researcher | null>(null);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [expandedBioId, setExpandedBioId] = useState<string | null>(selectedResearcherId || null);

  const faculties = [
    'Todas',
    'Facultad de Ciencias',
    'Facultad de Agronomía',
    'Facultad de Ciencias Forestales',
    'Facultad de Ingeniería Agrícola'
  ];

  const filteredResearchers = researchers.filter(r => {
    if (facultyFilter !== 'Todas' && r.faculty !== facultyFilter) return false;
    if (searchQuery.trim()) {
      return matchesSearch(
        searchQuery,
        r.name,
        r.department,
        r.roleTitle,
        r.faculty,
        ...r.researchLines
      );
    }
    return true;
  });

  const getRenacytBadge = (level: Researcher['renacytLevel']) => {
    switch (level) {
      case 'Carlos Monge Medrano':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 shadow-xs border border-amber-500">
            <Award className="w-3.5 h-3.5 text-emerald-900" />
            RENACYT: Carlos Monge (Nivel Máximo)
          </span>
        );
      case 'Nivel I (Distinguido)':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            RENACYT: Nivel I (Distinguido)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-300">
            <Award className="w-3.5 h-3.5 text-stone-600" />
            RENACYT: {level}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>Cuerpo Docente e Investigadores Calificados</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Perfiles Académicos de Investigadores Responsables
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-3xl">
            Conozca la trayectoria científica, proyectos financiados (PROCIENCIA, VLIR-UOS, Banco Mundial), publicaciones Scopus y líneas de investigación del equipo docente a cargo de cada laboratorio ambiental.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-amber-950 text-xs font-bold shrink-0">
          <Award className="w-4 h-4 text-amber-700" />
          <span>100% Calificados en RENACYT - CONCYTEC</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Faculty Pills */}
        <div className="flex overflow-x-auto gap-2 w-full sm:w-auto pb-1 scrollbar-thin">
          {faculties.map((fac) => (
            <button
              key={fac}
              id={`filter-faculty-${fac.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setFacultyFilter(fac)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                facultyFilter === fac
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {fac}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por investigador o línea..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs focus:border-emerald-700 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Researchers Cards Grid */}
      <div className="space-y-8">
        {filteredResearchers.map((researcher) => {
          return (
            <div
              key={researcher.id}
              id={`researcher-profile-${researcher.id}`}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Avatar & Identifiers Column */}
                  <div className="flex flex-row lg:flex-col items-start gap-4 lg:w-56 shrink-0">
                    <img
                      src={researcher.avatarUrl}
                      alt={researcher.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 lg:w-28 lg:h-28 rounded-2xl object-cover border-2 border-stone-200 shadow-sm"
                    />
                    <div className="space-y-2">
                      {getRenacytBadge(researcher.renacytLevel)}
                      
                      <div className="text-[11px] text-stone-600 space-y-1 pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-400 font-mono text-[10px]">CÓDIGO:</span>
                          <span className="font-mono font-bold text-stone-800">{researcher.renacytCode}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-emerald-800">ORCID:</span>
                          <span className="font-mono text-[10px] text-stone-700">{researcher.orcid}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sky-800">Scopus ID:</span>
                          <span className="font-mono text-[10px] text-stone-700">{researcher.scopusId}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Academic Info */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {researcher.faculty}
                        </span>
                        <span className="text-xs text-stone-500">
                          {researcher.department}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                        {researcher.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-emerald-900">
                        {researcher.degree}
                      </p>
                      <p className="text-xs font-medium text-stone-600 mt-0.5">
                        {researcher.roleTitle}
                      </p>
                    </div>

                    {/* Biography */}
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200/80">
                      {researcher.biography}
                    </p>

                    {/* Research Lines */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                        Líneas de Investigación y Especialización:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {researcher.researchLines.map((line, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-emerald-50 text-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-200/70 font-medium"
                          >
                            • {line}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Ongoing Funded Projects */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2 flex items-center gap-1.5">
                        <FolderGit2 className="w-3.5 h-3.5 text-amber-600" />
                        Proyectos de Investigación Financiados:
                      </h4>
                      <div className="space-y-2">
                        {researcher.projects.map((proj, idx) => (
                          <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <div>
                              <span className="font-bold text-stone-900 block">{proj.title}</span>
                              <span className="text-stone-500 text-[11px]">Rol: {proj.role} • Periodo: {proj.period}</span>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 shrink-0 self-start sm:self-center">
                              {proj.fundingSource}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Publications */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                        Publicaciones Científicas Destacadas (Scopus / WoS):
                      </h4>
                      <div className="space-y-1.5">
                        {researcher.publications.map((pub, idx) => (
                          <div key={idx} className="text-xs text-stone-700 p-2.5 rounded-lg border border-stone-100 bg-stone-50/50">
                            <span className="font-semibold text-stone-900 block">{pub.title}</span>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                              <span className="font-serif italic text-emerald-900">{pub.journal} ({pub.year})</span>
                              <span>•</span>
                              <span className="font-mono text-stone-400">DOI: {pub.doi}</span>
                              <span>•</span>
                              <span className="font-medium text-amber-800">{pub.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Bar & Action */}
                    <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                      <div className="space-y-1 text-stone-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="font-medium text-stone-900">{researcher.email}</span>
                          <span className="text-stone-300">|</span>
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>{researcher.phoneExtension}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Asesoría Técnica: {researcher.officeHours}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setContactModalResearcher(researcher);
                          setContactFormSubmitted(false);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Solicitar Asesoría o Cotización Técnica</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advisory Modal */}
      {contactModalResearcher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setContactModalResearcher(null)}
              className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {contactFormSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-serif font-bold text-stone-900">
                  ¡Solicitud Enviada Exitosamente!
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Se ha enviado una notificación al correo institucional de <strong>{contactModalResearcher.name}</strong> ({contactModalResearcher.email}). Recibirá una respuesta en un plazo de 24 a 48 horas hábiles.
                </p>
                <button
                  onClick={() => setContactModalResearcher(null)}
                  className="px-5 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-lg mt-2"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactFormSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                    Asesoría Académica y Técnica
                  </span>
                  <h4 className="text-base font-serif font-bold text-stone-900 mt-1">
                    Contactar a {contactModalResearcher.name}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {contactModalResearcher.roleTitle} • UNALM
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Su Nombre y Apellidos *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Bach. Elena Gómez"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="su_correo@lamolina.edu.pe"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Motivo de la Consulta *</label>
                    <select className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white">
                      <option>Asesoría en Tesis de Pregrado / Posgrado</option>
                      <option>Consultoría y Validación de Metodología de Muestreo</option>
                      <option>Cotización de Proyecto de Investigación Financiado</option>
                      <option>Colaboración Científica Interinstitucional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Descripción del Proyecto / Pregunta *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Detalle los objetivos de su estudio, número estimado de muestras y plazos..."
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setContactModalResearcher(null)}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Mensaje Institucional</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
