'use client';

import React, { useState } from 'react';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import InfoCard from '@/components/ui/InfoCard';
import Tabs from '@/components/ui/Tabs';
import { useTheme } from '@/lib/themeContext';

interface CodeSnippetProps {
  code: string;
  language: string;
  title?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language, title }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
      {title && (
        <div 
          className="py-2 px-4 font-medium text-sm"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.8)',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          {title}
        </div>
      )}
      <pre 
        className="px-4 py-3 overflow-x-auto text-sm"
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(243, 244, 246, 0.8)',
          color: isDarkMode ? '#e5e7eb' : '#1f2937'
        }}
      ><code>{code}</code></pre>
    </div>
  );
};

const DevelopmentAlternatives: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  // Example Python code for generating fake data
  const pythonFakeDataCode = `import pandas as pd
import numpy as np
from faker import Faker

# Initialize Faker
fake = Faker('de_DE')

# Generate synthetic customer data
def generate_customer_data(num_records=1000):
    customers = []
    
    for _ in range(num_records):
        customer = {
            'customer_id': fake.uuid4(),
            'name': fake.name(),
            'email': fake.email(),
            'phone': fake.phone_number(),
            'address': fake.address(),
            'registration_date': fake.date_between(start_date='-5y', end_date='today'),
            'last_purchase': fake.date_between(start_date='-1y', end_date='today'),
            'purchase_count': np.random.randint(1, 100),
            'total_spent': round(np.random.uniform(100, 10000), 2),
            'customer_segment': np.random.choice(['Premium', 'Standard', 'Basic'], p=[0.2, 0.5, 0.3])
        }
        customers.append(customer)
    
    return pd.DataFrame(customers)

# Generate sample data
customer_df = generate_customer_data(1000)

# Save to CSV for use in development
customer_df.to_csv('sample_customer_data.csv', index=False)
print(f"Generated {len(customer_df)} sample customer records")`;

  // Example Python code for sentiment analysis
  const pythonSentimentCode = `import pandas as pd
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from transformers import pipeline

# Load your customer feedback data (in development, use generated data)
# In production, replace with actual customer data source
feedback_data = pd.read_csv('sample_customer_feedback.csv')

# Initialize sentiment analyzer
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

# For more advanced analysis, use HuggingFace Transformers
sentiment_pipeline = pipeline("sentiment-analysis", model="oliverguhr/german-sentiment-bert")

def analyze_feedback(text):
    # Basic sentiment analysis
    sentiment_score = sia.polarity_scores(text)
    
    # Advanced sentiment analysis (using pre-trained model)
    advanced_result = sentiment_pipeline(text)[0]
    
    return {
        'text': text,
        'basic_score': sentiment_score['compound'],
        'advanced_sentiment': advanced_result['label'],
        'confidence': advanced_result['score']
    }

# Process all feedback entries
results = []
for _, row in feedback_data.iterrows():
    result = analyze_feedback(row['feedback_text'])
    results.append(result)

# Create results dataframe
results_df = pd.DataFrame(results)

# Generate summary statistics
positive_feedback = results_df[results_df['advanced_sentiment'] == 'positive'].shape[0]
negative_feedback = results_df[results_df['advanced_sentiment'] == 'negative'].shape[0]
print(f"Positive feedback: {positive_feedback} ({positive_feedback/len(results_df)*100:.1f}%)")
print(f"Negative feedback: {negative_feedback} ({negative_feedback/len(results_df)*100:.1f}%)")`;

  // Example Power Automate flow description
  const powerAutomateExample = `
1. Trigger: Bei Hinzufügen eines neuen Eintrags in der 'Kundenfeedback' SharePoint-Liste
2. Aktion: HTTP-Anfrage an Cognitive Services Text Analytics API (oder Azure OpenAI)
   - Extrahieren des Feedbacktextes aus dem SharePoint-Eintrag
   - Senden des Textes zur Stimmungsanalyse
3. Bedingung: Prüfen des Stimmungswerts
   - Wenn Wert < 0.3 (negativ): E-Mail an Support-Team mit Feedback-Details
   - Wenn Wert > 0.7 (positiv): Feedback in 'Positive Erfahrungen' SharePoint-Liste speichern
4. Aktion: Aktualisieren des originalen SharePoint-Eintrags mit Stimmungswerten
5. Aktion: Kategorien aus dem Feedback extrahieren und als Tags hinzufügen
6. Aktion: Power BI Dataset aktualisieren für Dashboards`;

  return (
    <div className="development-alternatives">
      <div className="mb-6">
        <PHeading tag="h3" size="medium" className="mb-3">
          Alternative Entwicklungsansätze für KI-Anwendungsfälle
        </PHeading>
        <PText className="mb-6">
          Viele KI-Anwendungsfälle können auch mit alternativen Methoden wie Python-Skripten mit 
          generierten Fake-Daten während der Entwicklung oder mit Hilfe der Power Platform umgesetzt werden.
          Diese Ansätze bieten oft Vorteile wie schnellere Entwicklung, lokale Ausführung und einfachere 
          Integration in bestehende Systeme.
        </PText>
      </div>
      
      <div className="p-4 rounded-lg mb-8" style={{ 
        backgroundColor: isDarkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(219, 234, 254, 0.8)',
        border: `1px solid ${isDarkMode ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.2)'}`
      }}>
        <div className="flex items-start">
          <div className="mr-3 text-blue-500 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <PText className="text-sm">
            <strong>Wichtiger Hinweis:</strong> Die meisten KI-Anwendungsfälle können auch mit Python-Skripten mit
            generierten Testdaten während der Entwicklungsphase erstellt werden. Diese Skripte können dann lokal oder
            mit Hilfe der Power Platform ausgeführt werden. Dieser Ansatz ermöglicht eine schnellere Entwicklung,
            bessere Kontrolle über die Daten und vereinfacht den Übergang zur Produktionsumgebung.
          </PText>
        </div>
      </div>
      
      <Tabs
        tabs={[
          {
            id: 'python',
            label: 'Python-Entwicklung',
            content: (
              <div className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <PHeading tag="h4" size="small" className="mb-3">
                      Entwicklung mit Python und Testdaten
                    </PHeading>
                    <PText className="text-sm mb-4">
                      Python bietet ein umfangreiches Ökosystem an Bibliotheken für Datenverarbeitung, maschinelles Lernen und KI.
                      Mit Python-Skripten können Sie Testdaten generieren, Modelle trainieren und komplexe Analysen durchführen,
                      ohne auf externe KI-Dienste angewiesen zu sein.
                    </PText>
                    
                    <InfoCard title="Vorteile der Python-Entwicklung" variant="info">
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Vollständige Kontrolle über den Entwicklungsprozess</li>
                        <li>Lokale Ausführung ohne externe Abhängigkeiten</li>
                        <li>Kosteneinsparungen bei der Entwicklung</li>
                        <li>Einfache Integration in bestehende Systeme</li>
                        <li>Breites Ökosystem an KI- und ML-Bibliotheken</li>
                      </ul>
                    </InfoCard>
                  </div>
                  
                  <div>
                    <PHeading tag="h4" size="small" className="mb-3">
                      Generierung von Testdaten
                    </PHeading>
                    <PText className="text-sm mb-4">
                      Die Bibliothek "Faker" ermöglicht die einfache Generierung realistischer Testdaten für verschiedene
                      Anwendungsfälle. Dies ist besonders nützlich, wenn Sie mit sensiblen Daten arbeiten oder noch keinen
                      Zugriff auf Produktionsdaten haben.
                    </PText>
                    
                    <CodeSnippet 
                      language="python" 
                      title="Generierung synthetischer Kundendaten mit Python" 
                      code={pythonFakeDataCode} 
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <PHeading tag="h4" size="small" className="mb-3">
                    Beispiel: Stimmungsanalyse mit Python
                  </PHeading>
                  <PText className="text-sm mb-4">
                    Statt externe KI-Dienste zu nutzen, können Sie eine Stimmungsanalyse mit vortrainierten
                    Modellen wie NLTK oder Hugging Face Transformers implementieren. Diese können lokal ausgeführt
                    und später in Produktionsumgebungen integriert werden.
                  </PText>
                  
                  <CodeSnippet 
                    language="python" 
                    title="Stimmungsanalyse für Kundenfeedback mit Python" 
                    code={pythonSentimentCode} 
                  />
                </div>
              </div>
            ),
          },
          {
            id: 'power-platform',
            label: 'Power Platform',
            content: (
              <div className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <PHeading tag="h4" size="small" className="mb-3">
                      Low-Code-Entwicklung mit der Power Platform
                    </PHeading>
                    <PText className="text-sm mb-4">
                      Die Microsoft Power Platform bietet eine Low-Code-Umgebung für die Entwicklung von Geschäftsanwendungen,
                      einschließlich KI-Integrationen. Mit Power Automate, Power Apps und Power BI können Sie KI-Funktionen
                      ohne umfangreiche Programmierung implementieren.
                    </PText>
                    
                    <InfoCard title="Vorteile der Power Platform" variant="info">
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Schnelle Entwicklung ohne tiefgreifende Programmierkenntnisse</li>
                        <li>Nahtlose Integration mit Microsoft-Produkten und -Diensten</li>
                        <li>Vorgefertigte KI-Komponenten und -Konnektoren</li>
                        <li>Einfache Automatisierung von Geschäftsprozessen</li>
                        <li>Skalierbare Lösungen für Abteilungen und Unternehmen</li>
                      </ul>
                    </InfoCard>
                  </div>
                  
                  <div>
                    <PHeading tag="h4" size="small" className="mb-3">
                      Power Automate für KI-gestützte Workflows
                    </PHeading>
                    <PText className="text-sm mb-4">
                      Mit Power Automate können Sie Arbeitsabläufe erstellen, die KI-Dienste wie Textanalyse,
                      Bilderkennung oder benutzerdefinierte KI-Modelle nutzen. Diese Flows können durch verschiedene
                      Trigger wie E-Mails, Dateiänderungen oder Planungen ausgelöst werden.
                    </PText>
                    
                    <div className="border rounded-lg overflow-hidden p-4" style={{ 
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--card-bg)'
                    }}>
                      <PHeading tag="h5" size="small" className="mb-2">
                        Beispiel: Stimmungsanalyse-Flow für Kundenfeedback
                      </PHeading>
                      
                      <div className="mb-4 p-3 rounded-lg" style={{ 
                        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
                      }}>
                        <pre className="text-xs whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
                          {powerAutomateExample}
                        </pre>
                      </div>
                      
                      <div className="text-xs" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
                        Power Automate Flow zur automatischen Verarbeitung von Kundenfeedback mit Stimmungsanalyse
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <PHeading tag="h4" size="small" className="mb-3">
                    Power Apps für benutzerdefinierte KI-Anwendungen
                  </PHeading>
                  <PText className="text-sm mb-4">
                    Mit Power Apps können Sie benutzerdefinierte Anwendungen mit integrierten KI-Funktionen erstellen.
                    Diese Apps können in SharePoint, Teams oder als eigenständige Anwendungen bereitgestellt werden.
                  </PText>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="Anwendungsbeispiele mit Power Apps" variant="info">
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Dokumentenklassifizierung mit vortrainierten KI-Modellen</li>
                        <li>Antragsverarbeitung mit automatischer Kategorisierung</li>
                        <li>Kundenfeedback-Analyse-Dashboards</li>
                        <li>Bild- und Dokumentenverarbeitung mit AI Builder</li>
                        <li>Chatbots für interne Unterstützung</li>
                      </ul>
                    </InfoCard>
                    
                    <InfoCard title="Integration mit Azure Diensten" variant="info">
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Nutzung von Azure Cognitive Services über Konnektoren</li>
                        <li>Integration mit Azure Functions für komplexe Logik</li>
                        <li>Anbindung an Azure Machine Learning für benutzerdefinierte Modelle</li>
                        <li>Verwendung von Azure OpenAI Service für fortschrittliche NLP</li>
                        <li>Datenintegration mit Azure Data Factory</li>
                      </ul>
                    </InfoCard>
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: 'hybrid',
            label: 'Hybride Ansätze',
            content: (
              <div className="pt-6">
                <PHeading tag="h4" size="small" className="mb-3">
                  Kombination von Python und Power Platform
                </PHeading>
                <PText className="text-sm mb-6">
                  Oft ist ein hybrider Ansatz, der die Stärken von Python-Entwicklung und der Power Platform kombiniert,
                  die optimale Lösung. Python-Skripte können für die datenintensive Verarbeitung und komplexe Algorithmen
                  verwendet werden, während die Power Platform für die Benutzeroberfläche und Workflow-Automatisierung genutzt wird.
                </PText>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <InfoCard title="Entwicklungsphase" variant="info">
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Prototyping mit Python-Skripten und generierten Testdaten</li>
                      <li>Erstellung und Validierung von ML-Modellen lokal</li>
                      <li>Experimentieren mit verschiedenen Algorithmen und Parametern</li>
                      <li>Dokumentation der Ergebnisse und Metriken</li>
                    </ul>
                  </InfoCard>
                  
                  <InfoCard title="Integrations- und Testphase" variant="info">
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Bereitstellung der Python-Skripte als Azure Functions oder Web-API</li>
                      <li>Erstellung von Power Automate Flows zur Integration</li>
                      <li>Entwicklung einer Power App für die Benutzeroberfläche</li>
                      <li>Testen mit realen Daten in einer kontrollierten Umgebung</li>
                    </ul>
                  </InfoCard>
                  
                  <InfoCard title="Produktionsphase" variant="info">
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Bereitstellung der Lösung in der Produktionsumgebung</li>
                      <li>Einrichtung von Monitoring und Alerting</li>
                      <li>Kontinuierliche Verbesserung der Modelle</li>
                      <li>Skalierung nach Bedarf für erhöhte Nutzung</li>
                    </ul>
                  </InfoCard>
                </div>
                
                <div className="p-4 rounded-lg" style={{ 
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
                }}>
                  <PHeading tag="h5" size="small" className="mb-2">
                    Beispiel: Hybride Lösung für Dokumentenverarbeitung
                  </PHeading>
                  <PText className="text-sm mb-3">
                    Ein typisches Beispiel für einen hybriden Ansatz ist eine Dokumentenverarbeitungslösung:
                  </PText>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li><strong>Python-Komponente:</strong> OCR-Verarbeitung und Textextraktion aus Dokumenten, 
                    NLP-Analyse zur Extraktion von Schlüsselinformationen, bereitgestellt als Azure Function.</li>
                    <li><strong>Power Automate:</strong> Workflow zur Dokument-Erfassung aus verschiedenen Quellen (E-Mail, SharePoint), 
                    Aufruf der Python-Verarbeitungsfunktion, Routing der extrahierten Daten.</li>
                    <li><strong>Power App:</strong> Benutzeroberfläche zur Überprüfung und Korrektur extrahierter Daten, 
                    Dashboards zur Überwachung des Verarbeitungsstatus.</li>
                    <li><strong>Power BI:</strong> Analytik und Reporting über Dokumentenverarbeitungsmetriken und Extraktionsgenauigkeit.</li>
                  </ol>
                </div>
              </div>
            ),
          },
        ]}
        defaultTabId="python"
      />
      
      <div className="mt-8 p-4 rounded-lg" style={{ 
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
      }}>
        <PText className="text-sm">
          <strong>Fazit:</strong> Bevor Sie in komplexe KI-Dienste investieren, prüfen Sie, ob Ihr Anwendungsfall
          auch mit traditionellen Entwicklungsmethoden wie Python-Skripten oder der Power Platform umgesetzt werden kann.
          Diese Ansätze bieten oft eine kostengünstigere, flexiblere und besser kontrollierbare Alternative, insbesondere
          für Anwendungsfälle mit klaren Regeln und begrenztem Umfang. Die generierten Fake-Daten während der Entwicklung
          ermöglichen zudem eine sichere und datenschutzkonforme Entwicklung.
          Stand: 6. Mai 2025
        </PText>
      </div>

      <div className="mt-4 p-4 rounded-lg border-l-4" style={{ 
        backgroundColor: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(254, 243, 199, 0.8)',
        borderLeftColor: '#f59e0b'
      }}>
        <div className="flex items-start">
          <div className="mr-3 text-amber-600 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <PText className="text-sm font-medium mb-1">
              <strong>Hinweis zur Datensicherheit:</strong>
            </PText>
            <PText className="text-sm">
              Wenn Sie regelmäßig mit ähnlichen klassifizierten Daten arbeiten (z.B. bestimmte Komponentennamen, Daten oder interne Bezeichnungen), 
              erstellen Sie ein Wörterbuch mit Platzhaltern und entwickeln Sie ein Skript, das diese Daten automatisch ersetzt. 
              Das Ersetzungsskript kann lokal ausgeführt werden, bevor Daten an KI-Dienste gesendet werden, und nach der Verarbeitung 
              die Originaldaten wieder einsetzen. So kommen sensible Informationen nicht mit externen KI-Systemen in Kontakt, 
              während Sie trotzdem deren Funktionalität nutzen können.
            </PText>
            <div className="mt-2 text-xs" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
              Beispiel: Namen wie "Motor-XYZ123" werden durch generische Bezeichner wie "Komponente-A" ersetzt und nach der KI-Verarbeitung wieder zurückübersetzt.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentAlternatives; 