import React, { useState, useEffect } from 'react';
import { 
  Laboratory, 
  Parameter, 
  Reservation, 
  SampleItem 
} from '../types';
import { 
  CalendarCheck, 
  FlaskConical, 
  User, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  Plus, 
  Clock, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Printer, 
  Download, 
  AlertCircle, 
  QrCode, 
  Tag,
  Check,
  Percent,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationSystemProps {
  laboratories: Laboratory[];
  selectedParameters: Parameter[];
  onRemoveParameter: (paramId: string) => void;
  onAddParameter: (param: Parameter, lab: Laboratory) => void;
  onReservationCreated: (newReservation: Reservation) => void;
  onViewReport: (code: string) => void;
  onNavigateToLocation?: (labId?: string) => void;
}

export const ReservationSystem: React.FC<ReservationSystemProps> = ({
  laboratories,
  selectedParameters,
  onRemoveParameter,
  onAddParameter,
  onReservationCreated,
  onViewReport,
  onNavigateToLocation
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [requesterName, setRequesterName] = useState('');
  const [requesterEmail, setRequesterEmail] = useState('');
  const [requesterPhone, setRequesterPhone] = useState('');
  const [requesterType, setRequesterType] = useState<Reservation['requesterType']>('Estudiante UNALM');
  const [facultyOrEntity, setFacultyOrEntity] = useState('Facultad de Ciencias / Dpto. Química');
  const [studentOrRucCode, setStudentOrRucCode] = useState('');
  const [projectOrThesisTitle, setProjectOrThesisTitle] = useState('');

  // Sample Specs State
  const [sampleCount, setSampleCount] = useState<number>(1);
  const [samplesList, setSamplesList] = useState<SampleItem[]>([
    {
      sampleId: 'M-01',
      sampleName: 'Muestra Punto 01',
      matrix: 'Agua',
      samplingPoint: 'Tributario Principal / Punto A',
      samplingDate: new Date().toISOString().split('T')[0],
      preservativeUsed: 'Refrigeración 4°C + HNO3 pH<2',
      selectedParameterIds: []
    }
  ]);
  const [requiresCustodyChain, setRequiresCustodyChain] = useState<boolean>(true);
  const [requiresCertifiedReport, setRequiresCertifiedReport] = useState<boolean>(true);
  const [notes, setNotes] = useState('');

  // Schedule State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [scheduledDate, setScheduledDate] = useState(defaultDateStr);
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState('Turno Mañana: 08:30 - 10:30 hrs');
  const [campusDeliveryBuilding, setCampusDeliveryBuilding] = useState('Pabellón de Investigaciones Ambientales - Nivel 2');

  // Confirmation State
  const [completedReservation, setCompletedReservation] = useState<Reservation | null>(null);

  // Sync samples count
  useEffect(() => {
    setSamplesList(prev => {
      const updated = [...prev];
      if (sampleCount > prev.length) {
        for (let i = prev.length + 1; i <= sampleCount; i++) {
          updated.push({
            sampleId: `M-0${i}`,
            sampleName: `Muestra Punto 0${i}`,
            matrix: selectedParameters[0]?.matrix || 'Agua',
            samplingPoint: `Punto de muestreo ${i}`,
            samplingDate: new Date().toISOString().split('T')[0],
            preservativeUsed: 'Refrigeración 4°C',
            selectedParameterIds: selectedParameters.map(p => p.id)
          });
        }
      } else if (sampleCount < prev.length) {
        return updated.slice(0, sampleCount);
      }
      return updated;
    });
  }, [sampleCount, selectedParameters]);

  // Pricing calculations
  const baseSubtotal = selectedParameters.reduce((acc, p) => acc + p.pricePEN, 0) * sampleCount;
  
  // Discount logic
  let discountPercentage = 0;
  if (requesterType === 'Tesista de Pregrado' || requesterType === 'Tesista de Posgrado') {
    discountPercentage = 35;
  } else if (requesterType === 'Estudiante UNALM') {
    discountPercentage = 30;
  } else if (requesterType === 'Docente / Investigador UNALM') {
    discountPercentage = 25;
  } else {
    discountPercentage = 0;
  }

  const discountAmount = (baseSubtotal * discountPercentage) / 100;
  const totalPEN = baseSubtotal - discountAmount;

  // Handle final submission
  const handleConfirmReservation = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = `UNALM-LAB-2025-${randomSuffix}`;

    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      code: generatedCode,
      createdAt: new Date().toLocaleString('es-PE'),
      laboratoryId: selectedParameters[0]?.category || 'lab-agua',
      laboratoryName: selectedParameters.length > 0 
        ? `${selectedParameters.length} Parámetros (${selectedParameters[0].matrix})`
        : 'Laboratorio de Servicios Ambientales UNALM',
      requesterName: requesterName.trim() || 'Investigador / Usuario UNALM',
      requesterEmail: requesterEmail.trim() || 'contacto@lamolina.edu.pe',
      requesterPhone: requesterPhone.trim() || '+51 (01) 614-7800',
      requesterType: requesterType || 'Estudiante UNALM',
      facultyOrEntity: facultyOrEntity || 'Facultad de Ciencias / Dpto. Química',
      studentOrRucCode: studentOrRucCode.trim() || 'DOC-UNALM-2025',
      projectOrThesisTitle: projectOrThesisTitle.trim() || 'Análisis Ambiental de Rutina',
      scheduledDate: scheduledDate || defaultDateStr,
      scheduledTimeSlot: scheduledTimeSlot || 'Turno Mañana: 08:30 - 10:30 hrs',
      sampleCount: sampleCount || 1,
      samples: samplesList.length > 0 ? samplesList : [{
        sampleId: 'M-01',
        sampleName: 'Muestra Principal 01',
        matrix: selectedParameters[0]?.matrix || 'Agua',
        samplingPoint: 'Punto de Muestreo 01',
        samplingDate: new Date().toISOString().split('T')[0],
        preservativeUsed: 'Refrigeración 4°C',
        selectedParameterIds: selectedParameters.map(p => p.id)
      }],
      subtotal: baseSubtotal,
      discountPercentage,
      discountAmount,
      totalPEN,
      status: 'Confirmada - Pendiente de Entrega',
      notes,
      requiresCustodyChain,
      requiresCertifiedReport
    };

    setCompletedReservation(newRes);
    onReservationCreated(newRes);
    setCurrentStep(5);

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const timeSlots = [
    'Turno Mañana A: 08:30 - 10:30 hrs',
    'Turno Mañana B: 10:30 - 12:30 hrs',
    'Turno Tarde: 14:00 - 16:00 hrs'
  ];

  const facultyOptions = [
    'Facultad de Ciencias / Dpto. Química',
    'Facultad de Ciencias / Dpto. Biología',
    'Facultad de Agronomía / Dpto. Suelos',
    'Facultad de Ciencias Forestales',
    'Facultad de Ingeniería Agrícola',
    'Facultad de Industrias Alimentarias',
    'Facultad de Zootecnia',
    'Facultad de Economía y Planificación',
    'Escuela de Posgrado UNALM (Maestría / Doctorado)',
    'Empresa Privada / Consultora Ambiental Externa',
    'Organismo Público (ANA, OEFA, SERFOR, MINAM)'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Wizard Step Indicator */}
      <div className="mb-8">
        <div className="relative max-w-3xl mx-auto px-2 sm:px-4">
          {/* Connector progress line behind steps */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-stone-200 -z-0 hidden sm:block rounded-full" />
          <div 
            className="absolute top-5 left-8 h-1 bg-emerald-800 transition-all duration-300 -z-0 hidden sm:block rounded-full"
            style={{ 
              width: currentStep === 1 ? '0%' : currentStep === 2 ? '25%' : currentStep === 3 ? '50%' : currentStep === 4 ? '75%' : '88%' 
            }}
          />

          <div className="relative z-10 flex items-center justify-between">
            {[
              { step: 1, label: '1. Ensayos', icon: FlaskConical },
              { step: 2, label: '2. Solicitante', icon: User },
              { step: 3, label: '3. Muestras', icon: FileText },
              { step: 4, label: '4. Agendamiento', icon: Clock },
              { step: 5, label: '5. Voucher', icon: CheckCircle2 }
            ].map((item) => {
              const Icon = item.icon;
              const isCompleted = currentStep > item.step || (item.step === 5 && !!completedReservation);
              const isCurrent = currentStep === item.step;
              return (
                <button
                  key={item.step}
                  type="button"
                  id={`wizard-step-tab-${item.step}`}
                  onClick={() => setCurrentStep(item.step as 1 | 2 | 3 | 4 | 5)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-hidden transition-transform duration-150 active:scale-95"
                  title={`Paso ${item.label} (Clic para abrir)`}
                >
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs font-bold transition-all transform group-hover:scale-110 shadow-xs ${
                      isCurrent
                        ? 'bg-amber-400 text-emerald-950 ring-4 ring-amber-200/90 shadow-md font-extrabold'
                        : isCompleted
                        ? 'bg-emerald-800 text-amber-300 group-hover:bg-emerald-700 shadow-xs'
                        : 'bg-white text-stone-600 border-2 border-stone-200 group-hover:border-emerald-600 group-hover:text-emerald-900 group-hover:bg-emerald-50'
                    }`}
                  >
                    {isCompleted && !isCurrent ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold mt-1.5 transition-colors text-center ${
                    isCurrent 
                      ? 'text-emerald-950 font-bold' 
                      : isCompleted
                      ? 'text-emerald-900 font-semibold group-hover:text-emerald-950'
                      : 'text-stone-500 group-hover:text-emerald-800'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Wizard Container */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        
        {/* Step 1: Select Parameters & Quick Cart */}
        {currentStep === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Paso 1 de 5</span>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                Selección de Ensayos y Parámetros a Analizar
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Seleccione los parámetros requeridos para sus muestras. Puede combinar análisis de varios laboratorios.
              </p>
            </div>

            {/* Selected Parameters Table */}
            <div>
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                Ensayos en su Orden ({selectedParameters.length})
              </h4>

              {selectedParameters.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 rounded-xl border-2 border-dashed border-stone-300">
                  <FlaskConical className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-stone-800">No ha seleccionado ningún parámetro todavía</p>
                  <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                    Puede agregar parámetros desde la lista inferior o desde el catálogo general de servicios.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden">
                  {selectedParameters.map((param) => (
                    <div key={param.id} className="p-3.5 sm:p-4 flex items-center justify-between bg-white hover:bg-stone-50 gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-800">
                            {param.code}
                          </span>
                          <span className="text-[11px] font-medium text-emerald-800">
                            {param.matrix}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-stone-900 truncate mt-0.5">{param.name}</h5>
                        <p className="text-xs text-stone-500 font-mono line-clamp-1">{param.methodology}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-xs text-stone-400 block">{param.turnaroundDays} d. hábiles</span>
                          <span className="text-sm font-bold text-emerald-950">S/ {param.pricePEN.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => onRemoveParameter(param.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Eliminar parámetro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Add Section from Laboratories */}
            <div className="pt-4 border-t border-stone-200">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Ensayos Recomendados y Más Solicitados
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {laboratories.flatMap(l => l.parameters.slice(0, 2)).map((param) => {
                  const isSelected = selectedParameters.some(p => p.id === param.id);
                  const parentLab = laboratories.find(l => l.parameters.some(p => p.id === param.id))!;
                  return (
                    <button
                      key={param.id}
                      onClick={() => {
                        if (!isSelected) onAddParameter(param, parentLab);
                      }}
                      disabled={isSelected}
                      className={`text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 ${
                        isSelected 
                          ? 'bg-emerald-50/50 border-emerald-300 text-emerald-900 opacity-80 cursor-default' 
                          : 'bg-white border-stone-200 hover:border-emerald-700 text-stone-800 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <span className="font-bold block text-stone-900 line-clamp-1">{param.name}</span>
                        <span className="text-stone-500 font-mono text-[10px]">{param.code} • S/ {param.pricePEN.toFixed(2)}</span>
                      </div>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subtotal preview & Action */}
            <div className="p-4 bg-emerald-950 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs text-emerald-300 block">Subtotal Referencial (1 Muestra):</span>
                <span className="text-xl font-bold text-amber-300">
                  S/ {selectedParameters.reduce((acc, p) => acc + p.pricePEN, 0).toFixed(2)}
                </span>
                <span className="text-[11px] text-stone-400 ml-2">
                  (Se aplicarán descuentos UNALM en el siguiente paso)
                </span>
              </div>

              <button
                id="wizard-step1-next-btn"
                disabled={selectedParameters.length === 0}
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:bg-stone-700 disabled:text-stone-400 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
              >
                <span>Continuar a Datos del Solicitante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Requester Details & UNALM Institutional Discount */}
        {currentStep === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Paso 2 de 5</span>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                Datos del Solicitante y Beneficio Institucional
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                La UNALM otorga tarifas subvencionadas para proyectos de tesis, prácticas pre-profesionales e investigación docente.
              </p>
            </div>

            {/* Requester Type Selection with Discounts */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Tipo de Solicitante y Subsidio Aplicable *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    type: 'Tesista de Pregrado' as const,
                    title: 'Tesista Pregrado UNALM',
                    discount: '35% Descuento',
                    desc: 'Tesis registrada en Dirección de Asuntos Académicos'
                  },
                  {
                    type: 'Tesista de Posgrado' as const,
                    title: 'Tesista Posgrado UNALM',
                    discount: '35% Descuento',
                    desc: 'Maestría o Doctorado de la Escuela de Posgrado'
                  },
                  {
                    type: 'Estudiante UNALM' as const,
                    title: 'Estudiante Pregrado',
                    discount: '30% Descuento',
                    desc: 'Cursos regulares o proyectos de semillero'
                  },
                  {
                    type: 'Docente / Investigador UNALM' as const,
                    title: 'Docente / Investigador UNALM',
                    discount: '25% Descuento',
                    desc: 'Proyectos VRI / Renacyt / Departamentos'
                  },
                  {
                    type: 'Empresa / Consultora' as const,
                    title: 'Empresa / Consultora Externa',
                    discount: 'Tarifa Estándar',
                    desc: 'Monitoreos ambientales y auditorías'
                  },
                  {
                    type: 'Público General' as const,
                    title: 'Investigador Externo / ONG',
                    discount: 'Tarifa Estándar',
                    desc: 'Universidades públicas y privadas'
                  }
                ].map((item) => {
                  const isSelected = requesterType === item.type;
                  return (
                    <div
                      key={item.type}
                      onClick={() => setRequesterType(item.type)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-950 text-white border-emerald-950 shadow-md ring-2 ring-amber-400/40'
                          : 'bg-white border-stone-200 hover:border-emerald-700 text-stone-800 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.discount}
                        </span>
                      </div>
                      <p className={`text-[11px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Input Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nombre Completo / Razón Social *
                </label>
                <input
                  id="requester-name-input"
                  type="text"
                  required
                  placeholder="Ej. Ing. Juan Carlos Morales Peña"
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs sm:text-sm focus:border-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Correo Institucional o de Contacto *
                </label>
                <input
                  id="requester-email-input"
                  type="email"
                  required
                  placeholder="ejemplo@lamolina.edu.pe"
                  value={requesterEmail}
                  onChange={(e) => setRequesterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs sm:text-sm focus:border-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Teléfono Celular / WhatsApp *
                </label>
                <input
                  id="requester-phone-input"
                  type="tel"
                  required
                  placeholder="+51 999 888 777"
                  value={requesterPhone}
                  onChange={(e) => setRequesterPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs sm:text-sm focus:border-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Código de Alumno UNALM / DNI / RUC *
                </label>
                <input
                  id="requester-code-input"
                  type="text"
                  required
                  placeholder="Ej. 20210452 o DNI 45892104"
                  value={studentOrRucCode}
                  onChange={(e) => setStudentOrRucCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs sm:text-sm focus:border-emerald-700 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Facultad UNALM o Entidad Solicitante *
                </label>
                <select
                  value={facultyOrEntity}
                  onChange={(e) => setFacultyOrEntity(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs sm:text-sm bg-white focus:border-emerald-700 focus:outline-hidden"
                >
                  {facultyOptions.map((fac) => (
                    <option key={fac} value={fac}>{fac}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Título del Proyecto, Tesis o Motivo del Ensayo (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Evaluación de metales pesados en sedimentos de la cuenca del río Chillón"
                  value={projectOrThesisTitle}
                  onChange={(e) => setProjectOrThesisTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs sm:text-sm focus:border-emerald-700 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 px-4 py-2 text-stone-700 hover:bg-stone-100 rounded-lg text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver a Ensayos</span>
              </button>

              <button
                id="wizard-step2-next-btn"
                disabled={!requesterName || !requesterEmail || !requesterPhone || !studentOrRucCode}
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 disabled:text-stone-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
              >
                <span>Continuar a Detalle de Muestras</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Sample Specification & Matrices */}
        {currentStep === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Paso 3 de 5</span>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                Especificación de Muestras y Matriz Ambiental
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Indique la cantidad de muestras y los puntos de procedencia para asegurar la trazabilidad analítica.
              </p>
            </div>

            {/* Sample Count Selector */}
            <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <label className="text-xs font-bold text-stone-900 block">Número de Muestras a Ingresar:</label>
                <span className="text-[11px] text-stone-500">Cada muestra se analizará con los parámetros seleccionados</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setSampleCount(Math.max(1, sampleCount - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100"
                >
                  -
                </button>
                <span className="text-base font-bold text-emerald-950 w-8 text-center">{sampleCount}</span>
                <button
                  onClick={() => setSampleCount(Math.min(20, sampleCount + 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Individual Sample Row Editor */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {samplesList.map((sample, idx) => (
                <div key={sample.sampleId} className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-500" />
                      Muestra #{idx + 1} ({sample.sampleId})
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Matriz: {selectedParameters[0]?.matrix || 'Agua'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={sample.samplingPoint}
                      onChange={(e) => {
                        const updated = [...samplesList];
                        updated[idx].samplingPoint = e.target.value;
                        setSamplesList(updated);
                      }}
                      placeholder="Punto o Lugar de Muestreo (ej. Estación E-01)"
                      className="px-3 py-1.5 border border-stone-300 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={sample.preservativeUsed}
                      onChange={(e) => {
                        const updated = [...samplesList];
                        updated[idx].preservativeUsed = e.target.value;
                        setSamplesList(updated);
                      }}
                      placeholder="Preservante usado (ej. Refrigerado 4°C)"
                      className="px-3 py-1.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Toggles */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 p-3 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                <input
                  type="checkbox"
                  checked={requiresCustodyChain}
                  onChange={(e) => setRequiresCustodyChain(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-700"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Requiere Formato F-CC Oficial de Cadena de Custodia UNALM
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Garantiza trazabilidad metrológica y validez para auditorías ambientales u OEFA.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                <input
                  type="checkbox"
                  checked={requiresCertifiedReport}
                  onChange={(e) => setRequiresCertifiedReport(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-700"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Emisión de Informe de Ensayo Oficial con Acreditación INACAL y Firma Digital
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Incluye QR de verificación en línea y comparación automática con ECAs MINAM.
                  </span>
                </div>
              </label>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 px-4 py-2 text-stone-700 hover:bg-stone-100 rounded-lg text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <button
                id="wizard-step3-next-btn"
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
              >
                <span>Continuar a Fecha y Turno en Campus</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Schedule delivery slot at UNALM Campus */}
        {currentStep === 4 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Paso 4 de 5</span>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                Agendamiento de Turno de Entrega en Campus La Molina
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Seleccione la fecha y franja horaria en la que entregará físicamente las muestras en el módulo de recepción.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date & Slot Picker */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Fecha de Entrega de Muestras *
                  </label>
                  <input
                    id="schedule-date-input"
                    type="date"
                    min={defaultDateStr}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs sm:text-sm focus:border-emerald-700 focus:outline-hidden"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Horario de atención de lunes a viernes (días laborables UNALM).
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Franja Horaria / Turno de Recepción *
                  </label>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => {
                      const isSelected = scheduledTimeSlot === slot;
                      return (
                        <div
                          key={slot}
                          onClick={() => setScheduledTimeSlot(slot)}
                          className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-emerald-900 text-white border-emerald-900 font-bold'
                              : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-stone-400'}`} />
                            <span>{slot}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Punto de Entrega en Campus UNALM
                  </label>
                  <select
                    value={campusDeliveryBuilding}
                    onChange={(e) => setCampusDeliveryBuilding(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-xs sm:text-sm bg-white"
                  >
                    <option value="Pabellón de Investigaciones Ambientales - Nivel 2">Pabellón de Investigaciones Ambientales (LCAE / Química)</option>
                    <option value="Edificio de Ciencias del Suelo - Dpto. Suelos UNALM">Edificio de Ciencias del Suelo (LASAP)</option>
                    <option value="Pabellón Forestal - Calidad de Aire y SIG">Pabellón Forestal (Aire y SIG)</option>
                    <option value="Módulo de Bioensayos - Ciencias Biológicas">Módulo de Bioensayos (LEBA Biología)</option>
                  </select>
                </div>
              </div>

              {/* Order Summary & Pricing Breakdown Card */}
              <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Resumen de Liquidación Económica
                  </h4>

                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span>Solicitante:</span>
                      <span className="font-semibold text-stone-900">{requesterName || 'No indicado'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span>Categoría:</span>
                      <span className="font-semibold text-emerald-900">{requesterType}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span>N° de Ensayos / Parámetros:</span>
                      <span className="font-semibold">{selectedParameters.length} parámetros</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span>N° de Muestras:</span>
                      <span className="font-semibold">{sampleCount} muestras</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span>Subtotal Tarifa Normal:</span>
                      <span>S/ {baseSubtotal.toFixed(2)}</span>
                    </div>
                    {discountPercentage > 0 && (
                      <div className="flex justify-between py-1 border-b border-stone-200 text-emerald-700 font-bold">
                        <span>Subsidio Institucional UNALM ({discountPercentage}%):</span>
                        <span>- S/ {discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t-2 border-stone-300">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-xs font-bold text-stone-900 uppercase">Total a Liquidar:</span>
                    <span className="text-2xl font-extrabold text-emerald-950">
                      S/ {totalPEN.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    * El pago se efectúa en Caja Central UNALM o vía Banco de Crédito del Perú (BCP) previa recepción de la muestra.
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation & Final Submit Button */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1.5 px-4 py-2 text-stone-700 hover:bg-stone-100 rounded-lg text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <button
                id="wizard-confirm-reservation-btn"
                onClick={handleConfirmReservation}
                className="flex items-center gap-2 px-7 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm rounded-xl shadow-md transition-all hover:scale-102"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-950" />
                <span>Generar Reserva y Orden de Servicio</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Official Voucher or Draft Preview */}
        {currentStep === 5 && (
          completedReservation ? (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header Voucher */}
              <div className="text-center space-y-2 bg-emerald-950 text-white p-6 rounded-2xl relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                  ¡Reserva Generada con Éxito!
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Código de Orden: {completedReservation.code}
                </h3>
                <p className="text-xs text-emerald-200 max-w-lg mx-auto">
                  Presente este comprobante digital o impreso al momento de ingresar con sus muestras al Campus Universitario UNALM.
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 bg-stone-50/50 space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-stone-200 gap-3">
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">
                      ORDEN DE SERVICIO Y RECEPCIÓN DE MUESTRAS AMBIENTALES
                    </h4>
                    <p className="text-xs text-stone-500">
                      Universidad Nacional Agraria La Molina • Sistema de Laboratorios Acreditados
                    </p>
                  </div>
                  <div className="text-right font-mono text-xs bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
                    <span className="text-stone-400 block text-[10px]">FECHA REGISTRO:</span>
                    <span className="font-bold text-stone-800">{completedReservation.createdAt}</span>
                  </div>
                </div>

                {/* Voucher Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[11px]">SOLICITANTE:</span>
                    <span className="font-bold text-stone-900">{completedReservation.requesterName}</span>
                    <span className="text-stone-500 block">{completedReservation.requesterType}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[11px]">FACULTAD / ENTIDAD:</span>
                    <span className="font-bold text-stone-900">{completedReservation.facultyOrEntity}</span>
                    <span className="text-stone-500 block">Doc: {completedReservation.studentOrRucCode}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[11px]">TURNO AGENDADO:</span>
                    <span className="font-bold text-emerald-900">{completedReservation.scheduledDate}</span>
                    <span className="text-stone-600 block">{completedReservation.scheduledTimeSlot}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[11px]">MUESTRAS / MATRIZ:</span>
                    <span className="font-bold text-stone-900">{completedReservation.sampleCount} Muestras</span>
                    <span className="text-stone-500 block">{completedReservation.samples[0]?.matrix || 'Ambiental'}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[11px]">LUGAR DE RECEPCIÓN:</span>
                    <span className="font-bold text-stone-900">{campusDeliveryBuilding}</span>
                    <span className="text-stone-500 block">Campus La Molina, Lima</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[11px]">MONTO TOTAL LIQUIDADO:</span>
                    <span className="text-base font-extrabold text-emerald-950">
                      S/ {completedReservation.totalPEN.toFixed(2)}
                    </span>
                    {completedReservation.discountPercentage > 0 && (
                      <span className="text-[10px] text-emerald-700 font-bold block">
                        (Incluye {completedReservation.discountPercentage}% dcto institucional)
                      </span>
                    )}
                  </div>
                </div>

                {/* Simulated Barcode & Security Stamp */}
                <div className="p-4 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-stone-900 text-white rounded-lg flex items-center justify-center p-2">
                      <QrCode className="w-full h-full text-amber-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-mono block">Control Metrológico Digital</span>
                      <span className="font-mono text-xs font-bold text-stone-900">{completedReservation.code}</span>
                      <p className="text-[10px] text-emerald-700">Trazabilidad garantizada bajo ISO/IEC 17025</p>
                    </div>
                  </div>

                  {/* Simulated Barcode Pattern */}
                  <div className="flex flex-col items-center">
                    <div className="h-9 w-48 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_4px,#000_4px,#000_7px,transparent_7px,transparent_9px)]"></div>
                    <span className="text-[9px] font-mono text-stone-500 mt-0.5 tracking-widest">{completedReservation.code}</span>
                  </div>
                </div>

                {/* Delivery Instructions Reminder */}
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Instrucciones para la entrega de muestras en el campus:</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-0.5 pl-1">
                    <li>Transportar las muestras en cooler térmico con ice-packs a 4°C ± 2°C.</li>
                    <li>Asegurar que los frascos cuenten con rotulado indeleble con el código de reserva.</li>
                    <li>Llevar carnet universitario o documento de identidad para ingresar por Puerta Principal (Av. La Molina).</li>
                  </ul>
                </div>
              </div>

              {/* Actions for Voucher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl border border-stone-300 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-stone-600" />
                    <span>Imprimir Comprobante</span>
                  </button>

                  {onNavigateToLocation && (
                    <button
                      id="btn-voucher-view-campus-map"
                      onClick={() => onNavigateToLocation(completedReservation.laboratoryId)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 text-emerald-950" />
                      <span>Ver Ruta y Ventanilla en el Mapa</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setCompletedReservation(null);
                    }}
                    className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Nueva Reserva</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Draft Voucher Preview Mode */
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Paso 5 de 5</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Pre-visualización de Orden de Servicio y Emisión de Voucher
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Revise los datos de su solicitud. Puede confirmar la orden para generar su código oficial y comprobante con QR.
                  </p>
                </div>
                <span className="self-start sm:self-center px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
                  Borrador Previo
                </span>
              </div>

              {/* Draft Notice if fields are missing */}
              {(!requesterName.trim() || selectedParameters.length === 0) && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block">Datos pendientes de completar:</span>
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      {selectedParameters.length === 0 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="px-2 py-1 bg-white rounded border border-amber-300 text-amber-800 font-semibold hover:bg-amber-100 cursor-pointer"
                        >
                          → Seleccionar Ensayos (Paso 1)
                        </button>
                      )}
                      {!requesterName.trim() && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="px-2 py-1 bg-white rounded border border-amber-300 text-amber-800 font-semibold hover:bg-amber-100 cursor-pointer"
                        >
                          → Ingresar Datos del Solicitante (Paso 2)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Draft Voucher Preview Card */}
              <div className="border-2 border-dashed border-amber-300/80 rounded-2xl p-6 bg-gradient-to-br from-amber-50/20 via-white to-stone-50 space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-stone-200 gap-2">
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                      <span>ORDEN DE SERVICIO Y RECEPCIÓN DE MUESTRAS</span>
                      <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-mono font-normal">BORRADOR</span>
                    </h4>
                    <p className="text-xs text-stone-500">
                      Universidad Nacional Agraria La Molina • Sistema Integrado de Laboratorios
                    </p>
                  </div>
                  <div className="text-right font-mono text-xs bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                    <span className="text-stone-400 block text-[10px]">CÓDIGO PRELIMINAR:</span>
                    <span className="font-bold text-amber-700">UNALM-LAB-PREVIA</span>
                  </div>
                </div>

                {/* Details 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-stone-400 text-[10px] font-bold uppercase">1. Solicitante</span>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(2)}
                        className="text-[10px] text-emerald-800 hover:underline font-semibold cursor-pointer"
                      >
                        Editar
                      </button>
                    </div>
                    <span className="font-bold text-stone-900 block truncate">
                      {requesterName.trim() || 'No especificado aún'}
                    </span>
                    <span className="text-stone-500 text-[11px] block">{requesterType}</span>
                    <span className="text-stone-400 text-[10px] block mt-1 truncate">{facultyOrEntity}</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-stone-400 text-[10px] font-bold uppercase">2. Ensayos</span>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(1)}
                        className="text-[10px] text-emerald-800 hover:underline font-semibold cursor-pointer"
                      >
                        Editar
                      </button>
                    </div>
                    <span className="font-bold text-stone-900 block">
                      {selectedParameters.length} Parámetro(s)
                    </span>
                    <span className="text-stone-500 text-[11px] block">
                      Matriz: {selectedParameters[0]?.matrix || 'Ambiental'}
                    </span>
                    <span className="text-stone-400 text-[10px] block mt-1">
                      Tarifa: S/ {baseSubtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-stone-400 text-[10px] font-bold uppercase">3. Muestras</span>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(3)}
                        className="text-[10px] text-emerald-800 hover:underline font-semibold cursor-pointer"
                      >
                        Editar
                      </button>
                    </div>
                    <span className="font-bold text-stone-900 block">
                      {sampleCount} Muestra(s)
                    </span>
                    <span className="text-stone-500 text-[11px] block">
                      {requiresCustodyChain ? 'Con Cadena Custodia' : 'Estándar'}
                    </span>
                    <span className="text-stone-400 text-[10px] block mt-1">
                      {requiresCertifiedReport ? 'Informe Certificado' : 'Informe Interno'}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-stone-400 text-[10px] font-bold uppercase">4. Agendamiento</span>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(4)}
                        className="text-[10px] text-emerald-800 hover:underline font-semibold cursor-pointer"
                      >
                        Editar
                      </button>
                    </div>
                    <span className="font-bold text-stone-900 block">
                      {scheduledDate}
                    </span>
                    <span className="text-stone-500 text-[11px] block truncate">
                      {scheduledTimeSlot.split(':')[0]}
                    </span>
                    <span className="text-stone-400 text-[10px] block mt-1">
                      Campus UNALM
                    </span>
                  </div>
                </div>

                {/* Selected Parameters Detail List */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="text-xs font-bold text-stone-800">Detalle de Ensayos Solicitados:</span>
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-emerald-800 font-bold hover:underline cursor-pointer"
                    >
                      + Agregar o quitar ensayos
                    </button>
                  </div>
                  {selectedParameters.length === 0 ? (
                    <p className="text-xs text-stone-400 italic py-2">Ningún ensayo seleccionado aún. Vaya al Paso 1 para elegir sus análisis.</p>
                  ) : (
                    <div className="divide-y divide-stone-100 max-h-40 overflow-y-auto">
                      {selectedParameters.map((param) => (
                        <div key={param.id} className="py-2 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-stone-800">{param.name}</span>
                            <span className="text-stone-400 text-[11px] ml-2 font-mono">[{param.code}]</span>
                          </div>
                          <span className="font-mono font-semibold text-stone-700">
                            S/ {param.pricePEN.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="bg-stone-100/80 p-4 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal Referencial ({sampleCount} muestra{sampleCount > 1 ? 's' : ''}):</span>
                    <span>S/ {baseSubtotal.toFixed(2)}</span>
                  </div>
                  {discountPercentage > 0 && (
                    <div className="flex justify-between text-emerald-800 font-semibold">
                      <span>Subsidio Institucional UNALM ({discountPercentage}% - {requesterType}):</span>
                      <span>- S/ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                    <span className="font-bold text-stone-900 uppercase">Monto Total a Liquidar:</span>
                    <span className="text-xl font-extrabold text-emerald-950">
                      S/ {totalPEN.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation & Confirmation Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-stone-700 hover:bg-stone-100 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Volver a Agendamiento (Paso 4)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1.5 px-3 py-2 text-stone-500 hover:text-stone-800 text-xs cursor-pointer"
                  >
                    <span>Ir al Paso 1</span>
                  </button>
                </div>

                <button
                  type="button"
                  id="btn-confirm-draft-voucher"
                  onClick={handleConfirmReservation}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm rounded-xl shadow-md transition-all hover:scale-102 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-950" />
                  <span>Confirmar y Emitir Voucher Oficial</span>
                </button>
              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
};
