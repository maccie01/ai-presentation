"use client";

import { useEffect } from "react";
import SectionHero from "@/components/sections/SectionHero";
import SectionContent from "@/components/sections/SectionContent";
import InteractiveArea from "@/components/sections/InteractiveArea";
import SectionSummary from "@/components/sections/SectionSummary";
import { PowerPlatformOverview } from "./components/PowerPlatformOverview";
import { PowerAppsCreator } from "./components/PowerAppsCreator";
import { PowerAutomateDemo } from "./components/PowerAutomateDemo";
import { PowerBIDemo } from "./components/PowerBIDemo";
import { PowerPagesDemo } from "./components/PowerPagesDemo";
import { CopilotStudioDemo } from "./components/CopilotStudioDemo";
import { PowerAdminDemo } from "./components/PowerAdminDemo";
import { BusinessSolutionDemo } from "./components/BusinessSolutionDemo";

export default function PowerPlatformPage() {
  useEffect(() => {
    // Any page initialization logic
    document.title = "Microsoft Power Platform - AI Presentation";
  }, []);

  return (
    <main className="power-platform-section">
      <SectionHero
        title="Microsoft Office KI-Produkte"
        subtitle="Die Microsoft Power Platform: Low-Code-Lösungen für die digitale Transformation"
      />

      <SectionContent>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Power Platform - Der Überblick</h2>
          <p className="mb-4">
            Die Microsoft Power Platform bietet eine umfassende Suite von Low-Code-Tools, die es Unternehmen ermöglichen, 
            Geschäftslösungen zu erstellen, Prozesse zu automatisieren und Daten zu analysieren - ohne umfangreiche 
            Programmierkenntnisse. Die Integration von KI-Funktionen verstärkt diese Möglichkeiten zusätzlich und 
            eröffnet neue Wege zur digitalen Transformation.
          </p>
        </div>

        <InteractiveArea title="Das Power Platform Ökosystem">
          <PowerPlatformOverview />
        </InteractiveArea>

        <InteractiveArea title="Power Apps Studio - App-Entwicklung ohne Code">
          <PowerAppsCreator />
        </InteractiveArea>

        <div className="mt-10 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3 text-purple-700">Power Apps</h3>
            <p className="mb-4">
              Mit Power Apps können Sie benutzerdefinierte Geschäftsanwendungen erstellen, ohne tiefgreifende Programmierkenntnisse 
              zu benötigen. Die Plattform bietet sowohl Canvas-Apps mit vollständig anpassbarem UI als auch 
              Model-driven Apps für komplexe Datenmodelle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-md font-semibold mb-2">So funktioniert's:</h4>
                <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                  <li>Wählen Sie den App-Typ (Canvas oder Model-driven)</li>
                  <li>Verbinden Sie Ihre Datenquellen (Dataverse, SharePoint, Excel, etc.)</li>
                  <li>Erstellen Sie Bildschirme mit Drag-and-Drop-Komponenten</li>
                  <li>Fügen Sie Formeln für Logik und Berechnungen hinzu</li>
                  <li>Testen und veröffentlichen Sie Ihre App</li>
                </ol>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2">Anwendungsfälle:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Inventarverwaltungsanwendungen</li>
                  <li>Mitarbeiter-Onboarding-Prozesse</li>
                  <li>Felddienstmanagement mit mobilen Apps</li>
                  <li>Kundenbeziehungsmanagement (CRM)</li>
                  <li>Genehmigungs- und Antragsworkflows</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Power Automate</h3>
            <p className="mb-4">
              Power Automate ermöglicht die Automatisierung von Geschäftsprozessen durch visuelle Workflows ohne komplexe Programmierung. 
              Von einfachen Benachrichtigungen bis hin zu komplexen mehrstufigen Genehmigungsprozessen können Sie 
              wiederkehrende Aufgaben automatisieren und Zeit sparen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-md font-semibold mb-2">So funktioniert's:</h4>
                <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                  <li>Wählen Sie einen Flow-Typ (automatisiert, instant, geplant)</li>
                  <li>Definieren Sie den Auslöser, der den Flow startet</li>
                  <li>Fügen Sie Aktionen hinzu, die ausgeführt werden sollen</li>
                  <li>Implementieren Sie bedingte Logik und Schleifen nach Bedarf</li>
                  <li>Testen und aktivieren Sie Ihren Flow</li>
                </ol>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2">Anwendungsfälle:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Dokumentengenehmigungsworkflows</li>
                  <li>Automatisierte E-Mail-Benachrichtigungen</li>
                  <li>Datensynchronisation zwischen Systemen</li>
                  <li>Aufgabenerinnerungen und Eskalationen</li>
                  <li>RPA für Legacy-Systemautomatisierung</li>
                </ul>
              </div>
            </div>
          </div>

          <InteractiveArea title="Power Automate - Dokumentengenehmigungsworkflow">
            <PowerAutomateDemo />
          </InteractiveArea>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3 text-yellow-700">Power BI</h3>
            <p className="mb-4">
              Power BI transformiert Ihre Daten in interaktive Visualisierungen und Berichte, die fundierte 
              Geschäftsentscheidungen ermöglichen. Von einfachen Dashboards bis hin zu komplexen Datenmodellen 
              bietet Power BI eine umfassende Lösung für Business Intelligence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-md font-semibold mb-2">So funktioniert's:</h4>
                <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                  <li>Verbinden Sie Ihre Datenquellen</li>
                  <li>Transformieren und modellieren Sie Ihre Daten</li>
                  <li>Erstellen Sie Visualisierungen mit Drag-and-Drop</li>
                  <li>Fügen Sie Berechnungen und Kennzahlen hinzu</li>
                  <li>Teilen Sie Ihre Berichte und Dashboards</li>
                </ol>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2">Anwendungsfälle:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Vertriebspipeline-Visualisierung</li>
                  <li>Finanzielle Leistungsüberwachung</li>
                  <li>Betriebliche Effizienzanalyse</li>
                  <li>Kundenverhaltensmuster</li>
                  <li>Prognosemodelle mit KI-Unterstützung</li>
                </ul>
              </div>
            </div>
          </div>

          <InteractiveArea title="Power BI - Vertriebsleistungsanalyse">
            <PowerBIDemo />
          </InteractiveArea>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3 text-green-700">Power Pages</h3>
            <p className="mb-4">
              Power Pages ermöglicht die Erstellung sicherer, responsiver Websites für externe Benutzer, 
              ohne umfangreiche Webentwicklungskenntnisse. Perfekt für Kundenportale, Partner-Websites 
              und öffentliche Informationsplattformen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-md font-semibold mb-2">So funktioniert's:</h4>
                <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                  <li>Wählen Sie eine Website-Vorlage</li>
                  <li>Passen Sie Design und Branding an</li>
                  <li>Erstellen Sie Seiten mit dem WYSIWYG-Editor</li>
                  <li>Fügen Sie Formulare und Datenlisten hinzu</li>
                  <li>Konfigurieren Sie Benutzerrollen und Berechtigungen</li>
                </ol>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2">Anwendungsfälle:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Kundenportale für Serviceanfragen</li>
                  <li>Partner-Onboarding und -Management</li>
                  <li>Eventregistrierung und -management</li>
                  <li>Öffentliche Informationsportale</li>
                  <li>Online-Antragsformulare</li>
                </ul>
              </div>
            </div>
          </div>

          <InteractiveArea title="Power Pages - Kundenservice-Portal">
            <PowerPagesDemo />
          </InteractiveArea>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3 text-orange-700">Copilot Studio</h3>
            <p className="mb-4">
              Copilot Studio (früher Power Virtual Agents) ermöglicht die Erstellung intelligenter Chatbots ohne 
              Programmierkenntnisse. Diese Bots können Kundenanfragen beantworten, Informationen bereitstellen 
              und Geschäftsprozesse auslösen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-md font-semibold mb-2">So funktioniert's:</h4>
                <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                  <li>Erstellen Sie Themen für Ihren Bot</li>
                  <li>Gestalten Sie Konversationsabläufe visuell</li>
                  <li>Verbinden Sie Ihren Bot mit Datenquellen</li>
                  <li>Integrieren Sie Power Automate-Flows</li>
                  <li>Veröffentlichen Sie den Bot auf verschiedenen Kanälen</li>
                </ol>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2">Anwendungsfälle:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Kundenservice-Automatisierung</li>
                  <li>IT-Helpdesk und Problemlösung</li>
                  <li>Mitarbeiter-FAQ und Onboarding</li>
                  <li>Produktinformation und -beratung</li>
                  <li>Buchungs- und Reservierungsassistenten</li>
                </ul>
              </div>
            </div>
          </div>

          <InteractiveArea title="Copilot Studio - Kundenservice Bot">
            <CopilotStudioDemo />
          </InteractiveArea>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3 text-indigo-700">Dataverse</h3>
            <p className="mb-4">
              Dataverse ist die zugrunde liegende Datenspeicher- und -modellierungsplattform für die Power Platform. 
              Sie speichert Ihre Geschäftsdaten in Tabellen mit einem reichhaltigen Metadatenmodell und bietet 
              fortschrittliche Sicherheits- und Geschäftslogikfunktionen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-md font-semibold mb-2">So funktioniert's:</h4>
                <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                  <li>Definieren Sie Ihr Datenmodell mit Tabellen und Spalten</li>
                  <li>Erstellen Sie Beziehungen zwischen Tabellen</li>
                  <li>Implementieren Sie Geschäftsregeln und Validierung</li>
                  <li>Konfigurieren Sie Sicherheitsrollen und -berechtigungen</li>
                  <li>Integrieren Sie mit anderen Datenquellen</li>
                </ol>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2">Anwendungsfälle:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Zentralisierte Kundendatenplattform</li>
                  <li>Produktkatalog- und Inventarmanagement</li>
                  <li>Mitarbeiter- und Talentmanagement</li>
                  <li>Projektmanagement und -nachverfolgung</li>
                  <li>IOT-Datenerfassung und -analyse</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3 text-red-700">Power Platform Admin Center</h3>
            <p className="mb-4">
              Das Power Platform Admin Center bietet eine zentrale Oberfläche für die Verwaltung, Überwachung 
              und Sicherung aller Power Platform-Ressourcen Ihrer Organisation. Es ermöglicht die 
              Implementierung von Governance-Richtlinien und die Optimierung der Ressourcennutzung.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-md font-semibold mb-2">So funktioniert's:</h4>
                <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                  <li>Erstellen und verwalten Sie Umgebungen</li>
                  <li>Implementieren Sie Data Loss Prevention (DLP) Richtlinien</li>
                  <li>Überwachen Sie die Nutzung und Kapazität</li>
                  <li>Verwalten Sie Benutzer und Berechtigungen</li>
                  <li>Konfigurieren Sie Konnektoren und Integrationen</li>
                </ol>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2">Anwendungsfälle:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Unternehmensweite Governance-Implementierung</li>
                  <li>Kostenverwaltung und -optimierung</li>
                  <li>Sicherheitsverwaltung und Compliance</li>
                  <li>Lebenszyklus- und Umgebungsmanagement</li>
                  <li>Center of Excellence (CoE) Implementierung</li>
                </ul>
              </div>
            </div>
          </div>

          <InteractiveArea title="Power Platform Admin Center">
            <PowerAdminDemo />
          </InteractiveArea>

          <InteractiveArea title="End-to-End Geschäftslösungen">
            <BusinessSolutionDemo />
          </InteractiveArea>
        </div>
      </SectionContent>

      <SectionSummary
        title="Zusammenfassung"
        takeaways={[
          "Die Power Platform bietet eine umfassende Suite von Low-Code-Tools zur digitalen Transformation",
          "Integration aller Komponenten ermöglicht End-to-End-Geschäftslösungen",
          "KI-Funktionen verstärken die Möglichkeiten in allen Komponenten",
          "Von App-Entwicklung über Automatisierung bis hin zu Datenanalyse ist alles abgedeckt",
          "Minimaler Programmieraufwand bei maximaler Geschäftsagilität"
        ]}
        nextSection={{
          name: "MCP-Server",
          path: "/mcp-server"
        }}
      />
    </main>
  );
} 