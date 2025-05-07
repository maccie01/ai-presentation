import { Node, Edge, Viewport } from 'reactflow';

/**
 * Calculate responsive diagram dimensions based on container and viewport
 * 
 * @param containerWidth - Width of the diagram container
 * @param containerHeight - Height of the diagram container
 * @param minScale - Minimum scaling factor
 * @param maxScale - Maximum scaling factor
 * @returns Calculated dimensions and scaling properties
 */
export const calculateResponsiveDimensions = (
  containerWidth: number,
  containerHeight: number,
  minScale: number = 0.5,
  maxScale: number = 1.5
) => {
  // Base dimensions for reference (desktop design size)
  const baseDimensions = {
    width: 1200,
    height: 800,
  };

  // Calculate scaling factors
  const widthScale = containerWidth / baseDimensions.width;
  const heightScale = containerHeight / baseDimensions.height;
  
  // Use the smaller scaling factor to ensure the diagram fits
  let scale = Math.min(widthScale, heightScale);
  
  // Apply scaling constraints
  scale = Math.max(minScale, Math.min(maxScale, scale));
  
  return {
    scale,
    width: containerWidth,
    height: containerHeight,
    transform: { x: 0, y: 0, zoom: scale },
  };
};

/**
 * Adjust node positions to fit within a container
 * 
 * @param nodes - The diagram nodes to adjust
 * @param containerWidth - Width of the container
 * @param containerHeight - Height of the container
 * @param padding - Padding to maintain around nodes
 * @returns Adjusted nodes with updated positions
 */
export const fitNodesToContainer = (
  nodes: Node[],
  containerWidth: number,
  containerHeight: number,
  padding: number = 40
): Node[] => {
  if (nodes.length === 0) return nodes;
  
  // Find the bounds of the current nodes
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;
  
  nodes.forEach(node => {
    if (node.position) {
      const width = (node.width || 150) / 2;
      const height = (node.height || 40) / 2;
      
      minX = Math.min(minX, node.position.x - width);
      minY = Math.min(minY, node.position.y - height);
      maxX = Math.max(maxX, node.position.x + width);
      maxY = Math.max(maxY, node.position.y + height);
    }
  });
  
  // Calculate current dimensions
  const currentWidth = maxX - minX + (padding * 2);
  const currentHeight = maxY - minY + (padding * 2);
  
  // Calculate scaling factors
  const widthScale = (containerWidth - padding * 2) / currentWidth;
  const heightScale = (containerHeight - padding * 2) / currentHeight;
  const scale = Math.min(widthScale, heightScale, 1); // Limit to 1 to prevent enlarging
  
  // Calculate centering offsets
  const offsetX = (containerWidth - currentWidth * scale) / 2;
  const offsetY = (containerHeight - currentHeight * scale) / 2;
  
  // Apply transformations to nodes
  return nodes.map(node => {
    if (!node.position) return node;
    
    const adjustedX = (node.position.x - minX) * scale + offsetX;
    const adjustedY = (node.position.y - minY) * scale + offsetY;
    
    return {
      ...node,
      position: {
        x: adjustedX,
        y: adjustedY,
      },
      // Optionally adjust node dimensions if needed
      ...(scale !== 1 && node.style ? {
        style: {
          ...node.style,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }
      } : {})
    };
  });
};

/**
 * Calculate the ideal viewport to fit all nodes
 * 
 * @param nodes - The diagram nodes
 * @param padding - Padding to maintain around the nodes
 * @returns The calculated viewport
 */
export const calculateViewport = (
  nodes: Node[],
  padding: number = 40
): Viewport => {
  if (nodes.length === 0) {
    return { x: 0, y: 0, zoom: 1 };
  }
  
  // Find the bounds of the current nodes
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;
  
  nodes.forEach(node => {
    if (node.position) {
      const width = (node.width || 150) / 2;
      const height = (node.height || 40) / 2;
      
      minX = Math.min(minX, node.position.x - width);
      minY = Math.min(minY, node.position.y - height);
      maxX = Math.max(maxX, node.position.x + width);
      maxY = Math.max(maxY, node.position.y + height);
    }
  });
  
  // Calculate center point
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  
  return {
    x: -centerX,
    y: -centerY,
    zoom: 1,
  };
};

/**
 * Export diagram as an image
 * 
 * @param reactFlowInstance - The ReactFlow instance
 * @param options - Export options
 * @returns A Promise resolving to the image data URL
 */
export const exportDiagramAsImage = async (
  reactFlowInstance: any,
  options: {
    fileName?: string;
    backgroundColor?: string;
    quality?: number;
    type?: 'image/png' | 'image/jpeg';
    download?: boolean;
  } = {}
): Promise<string | null> => {
  if (!reactFlowInstance || !reactFlowInstance.toObject) {
    console.error('Invalid ReactFlow instance');
    return null;
  }
  
  const {
    fileName = 'diagram-export',
    backgroundColor = '#ffffff',
    quality = 0.95,
    type = 'image/png',
    download = true,
  } = options;

  try {
    // Get the viewport element
    const viewportElement = document.querySelector('.react-flow__viewport');
    if (!viewportElement) {
      console.error('ReactFlow viewport element not found');
      return null;
    }
    
    // Import html-to-image dynamically (client-side only)
    const htmlToImage = await import('html-to-image');
    
    // Generate the image
    const dataUrl = type === 'image/png'
      ? await htmlToImage.toPng(viewportElement as HTMLElement, { backgroundColor, quality })
      : await htmlToImage.toJpeg(viewportElement as HTMLElement, { backgroundColor, quality });
    
    // Download the image if requested
    if (download) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${fileName}.${type === 'image/png' ? 'png' : 'jpg'}`;
      link.click();
    }
    
    return dataUrl;
  } catch (error) {
    console.error('Error exporting diagram:', error);
    return null;
  }
};

/**
 * Add zoom and pan controls to a diagram
 * 
 * @param onZoomIn - Function to handle zoom in
 * @param onZoomOut - Function to handle zoom out
 * @param onFitView - Function to fit the view
 * @param onReset - Function to reset the view
 * @returns Component props for the custom controls
 */
export const createCustomControls = (
  onZoomIn: () => void,
  onZoomOut: () => void,
  onFitView: () => void,
  onReset: () => void
) => {
  return {
    onZoomIn,
    onZoomOut,
    onFitView,
    onReset,
  };
};

export default {
  calculateResponsiveDimensions,
  fitNodesToContainer,
  calculateViewport,
  exportDiagramAsImage,
  createCustomControls,
}; 