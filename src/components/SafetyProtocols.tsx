import React, { useState } from 'react';
import { SafetyProtocol, SampleCheckItem } from '../types';
import { 
  ShieldAlert, 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  Skull, 
  Biohazard, 
  FlaskConical, 
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SafetyProtocolsProps {
  protocols: SafetyProtocol[];
  checklistItems: SampleCheckItem[];
}

export const SafetyProtocols: React.FC<SafetyProtocolsProps> = ({
  protocols,
  checklistItems
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [expandedProtocolId, setExpandedProtocolId] = useState<string>(protocols[0]?.id || '');
  const [checkedItemIds, setCheckedItemIds] = useState<Set<string>>(
    new Set(['chk-1', 'chk-2', 'chk-4', 'chk-5'])
  );

  const categories = [
    'Todas',
    'Seguridad Química',
    'Manejo de Residuos (RESPEL)',
    'Cadena de Custodia',
    'Emergencias y Contingencias'
  ];

  const filteredProtocols = protocols.filter(p => {
    if (selectedCategory !== 'Todas' && p.category !== selectedCategory) return false;
    return true;
  });

  const toggleCheck = (id: string) => {
    setCheckedItemIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const compliancePercentage = Math.round((checkedItemIds.size / checklistItems.length) * 100);

  const getHazardBadge = (symbol: string) => {
    switch (symbol) {
      case 'Inflamable': return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300"><Flame className="w-3 h-3 text-amber-600" /> Inflamable</span>;
      case 'Toxicidad Aguda':
      case 'Tóxico': return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300"><Skull className="w-3 h-3 text-rose-600" /> Tóxico</span>;
      case 'Peligro Biológico': return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300"><Biohazard className="w-3 h-3 text-purple-600" /> Biológico</span>;
      default: return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-300"><FlaskConical className="w-3 h-3 text-stone-600" /> {symbol}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            <span>Seguridad y Salud Ocupacional en Laboratorios</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Protocolos de Bioseguridad, EPP y Custodia de Muestras
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-3xl">
            Lineamientos estandarizados bajo la Ley N° 29783, normas ISO/IEC 17025 y resoluciones rectorales UNALM para garantizar la integridad de los analistas, investigadores y usuarios.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl text-emerald-950 text-xs font-medium shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Comité de Bioseguridad UNALM Vigente</span>
        </div>
      </div>

      {/* Interactive Feature: Pre-delivery Sample Compliance Checker */}
      <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-stone-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Herramienta Interactiva de Verificación Previa</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
              Validador de Conformidad de Muestras antes de Entrega
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              Verifique los requisitos críticos de preservación, rotulado y cadena de frío antes de trasladar sus muestras al Campus La Molina para evitar rechazos en ventanilla.
            </p>
          </div>

          {/* Compliance Gauge */}
          <div className="bg-stone-800/80 border border-stone-700 p-4 rounded-xl flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[11px] text-stone-400 block font-medium">Nivel de Conformidad:</span>
              <span className={`text-2xl font-extrabold ${
                compliancePercentage === 100 ? 'text-emerald-400' : compliancePercentage >= 70 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {compliancePercentage}%
              </span>
              <span className="text-[10px] text-stone-400 block">
                {checkedItemIds.size} de {checklistItems.length} criterios
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-stone-700 flex items-center justify-center relative">
              {compliancePercentage === 100 ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              )}
            </div>
          </div>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-6">
          {checklistItems.map((item) => {
            const isChecked = checkedItemIds.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isChecked
                    ? 'bg-emerald-950/70 border-emerald-600/70 text-emerald-100 shadow-2xs'
                    : 'bg-stone-800/50 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Square className="w-4 h-4 text-stone-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-xs">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {compliancePercentage === 100 ? (
          <div className="mt-4 p-3 bg-emerald-900/50 border border-emerald-600/60 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>¡Excelente! Sus muestras cumplen con todos los requerimientos técnicos y serán admitidas sin observaciones en ventanilla.</span>
          </div>
        ) : (
          <div className="mt-4 p-3 bg-amber-950/40 border border-amber-700/50 rounded-xl text-xs text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Complete los puntos pendientes para evitar demoras o no-conformidades en la recepción del laboratorio.</span>
          </div>
        )}
      </div>

      {/* Protocols List by Category */}
      <div className="space-y-6">
        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Protocol Accordion Cards */}
        <div className="space-y-4">
          {filteredProtocols.map((protocol) => {
            const isExpanded = expandedProtocolId === protocol.id;
            return (
              <div
                key={protocol.id}
                id={`protocol-card-${protocol.id}`}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition-all"
              >
                {/* Header */}
                <div
                  onClick={() => setExpandedProtocolId(isExpanded ? '' : protocol.id)}
                  className="p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-stone-50/80 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                          {protocol.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          protocol.importanceLevel === 'Crítico'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          Nivel: {protocol.importanceLevel}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                        {protocol.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 max-w-3xl leading-relaxed">
                        {protocol.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex flex-wrap gap-1">
                      {protocol.hazardousPictograms?.map((p, idx) => (
                        <React.Fragment key={idx}>{getHazardBadge(p)}</React.Fragment>
                      ))}
                    </div>
                    <button className="p-1 text-stone-400 hover:text-stone-700">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-5 animate-in slide-in-from-top-1 duration-150 text-xs sm:text-sm">
                    {/* Regulatory Framework */}
                    <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 text-xs flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-800 shrink-0" />
                      <span><strong>Marco Legal y Regulatorio:</strong> {protocol.regulatoryFramework}</span>
                    </div>

                    {/* Step-by-step Procedures */}
                    <div>
                      <h5 className="font-bold text-stone-900 uppercase tracking-wider text-xs mb-2">
                        Instrucciones y Procedimiento Operativo Estándar:
                      </h5>
                      <div className="space-y-2">
                        {protocol.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-stone-200/80">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-stone-700 leading-relaxed text-xs sm:text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* PPE Requirements */}
                    <div>
                      <h5 className="font-bold text-stone-900 uppercase tracking-wider text-xs mb-2">
                        Equipo de Protección Personal (EPP) Requerido:
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {protocol.ppeRequired.map((ppe, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-stone-200 text-xs text-stone-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>{ppe}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Download Guide Button */}
                    <div className="pt-3 border-t border-stone-200 flex justify-between items-center">
                      <span className="text-stone-400 text-xs">
                        Código de Documento: UNALM-SSO-PRT-{protocol.id.slice(5).toUpperCase()}
                      </span>
                      <button
                        onClick={() => {
                          alert(`Descargando documento oficial: ${protocol.documentDownloadName || 'Protocolo_UNALM.pdf'}`);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar PDF Oficial</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
