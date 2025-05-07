"use client";

import React from 'react';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import Tabs from '@/components/ui/Tabs';
import InfoCard from '@/components/ui/InfoCard';

interface UseCaseExamplesProps {
  title: string;
  description: string;
}

const UseCaseExamples: React.FC<UseCaseExamplesProps> = ({ title, description }) => {
  const useCases = {
    tisax: {
      title: "TISAX Compliance Prüfung",
      promptTitle: "Prompt: TISAX Gap-Analyse",
      prompt: `Als Automotive Security Experte, analysiere die folgenden Ergebnisse unseres TISAX Self-Assessments und identifiziere die kritischen Lücken, die vor der offiziellen Prüfung geschlossen werden müssen:

- Information Security Management: 70% Compliance
- Datenschutz: 65% Compliance 
- Prototype Protection: 50% Compliance
- Connected Services: 40% Compliance

Priorisiere die Maßnahmen nach Risiko und erstelle einen Aktionsplan mit konkreten Schritten, Zeitrahmen und Verantwortlichkeiten.`,
      response: `# TISAX Gap-Analyse: Kritische Lücken und Aktionsplan

## Priorisierte Risikobereiche

1. **Connected Services (40%)**
   * Höchstes Risiko durch direkte externe Schnittstellen
   * Potenziell unmittelbare Angriffsvektoren für Fahrzeugsysteme
   * Mögliche Compliance-Verstöße mit weitreichenden Folgen

2. **Prototype Protection (50%)**
   * Risiko von Intellectual Property (IP) Verlust
   * Wettbewerbsnachteil durch Kompromittierung von Entwicklungsgeheimnissen
   * Verstoß gegen Kundenanforderungen zum Prototypenschutz

3. **Datenschutz (65%)**
   * Rechtliche Risiken durch DSGVO-Verstöße
   * Reputationsschäden bei Datenschutzvorfällen
   * Finanzielle Risiken durch mögliche Bußgelder

4. **Information Security Management (70%)**
   * Grundlegende Governance-Lücken
   * Fehlende Überwachungs- und Kontrollmechanismen

## Detaillierter Aktionsplan

### Connected Services (KRITISCH)
| Maßnahme | Zeitrahmen | Verantwortlichkeit |
|----------|------------|---------------------|
| Penetrationstests aller externen Schnittstellen | 2 Wochen | Security Team |
| Implementation von API-Sicherheitskontrollen | 3 Wochen | Entwicklungsteam |
| Überarbeitung des Incident Response Plans für Connected Services | 2 Wochen | CISO & Security Team |
| Implementierung kontinuierlicher Sicherheitsüberwachung | 4 Wochen | Security Operations |

### Prototype Protection (HOCH)
| Maßnahme | Zeitrahmen | Verantwortlichkeit |
|----------|------------|---------------------|
| Audit aller Prototypen-Zugriffskontrollen | 1 Woche | Audit Team |
| Implementierung verbesserter physischer Sicherheitsmaßnahmen | 3 Wochen | Facility Management |
| Schulung aller Mitarbeiter zum Prototypenschutz | 2 Wochen | HR & Security Awareness |
| Überarbeitung von NDAs und Vertragsklauseln | 2 Wochen | Rechtsabteilung |

### Datenschutz (MITTEL)
| Maßnahme | Zeitrahmen | Verantwortlichkeit |
|----------|------------|---------------------|
| DSGVO-Compliance Check aller Datenverarbeitungsprozesse | 3 Wochen | Datenschutzbeauftragter |
| Aktualisierung der Datenschutzerklärungen | 2 Wochen | Rechtsabteilung |
| Implementierung verbesserter Datenminimierung | 4 Wochen | Entwicklungsteam |
| Review aller Datenverarbeitungsverträge | 3 Wochen | Procurement & Legal |

### Information Security Management (STANDARD)
| Maßnahme | Zeitrahmen | Verantwortlichkeit |
|----------|------------|---------------------|
| Optimierung des ISMS-Review-Prozesses | 4 Wochen | CISO |
| Verbesserung der Security-KPI-Überwachung | 3 Wochen | Security Team |
| Aktualisierung der Sicherheitsrichtlinien | 3 Wochen | CISO & Compliance |
| Erweiterung des Security-Awareness-Programms | 4 Wochen | Security Awareness Team |

## Empfohlener Monitoring-Ansatz
* Wöchentliche Status-Meetings zur Verfolgung der Maßnahmen
* Monatliches Executive-Reporting zu kritischen Bereichen
* Vorab-Assessment 4 Wochen vor dem offiziellen TISAX-Audit`
    },
    securityKPIs: {
      title: "Security KPI Dashboard",
      promptTitle: "Prompt: Automotive Security KPIs",
      prompt: `Als Security-Analyst in der Automobilindustrie, entwickle ein umfassendes KPI-Dashboard zur Überwachung der Cybersecurity im Fahrzeugentwicklungsprozess. 

Berücksichtige folgende Anforderungen:
- Compliance mit UNECE R155 (WP.29)
- Integration von TISAX-Anforderungen
- Messbarkeit von DevSecOps-Reife
- Reaktionszeiten auf Sicherheitsvorfälle
- Patch-Management für Fahrzeugsoftware

Strukturiere die KPIs in verschiedene Kategorien und gib für jeden KPI eine Berechnungsmethode, Zielwerte und Visualisierungsempfehlungen an.`,
      response: `# Automotive Cybersecurity KPI Dashboard

## Compliance & Governance KPIs

| KPI | Berechnung | Zielwert | Visualisierung |
|-----|------------|----------|----------------|
| **UNECE R155 Compliance Rate** | (Erfüllte R155-Anforderungen / Gesamte R155-Anforderungen) × 100% | ≥95% | Fortschrittsbalken mit Farbkodierung |
| **TISAX Assessment Coverage** | (Assessierte Systeme / Gesamte bewertungspflichtige Systeme) × 100% | 100% | Flächendiagramm nach Bereich |
| **Security Policy Adherence** | Ergebnis aus Stichprobenaudits (0-100%) | ≥90% | Zeitreihen-Liniendiagramm |
| **Risk Treatment Completion** | (Umgesetzte Maßnahmen / Identifizierte Maßnahmen) × 100% | ≥85% | Fortschrittsanzeige pro Risikolevel |

## Entwicklungsprozess KPIs

| KPI | Berechnung | Zielwert | Visualisierung |
|-----|------------|----------|----------------|
| **Threat Model Coverage** | (Komponenten mit Threat Model / Gesamte Komponenten) × 100% | 100% | Heatmap nach Fahrzeugkomponenten |
| **Security Requirement Coverage** | (Implementierte Security Requirements / Gesamte Security Requirements) × 100% | ≥95% | Stacked Bar Chart nach Komponente |
| **Security Debt Ratio** | (Anzahl bekannter, ungelöster Sicherheitsprobleme / Gesamtanzahl Features) × 100% | <5% | Trendlinie mit Schwellenwertmarkierung |
| **Secure Coding Compliance** | (Codezeilen ohne Security Findings / Gesamte Codezeilen) × 100% | ≥95% | Kreisdiagramm mit Trend |

## DevSecOps Reife KPIs

| KPI | Berechnung | Zielwert | Visualisierung |
|-----|------------|----------|----------------|
| **Security Testing Automation** | (Automatisierte Security Tests / Gesamte Security Tests) × 100% | ≥80% | Prozentanzeige mit YoY-Vergleich |
| **SAST/DAST Integration** | % der Repositories mit SAST/DAST in CI/CD | 100% | Fortschrittsbalken pro Entwicklungsteam |
| **Security Gate Pass Rate** | (Erfolgreiche Security Gate Passagen / Gesamte Gate Reviews) × 100% | ≥90% | Trendlinien nach Release-Phase |
| **Mean Time to Remediate** | Durchschnittliche Zeit von Erkennung bis Behebung (in Tagen) | Kritisch: <7d<br>Hoch: <14d<br>Mittel: <30d | Boxplot nach Schweregrad |

## Incident Response KPIs

| KPI | Berechnung | Zielwert | Visualisierung |
|-----|------------|----------|----------------|
| **Mean Time to Detect (MTTD)** | Durchschnittliche Zeit von Ereignis bis Erkennung (in Stunden) | <24h | Trendlinie mit SLA-Markierung |
| **Mean Time to Respond (MTTR)** | Durchschnittliche Zeit von Erkennung bis Eindämmung (in Stunden) | <12h | Trendlinie mit SLA-Markierung |
| **Security Incident Rate** | Anzahl Sicherheitsvorfälle pro 1000 Fahrzeuge | <0.5 | Zeitreihen-Balkendiagramm |
| **Vulnerability Rediscovery Rate** | % wiederholt auftretender Sicherheitslücken | <5% | Kreisdiagramm mit Drill-down |

## Patch Management KPIs

| KPI | Berechnung | Zielwert | Visualisierung |
|-----|------------|----------|----------------|
| **Fleet Patch Coverage** | (Gepatchte Fahrzeuge / Update-berechtigte Fahrzeuge) × 100% | ≥90% binnen 30d | Flächendiagramm mit Zeitverlauf |
| **Critical Vulnerability Resolution Time** | Durchschnittliche Zeit von CVE-Veröffentlichung bis Patch-Deployment (in Tagen) | <45d | Timeline mit Meilensteinen |
| **OTA Update Success Rate** | (Erfolgreiche Updates / Gestartete Updates) × 100% | ≥99.5% | Trendlinie mit Fehleranalyse |
| **Patch Quality Index** | (Updates ohne Regressions / Gesamte Updates) × 100% | ≥98% | Scorekarte mit Ampelsystem |

## Dashboard-Integration

Das Dashboard sollte folgende Features bieten:
- Drill-down-Fähigkeiten für alle KPIs
- Filterung nach Fahrzeugprojekt, Komponente und Zeitraum
- Export-Funktionalität für Compliance-Berichte
- Automatische Benachrichtigungen bei KPI-Schwellenwertüberschreitungen
- Integration mit bestehenden Toolchains (Jira, Jenkins, Veracode, etc.)
- Anpassbare Executive Summary View
- Trendanalyse mit vorausschauender Modellierung

## Review-Prozess
Vierteljährliche Überprüfung aller KPIs auf Relevanz und Anpassung der Zielwerte basierend auf Industriestandards und regulatorischen Änderungen.`
    },
    pentest: {
      title: "Penetrationstest-Bericht",
      promptTitle: "Prompt: ECU Penetrationstest",
      prompt: `Erstelle einen detaillierten Bericht über einen durchgeführten Penetrationstest eines Automotive ECU-Systems mit folgenden Informationen:

- Getestete Komponente: Infotainment Head Unit mit Connectivity-Funktionen
- CAN-Bus Integration zur Fahrzeugdiagnose
- OTA-Update Funktionalität
- Bluetooth- und WiFi-Konnektivität
- 3rd Party App Store

Identifiziere realistische Schwachstellen, bewerte deren Risiken mit CVSS, gib klare Empfehlungen zur Behebung aus und stelle einen Zeitplan für Re-Tests vor. Der Bericht sollte automotive-spezifische Sicherheitsanforderungen berücksichtigen.`,
      response: `# Penetrationstest-Bericht: Infotainment Head Unit v3.2

## 1. Executive Summary

Im Auftrag der Fahrzeug-Cybersecurity-Abteilung wurde ein umfassender Penetrationstest der Infotainment Head Unit (IHU) mit Connectivity-Funktionen durchgeführt. Der Test identifizierte 8 Schwachstellen mit unterschiedlichen Schweregraden, wobei 2 als kritisch eingestuft wurden. Die kritischen Schwachstellen betreffen die OTA-Update-Funktionalität und die CAN-Bus-Integration, die bei Ausnutzung potenziell zu unbefugtem Zugriff auf fahrzeugrelevante Systeme führen könnten.

**Gesamtrisiko-Bewertung: HOCH**

| Schweregrad | Anzahl Schwachstellen |
|-------------|------------------------|
| Kritisch    | 2                      |
| Hoch        | 3                      |
| Mittel      | 2                      |
| Niedrig     | 1                      |

## 2. Testmethodik

Der Penetrationstest wurde gemäß UNECE R155-Anforderungen und dem TARA-basierten Testansatz (Threat Analysis and Risk Assessment) durchgeführt und umfasste:

- Statische Code-Analyse der Firmware
- Dynamische Analyse der Laufzeitumgebung
- Schnittstellen-Fuzzing (CAN, Bluetooth, WiFi, USB)
- Reverse Engineering der OTA-Update-Mechanismen
- Privilege Escalation Testing
- Authentifizierungs- und Autorisierungsprüfungen
- 3rd-Party-App-Isolation-Testing

Testperiode: 12.05.2023 - 26.05.2023

## 3. Detaillierte Schwachstellenanalyse

### 3.1 Kritische Schwachstellen

#### 3.1.1 Unsichere OTA-Update-Verifizierung (CVSS: 9.8)

**Schwachstelle:** Die Signaturprüfung der OTA-Update-Pakete verwendet einen veralteten Algorithmus (SHA-1) und die Validierung wird nicht konsequent durchgeführt, wenn Updates über den Engineering-Modus eingespielt werden.

**Risiko:** Angreifer könnten manipulierte Firmware einschleusen, die Kontrolle über die Head Unit erlangen und potenziell auf verbundene Fahrzeugsysteme zugreifen.

**Empfehlung:** 
- Upgrade auf SHA-256 für alle kryptografischen Signaturen
- Implementierung konsequenter Validierung ohne Ausnahmen
- Einführung eines mehrstufigen Verifizierungsprozesses mit Hardware-Root-of-Trust

#### 3.1.2 CAN-Bus-Zugriffskontrollumgehung (CVSS: 9.1)

**Schwachstelle:** Die Diagnostik-Schnittstelle zwischen Head Unit und CAN-Bus implementiert unzureichende Zugriffskontrollen. Nach Authentifizierung auf Anwendungsebene werden keine kontinuierlichen Berechtigungsprüfungen für CAN-Kommandos durchgeführt.

**Risiko:** Ein kompromittiertes App könnte nach initialer Authentifizierung unberechtigt auf sensible Diagnosefunktionen und CAN-Bus-Kommunikation zugreifen.

**Empfehlung:**
- Implementierung kontinuierlicher Authentifizierung für CAN-Kommandos
- Whitelist-basierter Ansatz für erlaubte CAN-Nachrichten pro Anwendung
- Einführung einer Security Gateway Funktion zwischen IHU und CAN-Bus

### 3.2 Hohe Schwachstellen

#### 3.2.1 Bluetooth Stack Overflow (CVSS: 8.2)

**Schwachstelle:** Die Bluetooth-Stack-Implementierung enthält einen Pufferüberlauf bei der Verarbeitung spezifischer A2DP-Pakete mit manipulierten Headern.

**Empfehlung:** 
- Patch des Bluetooth-Stacks gemäß Herstellerempfehlung BCT-2023-42
- Implementierung zusätzlicher Eingabevalidierung vor der Paketverarbeitung

#### 3.2.2 3rd Party App Sandbox Escape (CVSS: 7.8)

**Schwachstelle:** Apps aus dem 3rd Party Store können durch eine Kombination von Berechtigungen auf systemgeschützte Dateien zugreifen.

**Empfehlung:**
- Verschärfung des App-Berechtigungsmodells
- Implementierung verbesserter Isolation zwischen Apps
- Regelmäßiges Security-Review des App-Store-Onboarding-Prozesses

#### 3.2.3 Unverschlüsselte Konfigurationsdaten (CVSS: 7.1)

**Schwachstelle:** Sensible Konfigurationsdaten (inkl. Backend-Zugangsdaten) werden unverschlüsselt im Filesystem gespeichert.

**Empfehlung:**
- Verschlüsselung aller sensiblen Konfigurationsdaten
- Implementierung eines sicheren Schlüsselmanagements
- Entfernung von Hardcoded Credentials

### 3.3 Mittlere Schwachstellen

#### 3.3.1 WiFi WPA3-Downgrade (CVSS: 6.5)

**Schwachstelle:** Der WiFi-Stack ermöglicht Downgrade-Angriffe von WPA3 auf WPA2, wodurch fortgeschrittenere Angriffsmethoden möglich werden.

**Empfehlung:**
- Konfigurationsänderung zur Erzwingung von WPA3
- Implementierung von Anti-Downgrade-Mechanismen

#### 3.3.2 Schwache Browser Content Security Policy (CVSS: 5.4)

**Schwachstelle:** Der integrierte Browser verfügt über eine unzureichende Content Security Policy, wodurch XSS-Angriffe und Script-Injection möglich sind.

**Empfehlung:**
- Verschärfung der CSP gemäß OWASP-Empfehlungen
- Deaktivierung nicht benötigter Browser-Features
- Implementierung von URL-Whitelisting

### 3.4 Niedrige Schwachstellen

#### 3.4.1 Fehlende HTTP-Security-Header (CVSS: 3.7)

**Schwachstelle:** Bei HTTP-Verbindungen fehlen wichtige Security-Header wie X-Content-Type-Options und X-Frame-Options.

**Empfehlung:**
- Implementierung aller empfohlenen Security-Header
- Umstellung aller HTTP-Verbindungen auf HTTPS
- Regelmäßige Validierung mittels OWASP-Scanner

## 4. Mitigation Plan und Timeline

| ID | Schwachstelle | Priorität | Empfohlene Behebung bis | Re-Test geplant |
|----|---------------|-----------|-------------------------|-----------------|
| 3.1.1 | OTA-Update-Verifizierung | Kritisch | 15.06.2023 | 22.06.2023 |
| 3.1.2 | CAN-Bus-Zugriffskontrolle | Kritisch | 20.06.2023 | 27.06.2023 |
| 3.2.1 | Bluetooth Stack Overflow | Hoch | 30.06.2023 | 07.07.2023 |
| 3.2.2 | App Sandbox Escape | Hoch | 10.07.2023 | 17.07.2023 |
| 3.2.3 | Unverschlüsselte Konfig. | Hoch | 15.07.2023 | 22.07.2023 |
| 3.3.1 | WiFi WPA3-Downgrade | Mittel | 30.07.2023 | 05.08.2023 |
| 3.3.2 | Browser CSP | Mittel | 15.08.2023 | 22.08.2023 |
| 3.4.1 | HTTP-Security-Header | Niedrig | 30.08.2023 | 05.09.2023 |

## 5. Zusammenfassung und UNECE R155 Compliance

Die identifizierten Schwachstellen stellen signifikante Risiken dar, insbesondere im Hinblick auf die UNECE R155-Anforderungen zur Fahrzeug-Cybersecurity. Die kritischen Findings betreffen direkt die in R155 Annex 5 definierten Bedrohungskategorien:
- 7.3.1: Datenmanipulation
- 7.3.4: Unbefugter Zugriff auf Fahrzeugfunktionen
- 7.3.7: Datenintegrität

Für eine vollständige UNECE R155-Compliance müssen alle kritischen und hohen Schwachstellen behoben werden, bevor das Fahrzeug in die Produktion geht. Wir empfehlen außerdem eine Integration der erkannten Schwachstellenmuster in den TARA-Prozess für zukünftige Fahrzeugentwicklungen.

## 6. Anlagen
- Detaillierter technischer Testbericht (separat)
- Exploit Proof-of-Concept für kritische Findings (verschlüsselt)
- Empfohlene Code-Änderungen (Git-Patches)
- CVSS Detailberechnungen`
    }
  };

  // Setup tabs for use case sections
  const useCaseTabs = [
    {
      id: 'tisax',
      label: 'TISAX Compliance',
      content: (
        <div>
          <InfoCard 
            title={useCases.tisax.title}
            icon="shield"
            variant="info"
            className="mb-6"
          >
            <PText>{useCases.tisax.promptTitle}</PText>
          </InfoCard>

          <PGrid>
            <PGridItem size={12} className="mb-6 lg:mb-0 lg:pr-4 lg:w-5/12">
              <PHeading tag="h4" size="small" className="mb-3">Prompt</PHeading>
              <div className="p-4 rounded-md" style={{ 
                backgroundColor: 'var(--code-bg)',
                color: 'var(--code-fg)'
              }}>
                <pre className="whitespace-pre-wrap text-sm font-mono">{useCases.tisax.prompt}</pre>
              </div>
            </PGridItem>

            <PGridItem size={12} className="lg:w-7/12">
              <PHeading tag="h4" size="small" className="mb-3">KI-Antwort</PHeading>
              <div className="p-4 rounded-md overflow-auto max-h-[600px]" style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                border: '1px solid var(--border-color)',
                color: 'var(--foreground)'
              }}>
                <div className="markdown-content">
                  <div dangerouslySetInnerHTML={{ __html: useCases.tisax.response.replace(/\n/g, '<br />').replace(/^# (.*)/gm, '<h3>$1</h3>').replace(/^## (.*)/gm, '<h4>$1</h4>').replace(/^### (.*)/gm, '<h5>$1</h5>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                </div>
              </div>
            </PGridItem>
          </PGrid>
        </div>
      )
    },
    {
      id: 'securityKPIs',
      label: 'Security KPIs',
      content: (
        <div>
          <InfoCard 
            title={useCases.securityKPIs.title}
            icon="shield"
            variant="info"
            className="mb-6"
          >
            <PText>{useCases.securityKPIs.promptTitle}</PText>
          </InfoCard>

          <PGrid>
            <PGridItem size={12} className="mb-6 lg:mb-0 lg:pr-4 lg:w-5/12">
              <PHeading tag="h4" size="small" className="mb-3">Prompt</PHeading>
              <div className="p-4 rounded-md" style={{ 
                backgroundColor: 'var(--code-bg)',
                color: 'var(--code-fg)'
              }}>
                <pre className="whitespace-pre-wrap text-sm font-mono">{useCases.securityKPIs.prompt}</pre>
              </div>
            </PGridItem>

            <PGridItem size={12} className="lg:w-7/12">
              <PHeading tag="h4" size="small" className="mb-3">KI-Antwort</PHeading>
              <div className="p-4 rounded-md overflow-auto max-h-[600px]" style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                border: '1px solid var(--border-color)',
                color: 'var(--foreground)'
              }}>
                <div className="markdown-content">
                  <div dangerouslySetInnerHTML={{ __html: useCases.securityKPIs.response.replace(/\n/g, '<br />').replace(/^# (.*)/gm, '<h3>$1</h3>').replace(/^## (.*)/gm, '<h4>$1</h4>').replace(/^### (.*)/gm, '<h5>$1</h5>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                </div>
              </div>
            </PGridItem>
          </PGrid>
        </div>
      )
    },
    {
      id: 'pentest',
      label: 'Penetrationstests',
      content: (
        <div>
          <InfoCard 
            title={useCases.pentest.title}
            icon="shield"
            variant="info"
            className="mb-6"
          >
            <PText>{useCases.pentest.promptTitle}</PText>
          </InfoCard>

          <PGrid>
            <PGridItem size={12} className="mb-6 lg:mb-0 lg:pr-4 lg:w-5/12">
              <PHeading tag="h4" size="small" className="mb-3">Prompt</PHeading>
              <div className="p-4 rounded-md" style={{ 
                backgroundColor: 'var(--code-bg)',
                color: 'var(--code-fg)'
              }}>
                <pre className="whitespace-pre-wrap text-sm font-mono">{useCases.pentest.prompt}</pre>
              </div>
            </PGridItem>

            <PGridItem size={12} className="lg:w-7/12">
              <PHeading tag="h4" size="small" className="mb-3">KI-Antwort</PHeading>
              <div className="p-4 rounded-md overflow-auto max-h-[600px]" style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                border: '1px solid var(--border-color)',
                color: 'var(--foreground)'
              }}>
                <div className="markdown-content">
                  <div dangerouslySetInnerHTML={{ __html: useCases.pentest.response.replace(/\n/g, '<br />').replace(/^# (.*)/gm, '<h3>$1</h3>').replace(/^## (.*)/gm, '<h4>$1</h4>').replace(/^### (.*)/gm, '<h5>$1</h5>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                </div>
              </div>
            </PGridItem>
          </PGrid>
        </div>
      )
    }
  ];

  return (
    <div className="w-full">
      <PHeading tag="h3" size="medium" className="mb-4">{title}</PHeading>
      <PText className="mb-6">{description}</PText>

      <PGrid>
        <PGridItem size={12}>
          <Tabs
            tabs={useCaseTabs}
            defaultTabId="tisax"
            variant="pills"
            className="w-full"
          />
        </PGridItem>
      </PGrid>
    </div>
  );
};

export default UseCaseExamples; 