import { Parameter, Laboratory } from '../types';

export interface QuotationData {
  quotationCode: string;
  requesterCategory: string;
  sampleCount: number;
  selectedParams: Parameter[];
  subtotalTotal: number;
  discountRate: number;
  discountVal: number;
  netTotal: number;
  emissionDate: string;
  validUntilDate: string;
  clientName?: string;
  clientDocument?: string;
}

export function generateQuotationCode(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `COT-2026-UNALM-${randomNum}`;
}

export function generateQuotationHtml(data: QuotationData, laboratories: Laboratory[]): string {
  const labMap = new Map<string, string>();
  laboratories.forEach(l => {
    l.parameters.forEach(p => {
      labMap.set(p.id, l.shortName);
    });
  });

  const formattedEmissionDate = data.emissionDate || new Date().toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const validDate = new Date();
  validDate.setDate(validDate.getDate() + 30);
  const formattedValidUntil = data.validUntilDate || validDate.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const rows = data.selectedParams.map((param, index) => {
    const labName = labMap.get(param.id) || 'Lab. Ambiental';
    const rowTotal = param.pricePEN * data.sampleCount;
    const accreditedBadge = param.accreditedINACAL 
      ? '<span style="color: #15803d; font-weight: bold; font-size: 10px; background: #dcfce7; padding: 2px 6px; border-radius: 4px; border: 1px solid #86efac;">INACAL ISO/IEC 17025</span>' 
      : '<span style="color: #78716c; font-size: 10px;">Estandarizado</span>';

    return `
      <tr style="border-bottom: 1px solid #e7e5e4;">
        <td style="padding: 9px 8px; text-align: center; color: #78716c; font-size: 11px;">${index + 1}</td>
        <td style="padding: 9px 8px; font-family: monospace; font-size: 11px; color: #44403c; font-weight: 600;">${param.code}</td>
        <td style="padding: 9px 8px;">
          <div style="font-weight: 700; color: #1c1917; font-size: 12px;">${param.name}</div>
          <div style="color: #78716c; font-size: 11px; margin-top: 2px;">${param.methodology}</div>
        </td>
        <td style="padding: 9px 8px; font-size: 11px; color: #44403c;">${param.matrix}</td>
        <td style="padding: 9px 8px; font-size: 11px; color: #44403c;">${labName}</td>
        <td style="padding: 9px 8px; text-align: center;">${accreditedBadge}</td>
        <td style="padding: 9px 8px; text-align: center; font-weight: 600; font-size: 12px;">${data.sampleCount}</td>
        <td style="padding: 9px 8px; text-align: right; font-size: 12px; font-family: monospace;">S/ ${param.pricePEN.toFixed(2)}</td>
        <td style="padding: 9px 8px; text-align: right; font-weight: 700; font-size: 12px; color: #14532d; font-family: monospace;">S/ ${rowTotal.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Cotización Oficial - ${data.quotationCode} - UNALM</title>
  <style>
    @page {
      size: A4;
      margin: 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1c1917;
      background: #ffffff;
      margin: 0;
      padding: 24px;
      font-size: 12px;
      line-height: 1.4;
    }
    .header-bar {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2px solid #166534;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    .univ-title {
      font-size: 16px;
      font-weight: 800;
      color: #14532d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 2px 0;
    }
    .univ-subtitle {
      font-size: 12px;
      font-weight: 600;
      color: #44403c;
      margin: 0 0 2px 0;
    }
    .univ-dept {
      font-size: 11px;
      color: #78716c;
      margin: 0;
    }
    .proforma-box {
      background: #f0fdf4;
      border: 2px solid #16a34a;
      border-radius: 8px;
      padding: 10px 16px;
      text-align: right;
    }
    .proforma-title {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      color: #166534;
      letter-spacing: 1px;
      margin: 0;
    }
    .proforma-code {
      font-family: monospace;
      font-size: 15px;
      font-weight: 900;
      color: #14532d;
      margin: 4px 0;
    }
    .proforma-date {
      font-size: 10px;
      color: #57534e;
      margin: 0;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
      background: #fafaf9;
      border: 1px solid #e7e5e4;
      border-radius: 8px;
      padding: 14px;
      margin-bottom: 20px;
    }
    .info-item {
      margin-bottom: 6px;
    }
    .info-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #78716c;
    }
    .info-value {
      font-size: 12px;
      font-weight: 600;
      color: #1c1917;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th {
      background: #14532d;
      color: #ffffff;
      padding: 10px 8px;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 700;
      text-align: left;
    }
    .summary-container {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
    }
    .summary-card {
      width: 320px;
      background: #fafaf9;
      border: 1px solid #d6d3d1;
      border-radius: 8px;
      padding: 14px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      font-size: 12px;
      color: #44403c;
    }
    .summary-row.discount {
      color: #b45309;
      font-weight: 600;
    }
    .summary-row.total {
      border-top: 2px solid #166534;
      margin-top: 8px;
      padding-top: 8px;
      font-size: 15px;
      font-weight: 900;
      color: #14532d;
    }
    .terms-box {
      border: 1px dashed #a8a29e;
      background: #fdfbf7;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 24px;
      font-size: 10.5px;
      color: #57534e;
    }
    .terms-box h4 {
      margin: 0 0 6px 0;
      font-size: 11px;
      font-weight: 700;
      color: #292524;
      text-transform: uppercase;
    }
    .terms-box ul {
      margin: 0;
      padding-left: 18px;
    }
    .terms-box li {
      margin-bottom: 3px;
    }
    .footer-signatures {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e7e5e4;
    }
    .seal-box {
      text-align: center;
      width: 240px;
    }
    .seal-line {
      border-bottom: 1px solid #44403c;
      height: 45px;
      margin-bottom: 6px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      font-style: italic;
      color: #166534;
      font-weight: 600;
    }
    .print-actions-toolbar {
      position: sticky;
      top: 0;
      background: #14532d;
      color: white;
      padding: 12px 20px;
      margin: -24px -24px 24px -24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .btn-print {
      background: #fbbf24;
      color: #1c1917;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-weight: 800;
      cursor: pointer;
      font-size: 12px;
    }
    .btn-print:hover {
      background: #f59e0b;
    }
    @media print {
      .print-actions-toolbar {
        display: none !important;
      }
      body {
        padding: 0 !important;
      }
    }
  </style>
</head>
<body>

  <!-- Screen-only toolbar for direct print and close -->
  <div class="print-actions-toolbar">
    <div style="font-weight: 700; font-size: 13px;">
      🌿 Universidad Nacional Agraria La Molina • Cotización Oficial
    </div>
    <div style="display: flex; gap: 10px; align-items: center;">
      <button class="btn-print" onclick="window.print()">
        🖨️ IMPRIMIR / GUARDAR COMO PDF
      </button>
      <button style="background: transparent; color: #ffffff; border: 1px solid #86efac; padding: 7px 14px; border-radius: 6px; cursor: pointer; font-size: 11px;" onclick="window.close()">
        Cerrar Ventana
      </button>
    </div>
  </div>

  <!-- Official UNALM Header -->
  <div class="header-bar">
    <div>
      <h1 class="univ-title">UNIVERSIDAD NACIONAL AGRARIA LA MOLINA</h1>
      <h2 class="univ-subtitle">Vicerrectorado de Investigación • Red de Laboratorios Ambientales</h2>
      <p class="univ-dept">Av. La Molina s/n, La Molina, Lima - Perú • R.U.C. 20147820120</p>
      <p class="univ-dept">Email: laboratorios.ambientales@lamolina.edu.pe • Tel: (01) 614-7800 Anx. 1830</p>
    </div>
    <div class="proforma-box">
      <div class="proforma-title">Proforma de Cotización</div>
      <div class="proforma-code">${data.quotationCode}</div>
      <div class="proforma-date">Emisión: ${formattedEmissionDate}</div>
      <div class="proforma-date" style="color: #b45309; font-weight: 600;">Válido hasta: ${formattedValidUntil}</div>
    </div>
  </div>

  <!-- Information summary grid -->
  <div class="info-grid">
    <div>
      <div class="info-item">
        <span class="info-label">Categoría de Solicitante:</span>
        <div class="info-value">${data.requesterCategory}</div>
      </div>
      <div class="info-item">
        <span class="info-label">Régimen Tarifario Aplicado:</span>
        <div class="info-value" style="color: #15803d;">
          ${data.discountRate > 0 ? `Descuento Institucional del ${(data.discountRate * 100).toFixed(0)}% Aplicado` : 'Tarifa Regular General'}
        </div>
      </div>
      <div class="info-item">
        <span class="info-label">Atención y Ventanilla:</span>
        <div class="info-value">Red Integrada de Laboratorios Ambientales UNALM (Campus Universitario)</div>
      </div>
    </div>
    <div>
      <div class="info-item">
        <span class="info-label">Cantidad de Muestras:</span>
        <div class="info-value" style="font-size: 14px; font-weight: 800; color: #14532d;">${data.sampleCount} ${data.sampleCount === 1 ? 'muestra' : 'muestras'}</div>
      </div>
      <div class="info-item">
        <span class="info-label">Determinaciones Totales:</span>
        <div class="info-value">${data.selectedParams.length * data.sampleCount} ensayos analíticos</div>
      </div>
      <div class="info-item">
        <span class="info-label">Tiempo de Entrega:</span>
        <div class="info-value">5 a 8 días hábiles</div>
      </div>
    </div>
  </div>

  <!-- Parameters Table -->
  <table>
    <thead>
      <tr>
        <th style="width: 30px; text-align: center;">Item</th>
        <th style="width: 85px;">Código</th>
        <th>Parámetro / Ensayo Solicitado</th>
        <th style="width: 105px;">Matriz</th>
        <th style="width: 100px;">Laboratorio</th>
        <th style="width: 95px; text-align: center;">Acreditación</th>
        <th style="width: 55px; text-align: center;">Cant.</th>
        <th style="width: 80px; text-align: right;">P. Unit.</th>
        <th style="width: 90px; text-align: right;">Total S/</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <!-- Financial Summary Box -->
  <div class="summary-container">
    <div class="summary-card">
      <div class="summary-row">
        <span>Subtotal Bruto (${data.selectedParams.length} parámetros x ${data.sampleCount} m.):</span>
        <span style="font-family: monospace;">S/ ${data.subtotalTotal.toFixed(2)}</span>
      </div>
      ${data.discountRate > 0 ? `
      <div class="summary-row discount">
        <span>Descuento (${(data.discountRate * 100).toFixed(0)}%):</span>
        <span style="font-family: monospace;">- S/ ${data.discountVal.toFixed(2)}</span>
      </div>
      ` : ''}
      <div class="summary-row total">
        <span>TOTAL ESTIMADO (PEN):</span>
        <span style="font-family: monospace; color: #15803d;">S/ ${data.netTotal.toFixed(2)}</span>
      </div>
      <div style="font-size: 10px; color: #78716c; text-align: right; margin-top: 4px;">
        * Montos expresados en Soles (PEN). Incluye I.G.V.
      </div>
    </div>
  </div>

  <!-- Terms & Conditions Box -->
  <div class="terms-box">
    <h4>Condiciones del Servicio Analítico y Recepción de Muestras</h4>
    <ul>
      <li><strong>Vigencia de la Proforma:</strong> Esta cotización mantiene su validez por 30 días calendario contados a partir de su fecha de emisión.</li>
      <li><strong>Recepción de Muestras:</strong> Deberán entregarse en la ventanilla del laboratorio correspondiente (Lunes a Viernes de 08:30 a 13:00 hrs) acompañadas de su respectiva Hoja de Cadena de Custodia rotulada de forma indeleble.</li>
      <li><strong>Conservación Térmica:</strong> Muestras que requieran preservación deben transportarse en cooler hermético con ice-packs a 4°C ± 2°C según protocolo de bioseguridad UNALM.</li>
      <li><strong>Forma de Pago:</strong> En Caja Central UNALM (Campus Universitario) o mediante depósito/transferencia a la Cta. Cte. Banco de la Nación N° 00-000-847291 (CCI 018-000-000000847291-07). Adjuntar comprobante al entregar muestras.</li>
      <li><strong>Acreditación:</strong> Los ensayos identificados como acreditados se realizan bajo el Sistema de Gestión de Calidad NTP-ISO/IEC 17025:2017 reconocido por INACAL.</li>
    </ul>
  </div>

  <!-- Official Footer & Digital Seal -->
  <div class="footer-signatures">
    <div>
      <div style="font-size: 10px; color: #78716c;">Documento generado automáticamente por el Portal de la Red de Laboratorios Ambientales UNALM.</div>
      <div style="font-size: 9.5px; color: #a8a29e; margin-top: 2px;">Código de Verificación Digital: UNALM-LAB-${Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
    </div>
    <div class="seal-box">
      <div class="seal-line">
        Coordinación General UNALM
      </div>
      <div style="font-size: 11px; font-weight: 700; color: #1c1917;">Red de Laboratorios Ambientales</div>
      <div style="font-size: 10px; color: #78716c;">Universidad Nacional Agraria La Molina</div>
    </div>
  </div>

</body>
</html>`;
}

/**
 * Triggers print via a hidden iframe (reliable inside single-page applications)
 */
export function printQuotationViaIframe(html: string): boolean {
  try {
    const existingIframe = document.getElementById('print-quotation-iframe');
    if (existingIframe && existingIframe.parentNode) {
      existingIframe.parentNode.removeChild(existingIframe);
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'print-quotation-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (printErr) {
          console.warn('Iframe print error fallback to window.print:', printErr);
          window.print();
        }
      }, 350);
      return true;
    }
  } catch (err) {
    console.warn('Iframe setup error:', err);
  }
  return false;
}

/**
 * Downloads the quotation HTML file for offline viewing or instant printing
 */
export function downloadQuotationHtml(html: string, quotationCode: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Cotizacion_${quotationCode}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Opens the quotation in a new browser tab/window where print is never blocked
 */
export function openQuotationInNewTab(html: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

/**
 * Copies a structured text summary of the quotation to the clipboard
 */
export async function copyQuotationToClipboard(data: QuotationData): Promise<boolean> {
  const text = `========================================================
UNIVERSIDAD NACIONAL AGRARIA LA MOLINA - UNALM
RED DE LABORATORIOS AMBIENTALES
COTIZACIÓN OFICIAL: ${data.quotationCode}
Fecha: ${data.emissionDate || new Date().toLocaleDateString('es-PE')}
========================================================
Categoría: ${data.requesterCategory}
Cantidad de Muestras: ${data.sampleCount}
Total Ensayos: ${data.selectedParams.length * data.sampleCount} determinaciones

PARÁMETROS COTIZADOS:
${data.selectedParams.map((p, i) => ` ${i + 1}. [${p.code}] ${p.name} (${p.matrix}) - P.U.: S/ ${p.pricePEN.toFixed(2)} -> Subtotal: S/ ${(p.pricePEN * data.sampleCount).toFixed(2)}`).join('\n')}

--------------------------------------------------------
Subtotal Bruto: S/ ${data.subtotalTotal.toFixed(2)}
${data.discountRate > 0 ? `Descuento Institucional (${(data.discountRate * 100).toFixed(0)}%): - S/ ${data.discountVal.toFixed(2)}\n` : ''}TOTAL ESTIMADO: S/ ${data.netTotal.toFixed(2)} PEN
--------------------------------------------------------
Validez: 30 días calendario
Atención: Av. La Molina s/n, Campus Universitario
Ventanilla de Recepción: Lun a Vie 08:30 a 13:00 hrs
Email: laboratorios.ambientales@lamolina.edu.pe
========================================================`;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard write error:', err);
  }
  return false;
}
