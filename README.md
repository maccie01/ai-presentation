# AI Presentation Website

Interactive website presentation in the Porsche Design System (PDS) with a dynamic Silicon Valley aesthetic. Targeted at Information Security departments, the presentation covers AI concepts, prompting techniques, and automotive-specific applications.

## Project Overview

This project is an interactive, web-based presentation covering various aspects of AI, with a focus on practical applications in information security and the automotive industry. The presentation is built using Next.js and the Porsche Design System, featuring a modern, Silicon Valley-inspired design with interactive elements.

## Content Sections

The presentation is organized into eight chronological chapters:

1. **KI-Überblick** - Introduction to AI concepts, current products, and future trends ✅
2. **High-Level Prompting** - Comprehensive guide to prompt engineering techniques 🔄
3. **Kontextwahl** - Methods for integrating relevant company data securely 🔄
4. **Memory-Prompts und /memory bank** - Implementation of memory systems in LLMs 🔄
5. **Branchen-spezifische Automotive-Beispiele** - Industry-specific AI use cases ⏳
6. **Microsoft Office KI-Produkte** - Integration of AI in Office products ⏳
7. **MCP-Server** - Architecture and functionality of Model Context Protocol servers ⏳
8. **Ausblick & Trends** - Future directions and governance recommendations ⏳

**Legend**: ✅ Completed | 🔄 In Progress | ⏳ Planned

## Technical Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Porsche Design System + Tailwind CSS
- **Interactive Components**: Monaco Editor, React Flow, D3.js, Mermaid.js
- **Animation**: Framer Motion

## Current Status

- **Completed Sections**: KI-Überblick section fully implemented
- **In Progress**: High-Level Prompting, Kontextwahl, Memory-Prompts sections
- **Next Priority**: Microsoft Office KI-Produkte section
- **Implemented Components**: Layout components, interactive components (CodeEditor, PromptBuilder), visualization components, UI enhancement components
- **Current Focus**: Memory-Prompts session personalization example, beginning Microsoft Office KI-Produkte section

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/ai-presentation.git
   cd ai-presentation
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the development server
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ai-presentation/
├── app/                 # Next.js App Router
├── components/          # Reusable components
│   ├── ui/              # Basic UI components
│   ├── sections/        # Section-specific components
│   ├── interactive/     # Interactive demos and editors
│   └── layout/          # Layout components
├── lib/                 # Utility functions and hooks
├── public/              # Static assets
├── styles/              # Global styles and themes
├── types/               # TypeScript type definitions
├── memory-bank/         # Project documentation
└── ...                  # Configuration files
```

## Features

- Interactive code editors for experimenting with prompts
- Dynamic visualizations of AI concepts
- Responsive design for all device sizes
- Automotive-specific examples and use cases
- Security-focused implementation patterns
- Memory Bank demo and visualization system
- Interactive diagram components

## Documentation

Project documentation is maintained in the `memory-bank/` directory, including:

- Project brief and requirements
- Technical architecture and decisions
- Development progress
- Content structure and organization

## License

[MIT License](LICENSE) 