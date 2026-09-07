import { SafetyProtocol, SampleCheckItem } from '../types';

export const SAFETY_PROTOCOLS_DATA: SafetyProtocol[] = [
  {
    id: 'prot-bioseguridad-quimica',
    title: 'Protocolo Institucional de Bioseguridad y Seguridad Química en Laboratorios UNALM',
    category: 'Seguridad Química',
    summary: 'Directrices obligatorias para el ingreso, manipulación de sustancias corrosivas, tóxicas o inflamables y permanencia en las instalaciones de ensayo.',
    importanceLevel: 'Crítico',
    regulatoryFramework: 'Ley N° 29783 (Ley de Seguridad y Salud en el Trabajo) / D.S. 005-2012-TR / R.R. UNALM N° 0412-2021',
    steps: [
      'Uso obligatorio del Equipo de Protección Personal (EPP) completo desde el ingreso a la antesala del laboratorio.',
      'Toda manipulación de ácidos concentrados (HNO3, H2SO4, HCl), bases fuertes o solventes orgánicos volátiles debe realizarse estrictamente dentro de campanas de extracción de gases (Fume Hoods) certificadas con velocidad frontal ≥ 0.5 m/s.',
      'Prohibición total de consumo de alimentos, bebidas, cosméticos o uso de teléfonos celulares en las áreas analíticas.',
      'Verificación obligatoria de las Hojas de Datos de Seguridad (FDS/MSDS) en formato SGA antes de preparar reactivos o digestiones ácidas.',
      'Rotulado estandarizado e indeleble de todas las soluciones intermedias indicando: Nombre químico, Concentración, Fecha de preparación, Analista responsable y Pictograma SGA de peligro.',
      'En caso de salpicadura o contacto químico, activar inmediatamente la ducha de emergencia o lavaojos más cercano durante un mínimo de 15 minutos continuos y dar aviso al jefe de turno.'
    ],
    ppeRequired: [
      'Bata blanca de laboratorio 100% algodón de manga larga y cierre hasta el cuello',
      'Lentes de seguridad con protección lateral certificados bajo norma ANSI Z87.1',
      'Guantes de nitrilo de 5 mil (para manipulación general) o guantes de butilo/neopreno (para solventes agresivos)',
      'Calzado cerrado, de cuero o material impermeable con suela antideslizante (no zapatillas de tela ni tacones)',
      'Respirador de media cara con filtros combinados 3M 6003 (Vapores orgánicos / Gases ácidos) para digestiones ácidas'
    ],
    hazardousPictograms: ['Corrosivo', 'Toxicidad Aguda', 'Inflamable', 'Peligro para la Salud', 'Nocivo para el Medio Ambiente'],
    documentDownloadName: 'Protocolo_Seguridad_Quimica_UNALM_2025.pdf'
  },
  {
    id: 'prot-respel',
    title: 'Protocolo de Segregación, Neutralización y Manejo de Residuos Peligrosos (RESPEL)',
    category: 'Manejo de Residuos (RESPEL)',
    summary: 'Procedimiento operativo estándar para la clasificación en fuente, almacenamiento temporal y neutralización de efluentes químicos y desechos biocontaminados.',
    importanceLevel: 'Obligatorio',
    regulatoryFramework: 'D.L. 1278 (Ley de Gestión Integral de Residuos Sólidos) / D.S. 014-2017-MINAM / NTP 900.058',
    steps: [
      'Segregación estricta por familias químicas incompatibles: Frasco A (Residuos Ácidos con Metales Pesados), Frasco B (Solventes Orgánicos Halogenados), Frasco C (Solventes Orgánicos No Halogenados), Frasco D (Soluciones Básicas / Cianuradas).',
      'Prohibido el vertimiento directo de residuos químicos, soluciones de digestión o solventes al alcantarillado sanitario.',
      'Los residuos de bioensayos microbiológicos (medios de cultivo agar, caldos con coliformes o bacterias) deben ser esterilizados en autoclave a 121°C por 30 minutos antes de su disposición final en bolsa roja de biocontaminados.',
      'El llenado de galoneras de RESPEL no debe superar el 80% de su capacidad nominal para evitar acumulación de vapores y sobrepresión.',
      'Todo envase de RESPEL debe contar con etiqueta de identificación oficial UNALM que detalle código de peligro SGA, fecha de inicio y peso estimado.',
      'Transferencia quincenal de los contenedores hacia el Centro de Acopio Central de Residuos Peligrosos de la UNALM para entrega a Empresa Operadora de Residuos Sólidos (EO-RS) autorizada por MINAM.'
    ],
    ppeRequired: [
      'Bata de laboratorio de protección química',
      'Careta facial de policarbonato para trasvase de líquidos corrosivos',
      'Guantes de nitrilo de puño largo / Neopreno de alta resistencia',
      'Delantal de PVC impermeable contra salpicaduras ácidas'
    ],
    hazardousPictograms: ['Corrosivo', 'Tóxico', 'Inflamable', 'Peligro Biológico'],
    documentDownloadName: 'Manual_Gestion_RESPEL_UNALM.pdf'
  },
  {
    id: 'prot-cadena-custodia',
    title: 'Guía Técnica de Toma de Muestra, Preservación y Cadena de Custodia de Muestras Ambientales',
    category: 'Cadena de Custodia',
    summary: 'Condiciones metrológicas y de trazabilidad requeridas para que las muestras de agua, suelo, sedimentos o aire sean aceptadas para análisis oficial.',
    importanceLevel: 'Obligatorio',
    regulatoryFramework: 'Protocolo Nacional para el Monitoreo de la Calidad de los Recursos Hídricos Superficiales (ANA) / Guía para el Muestreo de Suelos (MINAM) / ISO/IEC 17025',
    steps: [
      'Utilizar envases nuevos o descontaminados según el ensayo: Frascos de Vidrio borosilicato ámbar para parámetros orgánicos (DQO, Hidrocarburos, Plaguicidas); Frascos de Polietileno de alta densidad (HDPE) lavados con ácido nítrico para metales pesados; Frascos estériles para coliformes.',
      'Preservación química inmediata in situ: Para metales totales acidificar con HNO3 ultrapuro hasta pH < 2; para DQO acidificar con H2SO4 a pH < 2; para DBO y microbiología únicamente refrigeración sin aditivos químicos.',
      'Conservación térmica obligatoria: Las muestras deben mantenerse en coolers térmicos herméticos con ice packs (gel refrigerante) garantizando una temperatura de 4°C ± 2°C durante todo el transporte hasta la recepción en el campus.',
      'Rotulado indeleble en cada frasco: Código de muestra, Punto de muestreo, Fecha y hora exacta de toma, Matriz, Parámetros solicitados y Nombre del muestreador.',
      'Llenado completo del Formato Oficial de Cadena de Custodia (F-CC-UNALM): Debe acompañar físicamente a las muestras con firmas de entrega y recepción en campus.',
      'Respetar los tiempos máximos de retención (Holding Times): DBO5 (máx 24 horas tras colecta), Coliformes (máx 24 horas), Metales preservados (máx 180 días).'
    ],
    ppeRequired: [
      'Guantes de nitrilo descartables para evitar contaminación cruzada',
      'Gafas protectoras contra salpicaduras',
      'Chaleco reflectivo y calzado de seguridad en caso de muestreo de campo'
    ],
    hazardousPictograms: ['Corrosivo', 'Precaución'],
    documentDownloadName: 'Guia_Muestreo_Preservacion_UNALM_2025.pdf'
  },
  {
    id: 'prot-emergencias-derrames',
    title: 'Plan de Contingencia y Respuesta ante Derrames Químicos e Incendios en Laboratorio',
    category: 'Emergencias y Contingencias',
    summary: 'Procedimiento de respuesta inmediata ante conatos de incendio, ruptura de contenedores de reactivos o fugas de gases en instalaciones UNALM.',
    importanceLevel: 'Crítico',
    regulatoryFramework: 'NTP 350.043 / NFPA 10 / NFPA 45 / Plan de Emergencia UNALM',
    steps: [
      'Ante derrame menor (< 1 Litro de líquido no altamente tóxico): Notificar verbalmente a los ocupantes del laboratorio y delimitar el área.',
      'Seleccionar el kit de derrames apropiado: Neutralizante ácido (bicarbonato de sodio) o neutralizante básico (ácido cítrico diluido / absorbente sintético inerte).',
      'Espolvorear el material absorbente desde la periferia hacia el centro del derrame. Dejar actuar por 5 minutos y recoger con pala y escobilla de plástico antichispa.',
      'Disponer los residuos del derrame en bolsa roja de RESPEL rotulándola como "Material absorbente contaminado con [Reactivo]".',
      'Ante conato de fuego clase B o C: Utilizar el extintor de CO2 (dióxido de carbono) o Acetato de Potasio según corresponda. Apuntar a la base de las llamas a una distancia de 2 metros.',
      'Si el evento supera la capacidad del personal del laboratorio: Presionar el pulsador de alarma de emergencia, evacuar hacia el punto de reunión seguro frente al Pabellón y llamar al Anexo de Emergencias UNALM (3333).'
    ],
    ppeRequired: [
      'Kit completo de emergencia química',
      'Respirador purificador de aire con filtros para vapores orgánicos y gases ácidos',
      'Guantes de nitrilo reforzados o Neopreno de alto calibre',
      'Gafas panorámicas cerradas'
    ],
    hazardousPictograms: ['Inflamable', 'Corrosivo', 'Toxicidad Aguda'],
    documentDownloadName: 'Plan_Contingencia_Laboratorios_UNALM.pdf'
  }
];

export const SAMPLE_CHECKLIST_ITEMS: SampleCheckItem[] = [
  {
    id: 'chk-1',
    title: 'Envases apropiados para cada parámetro',
    description: 'Frascos de vidrio ámbar para orgánicos/grasas, polietileno libre de metales para cationes/aniones y frascos estériles para coliformes.',
    category: 'Recipiente'
  },
  {
    id: 'chk-2',
    title: 'Volumen mínimo de muestra alcanzado',
    description: 'Cada frasco cuenta con el volumen especificado en el catálogo (ej. 1 L para DBO5, 500 mL para metales, 1 kg para suelo seco).',
    category: 'Volumen'
  },
  {
    id: 'chk-3',
    title: 'Preservación química in situ verificada',
    description: 'Se añadió el ácido correspondiente (HNO3 para metales a pH<2, H2SO4 para DQO a pH<2) cuando aplique.',
    category: 'Preservación'
  },
  {
    id: 'chk-4',
    title: 'Cadena de frío mantenida (4°C ± 2°C)',
    description: 'Las muestras se transportan en cooler térmico rígido con ice-packs suficientes sin contacto directo con agua de deshielo.',
    category: 'Preservación'
  },
  {
    id: 'chk-5',
    title: 'Rotulado legible e indeleble en cada frasco',
    description: 'Etiquetas adheridas con cinta impermeable que indican código único, punto de muestreo, fecha, hora y preservante.',
    category: 'Rotulado'
  },
  {
    id: 'chk-6',
    title: 'Formato de Cadena de Custodia impreso y firmado',
    description: 'Documento oficial con todos los campos del solicitante, matriz, método de colecta y coordenadas geográficas.',
    category: 'Cadena de Custodia'
  },
  {
    id: 'chk-7',
    title: 'Tiempo de retención (Holding Time) vigente',
    description: 'La muestra llega al campus dentro de las 24 horas de haber sido tomada (para DBO, coliformes) o el periodo normativo indicado.',
    category: 'Cadena de Custodia'
  }
];
