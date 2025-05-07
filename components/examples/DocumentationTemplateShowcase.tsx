"use client";

import React, { useState } from 'react';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import InfoCard from '@/components/ui/InfoCard';

interface TemplateData {
  title: string;
  description: string;
  template: string;
}

interface Templates {
  [key: string]: TemplateData;
}

interface DocumentationTemplateShowcaseProps {
  title: string;
  description: string;
}

const DocumentationTemplateShowcase: React.FC<DocumentationTemplateShowcaseProps> = ({ 
  title, 
  description 
}) => {
  const [activeTemplate, setActiveTemplate] = useState('componentDoc');

  // Documentation templates
  const templates: Templates = {
    componentDoc: {
      title: "ECU Komponentendokumentation",
      description: "Standardisierte Struktur für die Dokumentation von ECU-Komponenten im Fahrzeug",
      template: `# [ECU-Name] Komponentendokumentation
Version: [Version]
Datum: [Datum]
Status: [Entwurf/Review/Freigegeben]
Verantwortlich: [Name]

## 1. Übersicht
[Kurze Beschreibung der ECU-Komponente und ihrer Hauptfunktionen]

## 2. Spezifikationen
- **Teilenummer:** [Teilenummer]
- **Hardware-Version:** [HW-Version]
- **Software-Version:** [SW-Version]
- **Speicher:** [RAM/Flash]
- **Prozessor:** [Prozessortyp]
- **Kommunikationsschnittstellen:** [CAN/LIN/Ethernet/etc.]
- **Stromversorgung:** [Spannungsbereich]
- **Betriebstemperaturbereich:** [Min-Max °C]

## 3. Funktionsbeschreibung
### 3.1 Hauptfunktionen
- [Auflistung Hauptfunktion 1]
- [Auflistung Hauptfunktion 2]
- [...]

### 3.2 Diagnosefunktionen
- [Diagnosefunktion 1]
- [Diagnosefunktion 2]
- [...]

## 4. Schnittstellen
### 4.1 CAN-Bus Kommunikation
| Botschaft ID | Name | Richtung | DLC | Zykluszeit | Beschreibung |
|-------------|------|-----------|-----|------------|--------------|
| [ID] | [Name] | [Rx/Tx] | [Bytes] | [ms] | [Beschreibung] |
| [...] | [...] | [...] | [...] | [...] | [...] |

### 4.2 Elektrische Anschlüsse
| Pin | Bezeichnung | Typ | Beschreibung |
|-----|-------------|-----|--------------|
| [Pin] | [Name] | [Eingang/Ausgang] | [Beschreibung] |
| [...] | [...] | [...] | [...] |

## 5. Konfigurationsparameter
| Parameter | Standardwert | Bereich | Beschreibung |
|-----------|--------------|---------|--------------|
| [Name] | [Default] | [Min-Max] | [Beschreibung] |
| [...] | [...] | [...] | [...] |

## 6. Fehlercodes
| DTC | Beschreibung | Fehlerkriterien | Empfohlene Maßnahme |
|-----|--------------|-----------------|---------------------|
| [Code] | [Beschreibung] | [Auslösekriterien] | [Maßnahme] |
| [...] | [...] | [...] | [...] |

## 7. Sicherheitsanforderungen
- [Sicherheitsfunktion 1]
- [Sicherheitsfunktion 2]
- [...]

## 8. Testspezifikation
- [Testfall 1]
- [Testfall 2]
- [...]

## 9. Änderungshistorie
| Version | Datum | Autor | Änderungen |
|---------|-------|-------|------------|
| [Version] | [Datum] | [Name] | [Beschreibung] |
| [...] | [...] | [...] | [...] |

## 10. Anhänge
- [Anhang 1]
- [Anhang 2]
- [...]`
    },
    securityAnalysis: {
      title: "Automotive Security Analysis",
      description: "Strukturierte Vorlage zur Dokumentation von Sicherheitsanalysen für Fahrzeugsysteme nach UNECE R155/ISO 21434",
      template: `# Cybersecurity Analyse: [System/Komponente]
Version: [Version]
Datum: [Datum]
Klassifizierung: [Vertraulich]
Verantwortlich: [Name]

## 1. Executive Summary
[Zusammenfassung der wichtigsten Ergebnisse und Risikobewertung]

## 2. Systembeschreibung
### 2.1 Komponenten
- [Komponente 1]
- [Komponente 2]
- [...]

### 2.2 Systemgrenzen
[Beschreibung der Systemgrenzen und Schnittstellen]

### 2.3 Vertrauensbereiche
[Identifikation der Vertrauensbereiche und Security Domains]

## 3. Threat Assessment und Risk Analysis (TARA)
### 3.1 Identifizierte Assets
| Asset | Beschreibung | Schutzziel | Kritikalität |
|-------|--------------|------------|--------------|
| [Asset 1] | [Beschreibung] | [C/I/A] | [Hoch/Mittel/Niedrig] |
| [...] | [...] | [...] | [...] |

### 3.2 Bedrohungsszenarien
| ID | Bedrohung | Angriffspfad | Auswirkung | Wahrscheinlichkeit | Risiko |
|----|-----------|--------------|------------|---------------------|--------|
| [ID] | [Beschreibung] | [Pfad] | [Auswirkung] | [Hoch/Mittel/Niedrig] | [Hoch/Mittel/Niedrig] |
| [...] | [...] | [...] | [...] | [...] | [...] |

### 3.3 CVSS Bewertung kritischer Bedrohungen
| Bedrohungs-ID | CVSS Score | Vector String | Klassifizierung |
|---------------|------------|---------------|-----------------|
| [ID] | [Score] | [String] | [Kritisch/Hoch/Mittel/Niedrig] |
| [...] | [...] | [...] | [...] |

## 4. Sicherheitskontrollen
### 4.1 Implementierte Kontrollen
| Kontrolle | Adressierte Bedrohungen | Typ | Implementierungsstatus |
|-----------|--------------------------|-----|------------------------|
| [Kontrolle] | [Bedrohungs-IDs] | [Präventiv/Detektiv/Korrektiv] | [Implementiert/Geplant] |
| [...] | [...] | [...] | [...] |

### 4.2 Empfohlene Kontrollen
| Kontrolle | Adressierte Bedrohungen | Typ | Priorität |
|-----------|--------------------------|-----|-----------|
| [Kontrolle] | [Bedrohungs-IDs] | [Präventiv/Detektiv/Korrektiv] | [Hoch/Mittel/Niedrig] |
| [...] | [...] | [...] | [...] |

## 5. Regulatory Compliance
### 5.1 UNECE R155 Anforderungen
| Anforderung | Status | Nachweis |
|-------------|--------|----------|
| [Anforderung] | [Erfüllt/Teilweise erfüllt/Nicht erfüllt] | [Nachweisdokument] |
| [...] | [...] | [...] |

### 5.2 ISO 21434 Compliance
| Klausel | Status | Nachweis |
|---------|--------|----------|
| [Klausel] | [Erfüllt/Teilweise erfüllt/Nicht erfüllt] | [Nachweisdokument] |
| [...] | [...] | [...] |

## 6. Penetrationstest-Ergebnisse
### 6.1 Testumfang
[Beschreibung des Testumfangs und der Methodik]

### 6.2 Identifizierte Schwachstellen
| ID | Schwachstelle | Betroffene Komponente | Schweregrad | Status |
|----|---------------|------------------------|-------------|--------|
| [ID] | [Beschreibung] | [Komponente] | [Kritisch/Hoch/Mittel/Niedrig] | [Offen/In Bearbeitung/Behoben] |
| [...] | [...] | [...] | [...] | [...] |

## 7. Risikominderungsplan
| Maßnahme | Verantwortlicher | Fälligkeitsdatum | Status |
|----------|------------------|------------------|--------|
| [Maßnahme] | [Name] | [Datum] | [Offen/In Bearbeitung/Abgeschlossen] |
| [...] | [...] | [...] | [...] |

## 8. Schlussfolgerungen und Empfehlungen
[Zusammenfassung der Hauptergebnisse und Empfehlungen]

## 9. Anhänge
- [Anhang 1]
- [Anhang 2]
- [...]`
    },
    testSpec: {
      title: "Automotive Test Spezifikation",
      description: "Standardisierte Template für die Dokumentation von Testspezifikationen für Fahrzeugsoftware",
      template: `# Test Spezifikation: [System/Komponente]
Version: [Version]
Datum: [Datum]
Status: [Entwurf/Review/Freigegeben]
Verantwortlich: [Name]

## 1. Einleitung
### 1.1 Zweck
[Beschreibung des Zwecks dieser Testspezifikation]

### 1.2 Umfang
[Beschreibung des Testumfangs, einschließlich Ein- und Ausschlüsse]

### 1.3 Referenzdokumente
- [Anforderungsspezifikation]
- [Systemdesigndokument]
- [Andere relevante Dokumente]

## 2. Testumgebung
### 2.1 Hardware
- [Benötigte Testgeräte]
- [Hardware-Konfiguration]
- [Fahrzeugtyp/Varianten]

### 2.2 Software
- [Testsoftware]
- [Diagnosetools]
- [Software-Version]

### 2.3 Spezielle Anforderungen
- [Umgebungsbedingungen]
- [Besondere Einrichtungen]
- [Sicherheitsanforderungen]

## 3. Testdurchführung
### 3.1 Testvorbereitung
- [Konfigurationsschritte]
- [Voraussetzungen]
- [Initialzustand]

### 3.2 Standardabläufe
- [Standardaktionen für alle Tests]
- [Fehlerbehandlung]
- [Dokumentation]

## 4. Testfälle

### Test ID: [TC-001]
**Titel:** [Testfallname]

**Ziel:** [Kurzbeschreibung des Testziels]

**Vorbedingungen:**
- [Vorbedingung 1]
- [Vorbedingung 2]

**Testschritte:**
1. [Schritt 1]
2. [Schritt 2]
3. [...]

**Erwartetes Ergebnis:**
- [Erwartetes Ergebnis 1]
- [Erwartetes Ergebnis 2]

**Anforderungsreferenz:** [REQ-ID]

**Priorität:** [Hoch/Mittel/Niedrig]

**Besondere Hinweise:**
[Zusätzliche Informationen oder Hinweise]

### Test ID: [TC-002]
**Titel:** [Testfallname]

**Ziel:** [Kurzbeschreibung des Testziels]

**Vorbedingungen:**
- [Vorbedingung 1]
- [Vorbedingung 2]

**Testschritte:**
1. [Schritt 1]
2. [Schritt 2]
3. [...]

**Erwartetes Ergebnis:**
- [Erwartetes Ergebnis 1]
- [Erwartetes Ergebnis 2]

**Anforderungsreferenz:** [REQ-ID]

**Priorität:** [Hoch/Mittel/Niedrig]

**Besondere Hinweise:**
[Zusätzliche Informationen oder Hinweise]

## 5. Testmetriken
### 5.1 Testabdeckung
- [Anforderungsabdeckung]
- [Codeabdeckung]
- [Funktionsabdeckung]

### 5.2 Erfolgskriterien
- [Akzeptanzkriterien]
- [Mindesttestabdeckung]
- [Maximale Anzahl an Fehlern pro Kategorie]

## 6. Testzeitplan
| Phase | Start | Ende | Verantwortlicher |
|-------|-------|------|------------------|
| [Phase] | [Datum] | [Datum] | [Name] |
| [...] | [...] | [...] | [...] |

## 7. Rollen und Verantwortlichkeiten
| Rolle | Verantwortlichkeit | Person |
|-------|---------------------|--------|
| [Rolle] | [Beschreibung] | [Name] |
| [...] | [...] | [...] |

## 8. Risiken und Annahmen
- [Risiko 1]
- [Risiko 2]
- [Annahme 1]
- [...]

## 9. Anhänge
- [Anhang 1]
- [Anhang 2]
- [...]`
    }
  };

  // Function to handle template selection
  const handleTemplateChange = (templateId: string) => {
    setActiveTemplate(templateId);
  };

  return (
    <div className="w-full">
      <PHeading tag="h3" size="medium" className="mb-4">{title}</PHeading>
      <PText className="mb-6">{description}</PText>

      <PGrid>
        <PGridItem size={12} className="mb-8">
          <InfoCard 
            title="Automotive Dokumentationsvorlagen"
            icon="document"
            variant="info"
            className="mb-4"
          >
            <PText>KI-optimierte Templates für die Erstellung konsistenter und vollständiger technischer Dokumentation</PText>
          </InfoCard>
          
          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-4/12">
              <PHeading tag="h4" size="small" className="mb-4">Vorlagentypen</PHeading>
              <div className="space-y-2">
                {Object.entries(templates).map(([id, template]) => (
                  <div 
                    key={id}
                    style={{
                      backgroundColor: activeTemplate === id 
                        ? 'var(--blue-bg)' 
                        : 'var(--card-bg)',
                      borderColor: activeTemplate === id 
                        ? 'var(--blue-border)' 
                        : 'var(--border-color)',
                      color: 'var(--foreground)'
                    }}
                    className={`p-4 border rounded-md cursor-pointer transition-colors ${
                      activeTemplate === id 
                        ? '' 
                        : 'hover:bg-opacity-80'
                    }`}
                    onClick={() => handleTemplateChange(id)}
                  >
                    <PHeading tag="h5" size="small" className="mb-1">{template.title}</PHeading>
                    <PText className="text-sm">{template.description}</PText>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-8/12">
              <PHeading tag="h4" size="small" className="mb-4">
                {templates[activeTemplate].title}
              </PHeading>
              <div className="p-4 rounded-md h-[600px] overflow-auto" style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--foreground)'
              }}>
                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {templates[activeTemplate].template}
                </pre>
              </div>
              
              <div className="mt-4">
                <PText className="text-sm mb-2">
                  <strong>KI-Prompt für Dokumentationserstellung:</strong>
                </PText>
                <div className="p-4 rounded-md" style={{
                  backgroundColor: 'var(--code-bg)',
                  color: 'var(--code-fg)'
                }}>
                  <pre className="text-sm font-mono whitespace-pre-wrap">{`Erstelle eine ${templates[activeTemplate].title} für [KOMPONENTE] nach folgendem Template:

${templates[activeTemplate].template.split('\n').slice(0, 5).join('\n')}
...

Fülle alle Platzhalter mit realistischen Informationen für [KOMPONENTE].`}</pre>
                </div>
              </div>
            </div>
          </div>
        </PGridItem>

        <PGridItem size={12}>
          <div className="rounded-md p-6" style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            color: 'var(--foreground)'
          }}>
            <PHeading tag="h4" size="small" className="mb-4">Vorteile der KI-gestützten Dokumentationserstellung</PHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-md shadow-sm" style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--foreground)'
              }}>
                <div className="font-semibold mb-2">Konsistenz</div>
                <PText className="text-sm">Standardisierte Templates gewährleisten eine einheitliche Struktur und Terminologie über alle Dokumente hinweg.</PText>
              </div>
              <div className="p-4 rounded-md shadow-sm" style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--foreground)'
              }}>
                <div className="font-semibold mb-2">Effizienz</div>
                <PText className="text-sm">Reduzierte Erstellungszeit durch automatisierte Inhaltsvorschläge und Formatierungen.</PText>
              </div>
              <div className="p-4 rounded-md shadow-sm" style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--foreground)'
              }}>
                <div className="font-semibold mb-2">Vollständigkeit</div>
                <PText className="text-sm">Sicherstellung, dass alle erforderlichen Informationen erfasst werden, ohne wichtige Aspekte zu übersehen.</PText>
              </div>
              <div className="p-4 rounded-md shadow-sm" style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--foreground)'
              }}>
                <div className="font-semibold mb-2">Compliance</div>
                <PText className="text-sm">Integration branchenspezifischer Standards und Regulierungsanforderungen in die Dokumentationsstruktur.</PText>
              </div>
              <div className="p-4 rounded-md shadow-sm" style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--foreground)'
              }}>
                <div className="font-semibold mb-2">Wartbarkeit</div>
                <PText className="text-sm">Vereinfachte Aktualisierung und Versionierung durch einheitliche Struktur und automatische Änderungsverfolgung.</PText>
              </div>
              <div className="p-4 rounded-md shadow-sm" style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--foreground)'
              }}>
                <div className="font-semibold mb-2">Wissensmanagement</div>
                <PText className="text-sm">Erleichterter Wissenstransfer zwischen Teams und verbesserte Onboarding-Erfahrung für neue Mitarbeiter.</PText>
              </div>
            </div>
          </div>
        </PGridItem>
      </PGrid>
    </div>
  );
};

export default DocumentationTemplateShowcase; 