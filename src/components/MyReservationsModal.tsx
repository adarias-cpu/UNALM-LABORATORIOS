import React from 'react';
import { Reservation } from '../types';
import { 
  BookmarkCheck, 
  X, 
  Clock, 
  Calendar, 
  MapPin, 
  Tag, 
  FileCheck2, 
  Printer, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onConsultReport: (code: string) => void;
  onNavigateToLocation?: (labId?: string) => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onConsultReport,
  onNavigateToLocation
}) => {
  if (!isOpen) return null;

  const getStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'Confirmada - Pendiente de Entrega':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">Pendiente de Entrega</span>;
      case 'Muestra Recibida en Campus':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-300">Muestra Recibida</span>;
      case 'En Análisis':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">En Análisis</span>;
      case 'Informe Emitido':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">Informe Emitido</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-amber-400 flex items-center justify-center border border-emerald-700/60">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Mis Reservas y Órdenes de Servicio
              </h3>
              <p className="text-xs text-emerald-300">
                Historial de solicitudes registradas en la Red de Laboratorios UNALM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
          {reservations.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <BookmarkCheck className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="font-bold text-stone-800">No tiene reservas activas en este dispositivo</p>
              <p className="text-xs text-stone-500">
                Al generar una nueva reserva en el formulario, aparecerá automáticamente registrada aquí.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-emerald-700/50 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-xs bg-emerald-950 text-amber-300 px-2 py-0.5 rounded">
                          {res.code}
                        </span>
                        {getStatusBadge(res.status)}
                      </div>
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                        {res.laboratoryName}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Solicitante: {res.requesterName} • {res.requesterType}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-stone-400 block">Total Liquidado</span>
                      <span className="text-sm sm:text-base font-extrabold text-emerald-950">
                        S/ {res.totalPEN.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Meta Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200/80">
                    <div>
                      <span className="text-stone-400 block">Fecha de Turno:</span>
                      <span className="font-medium text-stone-900">{res.scheduledDate}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Horario:</span>
                      <span className="font-medium text-stone-900 truncate">{res.scheduledTimeSlot}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-stone-400 block">Muestras:</span>
                      <span className="font-medium text-stone-900">{res.sampleCount} muestra(s)</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="text-stone-600 hover:text-stone-900 text-xs flex items-center gap-1 font-medium"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Imprimir</span>
                      </button>

                      {onNavigateToLocation && (
                        <button
                          onClick={() => {
                            onClose();
                            onNavigateToLocation(res.laboratoryId);
                          }}
                          className="text-emerald-800 hover:text-emerald-950 text-xs flex items-center gap-1 font-semibold underline decoration-emerald-500/50"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Ver en Mapa</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onConsultReport(res.code);
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>Ver Informe o Estado</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
