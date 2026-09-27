import React from 'react';

interface NeuralNetworkBackgroundProps { className?: string; }

const TerminalPanel: React.FC<{ className: string; title: string; lines: string[] }> = ({ className, title, lines }) => (
  <div className={`ambient-terminal-panel ${className}`} aria-hidden="true">
    <div className="ambient-terminal-title"><span className="ambient-terminal-dots">● ● ●</span><span>{title}</span></div>
    <div className="ambient-terminal-body">
      {lines.map((line, index) => <div key={index} className={line.includes('[OK]') ? 'ambient-terminal-ok' : line.startsWith('$') ? 'ambient-terminal-command' : ''}>{line}</div>)}
      <span className="ambient-terminal-cursor" />
    </div>
  </div>
);

const NeuralNetworkBackground: React.FC<NeuralNetworkBackgroundProps> = ({ className = '' }) => (
  <div className={`ambient-terminal-layer ${className}`} aria-hidden="true">
    <TerminalPanel className="ambient-terminal-one" title="~/ai-system" lines={['$ system.status', '[OK] AI ENGINE ONLINE', '[OK] RAG READY']} />
    <TerminalPanel className="ambient-terminal-two" title="~/services/api" lines={['$ uvicorn api:app', '[OK] API initialized', '[OK] DATABASE connected']} />
    <TerminalPanel className="ambient-terminal-three" title="~/projects" lines={['$ npm run build', '[OK] services online', '$ ai.initialize()']} />
    <span className="ambient-code-fragment ambient-code-one">const ai = initializeModel();</span>
    <span className="ambient-code-fragment ambient-code-two">app = FastAPI()</span>
  </div>
);

export { NeuralNetworkBackground };
export const NeuralBackground = NeuralNetworkBackground;
export default NeuralNetworkBackground;
