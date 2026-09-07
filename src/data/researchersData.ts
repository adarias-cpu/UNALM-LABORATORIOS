import { Researcher } from '../types';
import devorahAriasImg from '../assets/images/devorah_arias_photo_1788616841047.jpg';
import marieCurieImg from '../assets/images/marie_curie_photo_1788024711971.jpg';
import rachelCarsonImg from '../assets/images/rachel_carson_photo_1788024730660.jpg';
import sherwoodRowlandImg from '../assets/images/sherwood_rowland_photo_1788024744329.jpg';

export const RESEARCHERS_DATA: Researcher[] = [
  {
    id: 'res-carlos-gomez',
    name: 'Ph. D Raquel Carson',
    degree: 'Ph.D. en Ciencias Ambientales, Conservación y Biología Marina',
    roleTitle: 'Coordinadora General de la Red de Laboratorios Ambientales UNALM / Directora del Laboratorio de Teledetección',
    faculty: 'Facultad de Ciencias Forestales',
    department: 'Departamento Académico de Manejo Forestal y Conservación',
    laboratoryId: 'lab-geomatica',
    renacytCode: 'P0018420',
    renacytLevel: 'Investigadora Distinguida (Carlos Monge Medrano)',
    orcid: '0000-0002-8419-7721',
    scopusId: '57201948300',
    googleScholarUrl: 'https://scholar.google.com/citations?user=UNALM_RCARSON',
    email: 'rcarson@lamolina.edu.pe',
    phoneExtension: 'Anexo 1830',
    officeHours: 'Martes y Jueves: 10:00 - 13:00 (Pabellón Forestal Of. 204)',
    biography: 'Pionera mundial en la concienciación ambiental y conservación ecológica. Lidera el monitoreo satelital de biomasa, la protección de ecosistemas forestales frente a agroquímicos y la resiliencia climática de cuencas andino-amazónicas en la UNALM.',
    researchLines: [
      'Ecología de la conservación y efectos ecotoxicológicos en ecosistemas naturales',
      'Teledetección satelital multiespectral aplicada a recursos hídricos y bosques',
      'Modelamiento de carbono y biomasa en ecosistemas altoandinos y de selva',
      'Evaluación de vulnerabilidad y adaptación al cambio climático en cuencas del Perú'
    ],
    projects: [
      {
        title: 'Monitoreo satelital de la dinámica de glaciares y lagunas altoandinas en la Cordillera Central del Perú',
        role: 'Investigadora Principal',
        fundingSource: 'PROCIENCIA / CONCYTEC',
        period: '2023 - 2026',
        status: 'En Ejecución'
      },
      {
        title: 'Reducción de emisiones por deforestación y degradación (REDD+) en la Amazonía Peruana usando constelaciones Sentinel y Planet',
        role: 'Directora Técnica',
        fundingSource: 'VLIR-UOS Bélgica',
        period: '2021 - 2024',
        status: 'Concluido'
      }
    ],
    publications: [
      {
        title: 'High-resolution biomass mapping and forest degradation monitoring using Sentinel-2 and LiDAR integration in the Peruvian Amazon',
        journal: 'Remote Sensing of Environment',
        year: 2024,
        doi: '10.1016/j.rse.2024.113942',
        type: 'Artículo Scopus / WoS'
      },
      {
        title: 'Ecohydrological impact of land use changes in Andean headwater catchments: A multi-decadal satellite assessment',
        journal: 'Journal of Hydrology: Regional Studies',
        year: 2023,
        doi: '10.1016/j.ejrh.2023.101488',
        type: 'Artículo Scopus / WoS'
      },
      {
        title: 'Guía metodológica para la estimación de índices espectrales de vegetación en ecosistemas áridos y semiáridos de la costa peruana',
        journal: 'Fondo Editorial UNALM',
        year: 2022,
        doi: '10.21704/unalm.fa.2022.001',
        type: 'Capítulo de Libro'
      }
    ],
    avatarUrl: rachelCarsonImg
  },
  {
    id: 'res-miluska-rosas',
    name: 'Dra. Marie Curie',
    degree: 'Ph.D. en Ciencias Físicas y Químicas (Premio Nobel de Física y Química)',
    roleTitle: 'Jefa del Laboratorio de Calidad de Aguas y Efluentes (LCAE)',
    faculty: 'Facultad de Ciencias',
    department: 'Departamento Académico de Química',
    laboratoryId: 'lab-agua',
    renacytCode: 'P0042911',
    renacytLevel: 'Investigadora Emérita / Nivel I',
    orcid: '0000-0003-1294-8840',
    scopusId: '57194820194',
    googleScholarUrl: 'https://scholar.google.com/citations?user=UNALM_MCURIE',
    email: 'mcurie@lamolina.edu.pe',
    phoneExtension: 'Anexo 3421',
    officeHours: 'Lunes y Miércoles: 09:00 - 12:00 (Pabellón de Investigaciones Ambientales)',
    biography: 'Referente histórica de la ciencia química y física moderna. En la UNALM encabeza las investigaciones sobre espectrometría analítica, hidroquímica avanzada, detección de trazas de metales pesados por ICP-OES/MS y aseguramiento metrológico bajo la norma ISO/IEC 17025.',
    researchLines: [
      'Hidroquímica y dinámica de contaminantes inorgánicos en cuencas andino-costeras',
      'Espectrometría analítica y técnicas avanzadas de detección de metales pesados e isótopos',
      'Procesos de Oxidación Avanzada (POAs) para tratamiento y depuración de efluentes industriales',
      'Acreditación y aseguramiento metrológico de ensayos fisicoquímicos según ISO/IEC 17025'
    ],
    projects: [
      {
        title: 'Especiación y riesgo ecotoxicológico de arsénico y cadmio en la cuenca del río Rímac y sus tributarios',
        role: 'Investigadora Principal',
        fundingSource: 'PROCIENCIA / CONCYTEC',
        period: '2023 - 2025',
        status: 'En Ejecución'
      },
      {
        title: 'Desarrollo de nanomateriales basados en biopolímeros agrícolas para adsorción de metales en aguas de mina',
        role: 'Co-Investigadora',
        fundingSource: 'Banco Mundial / UNALM',
        period: '2022 - 2024',
        status: 'Concluido'
      }
    ],
    publications: [
      {
        title: 'Heavy metal speciation and ecological risk assessment in surface waters of the central Peruvian Andes using ICP-OES and geochemical modeling',
        journal: 'Environmental Pollution',
        year: 2024,
        doi: '10.1016/j.envpol.2024.123512',
        type: 'Artículo Scopus / WoS'
      },
      {
        title: 'Microplastic occurrence in urban runoff and municipal wastewater treatment plants in Metropolitan Lima, Peru',
        journal: 'Science of The Total Environment',
        year: 2023,
        doi: '10.1016/j.scitotenv.2023.164821',
        type: 'Artículo Scopus / WoS'
      }
    ],
    avatarUrl: marieCurieImg
  },
  {
    id: 'res-victor-morales',
    name: 'Dr. Sherwood Rowland',
    degree: 'Ph.D. en Química y Ciencias Atmosféricas (Premio Nobel de Química)',
    roleTitle: 'Jefe del Laboratorio de Análisis de Suelos, Sedimentos y Plantas (LASAP)',
    faculty: 'Facultad de Agronomía',
    department: 'Departamento Académico de Suelos',
    laboratoryId: 'lab-suelos',
    renacytCode: 'P0029315',
    renacytLevel: 'Investigador Principal',
    orcid: '0000-0001-9540-3312',
    scopusId: '36081940200',
    googleScholarUrl: 'https://scholar.google.com/citations?user=UNALM_SROWLAND',
    email: 'srowland@lamolina.edu.pe',
    phoneExtension: 'Anexo 2105',
    officeHours: 'Lunes a Jueves: 14:00 - 16:30 (Edificio de Ciencias del Suelo)',
    biography: 'Premio Nobel en química atmosférica y pionero en el estudio del impacto de compuestos antropogénicos en ciclos biogeoquímicos. En la UNALM lidera la investigación en fitorremediación edáfica, química del suelo y bioinmovilización de metales pesados en suelos agrícolas.',
    researchLines: [
      'Química del suelo, dinámica de gases de efecto invernadero y ciclos biogeoquímicos',
      'Fitorremediación y bioinmovilización de plomo, cadmio y arsénico en suelos agrícolas',
      'Secuestro de carbono orgánico y calidad edáfica en sistemas agroforestales',
      'Recuperación de suelos salinos y sódicos mediante lixiviación y enmiendas orgánicas'
    ],
    projects: [
      {
        title: 'Estrategias de enmienda orgánica y biochar de cáscara de café para mitigar la absorción de cadmio en plantaciones de cacao en la selva central',
        role: 'Investigador Principal',
        fundingSource: 'PROCIENCIA / CONCYTEC',
        period: '2022 - 2025',
        status: 'En Ejecución'
      },
      {
        title: 'Mapeo digital de la fertilidad y degradación de suelos en los valles de Cañete, Chancay e Ica',
        role: 'Director Técnico',
        fundingSource: 'Canon Minero',
        period: '2021 - 2023',
        status: 'Concluido'
      }
    ],
    publications: [
      {
        title: 'Biochar application reduces cadmium bioavailability and accumulation in Theobroma cacao L. seedlings in acidic tropical soils',
        journal: 'Geoderma',
        year: 2024,
        doi: '10.1016/j.geoderma.2024.116890',
        type: 'Artículo Scopus / WoS'
      },
      {
        title: 'Evaluation of heavy metal contamination in agricultural soils irrigated with untreated river water in coastal Peru',
        journal: 'Agriculture, Ecosystems & Environment',
        year: 2023,
        doi: '10.1016/j.agee.2023.108644',
        type: 'Artículo Scopus / WoS'
      }
    ],
    avatarUrl: sherwoodRowlandImg
  },
  {
    id: 'res-patricia-thorne',
    name: 'Dra. Patricia Elena Thorne Valdivia',
    degree: 'Ph.D. en Toxicología y Farmacología Ambiental (Univ. de California Davis, EE.UU.)',
    roleTitle: 'Jefa del Laboratorio de Ecotoxicología y Biomonitoreo Ambiental (LEBA)',
    faculty: 'Facultad de Ciencias',
    department: 'Departamento Académico de Biología',
    laboratoryId: 'lab-toxicologia',
    renacytCode: 'P0068102',
    renacytLevel: 'Nivel I (Distinguido)',
    orcid: '0000-0002-4019-5829',
    scopusId: '57199201482',
    googleScholarUrl: 'https://scholar.google.com/citations?user=UNALM_PTHORNE',
    email: 'pthorne@lamolina.edu.pe',
    phoneExtension: 'Anexo 2880',
    officeHours: 'Miércoles y Viernes: 10:00 - 13:00 (Módulo de Bioensayos Biología)',
    biography: 'Pionera en el Perú en la implementación de bioensayos estandarizados con macroinvertebrados, microalgas y especies nativas para la evaluación del riesgo ambiental de relaves y efluentes agroindustriales. Miembro del Comité Consultivo de Estándares de Calidad Ambiental del MINAM.',
    researchLines: [
      'Bioensayos de toxicidad aguda y crónica en organismos acuáticos (Daphnia, microalgas, peces nativos)',
      'Biomarcadores de estrés oxidativo y genotoxicidad inducida por metales y pesticidas',
      'Desarrollo de bioindicadores nativos andinos para monitoreo de la integridad ecológica fluvial',
      'Ecotoxicología de nanopartículas y aditivos de plásticos en la biota acuática'
    ],
    projects: [
      {
        title: 'Desarrollo de una batería de bioensayos ecotoxicológicos con especies altoandinas para alerta temprana de contaminación minera',
        role: 'Investigador Principal',
        fundingSource: 'PROCIENCIA / CONCYTEC',
        period: '2023 - 2026',
        status: 'En Ejecución'
      }
    ],
    publications: [
      {
        title: 'Ecotoxicological evaluation of acid mine drainage in the Central Andes using Daphnia magna and native Andean amphipods',
        journal: 'Ecotoxicology and Environmental Safety',
        year: 2024,
        doi: '10.1016/j.ecoenv.2024.116340',
        type: 'Artículo Scopus / WoS'
      },
      {
        title: 'Cytogenetic and biochemical biomarker responses in Allium cepa exposed to multi-metal contaminated effluent waters',
        journal: 'Chemosphere',
        year: 2023,
        doi: '10.1016/j.chemosphere.2023.138902',
        type: 'Artículo Scopus / WoS'
      }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'res-raul-alarcon',
    name: 'Mg. Ing. Raúl Fernando Alarcón Vega',
    degree: 'M.Sc. en Ingeniería Ambiental y Ciencias Atmosféricas (Univ. Nacional de Ingeniería / UNALM)',
    roleTitle: 'Jefe del Laboratorio de Monitoreo de Calidad de Aire, Ruido y Emisiones (LMCAE)',
    faculty: 'Facultad de Ciencias Forestales',
    department: 'Departamento Académico de Manejo Forestal',
    laboratoryId: 'lab-aire',
    renacytCode: 'P0081290',
    renacytLevel: 'Nivel II',
    orcid: '0000-0003-0182-9914',
    scopusId: '57211839201',
    googleScholarUrl: 'https://scholar.google.com/citations?user=UNALM_RALARCON',
    email: 'ralarcon@lamolina.edu.pe',
    phoneExtension: 'Anexo 1940',
    officeHours: 'Martes: 09:00 - 13:00 / Jueves: 14:00 - 17:00',
    biography: 'Especialista en física de la atmósfera, inventarios de emisiones atmosféricas, modelamiento de dispersión de contaminantes con AERMOD y CALPUFF, y diseño de redes de monitoreo de calidad del aire con estaciones de referencia EPA y sensores de bajo costo.',
    researchLines: [
      'Caracterización fisicoquímica y fuentes de material particulado fino (PM2.5 y PM10) en Lima Este',
      'Modelamiento numérico de dispersión de emisiones industriales y vehiculares en topografía compleja',
      'Monitoreo y cartografía acústica de ruido ambiental diurno/nocturno en zonas urbanas',
      'Evaluación del efecto de las islas de calor urbanas y cobertura arbórea en la dispersión de contaminantes'
    ],
    projects: [
      {
        title: 'Caracterización química y distribución de carbono negro (Black Carbon) en aerosoles atmosféricos de la cuenca de Lima Este',
        role: 'Investigador Principal',
        fundingSource: 'Banco Mundial / UNALM',
        period: '2023 - 2025',
        status: 'En Ejecución'
      }
    ],
    publications: [
      {
        title: 'Chemical speciation and source apportionment of PM2.5 during thermal inversion episodes in eastern Lima, Peru',
        journal: 'Atmospheric Environment',
        year: 2024,
        doi: '10.1016/j.atmosenv.2024.120489',
        type: 'Artículo Scopus / WoS'
      },
      {
        title: 'Evaluation of AERMOD dispersion modeling performance in coastal arid valleys under complex thermal regimes',
        journal: 'Air Quality, Atmosphere & Health',
        year: 2022,
        doi: '10.1007/s11869-022-01201-y',
        type: 'Artículo Scopus / WoS'
      }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'res-carmen-delcastillo',
    name: 'Dra. Devorah Arias',
    degree: 'Ph.D. en Ingeniería Agrícola, Bioprocesos y Recursos Hídricos (UNALM / Univ. Estadual de Campinas)',
    roleTitle: 'Jefa del Laboratorio de Residuos Sólidos, Compostaje y Biomasa (LRCB)',
    faculty: 'Facultad de Ingeniería Agrícola',
    department: 'Departamento Académico de Recursos Hídricos y Tierras',
    laboratoryId: 'lab-residuos',
    renacytCode: 'P0053910',
    renacytLevel: 'Investigadora Distinguida / Nivel I',
    orcid: '0000-0002-9014-4322',
    scopusId: '57198302194',
    googleScholarUrl: 'https://scholar.google.com/citations?user=UNALM_DARIAS',
    email: 'darias@lamolina.edu.pe',
    phoneExtension: 'Anexo 1520',
    officeHours: 'Lunes y Jueves: 09:00 - 12:00 (Planta Piloto de Compostaje UNALM)',
    biography: 'Docente investigadora de la Facultad de Ingeniería Agrícola de la UNALM. Especialista en tecnologías circulares para el tratamiento y valorización de biomasa residual agroindustrial, digestión anaerobia para producción de biometano, optimización de compostaje termofílico y gestión integral de recursos hídricos y suelos.',
    researchLines: [
      'Digestión anaerobia de residuos agroindustriales y estiércol para producción de bioenergía y biol',
      'Pirólisis lenta y optimización de biochar para mejoramiento de suelos degradados y retención hídrica',
      'Kinetics y microbiología del compostaje acelerado con inoculantes microbianos nativos',
      'Evaluación de ciclo de vida (LCA) y economía circular en ingeniería agrícola y ambiental'
    ],
    projects: [
      {
        title: 'Biorrefinería de residuos de la industria del café y cacao: Producción simultánea de biogás, biofertilizante foliar y biochar',
        role: 'Investigadora Principal',
        fundingSource: 'PROCIENCIA / CONCYTEC',
        period: '2022 - 2025',
        status: 'En Ejecución'
      }
    ],
    publications: [
      {
        title: 'Thermophilic co-composting of agricultural residues with municipal organic waste: Maturity indices, heavy metal speciation and phytotoxicity',
        journal: 'Waste Management',
        year: 2024,
        doi: '10.1016/j.wasman.2024.01.033',
        type: 'Artículo Scopus / WoS'
      },
      {
        title: 'Biomethane potential and kinetic analysis of coffee pulp under mesophilic and thermophilic anaerobic digestion conditions',
        journal: 'Bioresource Technology',
        year: 2023,
        doi: '10.1016/j.biortech.2023.129012',
        type: 'Artículo Scopus / WoS'
      }
    ],
    avatarUrl: devorahAriasImg
  }
];
