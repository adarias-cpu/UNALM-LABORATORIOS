export interface Parameter {
  id: string;
  name: string;
  code: string;
  methodology: string; // e.g. "Standard Methods 5210 B", "EPA 200.8", "NTP ISO 10390"
  matrix: 'Agua' | 'Suelo y Sedimento' | 'Aire y Emisiones' | 'Biomasa / Vegetal' | 'Residuos Sólidos' | 'Efluente';
  unit: string;
  limitOfDetection: string;
  turnaroundDays: number; // business days
  pricePEN: number; // in Soles S/.
  sampleVolumeRequired: string;
  containerType: string;
  preservation: string;
  accreditedINACAL: boolean;
  category: string;
  description: string;
}

export interface Laboratory {
  id: string;
  shortName: string;
  fullName: string;
  faculty: string;
  building: string;
  campusLocation: string;
  leadResearcherId: string;
  description: string;
  accreditation: string;
  contactEmail: string;
  phoneExtension: string;
  operatingHours: string;
  iconName: string;
  image: string;
  parameters: Parameter[];
  // Location specific details
  mapCoordinates?: { x: number; y: number; lat: number; lng: number };
  floorAndOffice?: string;
  receptionWindowHours?: string;
  reportsPickupHours?: string;
  walkingTimeFromMainGate?: string;
  landmarkReference?: string;
}

export interface CampusMapPoint {
  id: string;
  name: string;
  shortName: string;
  code: string;
  type: 'laboratory' | 'gate' | 'landmark' | 'parking';
  buildingName: string;
  floorInfo?: string;
  officeCode?: string;
  xPercent: number; // 0 - 100 on campus schematic map
  yPercent: number; // 0 - 100 on campus schematic map
  lat: number;
  lng: number;
  description: string;
  sampleReceptionWindow?: string;
  reportsDeliveryWindow?: string;
  routeFromGate1: string;
  routeFromGate2: string;
  parkingNear: string;
  contactExt?: string;
  imageUrl?: string;
  labIdRef?: string;
}

export interface SampleItem {
  sampleId: string;
  sampleName: string;
  matrix: string;
  samplingPoint: string;
  samplingDate: string;
  preservativeUsed: string;
  selectedParameterIds: string[];
}

export interface Reservation {
  id: string;
  code: string; // e.g. "UNALM-LAB-2025-0842"
  createdAt: string;
  laboratoryId: string;
  laboratoryName: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  requesterType: 'Estudiante UNALM' | 'Tesista de Pregrado' | 'Tesista de Posgrado' | 'Docente / Investigador UNALM' | 'Empresa / Consultora' | 'Público General';
  facultyOrEntity: string;
  studentOrRucCode?: string;
  projectOrThesisTitle?: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  sampleCount: number;
  samples: SampleItem[];
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  totalPEN: number;
  status: 'Confirmada - Pendiente de Entrega' | 'Muestra Recibida en Campus' | 'En Análisis' | 'Informe Emitido' | 'Finalizada';
  notes?: string;
  requiresCustodyChain: boolean;
  requiresCertifiedReport: boolean;
}

export interface SafetyProtocol {
  id: string;
  title: string;
  category: 'Bioseguridad' | 'Seguridad Química' | 'Manejo de Residuos (RESPEL)' | 'Equipos de Protección (EPP)' | 'Emergencias y Contingencias' | 'Cadena de Custodia';
  summary: string;
  importanceLevel: 'Crítico' | 'Obligatorio' | 'Recomendado';
  regulatoryFramework: string; // e.g. "Ley N° 29783 / D.S. 005-2012-TR", "Norma Técnica Peruana NTP 399.010"
  steps: string[];
  ppeRequired: string[];
  hazardousPictograms?: string[]; // GHS / SGA symbols
  documentDownloadName?: string;
}

export interface SampleCheckItem {
  id: string;
  title: string;
  description: string;
  category: 'Rotulado' | 'Recipiente' | 'Preservación' | 'Cadena de Custodia' | 'Volumen';
}

export interface AnalysisResultParam {
  parameterName: string;
  method: string;
  resultValue: number | string;
  unit: string;
  limitOfDetection: string;
  referenceStandard: string; // e.g. "ECA Agua D.S. 004-2017-MINAM Cat. 3"
  standardLimitValue: string;
  status: 'Conforme' | 'Alerta Cercana al Límite' | 'Excede Límite';
  uncertainty?: string;
}

export interface AnalysisReport {
  reportCode: string;
  reservationCode: string;
  sampleCode: string;
  clientName: string;
  clientDocument: string; // DNI or RUC
  entity: string;
  projectTitle: string;
  matrix: string;
  samplingLocation: string;
  samplingDate: string;
  receptionDate: string;
  analysisDate: string;
  emissionDate: string;
  laboratoryName: string;
  leadAnalyst: string;
  technicalDirector: string;
  results: AnalysisResultParam[];
  conclusion: string;
  accreditationNote: string;
  qrVerificationUrl?: string;
}

export interface Publication {
  title: string;
  journal: string;
  year: number;
  doi: string;
  type: 'Artículo Scopus / WoS' | 'Capítulo de Libro' | 'Patente' | 'Conferencia Internacional';
}

export interface ResearchProject {
  title: string;
  role: 'Investigador Principal' | 'Investigadora Principal' | 'Co-Investigador' | 'Co-Investigadora' | 'Director Técnico' | 'Directora Técnica';
  fundingSource: 'PROCIENCIA / CONCYTEC' | 'FONDECYT' | 'VLIR-UOS Bélgica' | 'Banco Mundial / UNALM' | 'Canon Minero' | string;
  period: string;
  status: 'En Ejecución' | 'Concluido';
}

export interface Researcher {
  id: string;
  name: string;
  degree: string; // e.g. "Dr. en Ciencias Ambientales", "MSc. en Edafología"
  roleTitle: string; // e.g. "Jefe del Laboratorio de Calidad de Aguas"
  faculty: string;
  department: string;
  laboratoryId: string;
  renacytCode: string;
  renacytLevel: 'Nivel I (Distinguido)' | 'Nivel II' | 'Nivel III' | 'Investigador Principal' | 'Carlos Monge Medrano' | 'Investigadora Distinguida (Carlos Monge Medrano)' | 'Investigadora Emérita / Nivel I' | 'Investigadora Distinguida / Nivel I' | string;
  orcid: string;
  scopusId: string;
  googleScholarUrl?: string;
  email: string;
  phoneExtension: string;
  officeHours: string;
  biography: string;
  researchLines: string[];
  projects: ResearchProject[];
  publications: Publication[];
  avatarUrl: string;
}
