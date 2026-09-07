import React, { useState } from 'react';
import { AnalysisReport, Reservation } from '../types';
import { 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Printer, 
  Download, 
  QrCode, 
  Building, 
  UserCheck, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  Layers,
  Droplet,
  Wind
} from 'lucide-react';

interface ResultsLookupProps {
  reports: AnalysisReport[];
  userReservations: Reservation[];
  initialSearchCode?: string;
}

export const ResultsLookup: React.FC<ResultsLookupProps> = ({
  reports,
  userReservations,
  initialSearchCode = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchCode || 'UNALM-LAB-2025-0104');
  const [activeReport, setActiveReport] = useState<AnalysisReport | null>(
    reports.find(r => r.reservationCode === (initialSearchCode || 'UNALM-LAB-2025-0104')) || reports[0]
  );
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim().toUpperCase();
    
    // Check in reports
    const foundReport = reports.find(
      r => r.reservationCode.toUpperCase() === q || 
           r.reportCode.toUpperCase() === q || 
           r.clientDocument === q ||
           r.clientName.toUpperCase().includes(q)
    );

    if (foundReport) {
      setActiveReport(foundReport);
    } else {
      // Check if it matches a user reservation that is still in progress
      const foundRes = userReservations.find(res => res.code.toUpperCase() === q);
      if (foundRes) {
        // Construct a dynamic report status for pending user reservation
        setActiveReport({
          reportCode: `INF-EN-PROCESO-${foundRes.code}`,
          reservationCode: foundRes.code,
          sampleCode: foundRes.samples[0]?.sampleId || 'M-01',
          clientName: foundRes.requesterName,
          clientDocument: foundRes.studentOrRucCode || 'No registrado',
          entity: foundRes.facultyOrEntity,
          projectTitle: foundRes.projectOrThesisTitle || 'Análisis de Muestras Ambientales',
          matrix: foundRes.samples[0]?.matrix || 'Agua',
          samplingLocation: foundRes.samples[0]?.samplingPoint || 'Campus UNALM',
          samplingDate: foundRes.scheduledDate,
          receptionDate: foundRes.scheduledDate,
          analysisDate: 'Actualmente en fase de digestión y lectura instrumental',
          emissionDate: 'Pendiente de emisión (Plazo estimado: 5 días hábiles)',
          laboratoryName: 'Laboratorio de Servicios Ambientales UNALM',
          leadAnalyst: 'Asignado según matriz analítica',
          technicalDirector: 'Dirección Técnica de Red de Laboratorios',
          conclusion: `La orden de servicio ${foundRes.code} se encuentra registrada con estado: "${foundRes.status}". Las muestras han sido programadas para análisis en el campus La Molina.`,
          accreditationNote: 'Acreditado por INACAL bajo la norma NTP-ISO/IEC 17025.',
          results: foundRes.samples[0]?.selectedParameterIds?.map(pid => ({
            parameterName: `Parámetro Solicitado (${pid})`,
            method: 'Método Oficial Estandarizado UNALM',
            resultValue: 'En Proceso',
            unit: 'N/A',
            limitOfDetection: 'N/A',
            referenceStandard: 'ECA MINAM Vigente',
            standardLimitValue: 'Según Norma',
            status: 'Conforme' as const
          })) || []
        });
      } else {
        setActiveReport(null);
      }
    }
    setHasSearched(true);
  };

  const getStatusBadge = (status: 'Conforme' | 'Alerta Cercana al Límite' | 'Excede Límite') => {
    switch (status) {
      case 'Conforme':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Conforme con ECA
          </span>
        );
      case 'Alerta Cercana al Límite':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Zona de Alerta
          </span>
        );
      case 'Excede Límite':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-900 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Excede Norma
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
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Sistema Metrológico y Validación de Ensayos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Consulta y Verificación de Informes de Ensayo
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-3xl">
            Ingrese su código de reserva u orden de servicio para visualizar el informe analítico oficial con firmas electrónicas y comparación directa con los Estándares de Calidad Ambiental (ECA) del MINAM Perú.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-xl text-stone-700 text-xs shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Firma Digital & QR de Validez Legal</span>
        </div>
      </div>

      {/* Search Input and Demo Selection Bar */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-3xl">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3" />
            <input
              id="report-search-query-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ingrese código de reserva (ej. UNALM-LAB-2025-0104) o DNI/RUC..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:border-emerald-700 focus:outline-hidden shadow-2xs"
            />
          </div>
          <button
            id="report-search-btn"
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Consultar Informe</span>
          </button>
        </form>

        {/* Quick Demo Pre-loaded Reports */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-stone-500 font-medium">Informes de muestra disponibles:</span>
          {reports.map((rep) => (
            <button
              key={rep.reportCode}
              id={`quick-report-btn-${rep.reservationCode}`}
              onClick={() => {
                setSearchQuery(rep.reservationCode);
                setActiveReport(rep);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs transition-all flex items-center gap-1.5 ${
                activeReport?.reservationCode === rep.reservationCode
                  ? 'bg-emerald-900 text-white font-bold border-emerald-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>{rep.reservationCode} ({rep.matrix.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Report Display or Not Found State */}
      {!activeReport ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
          <FileText className="w-12 h-12 text-stone-300 mx-auto" />
          <h4 className="text-base font-bold text-stone-800">No se encontró ningún informe con el código ingresado</h4>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Verifique el código de reserva en su comprobante o intente con los informes de demostración arriba.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-300 shadow-sm overflow-hidden" id="printable-official-report">
          
          {/* Institutional Report Top Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-950 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-emerald-800/80">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white text-emerald-950 flex items-center justify-center font-serif font-black text-xl shadow-md border-2 border-amber-400 shrink-0">
                  UNALM
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-xl text-white">
                    UNIVERSIDAD NACIONAL AGRARIA LA MOLINA
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Vicerrectorado de Investigación • {activeReport.laboratoryName}
                  </p>
                  <p className="text-[11px] text-amber-300/90 font-medium">
                    {activeReport.accreditationNote}
                  </p>
                </div>
              </div>

              {/* Actions & Report Number */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-600 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Imprimir Certificado</span>
                </button>
                <div className="bg-amber-400 text-emerald-950 px-3 py-2 rounded-lg text-right font-mono">
                  <span className="text-[10px] block leading-none font-bold uppercase">N° INFORME OFICIAL</span>
                  <span className="text-xs sm:text-sm font-extrabold">{activeReport.reportCode}</span>
                </div>
              </div>
            </div>

            {/* Document Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs text-stone-200">
              <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/50">
                <span className="text-stone-400 text-[10px] uppercase block font-semibold">Solicitante:</span>
                <span className="font-bold text-white block">{activeReport.clientName}</span>
                <span className="text-[11px] text-emerald-300">Doc: {activeReport.clientDocument}</span>
              </div>

              <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/50">
                <span className="text-stone-400 text-[10px] uppercase block font-semibold">Proyecto / Entidad:</span>
                <span className="font-bold text-white block line-clamp-1">{activeReport.projectTitle}</span>
                <span className="text-[11px] text-emerald-300">{activeReport.entity}</span>
              </div>

              <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/50">
                <span className="text-stone-400 text-[10px] uppercase block font-semibold">Matriz y Código Muestra:</span>
                <span className="font-bold text-amber-300 block">{activeReport.matrix}</span>
                <span className="text-[11px] text-emerald-200">Identificador: {activeReport.sampleCode}</span>
              </div>

              <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/50">
                <span className="text-stone-400 text-[10px] uppercase block font-semibold">Fechas Clave:</span>
                <span className="text-[11px] text-stone-300 block">Recepción: {activeReport.receptionDate}</span>
                <span className="text-[11px] text-emerald-300 block">Emisión: {activeReport.emissionDate}</span>
              </div>
            </div>
          </div>

          {/* Location & GPS Info */}
          <div className="p-4 bg-stone-100 border-b border-stone-200 text-xs text-stone-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
            <span><strong>Punto de Muestreo / Coordenadas:</strong> {activeReport.samplingLocation}</span>
          </div>

          {/* Analytical Results Table */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Resultados de los Ensayos Fisicoquímicos e Instrumentales</span>
                <span className="text-xs font-normal text-stone-500">Comparación con Estándares Ambientales MINAM</span>
              </h4>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 uppercase font-bold border-b border-stone-200 text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Parámetro Ensayo</th>
                      <th className="py-3 px-3">Método Normalizado</th>
                      <th className="py-3 px-3">Resultado Obtenido</th>
                      <th className="py-3 px-3">L.D.</th>
                      <th className="py-3 px-3">Norma ECA de Referencia</th>
                      <th className="py-3 px-3">Límite ECA</th>
                      <th className="py-3 px-4 text-center">Dictamen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-white">
                    {activeReport.results.map((r, idx) => (
                      <tr key={idx} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-stone-900">
                          {r.parameterName}
                          {r.uncertainty && (
                            <span className="text-[10px] text-stone-400 font-mono block">
                              Incertidumbre: {r.uncertainty}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-stone-600">{r.method}</td>
                        <td className="py-3 px-3 font-bold text-emerald-950 text-sm">
                          {r.resultValue} <span className="text-xs font-normal text-stone-500">{r.unit}</span>
                        </td>
                        <td className="py-3 px-3 text-stone-500 text-[11px]">{r.limitOfDetection}</td>
                        <td className="py-3 px-3 text-stone-700 font-medium text-[11px]">{r.referenceStandard}</td>
                        <td className="py-3 px-3 font-semibold text-stone-800">{r.standardLimitValue}</td>
                        <td className="py-3 px-4 text-center">
                          {getStatusBadge(r.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Conclusion & Observations */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5 text-xs">
              <h5 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Conclusión y Dictamen Técnico del Laboratorio:
              </h5>
              <p className="text-stone-700 leading-relaxed">
                {activeReport.conclusion}
              </p>
            </div>

            {/* Analyst & Director Signatures + QR Code */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Analyst signature */}
              <div className="text-center p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="h-10 border-b border-stone-400 flex items-end justify-center pb-1">
                  <span className="font-serif italic text-emerald-900 font-semibold text-xs">Firma Digital Registrada</span>
                </div>
                <span className="font-bold text-xs text-stone-900 block mt-2">{activeReport.leadAnalyst}</span>
                <span className="text-[10px] text-stone-500 block">Analista Responsable del Ensayo</span>
              </div>

              {/* Technical Director signature */}
              <div className="text-center p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="h-10 border-b border-stone-400 flex items-end justify-center pb-1">
                  <span className="font-serif italic text-emerald-900 font-semibold text-xs">{activeReport.technicalDirector.split('(')[0].trim()}</span>
                </div>
                <span className="font-bold text-xs text-stone-900 block mt-2">{activeReport.technicalDirector}</span>
                <span className="text-[10px] text-stone-500 block">Dirección Técnica de Laboratorios UNALM</span>
              </div>

              {/* Digital Verification QR */}
              <div className="flex items-center gap-3 p-3 bg-stone-900 text-white rounded-xl">
                <div className="w-12 h-12 bg-white text-stone-900 rounded-lg p-1 shrink-0 flex items-center justify-center">
                  <QrCode className="w-full h-full text-emerald-950" />
                </div>
                <div className="text-[10px] leading-tight">
                  <span className="font-bold text-amber-300 block">Verificación Digital</span>
                  <span className="text-stone-300 block">Validez legal en repositorio oficial UNALM</span>
                  <span className="font-mono text-stone-400 text-[9px] block mt-0.5">{activeReport.reportCode}</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
