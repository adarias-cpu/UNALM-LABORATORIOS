import React, { useState } from 'react';
import { Laboratory, Parameter } from '../types';
import { 
  Calculator, 
  X, 
  Check, 
  Printer, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Plus,
  Download,
  ExternalLink,
  Copy,
  FileText,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  QuotationData,
  generateQuotationCode,
  generateQuotationHtml,
  printQuotationViaIframe,
  downloadQuotationHtml,
  openQuotationInNewTab,
  copyQuotationToClipboard
} from '../utils/quotationDocument';

interface BudgetCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  laboratories: Laboratory[];
  onApplyToReservation: (params: Parameter[]) => void;
}

export const BudgetCalculatorModal: React.FC<BudgetCalculatorModalProps> = ({
  isOpen,
  onClose,
  laboratories,
  onApplyToReservation
}) => {
  if (!isOpen) return null;

  const [selectedParamIds, setSelectedParamIds] = useState<Set<string>>(
    new Set(['param-ph-agua', 'param-dbo5', 'param-metales-icp'])
  );
  const [sampleCount, setSampleCount] = useState<number>(3);
  const [requesterCategory, setRequesterCategory] = useState<'Tesista UNALM (35%)' | 'Estudiante UNALM (30%)' | 'Docente UNALM (25%)' | 'Tarifa General (0%)'>('Tesista UNALM (35%)');
  
  // State for print preview view
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [quotationCode, setQuotationCode] = useState<string>('COT-2026-UNALM-48192');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const allParameters = laboratories.flatMap(l => l.parameters);

  const toggleParam = (id: string) => {
    setSelectedParamIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedParamsList = allParameters.filter(p => selectedParamIds.has(p.id));
  const subtotalSingleSample = selectedParamsList.reduce((acc, p) => acc + p.pricePEN, 0);
  const subtotalTotal = subtotalSingleSample * sampleCount;

  let discountRate = 0;
  if (requesterCategory.includes('35%')) discountRate = 0.35;
  else if (requesterCategory.includes('30%')) discountRate = 0.30;
  else if (requesterCategory.includes('25%')) discountRate = 0.25;

  const discountVal = subtotalTotal * discountRate;
  const netTotal = subtotalTotal - discountVal;

  const getQuotationData = (): QuotationData => {
    const today = new Date();
    const validDate = new Date();
    validDate.setDate(validDate.getDate() + 30);

    return {
      quotationCode,
      requesterCategory,
      sampleCount,
      selectedParams: selectedParamsList,
      subtotalTotal,
      discountRate,
      discountVal,
      netTotal,
      emissionDate: today.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }),
      validUntilDate: validDate.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  const handleTriggerPrint = () => {
    if (selectedParamsList.length === 0) {
      return;
    }
    const newCode = generateQuotationCode();
    setQuotationCode(newCode);

    const qData: QuotationData = {
      ...getQuotationData(),
      quotationCode: newCode
    };
    const html = generateQuotationHtml(qData, laboratories);

    // Open print preview modal for full visibility & fallback options
    setShowPrintModal(true);

    // Attempt direct print via iframe
    printQuotationViaIframe(html);
  };

  const handleDownload = () => {
    const qData = getQuotationData();
    const html = generateQuotationHtml(qData, laboratories);
    downloadQuotationHtml(html, qData.quotationCode);
  };

  const handleOpenInNewTab = () => {
    const qData = getQuotationData();
    const html = generateQuotationHtml(qData, laboratories);
    openQuotationInNewTab(html);
  };

  const handleCopySummary = async () => {
    const qData = getQuotationData();
    const ok = await copyQuotationToClipboard(qData);
    if (ok) {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  // Map each parameter to its laboratory name
  const labMap = new Map<string, string>();
  laboratories.forEach(l => {
    l.parameters.forEach(p => labMap.set(p.id, l.shortName));
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Cotizador Rápido de Ensayos Ambientales UNALM
              </h3>
              <p className="text-xs text-emerald-300">
                Calcule el presupuesto estimado según matriz, número de muestras y descuentos institucionales
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition-colors"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          
          {/* Options row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <label className="font-bold text-stone-900 block mb-1 text-xs">Categoría del Solicitante:</label>
              <select
                value={requesterCategory}
                onChange={(e) => setRequesterCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              >
                <option value="Tesista UNALM (35%)">Tesista de Pregrado / Posgrado (35% Descuento)</option>
                <option value="Estudiante UNALM (30%)">Estudiante Regular UNALM (30% Descuento)</option>
                <option value="Docente UNALM (25%)">Docente / Investigador UNALM (25% Descuento)</option>
                <option value="Tarifa General (0%)">Empresa Externa / Público General (Tarifa Normal)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-900 block mb-1 text-xs">Cantidad de Muestras:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={sampleCount}
                  onChange={(e) => setSampleCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
                <span className="text-stone-500 text-xs shrink-0">muestras</span>
              </div>
            </div>
          </div>

          {/* Parameter Picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Seleccione los Parámetros a Cotizar ({selectedParamIds.size} seleccionados):
              </h4>
              <button
                onClick={() => setSelectedParamIds(new Set(allParameters.map(p => p.id)))}
                className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold"
              >
                Seleccionar todos
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1 border border-stone-200 rounded-xl">
              {allParameters.map((param) => {
                const isChecked = selectedParamIds.has(param.id);
                return (
                  <div
                    key={param.id}
                    onClick={() => toggleParam(param.id)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all select-none ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="block truncate">{param.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{param.matrix} • {param.code}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-emerald-900 block">S/ {param.pricePEN.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedParamIds.size === 0 && (
              <p className="text-xs text-amber-700 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Seleccione al menos un parámetro para calcular el presupuesto y generar la cotización.
              </p>
            )}
          </div>

          {/* Calculation summary */}
          <div className="p-4 bg-emerald-950 text-white rounded-xl space-y-2 shadow-inner">
            <div className="flex justify-between text-xs text-stone-300">
              <span>Subtotal ({selectedParamIds.size} parámetros x {sampleCount} muestras):</span>
              <span className="font-mono">S/ {subtotalTotal.toFixed(2)}</span>
            </div>
            {discountRate > 0 && (
              <div className="flex justify-between text-xs text-amber-300 font-medium">
                <span>Descuento Aplicado ({(discountRate * 100).toFixed(0)}%):</span>
                <span className="font-mono">- S/ {discountVal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-emerald-800">
              <span>Presupuesto Estimado Total:</span>
              <span className="text-xl text-amber-300 font-extrabold font-mono">S/ {netTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            id="btn-print-quotation"
            onClick={handleTriggerPrint}
            disabled={selectedParamIds.size === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              selectedParamIds.size === 0
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-md cursor-pointer'
            }`}
            title="Generar e imprimir la cotización oficial formal"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Imprimir Cotización</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-stone-600 hover:bg-stone-200 rounded-xl text-xs font-medium transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onApplyToReservation(selectedParamsList);
                onClose();
              }}
              disabled={selectedParamIds.size === 0}
              className={`flex items-center gap-1.5 px-5 py-2.5 font-bold text-xs rounded-xl shadow-xs transition-all ${
                selectedParamIds.size === 0
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-amber-400 hover:bg-amber-300 text-emerald-950 cursor-pointer hover:shadow-md'
              }`}
            >
              <span>Transferir a Sistema de Reservas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ----------------- PRINT PREVIEW & EXPORT MODAL OVERLAY ----------------- */}
        {showPrintModal && (
          <div className="absolute inset-0 z-50 bg-stone-900/90 backdrop-blur-xs flex flex-col text-stone-900 animate-in fade-in duration-200">
            
            {/* Top Toolbar in Print View */}
            <div className="bg-emerald-950 text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2 shadow-md border-b border-emerald-800 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-300" />
                <span className="font-bold text-xs sm:text-sm text-white">Vista Oficial de Cotización</span>
                <span className="text-[11px] font-mono bg-emerald-900 text-amber-300 px-2 py-0.5 rounded border border-emerald-700">
                  {quotationCode}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    const qData = getQuotationData();
                    const html = generateQuotationHtml(qData, laboratories);
                    printQuotationViaIframe(html);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-lg shadow-xs transition-colors"
                  title="Enviar a impresora o guardar como PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-950" />
                  <span>Imprimir</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs rounded-lg border border-stone-600 transition-colors"
                  title="Descargar proforma oficial en formato HTML/PDF imprimible"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Descargar</span>
                </button>

                <button
                  onClick={handleOpenInNewTab}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs rounded-lg border border-stone-600 transition-colors"
                  title="Abrir en pestaña independiente para imprimir sin restricciones"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  <span>Abrir en Pestaña</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs rounded-lg border border-stone-600 transition-colors"
                  title="Copiar texto formal al portapapeles"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-300" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-1.5 text-stone-400 hover:text-white hover:bg-emerald-900 rounded-lg transition-colors ml-1"
                  title="Volver a la calculadora"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification notice for iframes */}
            <div className="bg-amber-100 text-amber-950 px-5 py-2 text-[11px] font-medium border-b border-amber-300 flex items-center justify-between shrink-0">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Documento oficial generado listo para imprimir. Si el navegador no abre el cuadro de impresión automático, use el botón <strong>Imprimir</strong> o <strong>Abrir en Pestaña</strong>.</span>
              </span>
            </div>

            {/* Printable Document Preview Area */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-stone-200">
              <div className="bg-white max-w-2xl mx-auto p-6 sm:p-8 rounded-xl shadow-xl border border-stone-300 text-stone-900 text-xs">
                
                {/* Header */}
                <div className="flex items-start justify-between border-b-2 border-emerald-800 pb-4 mb-4">
                  <div>
                    <h2 className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-tight">
                      UNIVERSIDAD NACIONAL AGRARIA LA MOLINA
                    </h2>
                    <h3 className="text-[11px] font-bold text-stone-700">
                      Vicerrectorado de Investigación • Red de Laboratorios Ambientales
                    </h3>
                    <p className="text-[10px] text-stone-500 mt-1">
                      Av. La Molina s/n, La Molina, Lima - Perú • R.U.C. 20147820120
                    </p>
                    <p className="text-[10px] text-stone-500">
                      Email: laboratorios.ambientales@lamolina.edu.pe • Central: (01) 614-7800
                    </p>
                  </div>
                  <div className="text-right bg-emerald-50 border border-emerald-400 p-2.5 rounded-lg shrink-0">
                    <span className="text-[9px] font-extrabold uppercase text-emerald-900 block">Proforma Oficial</span>
                    <span className="font-mono font-black text-xs sm:text-sm text-emerald-950 block">{quotationCode}</span>
                    <span className="text-[9px] text-stone-500 block">Emisión: {new Date().toLocaleDateString('es-PE')}</span>
                  </div>
                </div>

                {/* Details summary */}
                <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-lg border border-stone-200 mb-4 text-[11px]">
                  <div>
                    <span className="text-stone-500 text-[10px] uppercase font-bold block">Solicitante:</span>
                    <span className="font-bold text-stone-900 block">{requesterCategory}</span>
                    <span className="text-emerald-700 font-semibold block text-[10px]">
                      {discountRate > 0 ? `Descuento del ${(discountRate * 100).toFixed(0)}% aplicado` : 'Tarifa Normal'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] uppercase font-bold block">Volumen analítico:</span>
                    <span className="font-bold text-stone-900 block">{sampleCount} muestras ({selectedParamsList.length * sampleCount} ensayos)</span>
                    <span className="text-stone-600 text-[10px] block">Plazo de entrega: 5 a 8 días hábiles</span>
                  </div>
                </div>

                {/* Parameters Table */}
                <div className="overflow-x-auto mb-4 border border-stone-200 rounded-lg">
                  <table className="w-full text-[11px]">
                    <thead className="bg-emerald-950 text-white text-[10px] uppercase tracking-wider">
                      <tr>
                        <th className="py-2 px-2 text-center">N°</th>
                        <th className="py-2 px-2 text-left">Código</th>
                        <th className="py-2 px-2 text-left">Parámetro</th>
                        <th className="py-2 px-2 text-left">Matriz</th>
                        <th className="py-2 px-2 text-center">Muestras</th>
                        <th className="py-2 px-2 text-right">P. Unit.</th>
                        <th className="py-2 px-2 text-right">Total S/</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {selectedParamsList.map((param, index) => (
                        <tr key={param.id} className="hover:bg-stone-50">
                          <td className="py-2 px-2 text-center text-stone-400">{index + 1}</td>
                          <td className="py-2 px-2 font-mono font-semibold text-stone-600">{param.code}</td>
                          <td className="py-2 px-2 font-medium text-stone-900">
                            {param.name}
                            {param.accreditedINACAL && (
                              <span className="ml-1 text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">ISO 17025</span>
                            )}
                          </td>
                          <td className="py-2 px-2 text-stone-600">{param.matrix}</td>
                          <td className="py-2 px-2 text-center font-bold">{sampleCount}</td>
                          <td className="py-2 px-2 text-right font-mono">S/ {param.pricePEN.toFixed(2)}</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-emerald-950">
                            S/ {(param.pricePEN * sampleCount).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-4">
                  <div className="w-64 bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-1 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal Bruto:</span>
                      <span className="font-mono">S/ {subtotalTotal.toFixed(2)}</span>
                    </div>
                    {discountRate > 0 && (
                      <div className="flex justify-between text-amber-700 font-semibold">
                        <span>Descuento ({(discountRate * 100).toFixed(0)}%):</span>
                        <span className="font-mono">- S/ {discountVal.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-emerald-950 pt-2 border-t border-stone-300">
                      <span>TOTAL (PEN):</span>
                      <span className="font-mono text-emerald-900">S/ {netTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Terms Note */}
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-[10px] text-stone-500 space-y-1 mb-4">
                  <p className="font-bold text-stone-700 uppercase">Condiciones del Servicio:</p>
                  <p>• Validez de 30 días calendario desde su fecha de emisión.</p>
                  <p>• Entrega de muestras en Ventanilla de Recepción UNALM (Campus La Molina) con refrigerantes a 4°C ± 2°C y cadena de custodia.</p>
                  <p>• Pago en Caja Central UNALM o transferencia Banco de la Nación Cta. Cte. N° 00-000-847291.</p>
                </div>

                {/* Signatures */}
                <div className="pt-4 border-t border-stone-200 flex items-end justify-between text-[10px] text-stone-500">
                  <span>Documento oficial de la Red de Laboratorios Ambientales UNALM</span>
                  <div className="text-center w-48">
                    <div className="border-b border-stone-400 h-8 flex items-end justify-center font-serif italic text-emerald-900 font-bold">
                      Coordinación General
                    </div>
                    <span className="text-[9px] block mt-1">Dirección Técnica UNALM</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

