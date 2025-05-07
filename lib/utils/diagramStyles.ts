import { NodeProps, EdgeProps } from 'reactflow';

// PDS-compliant color schemes for diagrams
export const colorSchemes = {
  primary: {
    node: {
      background: '#0059AA', // PDS primary blue
      border: '#004A8F',
      text: '#FFFFFF',
      gradient: ['#0059AA', '#004A8F'],
    },
    edge: {
      stroke: '#0059AA',
      text: '#0059AA',
    },
  },
  secondary: {
    node: {
      background: '#262626', // PDS secondary color
      border: '#1A1A1A',
      text: '#FFFFFF',
      gradient: ['#262626', '#1A1A1A'],
    },
    edge: {
      stroke: '#262626',
      text: '#262626',
    },
  },
  tertiary: {
    node: {
      background: '#C0CCE3', // PDS tertiary color
      border: '#A3B3D1',
      text: '#262626',
      gradient: ['#C0CCE3', '#A3B3D1'],
    },
    edge: {
      stroke: '#A3B3D1',
      text: '#262626',
    },
  },
  success: {
    node: {
      background: '#007B5F', // PDS green
      border: '#006A52',
      text: '#FFFFFF',
      gradient: ['#007B5F', '#006A52'],
    },
    edge: {
      stroke: '#007B5F',
      text: '#007B5F',
    },
  },
  warning: {
    node: {
      background: '#B17921', // PDS yellow
      border: '#99671D',
      text: '#FFFFFF',
      gradient: ['#B17921', '#99671D'],
    },
    edge: {
      stroke: '#B17921',
      text: '#B17921',
    },
  },
  error: {
    node: {
      background: '#E30613', // PDS red
      border: '#C9050F',
      text: '#FFFFFF',
      gradient: ['#E30613', '#C9050F'],
    },
    edge: {
      stroke: '#E30613',
      text: '#E30613',
    },
  },
  neutral: {
    node: {
      background: '#F5F5F5',
      border: '#E0E0E0',
      text: '#262626',
      gradient: ['#F5F5F5', '#E0E0E0'],
    },
    edge: {
      stroke: '#A6A6A6',
      text: '#262626',
    },
  },
};

// Diagram typography system based on PDS
export const typography = {
  nodeTitle: {
    fontFamily: 'Porsche Next, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  nodeSubtitle: {
    fontFamily: 'Porsche Next, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.4,
  },
  edgeLabel: {
    fontFamily: 'Porsche Next, sans-serif',
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: 1.2,
  },
  annotation: {
    fontFamily: 'Porsche Next, sans-serif',
    fontSize: '10px',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.2,
  },
};

// Node types and their default styles
export const nodeTypes = {
  default: {
    width: 180,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    padding: '12px 16px',
    fontSize: typography.nodeTitle.fontSize,
    fontWeight: typography.nodeTitle.fontWeight,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: 160,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    padding: '12px 16px',
    fontSize: typography.nodeTitle.fontSize,
    fontWeight: typography.nodeTitle.fontWeight,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  output: {
    width: 160,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    padding: '12px 16px',
    fontSize: typography.nodeTitle.fontSize,
    fontWeight: typography.nodeTitle.fontWeight,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  process: {
    width: 180,
    height: 80,
    borderRadius: 4,
    borderWidth: 1,
    padding: '12px 16px',
    fontSize: typography.nodeTitle.fontSize,
    fontWeight: typography.nodeTitle.fontWeight,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  decision: {
    width: 160,
    height: 80,
    borderRadius: 4,
    borderWidth: 1,
    padding: '12px 16px',
    fontSize: typography.nodeTitle.fontSize,
    fontWeight: typography.nodeTitle.fontWeight,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    shape: 'diamond',
  },
};

// Define common type for all edge types to fix type errors
interface EdgeTypeStyle {
  strokeWidth: number;
  arrowHeadSize: number;
  markerEndType: string;
  animated: boolean;
  animationSpeed?: number;
  strokeDasharray?: string;
}

// Edge types and their default styles
export const edgeTypes: Record<string, EdgeTypeStyle> = {
  default: {
    strokeWidth: 2,
    arrowHeadSize: 12,
    markerEndType: 'arrowclosed',
    animated: false,
  },
  animated: {
    strokeWidth: 2,
    arrowHeadSize: 12,
    markerEndType: 'arrowclosed',
    animated: true,
    animationSpeed: 1,
  },
  dashed: {
    strokeWidth: 2,
    arrowHeadSize: 12,
    markerEndType: 'arrowclosed',
    animated: false,
    strokeDasharray: '5, 5',
  },
};

/**
 * Generate node styles based on type and color scheme
 * 
 * @param type - Node type to style
 * @param colorScheme - Color scheme to apply
 * @param isSelected - Whether the node is selected
 * @returns Node style object
 */
export const getNodeStyle = (
  type: string = 'default',
  colorScheme: keyof typeof colorSchemes = 'primary',
  isSelected: boolean = false
) => {
  const nodeType = nodeTypes[type as keyof typeof nodeTypes] || nodeTypes.default;
  const colors = colorSchemes[colorScheme].node;
  
  return {
    width: nodeType.width,
    height: nodeType.height,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: isSelected ? 2 : nodeType.borderWidth,
    borderRadius: nodeType.borderRadius,
    padding: nodeType.padding,
    color: colors.text,
    fontSize: nodeType.fontSize,
    fontWeight: nodeType.fontWeight,
    boxShadow: isSelected ? '0 0 0 2px rgba(0, 89, 170, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15)' : nodeType.boxShadow,
    fontFamily: typography.nodeTitle.fontFamily,
    transition: 'all 0.2s ease',
  };
};

/**
 * Generate edge styles based on type and color scheme
 * 
 * @param type - Edge type to style
 * @param colorScheme - Color scheme to apply
 * @param isSelected - Whether the edge is selected
 * @returns Edge style object
 */
export const getEdgeStyle = (
  type: string = 'default',
  colorScheme: keyof typeof colorSchemes = 'primary',
  isSelected: boolean = false
) => {
  const edgeType = edgeTypes[type] || edgeTypes.default;
  const colors = colorSchemes[colorScheme].edge;
  
  return {
    stroke: colors.stroke,
    strokeWidth: isSelected ? edgeType.strokeWidth + 1 : edgeType.strokeWidth,
    strokeDasharray: edgeType.strokeDasharray,
    animated: edgeType.animated,
    animationSpeed: edgeType.animationSpeed,
    markerEnd: {
      type: edgeType.markerEndType,
      width: edgeType.arrowHeadSize,
      height: edgeType.arrowHeadSize,
      color: colors.stroke,
    },
    labelStyle: {
      fontFamily: typography.edgeLabel.fontFamily,
      fontSize: typography.edgeLabel.fontSize,
      fontWeight: typography.edgeLabel.fontWeight,
      fill: colors.text,
    },
  };
};

/**
 * Generate responsive styles based on viewport size
 * 
 * @param viewportWidth - Current viewport width
 * @returns Object with scale factors and adjusted styles
 */
export const getResponsiveStyles = (viewportWidth: number) => {
  let scale = 1;
  let fontSize = 1;
  
  // Apply scaling based on viewport width
  if (viewportWidth < 640) {
    // Mobile
    scale = 0.8;
    fontSize = 0.9;
  } else if (viewportWidth < 768) {
    // Small tablet
    scale = 0.85;
    fontSize = 0.95;
  } else if (viewportWidth < 1024) {
    // Tablet
    scale = 0.9;
    fontSize = 1;
  }
  
  return {
    scale,
    fontSize,
    nodeSizeAdjustment: {
      transform: `scale(${scale})`,
      transformOrigin: 'center center',
    },
    fontSizeAdjustment: {
      fontSize: `${fontSize}em`,
    },
  };
};

export default {
  colorSchemes,
  typography,
  nodeTypes,
  edgeTypes,
  getNodeStyle,
  getEdgeStyle,
  getResponsiveStyles,
}; 