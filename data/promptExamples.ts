export const promptExamples = [
  {
    bad: {
      prompt: "Gib mir Informationen über Autos.",
      explanation: "Dieser Prompt ist zu vage und spezifiziert nicht, welche Art von Informationen benötigt werden oder für welchen Zweck.",
      problems: [
        "Mangelnde Spezifität bezüglich der benötigten Informationen",
        "Kein Kontext über den beabsichtigten Anwendungsfall",
        "Keine Einschränkungen oder Formatierungsanforderungen",
        "Wird wahrscheinlich zu generischen Informationen führen, die nicht nützlich sind"
      ]
    },
    good: {
      prompt: "Erstelle einen Vergleich von Elektrofahrzeugen vs. Wasserstoff-Brennstoffzellenfahrzeugen für eine Präsentation für Automobilingenieure. Berücksichtige: 1) Effizienzmetriken, 2) Infrastrukturanforderungen, 3) aktuelle Marktakzeptanz und 4) prognostizierter Zeitplan für die Massenproduktion. Formatiere als Aufzählungspunkte mit hervorgehobenen Schlüsselmetriken.",
      explanation: "Dieser Prompt spezifiziert klar das Thema, den Zweck, die Zielgruppe, die erforderlichen Informationen und das gewünschte Ausgabeformat.",
      improvements: [
        "Gibt die exakten benötigten Informationskategorien an",
        "Liefert Kontext (Präsentation für Automobilingenieure)",
        "Enthält Anforderungen an das Ausgabeformat",
        "Verwendet Nummerierung für bessere Organisation",
        "Konzentriert sich auf professionelle, technische Informationen"
      ]
    },
    metrics: {
      tokensReduced: 40,
      qualityIncrease: 85,
      responseTime: {
        before: "2,8s",
        after: "1,7s"
      }
    }
  },
  {
    bad: {
      prompt: "Ich brauche Code für ein Login-Formular.",
      explanation: "Dieser Prompt enthält keine Details zur Technologie, zum Styling, zu erforderlichen Feldern und Validierungsanforderungen.",
      problems: [
        "Keine Angabe der Programmiersprache oder des Frameworks",
        "Fehlende Anforderungen für Formularfelder und Validierung",
        "Keine Styling- oder UX-Richtlinien",
        "Unklar bezüglich der Authentifizierungsmethode oder Sicherheitsanforderungen"
      ]
    },
    good: {
      prompt: "Erstelle eine React-Login-Formular-Komponente mit E-Mail- und Passwortfeldern unter Verwendung des Porsche Design Systems (PDS). Implementiere Formularvalidierung für E-Mail-Format und Passwortstärke (min. 8 Zeichen, erfordert Sonderzeichen). Zeige entsprechende Fehlermeldungen unter jedem Feld an. Füge eine 'Angemeldet bleiben'-Checkbox und einen 'Passwort vergessen'-Link hinzu. Das Formular soll die Übermittlung durch Aufruf einer 'onSubmit'-Prop-Funktion mit den Formularwerten handhaben.",
      explanation: "Dieser Prompt spezifiziert den Technologie-Stack, die UI-Komponenten, die Validierungsanforderungen und die Verhaltenserwartungen.",
      improvements: [
        "Spezifiziert Framework (React) und Design-System (PDS)",
        "Detailliert die erforderlichen Felder und ihre Validierungsregeln",
        "Enthält Spezifikationen zur Fehlerbehandlung",
        "Beschreibt zusätzlich benötigte UI-Elemente",
        "Erklärt, wie die Formularübermittlung funktionieren soll"
      ]
    },
    metrics: {
      tokensReduced: 30,
      qualityIncrease: 90,
      responseTime: {
        before: "3,2s",
        after: "2,1s"
      }
    }
  },
  {
    bad: {
      prompt: "Schreibe Dokumentation für das Authentifizierungssystem.",
      explanation: "Dieser Prompt spezifiziert nicht die Zielgruppe, den Detailgrad oder die Schwerpunktbereiche für die Dokumentation.",
      problems: [
        "Keine Angabe der Zielgruppe (Entwickler, Benutzer, Administratoren?)",
        "Unklar, welche Aspekte der Authentifizierung dokumentiert werden sollen",
        "Fehlende Formatierungs- und Strukturierungsrichtlinien",
        "Kein Kontext über die Implementierung des Authentifizierungssystems"
      ]
    },
    good: {
      prompt: "Erstelle technische Dokumentation für unser OAuth 2.0-Authentifizierungssystem für Backend-Entwickler. Beinhalte:\n\n1. Überblick über den Ablauf mit einem Sequenzdiagramm\n2. API-Endpunkte mit Anfrage/Antwort-Beispielen in JSON\n3. Fehlercodes und Schritte zur Fehlerbehebung\n4. Sicherheits-Best-Practices\n5. Implementierungsbeispiele in Node.js\n\nFormatiere mit Markdown-Überschriften, Codeblöcken für Beispiele und Callouts für wichtige Sicherheitshinweise.",
      explanation: "Dieser Prompt definiert klar die Zielgruppe, die Inhaltsstruktur, den technischen Fokus und die Formatierungsanforderungen.",
      improvements: [
        "Spezifiziert die Zielgruppe (Backend-Entwickler)",
        "Bietet eine klare Struktur mit nummerierten Abschnitten",
        "Details zum Authentifizierungsprotokoll (OAuth 2.0)",
        "Fordert spezifische Beispiele und Diagramme an",
        "Enthält Formatierungsanweisungen für bessere Lesbarkeit"
      ]
    },
    metrics: {
      tokensReduced: 25,
      qualityIncrease: 75,
      responseTime: {
        before: "4,5s",
        after: "3,2s"
      }
    }
  }
];

export const automotivePromptExamples = [
  {
    bad: {
      prompt: "Analysiere diese CAN-Bus-Daten und sag mir, was falsch ist.",
      explanation: "Dieser Prompt liefert keinen Kontext über das Fahrzeugsystem, das erwartete Verhalten oder spezifische Bedenken.",
      problems: [
        "Keine spezifischen CAN-Daten bereitgestellt oder Format definiert",
        "Mangelnder Kontext über das zu analysierende Fahrzeugsystem",
        "Keine Informationen über Symptome oder erwartetes Verhalten",
        "Spezifiziert nicht, nach welchen Arten von Problemen gesucht werden soll"
      ]
    },
    good: {
      prompt: "Analysiere das beigefügte CAN-Bus-Protokoll eines 2023 Porsche Taycan, das intermittierende Fehler im Batteriemanagementsystem zeigt. Konzentriere dich auf die Zeitstempel 14:32-14:35, als das Fahrzeug eine Leistungsbegrenzung erfuhr. Identifiziere Anomalien in der BMS-Modul-Kommunikation (ID-Bereich 0x620-0x640), insbesondere bei Temperatursensor-Werten und Zellausgleichsmeldungen. Formatiere deine Analyse mit: 1) Zusammenfassung der Ergebnisse, 2) Identifizierte Anomalien mit Zeitstempeln, 3) Potenzielle Ursachen und 4) Empfohlene Diagnoseschritte.",
      explanation: "Dieser Prompt bietet spezifischen Kontext, Datenschwerpunktbereiche und die gewünschte Ausgabestruktur für eine effektive Fehlersuche.",
      improvements: [
        "Spezifiziert das genaue Fahrzeugmodell und -system",
        "Identifiziert Zeitbereiche von Interesse und Symptome",
        "Begrenzt die Analyse auf bestimmte CAN-ID-Bereiche",
        "Fordert strukturierte Ausgabe mit handlungsorientierten Abschnitten",
        "Nennt spezifische Parameter zur Untersuchung (Temperatur, Zellausgleichung)"
      ]
    },
    metrics: {
      tokensReduced: 15,
      qualityIncrease: 95,
      responseTime: {
        before: "5,1s",
        after: "3,8s"
      }
    }
  },
  {
    bad: {
      prompt: "Hilf mir bei der Fehlersuche dieses autonomen Fahrproblems.",
      explanation: "Dieser Prompt ist zu allgemein und enthält keine Details zum spezifischen autonomen Fahrproblem oder zu Systemkomponenten.",
      problems: [
        "Keine Beschreibung des beobachteten Problems oder der Symptome",
        "Fehlende Informationen über die Architektur des autonomen Systems",
        "Keine Angabe zu Sensortypen oder Software-Stack",
        "Mangel an Fehlerprotokollen oder Diagnoseinformationen"
      ]
    },
    good: {
      prompt: "Hilf bei der Fehlersuche eines Problems mit unserer Autobahnspurhaltefunktion im ADAS-System. Das Fahrzeug (Porsche Macan EV Prototyp) driftet bei Kurven mit Radius >500m bei Autobahngeschwindigkeiten (120+ km/h) zur rechten Fahrbahnbegrenzung. Das Problem tritt nicht bei niedrigeren Geschwindigkeiten oder schärferen Kurven auf.\n\nRelevante Komponenten:\n- Frontkamera mit Spurerkennung (Lieferant: Mobileye)\n- Lenksteuerungsmodul (hauseigen)\n- Fahrdynamikmodul (liest Querbeschleunigung)\n\nBeigefügte Protokolle zeigen:\n1. Spurerkennungssicherheit bleibt hoch (95%+)\n2. Lenkbefehle erscheinen korrekt, aber tatsächlicher Lenkwinkel verzögert sich\n3. Fahrdynamik zeigt höher als erwartete Seitenkräfte\n\nWelche Diagnoseschritte sollten wir unternehmen, um zu isolieren, ob es sich um ein Erkennungsproblem, ein Kontrollalgorithmusproblem oder eine mechanische Einschränkung handelt?",
      explanation: "Dieser Prompt liefert umfassende Details zum spezifischen Problem, zu betroffenen Komponenten, zum beobachteten Verhalten und zu relevanten Umgebungsfaktoren.",
      improvements: [
        "Beschreibt die spezifische Funktion und das beobachtete Verhalten",
        "Enthält Details zum Fahrzeugtyp und zu Bedingungen",
        "Listet die relevanten Systemkomponenten auf",
        "Bietet beobachtete Diagnoseinformationen",
        "Fragt nach spezifischen nächsten Schritten anstatt nach einer allgemeinen Lösung"
      ]
    },
    metrics: {
      tokensReduced: 20,
      qualityIncrease: 90,
      responseTime: {
        before: "4,7s",
        after: "3,3s"
      }
    }
  }
]; 