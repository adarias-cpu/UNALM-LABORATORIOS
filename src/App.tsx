/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Parameter, Laboratory, Reservation } from './types';
import { LABORATORIES_DATA } from './data/laboratoriesData';
import { RESEARCHERS_DATA } from './data/researchersData';
import { SAFETY_PROTOCOLS_DATA, SAMPLE_CHECKLIST_ITEMS } from './data/protocolsData';
import { ANALYSIS_REPORTS_DATA } from './data/resultsData';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LabCatalog } from './components/LabCatalog';
import { ReservationSystem } from './components/ReservationSystem';
import { SafetyProtocols } from './components/SafetyProtocols';
import { ResultsLookup } from './components/ResultsLookup';
import { ResearchersDirectory } from './components/ResearchersDirectory';
import { LocationMap } from './components/LocationMap';
import { MyReservationsModal } from './components/MyReservationsModal';
import { BudgetCalculatorModal } from './components/BudgetCalculatorModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'reservation' | 'protocols' | 'results' | 'researchers' | 'location'>('catalog');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMatrixFilter, setSelectedMatrixFilter] = useState<string>('Todos');
  const [selectedMapLabId, setSelectedMapLabId] = useState<string | null>(null);
  const [highlightedParamId, setHighlightedParamId] = useState<string | null>(null);
  
  // Parameter cart for reservation
  const [selectedParameters, setSelectedParameters] = useState<Parameter[]>([
    LABORATORIES_DATA[0].parameters[0], // pH
    LABORATORIES_DATA[0].parameters[2], // DBO5
  ]);

  // Stored reservations (with initial realistic sample)
  const [userReservations, setUserReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('unalm_lab_reservations');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'res-init-1',
        code: 'UNALM-LAB-2025-0104',
        createdAt: '10/02/2025, 09:30',
        laboratoryId: 'lab-agua',
        laboratoryName: 'Calidad de Aguas y Efluentes (LCAE)',
        requesterName: 'Ing. Alejandro Salazar Torres',
        requesterEmail: 'asalazar@lamolina.edu.pe',
        requesterPhone: '+51 987 654 321',
        requesterType: 'Tesista de Posgrado',
        facultyOrEntity: 'Facultad de Ciencias / Dpto. Química',
        studentOrRucCode: '44829105',
        projectOrThesisTitle: 'Evaluación Hidroquímica y Metales Pesados en Cuenca Alta Río Lurín',
        scheduledDate: '2025-02-12',
        scheduledTimeSlot: 'Turno Mañana A: 08:30 - 10:30 hrs',
        sampleCount: 1,
        samples: [
          {
            sampleId: 'M-AGUA-LURIN-01',
            sampleName: 'Muestra Punto SW-01',
            matrix: 'Agua',
            samplingPoint: 'Puente Antapucro, Cuenca Alta Lurín',
            samplingDate: '2025-02-12',
            preservativeUsed: 'Refrigerado 4°C + HNO3 pH<2',
            selectedParameterIds: ['param-ph-agua', 'param-dbo5', 'param-metales-icp']
          }
        ],
        subtotal: 370.00,
        discountPercentage: 35,
        discountAmount: 129.50,
        totalPEN: 240.50,
        status: 'Informe Emitido',
        requiresCustodyChain: true,
        requiresCertifiedReport: true
      }
    ];
  });

  // Modals state
  const [isMyReservationsOpen, setIsMyReservationsOpen] = useState<boolean>(false);
  const [isBudgetCalculatorOpen, setIsBudgetCalculatorOpen] = useState<boolean>(false);
  const [selectedResearcherId, setSelectedResearcherId] = useState<string | null>(null);
  const [lookupReportCode, setLookupReportCode] = useState<string>('UNALM-LAB-2025-0104');

  // Save reservations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('unalm_lab_reservations', JSON.stringify(userReservations));
    } catch {
      // ignore
    }
  }, [userReservations]);

  const handleAddParameter = (param: Parameter) => {
    setSelectedParameters(prev => {
      if (prev.some(p => p.id === param.id)) return prev;
      return [...prev, param];
    });
  };

  const handleRemoveParameter = (paramId: string) => {
    setSelectedParameters(prev => prev.filter(p => p.id !== paramId));
  };

  const handleSelectParamForReservation = (param: Parameter) => {
    handleAddParameter(param);
    setActiveTab('reservation');
  };

  const handleReservationCreated = (newRes: Reservation) => {
    setUserReservations(prev => [newRes, ...prev]);
  };

  const handleViewResearcher = (researcherId: string) => {
    setSelectedResearcherId(researcherId);
    setActiveTab('researchers');
  };

  const handleConsultReportFromCode = (code: string) => {
    setLookupReportCode(code);
    setActiveTab('results');
  };

  const handleApplyBudgetToReservation = (params: Parameter[]) => {
    setSelectedParameters(params);
    setActiveTab('reservation');
  };

  const handleNavigateToLocation = (labId?: string) => {
    if (labId) {
      setSelectedMapLabId(labId);
    }
    setActiveTab('location');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLabForReservationFromMap = (labId: string) => {
    const lab = LABORATORIES_DATA.find(l => l.id === labId);
    if (lab && lab.parameters.length > 0) {
      handleAddParameter(lab.parameters[0]);
    }
    setActiveTab('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToParameter = (paramId: string) => {
    setActiveTab('catalog');
    setHighlightedParamId(paramId);

    // If matrix filter is active and hides this parameter, reset to 'Todos'
    for (const lab of LABORATORIES_DATA) {
      const p = lab.parameters.find(item => item.id === paramId);
      if (p) {
        if (selectedMatrixFilter !== 'Todos' && p.matrix !== selectedMatrixFilter) {
          setSelectedMatrixFilter('Todos');
        }
        break;
      }
    }

    // Smooth scroll directly to the parameter card element
    const attemptScroll = (retries = 0) => {
      const el = document.getElementById(`param-item-${paramId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (retries < 10) {
        setTimeout(() => attemptScroll(retries + 1), 60);
      }
    };

    setTimeout(() => attemptScroll(), 50);
  };

  return (
    <div className="min-h-screen bg-stone-100/60 font-sans text-stone-900 flex flex-col selection:bg-amber-300 selection:text-emerald-950">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        reservationCount={userReservations.length}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
        onOpenQuickQuote={() => setIsBudgetCalculatorOpen(true)}
      />

      {/* Hero Banner only on Catalog tab */}
      {activeTab === 'catalog' && (
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedMatrixFilter={selectedMatrixFilter}
          setSelectedMatrixFilter={setSelectedMatrixFilter}
          laboratories={LABORATORIES_DATA}
          onSelectParameterForReservation={handleSelectParamForReservation}
          onNavigateToParameter={handleNavigateToParameter}
          onNavigateToReservation={() => setActiveTab('reservation')}
          onNavigateToResults={() => setActiveTab('results')}
          onNavigateToProtocols={() => setActiveTab('protocols')}
          onNavigateToLocation={() => handleNavigateToLocation()}
        />
      )}

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <LabCatalog
            laboratories={LABORATORIES_DATA}
            searchQuery={searchQuery}
            selectedMatrixFilter={selectedMatrixFilter}
            highlightedParamId={highlightedParamId}
            onSelectParameterForReservation={handleSelectParamForReservation}
            onViewResearcher={handleViewResearcher}
            onNavigateToLocation={handleNavigateToLocation}
            onClearSearch={() => {
              setSearchQuery('');
              setHighlightedParamId(null);
            }}
            onSearchQueryChange={setSearchQuery}
            onSelectMatrixFilter={setSelectedMatrixFilter}
          />
        )}

        {activeTab === 'reservation' && (
          <ReservationSystem
            laboratories={LABORATORIES_DATA}
            selectedParameters={selectedParameters}
            onAddParameter={(p) => handleAddParameter(p)}
            onRemoveParameter={handleRemoveParameter}
            onReservationCreated={handleReservationCreated}
            onViewReport={handleConsultReportFromCode}
            onNavigateToLocation={handleNavigateToLocation}
          />
        )}

        {activeTab === 'location' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <LocationMap
              initialSelectedLabId={selectedMapLabId}
              onSelectLabForReservation={handleSelectLabForReservationFromMap}
            />
          </div>
        )}

        {activeTab === 'protocols' && (
          <SafetyProtocols
            protocols={SAFETY_PROTOCOLS_DATA}
            checklistItems={SAMPLE_CHECKLIST_ITEMS}
          />
        )}

        {activeTab === 'results' && (
          <ResultsLookup
            reports={ANALYSIS_REPORTS_DATA}
            userReservations={userReservations}
            initialSearchCode={lookupReportCode}
          />
        )}

        {activeTab === 'researchers' && (
          <ResearchersDirectory
            researchers={RESEARCHERS_DATA}
            selectedResearcherId={selectedResearcherId}
          />
        )}
      </main>

      {/* Modals */}
      <MyReservationsModal
        isOpen={isMyReservationsOpen}
        onClose={() => setIsMyReservationsOpen(false)}
        reservations={userReservations}
        onConsultReport={handleConsultReportFromCode}
        onNavigateToLocation={handleNavigateToLocation}
      />

      <BudgetCalculatorModal
        isOpen={isBudgetCalculatorOpen}
        onClose={() => setIsBudgetCalculatorOpen(false)}
        laboratories={LABORATORIES_DATA}
        onApplyToReservation={handleApplyBudgetToReservation}
      />

      {/* Institutional Footer */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
