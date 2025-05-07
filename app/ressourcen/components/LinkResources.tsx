'use client';

import React from 'react';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { useTheme } from '@/lib/themeContext';

interface ResourceLink {
  title: string;
  url: string;
  description: string;
  icon?: React.ReactNode;
  category: 'learning' | 'internal' | 'tools';
}

const LinkResources: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const resourceLinks: ResourceLink[] = [
    {
      title: "Prompt Engineering Guide",
      url: "https://www.promptingguide.ai/de/introduction/examples#textzusammenfassung",
      description: "Umfassender Leitfaden mit Techniken und Beispielen zum Erstellen effektiver Prompts für verschiedene Anwendungsfälle",
      category: 'learning',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      title: "ChatGPT Prompt Engineering for Developers",
      url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
      description: "Kostenloser Kurs von DeepLearning.ai und OpenAI zum Erlernen fortgeschrittener Prompt-Engineering-Techniken für Entwickler",
      category: 'learning',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      )
    },
    {
      title: "Generative AI SharePoint",
      url: "https://porsche.sharepoint.com/sites/LargeLanguageModels/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FLargeLanguageModels%2FShared%20Documents%2F05%20API%20Access&viewid=18445266%2D6c23%2D4020%2Dbbba%2D8067c56ab41f&FolderCTID=0x0120008B2C15B8F9375F4786466C7B5389811F",
      description: "Interner SharePoint mit KI-Ressourcen, Fallstudien, Templates und Best Practices für Unternehmensprojekte",
      category: 'internal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "How-to Access Azure OpenAI",
      url: "https://porsche.sharepoint.com/:p:/r/sites/LargeLanguageModels/_layouts/15/Doc.aspx?sourcedoc=%7B89F895D7-4DA2-4ADA-96B6-E904D7F12FBA%7D&file=20230526_HowTo_AzureOpenAIPlayground%20-%20Copy.pptx&action=edit&mobileredirect=true",
      description: "Internes Tool zur Evaluierung der Leistung von KI-Modellen anhand verschiedener Metriken und Anwendungsfälle",
      category: 'tools',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const getBackgroundColor = (category: string) => {
    switch (category) {
      case 'learning':
        return isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(219, 234, 254, 0.8)';
      case 'internal':
        return isDarkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 253, 245, 0.8)';
      case 'tools':
        return isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(237, 233, 254, 0.8)';
      default:
        return isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)';
    }
  };

  const getBorderColor = (category: string) => {
    switch (category) {
      case 'learning':
        return isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)';
      case 'internal':
        return isDarkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)';
      case 'tools':
        return isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)';
      default:
        return 'rgba(209, 213, 219, 0.3)';
    }
  };

  const getIconColor = (category: string) => {
    switch (category) {
      case 'learning':
        return 'text-blue-500';
      case 'internal':
        return 'text-green-500';
      case 'tools':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="link-resources">
      <div className="mb-6">
        <PHeading tag="h3" size="medium" className="mb-3">
          Weiterführende Links und Ressourcen
        </PHeading>
        <PText className="mb-6">
          Erweitern Sie Ihr Wissen über KI und Prompt Engineering mit diesen nützlichen externen und internen Ressourcen.
          Die folgenden Links bieten Zugang zu Leitfäden, Kursen, Unternehmensdokumenten und Tools, die Ihnen bei der
          Planung und Umsetzung von KI-Projekten helfen können.
        </PText>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resourceLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border transition-all hover:shadow-md"
            style={{ 
              backgroundColor: getBackgroundColor(link.category),
              borderColor: getBorderColor(link.category)
            }}
          >
            <div className="flex items-start">
              {link.icon && (
                <div className={`mr-3 mt-1 ${getIconColor(link.category)}`}>
                  {link.icon}
                </div>
              )}
              <div>
                <p className="font-medium text-base mb-1">{link.title}</p>
                <p className="text-sm" style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : 'rgba(55, 65, 81, 0.9)' }}>
                  {link.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded-lg" style={{ 
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
      }}>
        <PText className="text-sm">
          <strong>Hinweis:</strong> Die internen Links sind nur im Unternehmensnetzwerk oder mit VPN-Verbindung zugänglich.
          
        </PText>
      </div>
    </div>
  );
};

export default LinkResources; 