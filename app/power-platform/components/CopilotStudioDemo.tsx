"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BotTopic {
  id: string;
  name: string;
  description: string;
  trigger: string[];
  messages: string[];
  actions?: {
    id: string;
    name: string;
    type: string;
  }[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export function CopilotStudioDemo() {
  const [activeTab, setActiveTab] = useState<'topics' | 'flows' | 'test'>('topics');
  const [selectedTopic, setSelectedTopic] = useState<string | null>('topic1');
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Willkommen beim Kundenservice Bot! Wie kann ich Ihnen heute helfen?',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);
  
  const topics: BotTopic[] = [
    {
      id: 'topic1',
      name: 'Produktunterstützung',
      description: 'Hilfe bei Fragen zu Produkten und deren Funktionen',
      trigger: ['Produkt', 'Funktion', 'Hilfe', 'wie funktioniert'],
      messages: [
        'Zu welchem Produkt benötigen Sie Unterstützung?',
        'Haben Sie bereits das Benutzerhandbuch konsultiert?',
        'Hier sind einige häufig gestellte Fragen zu diesem Produkt:'
      ],
      actions: [
        {
          id: 'action1',
          name: 'Produkt-Dokumentation suchen',
          type: 'search'
        },
        {
          id: 'action2',
          name: 'Ticket für Produktsupport erstellen',
          type: 'createTicket'
        }
      ]
    },
    {
      id: 'topic2',
      name: 'Bestellung verfolgen',
      description: 'Status und Verfolgung von Kundenbestellungen',
      trigger: ['Bestellung', 'Status', 'Sendung', 'Paket', 'verfolgen'],
      messages: [
        'Bitte geben Sie Ihre Bestellnummer ein, um den Status abzufragen.',
        'Ich kann Ihnen den aktuellen Status Ihrer Bestellung anzeigen.'
      ],
      actions: [
        {
          id: 'action1',
          name: 'Bestellstatus abrufen',
          type: 'getOrderStatus'
        }
      ]
    },
    {
      id: 'topic3',
      name: 'Rücksendungen',
      description: 'Unterstützung bei Produktrücksendungen und Erstattungen',
      trigger: ['Rücksendung', 'zurückgeben', 'Erstattung', 'Rückgabe'],
      messages: [
        'Für eine Rücksendung benötige ich einige Informationen von Ihnen.',
        'Haben Sie das Produkt innerhalb der letzten 30 Tage erhalten?',
        'Bitte beschreiben Sie kurz den Grund für die Rücksendung.'
      ],
      actions: [
        {
          id: 'action1',
          name: 'Rücksendeetikett generieren',
          type: 'generateLabel'
        },
        {
          id: 'action2',
          name: 'Rücksendeantrag erstellen',
          type: 'createReturnRequest'
        }
      ]
    },
    {
      id: 'topic4',
      name: 'Kontaktanfrage',
      description: 'Weiterleitung an einen menschlichen Mitarbeiter',
      trigger: ['Mitarbeiter', 'sprechen', 'Person', 'Mensch', 'Kontakt'],
      messages: [
        'Ich verstehe, dass Sie mit einem Mitarbeiter sprechen möchten.',
        'Bitte teilen Sie mir kurz mit, worum es bei Ihrer Anfrage geht.',
        'Vielen Dank. Ich leite Sie an einen verfügbaren Mitarbeiter weiter.'
      ],
      actions: [
        {
          id: 'action1',
          name: 'An Mitarbeiter weiterleiten',
          type: 'transferToAgent'
        }
      ]
    }
  ];
  
  const handleSendMessage = () => {
    if (!userQuestion.trim()) return;
    
    // Add user message
    const userMessageId = `user-${Date.now()}`;
    setChatHistory([
      ...chatHistory,
      {
        id: userMessageId,
        sender: 'user',
        text: userQuestion,
        timestamp: new Date()
      }
    ]);
    
    // Find matching topic based on keywords
    const matchedTopic = topics.find(topic => 
      topic.trigger.some(trigger => 
        userQuestion.toLowerCase().includes(trigger.toLowerCase())
      )
    );
    
    // Simulate bot response with delay
    setTimeout(() => {
      let botResponse = '';
      
      if (matchedTopic) {
        // Get first message from the matched topic
        botResponse = matchedTopic.messages[0];
      } else {
        botResponse = "Entschuldigung, ich habe Ihre Anfrage nicht verstanden. Könnten Sie es anders formulieren?";
      }
      
      setChatHistory(prevHistory => [
        ...prevHistory,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          timestamp: new Date()
        }
      ]);
    }, 1000);
    
    setUserQuestion('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="copilot-studio-demo border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-[#F25022] text-white p-2 flex items-center">
        <div className="mr-2 bg-white text-[#F25022] rounded-full h-6 w-6 flex items-center justify-center font-bold">C</div>
        <span className="font-medium">Copilot Studio - Kundenservice Bot</span>
        <div className="ml-auto flex space-x-2">
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm text-sm">Speichern</button>
          <button className="bg-white text-[#F25022] px-3 py-1 rounded-sm text-sm font-medium">Veröffentlichen</button>
        </div>
      </div>
      
      <div className="flex bg-gray-50 border-b border-gray-200">
        <div className="p-2 flex space-x-2">
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'topics' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('topics')}
          >
            Themen
          </button>
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'flows' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('flows')}
          >
            Konversationsflüsse
          </button>
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'test' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('test')}
          >
            Testen
          </button>
        </div>
      </div>
      
      <div className="h-[500px] flex">
        {/* Left sidebar - Topics list */}
        <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <span className="font-medium text-sm">Bot-Themen</span>
            <button className="text-blue-600 text-sm hover:underline flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Neu
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {topics.map(topic => (
              <motion.div
                key={topic.id}
                className={`p-3 mb-2 border rounded-md cursor-pointer ${selectedTopic === topic.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setSelectedTopic(topic.id)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-medium text-sm">{topic.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{topic.description}</p>
                {topic.actions && (
                  <div className="mt-2">
                    <span className="text-xs text-blue-600">{topic.actions.length} Aktionen</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'topics' && selectedTopic && (
            <div className="flex-1 p-4 overflow-y-auto">
              {topics.find(t => t.id === selectedTopic) && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Themenname</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={topics.find(t => t.id === selectedTopic)?.name}
                      readOnly
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={2}
                      value={topics.find(t => t.id === selectedTopic)?.description}
                      readOnly
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Auslöser-Phrasen</label>
                    <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md min-h-[60px]">
                      {topics.find(t => t.id === selectedTopic)?.trigger.map((trigger, index) => (
                        <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center">
                          {trigger}
                          <button className="ml-1 text-blue-600 hover:text-blue-800">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex mt-2">
                      <input 
                        type="text" 
                        className="flex-1 p-2 border border-gray-300 rounded-l-md text-sm"
                        placeholder="Neue Auslöser-Phrase hinzufügen"
                      />
                      <button className="bg-blue-600 text-white px-3 py-2 rounded-r-md text-sm">
                        Hinzufügen
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bot-Antworten</label>
                    {topics.find(t => t.id === selectedTopic)?.messages.map((message, index) => (
                      <div key={index} className="mb-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-sm">{message}</span>
                          <div className="flex space-x-1">
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button className="text-gray-400 hover:text-red-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="mt-2 text-blue-600 text-sm hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Antwort hinzufügen
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Aktionen</label>
                    {topics.find(t => t.id === selectedTopic)?.actions?.map((action, index) => (
                      <div key={index} className="mb-2 p-3 bg-orange-50 border border-orange-200 rounded-md flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">{action.name}</span>
                          <div className="text-xs text-gray-500">Typ: {action.type}</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Bearbeiten
                        </button>
                      </div>
                    ))}
                    <button className="mt-2 text-blue-600 text-sm hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Aktion hinzufügen
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'flows' && (
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="bg-white h-full rounded-md border border-gray-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Konversationsflüsse</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Hier werden komplexe Konversationsabläufe mit Verzweigungen, Bedingungen und Aktionen visualisiert.
                  </p>
                  <div className="mt-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                      Flow-Designer öffnen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'test' && (
            <div className="flex-1 flex flex-col bg-gray-50">
              <div className="p-3 border-b border-gray-200 bg-white">
                <h2 className="font-medium">Bot testen</h2>
                <p className="text-xs text-gray-600">Testen Sie Ihren Bot mit Beispielanfragen</p>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="bg-white rounded-md border border-gray-200 h-full flex flex-col">
                  <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="font-medium text-sm">Kundenservice Bot</span>
                    <span className="ml-auto text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Online</span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-messages">
                    {chatHistory.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'bot' 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {message.text}
                          <div 
                            className={`text-xs mt-1 ${
                              message.sender === 'bot' ? 'text-gray-500' : 'text-blue-200'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="border-t border-gray-200 p-3">
                    <div className="flex">
                      <input 
                        type="text" 
                        className="flex-1 p-2 border border-gray-300 rounded-l-md"
                        placeholder="Stellen Sie eine Frage..."
                        value={userQuestion}
                        onChange={(e) => setUserQuestion(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-md"
                        onClick={handleSendMessage}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Beispiele: "Wie kann ich ein Produkt zurücksenden?", "Wo ist meine Bestellung?"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 