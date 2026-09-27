import React from 'react';

type NeuralCoreVariant = 'hero' | 'section' | 'card' | 'small';

interface NeuralCoreProps {
  variant?: NeuralCoreVariant;
  label?: boolean;
  className?: string;
}

const layouts: Record<NeuralCoreVariant, { nodes: string; lines: string; opacity: string }> = {
  hero: { nodes: '18,25 50,12 82,25 18,75 50,88 82,75 50,50 28,50 72,50', lines: '18,25 50,12 82,25 50,50 18,25 28,50 50,50 72,50 82,25 50,50 18,75 50,50 82,75 50,88 18,75', opacity: '0.28' },
  section: { nodes: '20,20 50,10 80,20 20,80 50,90 80,80 50,50 28,50 72,50', lines: '20,20 50,10 80,20 50,50 20,20 28,50 50,50 72,50 80,20 50,50 20,80 50,50 80,80 50,90 20,80', opacity: '0.16' },
  card: { nodes: '22,25 50,14 78,25 22,75 50,86 78,75 50,50 30,50 70,50', lines: '22,25 50,14 78,25 50,50 22,25 30,50 50,50 70,50 78,25 50,50 22,75 50,50 78,75 50,86 22,75', opacity: '0.09' },
  small: { nodes: '25,25 50,15 75,25 25,75 50,85 75,75 50,50', lines: '25,25 50,15 75,25 50,50 25,25 50,50 75,25 50,50 25,75 50,50 75,75', opacity: '0.06' },
};

export const NeuralCore: React.FC<NeuralCoreProps> = ({ variant = 'card', label = false, className = '' }) => {
  const layout = layouts[variant];
  const points = layout.nodes.split(' ');
  const segments = layout.lines.match(/\d+,\d+ \d+,\d+/g) || [];
  return (
    <svg aria-hidden="true" className={`neural-core neural-core-${variant} ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
      <g className="neural-core-lines" style={{ opacity: layout.opacity }}>
        {segments.map((segment, index) => <line key={index} x1={segment.split(' ')[0].split(',')[0]} y1={segment.split(' ')[0].split(',')[1]} x2={segment.split(' ')[1].split(',')[0]} y2={segment.split(' ')[1].split(',')[1]} />)}
      </g>
      <g className="neural-core-signals" style={{ opacity: layout.opacity }}>
        {segments.slice(0, 2).map((segment, index) => <line key={index} x1={segment.split(' ')[0].split(',')[0]} y1={segment.split(' ')[0].split(',')[1]} x2={segment.split(' ')[1].split(',')[0]} y2={segment.split(' ')[1].split(',')[1]} />)}
      </g>
      <g className="neural-core-nodes" style={{ opacity: layout.opacity }}>
        {points.map((point, index) => { const [cx, cy] = point.split(','); return <circle key={index} cx={cx} cy={cy} r={index === 6 ? 1.5 : 1} />; })}
      </g>
      {label && <text className="neural-core-label" x="50" y="54" textAnchor="middle">AI</text>}
    </svg>
  );
};
