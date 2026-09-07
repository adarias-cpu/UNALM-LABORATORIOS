import { AnalysisReport } from '../types';

export const ANALYSIS_REPORTS_DATA: AnalysisReport[] = [
  {
    reportCode: 'INF-2025-0104-LCAE',
    reservationCode: 'UNALM-LAB-2025-0104',
    sampleCode: 'M-AGUA-LURIN-01',
    clientName: 'Ing. Alejandro Salazar Torres',
    clientDocument: '44829105',
    entity: 'Consorcio Cuencas Verdes del Perú / Proyecto Tesis Maestría UNALM',
    projectTitle: 'Evaluación Hidroquímica y Metales Pesados en la Cuenca Alta del Río Lurín',
    matrix: 'Agua Superficial Continental (Río)',
    samplingLocation: 'Punto SW-01: Puente Antapucro, Cuenca Alta Río Lurín (Coord: 12°04\'18.2"S, 76°28\'45.1"W, 2,850 msnm)',
    samplingDate: '12 de Febrero de 2025, 08:30 hrs',
    receptionDate: '12 de Febrero de 2025, 14:15 hrs',
    analysisDate: '13 al 18 de Febrero de 2025',
    emissionDate: '20 de Febrero de 2025',
    laboratoryName: 'Laboratorio de Calidad de Aguas y Efluentes (LCAE) - UNALM',
    leadAnalyst: 'Lic. Quím. Renzo Vargas Mendoza (Colegiatura CQFP 4821)',
    technicalDirector: 'Dra. Marie Curie (Jefa de Laboratorio LCAE)',
    conclusion: 'La muestra evaluada cumple con la mayoría de parámetros del ECA Agua D.S. 004-2017-MINAM (Categoría 3: Riego de Vegetales y Bebida de Animales). No obstante, se detectó una concentración de Plomo Total (0.052 mg/L) que supera el valor límite establecido (0.050 mg/L) debido a influencia de mineralizaciones naturales en la subcuenca alta.',
    accreditationNote: 'Ensayos ejecutados bajo sistema de gestión de calidad acreditado por el Instituto Nacional de Calidad (INACAL) bajo la norma NTP-ISO/IEC 17025:2017. Los resultados corresponden únicamente a la muestra recibida.',
    results: [
      {
        parameterName: 'Potencial de Hidrógeno (pH)',
        method: 'SMEWW 23rd Ed. 4500-H+ B',
        resultValue: 7.42,
        unit: 'Unidades de pH',
        limitOfDetection: '0.01',
        referenceStandard: 'ECA Agua D.S. 004-2017-MINAM Cat. 3',
        standardLimitValue: '6.5 - 8.5',
        status: 'Conforme',
        uncertainty: '± 0.05'
      },
      {
        parameterName: 'Conductividad Eléctrica (CE)',
        method: 'SMEWW 23rd Ed. 2510 B',
        resultValue: 685,
        unit: 'µS/cm',
        limitOfDetection: '1.0',
        referenceStandard: 'ECA Agua D.S. 004-2017-MINAM Cat. 3',
        standardLimitValue: '2500 µS/cm',
        status: 'Conforme',
        uncertainty: '± 12 µS/cm'
      },
      {
        parameterName: 'Demanda Bioquímica de Oxígeno (DBO5)',
        method: 'SMEWW 23rd Ed. 5210 B',
        resultValue: 8.4,
        unit: 'mg/L O2',
        limitOfDetection: '2.0',
        referenceStandard: 'ECA Agua D.S. 004-2017-MINAM Cat. 3',
        standardLimitValue: '15.0 mg/L',
        status: 'Conforme',
        uncertainty: '± 0.6 mg/L'
      },
      {
        parameterName: 'Demanda Química de Oxígeno (DQO)',
        method: 'SMEWW 23rd Ed. 5220 D',
        resultValue: 24.5,
        unit: 'mg/L O2',
        limitOfDetection: '10.0',
        referenceStandard: 'ECA Agua D.S. 004-2017-MINAM Cat. 3',
        standardLimitValue: '40.0 mg/L',
        status: 'Conforme',
        uncertainty: '± 2.1 mg/L'
      },
      {
        parameterName: 'Plomo Total (Pb) por ICP-OES',
        method: 'EPA Method 200.7 / SMEWW 3120 B',
        resultValue: 0.052,
        unit: 'mg/L',
        limitOfDetection: '0.001',
        referenceStandard: 'ECA Agua D.S. 004-2017-MINAM Cat. 3 (Riego)',
        standardLimitValue: '0.050 mg/L',
        status: 'Excede Límite',
        uncertainty: '± 0.003 mg/L'
      },
      {
        parameterName: 'Cadmio Total (Cd) por ICP-OES',
        method: 'EPA Method 200.7 / SMEWW 3120 B',
        resultValue: 0.0035,
        unit: 'mg/L',
        limitOfDetection: '0.0005',
        referenceStandard: 'ECA Agua D.S. 004-2017-MINAM Cat. 3',
        standardLimitValue: '0.005 mg/L',
        status: 'Alerta Cercana al Límite',
        uncertainty: '± 0.0004 mg/L'
      },
      {
        parameterName: 'Arsénico Total (As) por ICP-OES',
        method: 'EPA Method 200.7 / SMEWW 3120 B',
        resultValue: 0.021,
        unit: 'mg/L',
        limitOfDetection: '0.002',
        referenceStandard: 'ECA Agua D.S. 004-2017-MINAM Cat. 3',
        standardLimitValue: '0.050 mg/L',
        status: 'Conforme',
        uncertainty: '± 0.002 mg/L'
      },
      {
        parameterName: 'Coliformes Termotolerantes',
        method: 'SMEWW 23rd Ed. 9221 E',
        resultValue: 430,
        unit: 'NMP / 100 mL',
        limitOfDetection: '< 1.8',
        referenceStandard: 'ECA Agua D.S. 004-2017-MINAM Cat. 3 (Riego Irrestricto)',
        standardLimitValue: '1000 NMP / 100 mL',
        status: 'Conforme',
        uncertainty: 'N/A'
      }
    ]
  },
  {
    reportCode: 'INF-2025-0219-LASAP',
    reservationCode: 'UNALM-LAB-2025-0219',
    sampleCode: 'M-SUELO-CANETE-04',
    clientName: 'Dra. Gabriela Paredes Chumpitaz',
    clientDocument: '20584910241',
    entity: 'Agrícola Valle Fértil S.A.C. / Fondo de Innovación Agraria',
    projectTitle: 'Diagnóstico Integral de Fertilidad y Metales Pesados en Suelos Hortícolas',
    matrix: 'Suelo Agrícola (0 - 30 cm profundidad)',
    samplingLocation: 'Lote San José N° 4, Valle Bajo de Cañete, Lima',
    samplingDate: '05 de Marzo de 2025, 09:15 hrs',
    receptionDate: '06 de Marzo de 2025, 10:30 hrs',
    analysisDate: '07 al 14 de Marzo de 2025',
    emissionDate: '15 de Marzo de 2025',
    laboratoryName: 'Laboratorio de Análisis de Suelos, Sedimentos y Plantas (LASAP) - UNALM',
    leadAnalyst: 'Ing. Agrón. Marco Antonio Dávila (CIP 184920)',
    technicalDirector: 'Dr. Sherwood Rowland (Jefe de Laboratorio LASAP)',
    conclusion: 'El suelo presenta textura Franco-Arenosa con pH ligeramente alcalino (7.85) y contenido medio de Materia Orgánica (2.45%). Las concentraciones de metales pesados (Cadmio: 0.82 mg/kg, Plomo: 38.5 mg/kg, Arsénico: 12.1 mg/kg) se encuentran rigurosamente DENTRO de los límites fijados por el ECA Suelo Agrícola (D.S. 011-2017-MINAM), resultando APTO para cultivos de exportación.',
    accreditationNote: 'Metodologías estandarizadas con control de calidad y curvas de calibración con estándares certificados NIST SRM 2710a (Montana Soil).',
    results: [
      {
        parameterName: 'pH (Relación 1:1 Suelo:Agua)',
        method: 'NTP ISO 10390 (Potenciométrico)',
        resultValue: 7.85,
        unit: 'Unidades de pH',
        limitOfDetection: '0.05',
        referenceStandard: 'Rango Óptimo Suelos Agrícolas Costa',
        standardLimitValue: '6.5 - 8.0',
        status: 'Conforme',
        uncertainty: '± 0.05'
      },
      {
        parameterName: 'Conductividad Eléctrica (Extracto de Saturación)',
        method: 'NTP ISO 11265',
        resultValue: 1.82,
        unit: 'dS/m a 25°C',
        limitOfDetection: '0.05',
        referenceStandard: 'Límite no salino USDA',
        standardLimitValue: '< 2.0 dS/m',
        status: 'Conforme',
        uncertainty: '± 0.08 dS/m'
      },
      {
        parameterName: 'Materia Orgánica (MO)',
        method: 'Walkley & Black (Oxidación húmeda)',
        resultValue: 2.45,
        unit: '%',
        limitOfDetection: '0.1',
        referenceStandard: 'Nivel Medio Agronómico',
        standardLimitValue: '> 2.0 %',
        status: 'Conforme',
        uncertainty: '± 0.15 %'
      },
      {
        parameterName: 'Cadmio Total (Cd) en Suelo',
        method: 'EPA Method 3050B / EPA 6010D (ICP-OES)',
        resultValue: 0.82,
        unit: 'mg/kg en base seca (ppm)',
        limitOfDetection: '0.05',
        referenceStandard: 'ECA Suelo Agrícola D.S. 011-2017-MINAM',
        standardLimitValue: '1.4 mg/kg',
        status: 'Conforme',
        uncertainty: '± 0.06 mg/kg'
      },
      {
        parameterName: 'Plomo Total (Pb) en Suelo',
        method: 'EPA Method 3050B / EPA 6010D (ICP-OES)',
        resultValue: 38.5,
        unit: 'mg/kg en base seca (ppm)',
        limitOfDetection: '0.5',
        referenceStandard: 'ECA Suelo Agrícola D.S. 011-2017-MINAM',
        standardLimitValue: '70.0 mg/kg',
        status: 'Conforme',
        uncertainty: '± 2.1 mg/kg'
      },
      {
        parameterName: 'Arsénico Total (As) en Suelo',
        method: 'EPA Method 3050B / EPA 6010D (ICP-OES)',
        resultValue: 12.1,
        unit: 'mg/kg en base seca (ppm)',
        limitOfDetection: '0.2',
        referenceStandard: 'ECA Suelo Agrícola D.S. 011-2017-MINAM',
        standardLimitValue: '50.0 mg/kg',
        status: 'Conforme',
        uncertainty: '± 0.9 mg/kg'
      }
    ]
  },
  {
    reportCode: 'INF-2025-0312-LMCAE',
    reservationCode: 'UNALM-LAB-2025-0312',
    sampleCode: 'M-AIRE-CAMPUS-24H',
    clientName: 'Dirección de Gestión Ambiental UNALM',
    clientDocument: '20148291039',
    entity: 'Vicerrectorado de Investigación - UNALM',
    projectTitle: 'Monitoreo Continuo de la Calidad del Aire en la Cuenca Atmosférica de Lima Este',
    matrix: 'Aire Ambiente (Muestreo 24 horas)',
    samplingLocation: 'Estación Fija Campus UNALM (Techo Edificio Forestal - Coordenadas: 12°04\'55"S, 76°56\'48"W)',
    samplingDate: '18 al 19 de Marzo de 2025 (Periodo 24 horas continuas)',
    receptionDate: '19 de Marzo de 2025, 10:00 hrs',
    analysisDate: '19 al 22 de Marzo de 2025',
    emissionDate: '24 de Marzo de 2025',
    laboratoryName: 'Laboratorio de Monitoreo de Calidad de Aire y Emisiones (LMCAE) - UNALM',
    leadAnalyst: 'Ing. Amb. Lucía Beltrán Ramos',
    technicalDirector: 'Mg. Ing. Raúl Fernando Alarcón Vega (Jefe de Laboratorio LMCAE)',
    conclusion: 'Las concentraciones de Material Particulado PM10 (68.4 µg/m3), Dióxido de Azufre (14.2 µg/m3) y Dióxido de Nitrógeno (32.8 µg/m3) se mantuvieron por debajo de los valores diarios del D.S. 003-2017-MINAM. La concentración de PM2.5 (28.6 µg/m3) se encuentra en zona de alerta cercana al límite diario de 25 µg/m3 durante las horas punta vehiculares de la Av. Javier Prado Este.',
    accreditationNote: 'Equipos muestreadores calibrados con flujo volumétrico estándar y filtros certificados por EPA.',
    results: [
      {
        parameterName: 'Material Particulado Fino PM2.5 (24 horas)',
        method: 'EPA 40 CFR Part 50 Appendix L (Gravimetría cuarto limpio)',
        resultValue: 28.6,
        unit: 'µg/m3',
        limitOfDetection: '1.0',
        referenceStandard: 'ECA Aire D.S. 003-2017-MINAM (24 horas)',
        standardLimitValue: '25.0 µg/m3',
        status: 'Alerta Cercana al Límite',
        uncertainty: '± 1.8 µg/m3'
      },
      {
        parameterName: 'Material Particulado PM10 (24 horas)',
        method: 'EPA 40 CFR Part 50 Appendix J',
        resultValue: 68.4,
        unit: 'µg/m3',
        limitOfDetection: '5.0',
        referenceStandard: 'ECA Aire D.S. 003-2017-MINAM (24 horas)',
        standardLimitValue: '100.0 µg/m3',
        status: 'Conforme',
        uncertainty: '± 3.2 µg/m3'
      },
      {
        parameterName: 'Dióxido de Azufre (SO2 - 24 horas)',
        method: 'Fluorescencia UV / NTP 900.002',
        resultValue: 14.2,
        unit: 'µg/m3',
        limitOfDetection: '2.0',
        referenceStandard: 'ECA Aire D.S. 003-2017-MINAM (24 horas)',
        standardLimitValue: '250.0 µg/m3',
        status: 'Conforme',
        uncertainty: '± 1.1 µg/m3'
      },
      {
        parameterName: 'Dióxido de Nitrógeno (NO2 - 1 hora máx)',
        method: 'Quimioluminiscencia EPA Method RFNA-1289-074',
        resultValue: 32.8,
        unit: 'µg/m3',
        limitOfDetection: '3.0',
        referenceStandard: 'ECA Aire D.S. 003-2017-MINAM (1 hora)',
        standardLimitValue: '200.0 µg/m3',
        status: 'Conforme',
        uncertainty: '± 2.5 µg/m3'
      }
    ]
  }
];
