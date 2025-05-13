'use client';

import React from 'react';
import SectionHero from '@/components/sections/SectionHero';
import SectionContent from '@/components/sections/SectionContent';
import SectionSummary from '@/components/sections/SectionSummary';
import InteractiveArea from '@/components/sections/InteractiveArea';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import TrendsForecast from './components/TrendsForecast';
import GovernanceChecklist from './components/GovernanceChecklist';
import AiInvestmentTrends from './components/AiInvestmentTrends';
import EmergingTechnologyTrends from './components/EmergingTechnologyTrends';
import EthicsGovernanceFramework from './components/EthicsGovernanceFramework';

export default function AusblickTrendsPage() {
  return (
    <main>
      <SectionHero
        title="Ausblick & Trends"
        subtitle="Zukünftige Entwicklungen, Markttrends und Governance-Empfehlungen für KI-Anwendungen - Stand: 6. Mai 2025"
      />

      <SectionContent>
        <div className="mb-8">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            Die Zukunft der KI-Technologien
          </PHeading>
          <PText>
            Die KI-Landschaft entwickelt sich rasant weiter. In diesem Abschnitt untersuchen wir aktuelle Trends,
            Marktentwicklungen, aufkommende Technologien und Governance-Anforderungen, die für die erfolgreiche 
            Implementierung von KI-Lösungen in Unternehmen entscheidend sind.
          </PText>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* AI Investment Trends Section */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            KI-Marktentwicklung & Investitionstrends
          </PHeading>
          <PText className="mb-6">
            Die folgenden Visualisierungen zeigen die wichtigsten KI-Markttrends, Investitionsmuster und Wachstumsprognosen,
            basierend auf aktuellen Forschungsdaten und Marktanalysen.
          </PText>
          <InteractiveArea title="KI-Markttrends 2024-2034">
            <AiInvestmentTrends />
          </InteractiveArea>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* Emerging Technology Trends Section */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            Transformative KI-Technologietrends
          </PHeading>
          <PText className="mb-6">
            Über den KI-Markt hinaus entwickeln sich die technologischen Fähigkeiten und Anwendungsfälle von KI-Systemen
            ebenfalls rapide weiter. Diese Übersicht zeigt die wichtigsten technologischen Trends und deren erwartete Auswirkungen.
          </PText>
          <InteractiveArea title="Transformative KI-Trends">
            <EmergingTechnologyTrends />
          </InteractiveArea>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* Trends Forecast Section */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            Adoptionskurven und Capability-Entwicklung
          </PHeading>
          <PText className="mb-6">
            Die folgenden Visualisierungen zeigen detaillierte Prognosen zur Adoption verschiedener KI-Technologien
            und zur Entwicklung ihrer Fähigkeiten in den kommenden Jahren. Diese Einblicke können bei der
            strategischen Planung und Priorisierung von KI-Initiativen helfen.
          </PText>
          <InteractiveArea title="KI-Adoptionsprognosen">
            <TrendsForecast />
          </InteractiveArea>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* Ethics and Governance Section */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            KI-Ethik und Governance
          </PHeading>
          <PText className="mb-6">
            Mit zunehmender KI-Leistung und -Verbreitung wird die Etablierung robuster Ethik- und Governance-Frameworks
            immer wichtiger. Die folgenden Frameworks und Best Practices bieten einen Überblick über die notwendigen
            Maßnahmen zur verantwortungsvollen KI-Nutzung.
          </PText>
          <InteractiveArea title="KI-Governance-Framework">
            <EthicsGovernanceFramework />
          </InteractiveArea>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* Governance Recommendations Section */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            Governance-Checkliste
          </PHeading>
          <PText className="mb-6">
            Eine effektive Governance-Struktur ist entscheidend für den erfolgreichen Einsatz von KI-Technologien in
            Unternehmen. Die folgende Checkliste bietet einen Überblick über wichtige Aspekte, die berücksichtigt
            werden sollten.
          </PText>
          <InteractiveArea title="KI-Governance-Checkliste">
            <GovernanceChecklist />
          </InteractiveArea>
        </div>
      </SectionContent>

      <SectionSummary
        title="Zusammenfassung: KI-Ausblick 2025-2030"
        takeaways={[
          "Multimodale KI-Systeme werden zum neuen Standard und ermöglichen nahtlose Interaktionen über verschiedene Medientypen hinweg.",
          "KI-Agenten, die komplexe mehrstufige Aufgaben selbstständig ausführen können, gewinnen ab 2025 stark an Bedeutung.",
          "Effiziente kleinere Modelle und lokale KI werden zunehmend wichtiger für datenschutzsensitive Anwendungen und Echtzeit-Verarbeitung.",
          "Robuste KI-Governance-Frameworks sind entscheidend für die verantwortungsvolle und konforme Nutzung von KI-Technologien.",
          "Die Automobilindustrie wird besonders von KI-Fortschritten in den Bereichen autonomes Fahren, prädiktive Wartung und personalisierte Benutzererlebnisse profitieren."
        ]}
        nextSection={{
          name: "Ressourcen",
          path: "/ressourcen"
        }}
      />
    </main>
  );
} 