import { useState, useEffect, useRef, useCallback } from 'react';
import { Node, Edge } from 'reactflow';

export interface AnimationStep {
  nodes?: Partial<Node>[];
  edges?: Partial<Edge>[];
  duration?: number;
  delay?: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  onComplete?: () => void;
}

export interface AnimationSequence {
  steps: AnimationStep[];
  loop?: boolean;
  autoPlay?: boolean;
}

/**
 * Hook for creating sequenced animations for diagrams
 * 
 * @param initialNodes - The initial nodes of the diagram
 * @param initialEdges - The initial edges of the diagram
 * @param sequence - The animation sequence configuration
 * @returns Controls and state for the animation
 */
export const useDiagramAnimation = (
  initialNodes: Node[],
  initialEdges: Edge[],
  sequence: AnimationSequence
) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(sequence.autoPlay || false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const originalNodesRef = useRef<Node[]>(initialNodes);
  const originalEdgesRef = useRef<Edge[]>(initialEdges);

  // Clear any existing timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Start animation if autoPlay is true
  useEffect(() => {
    if (sequence.autoPlay) {
      play();
    }
  }, []);

  // Apply an animation step
  const applyStep = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= sequence.steps.length) {
      return;
    }

    const step = sequence.steps[stepIndex];
    
    // Apply node changes
    if (step.nodes) {
      setNodes(prevNodes => {
        return prevNodes.map(node => {
          const nodeUpdate = step.nodes?.find(n => n.id === node.id);
          if (nodeUpdate) {
            return { ...node, ...nodeUpdate };
          }
          return node;
        });
      });
    }
    
    // Apply edge changes
    if (step.edges) {
      setEdges(prevEdges => {
        return prevEdges.map(edge => {
          const edgeUpdate = step.edges?.find(e => e.id === edge.id);
          if (edgeUpdate) {
            return { ...edge, ...edgeUpdate };
          }
          return edge;
        });
      });
    }
    
    // Call onComplete callback if provided
    if (step.onComplete) {
      step.onComplete();
    }
    
    // Schedule next step
    const nextStepIndex = stepIndex + 1;
    if (nextStepIndex < sequence.steps.length) {
      const nextStep = sequence.steps[nextStepIndex];
      const delay = (step.duration || 1000) + (nextStep.delay || 0);
      
      if (isPlaying) {
        timeoutRef.current = setTimeout(() => {
          setCurrentStepIndex(nextStepIndex);
          applyStep(nextStepIndex);
        }, delay);
      }
    } else {
      // End of sequence
      setIsComplete(true);
      setIsPlaying(false);
      
      // Handle looping
      if (sequence.loop) {
        timeoutRef.current = setTimeout(() => {
          reset();
          play();
        }, 1000);
      }
    }
  }, [sequence, isPlaying]);

  // Play the animation from current position
  const play = useCallback(() => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    // Start from beginning if at end or not started
    const nextIndex = isComplete || currentStepIndex < 0 ? 0 : currentStepIndex;
    setCurrentStepIndex(nextIndex);
    applyStep(nextIndex);
  }, [applyStep, currentStepIndex, isComplete, isPlaying]);

  // Pause the animation
  const pause = useCallback(() => {
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Stop the animation and reset to initial state
  const reset = useCallback(() => {
    pause();
    setCurrentStepIndex(-1);
    setIsComplete(false);
    setNodes(originalNodesRef.current);
    setEdges(originalEdgesRef.current);
  }, [pause]);

  // Go to a specific step in the sequence
  const goToStep = useCallback((stepIndex: number) => {
    pause();
    
    if (stepIndex < 0 || stepIndex >= sequence.steps.length) {
      return;
    }
    
    // Reset to initial state
    setNodes(originalNodesRef.current);
    setEdges(originalEdgesRef.current);
    
    // Apply all steps up to the target step
    for (let i = 0; i <= stepIndex; i++) {
      const step = sequence.steps[i];
      
      // Apply node changes
      if (step.nodes) {
        setNodes(prevNodes => {
          return prevNodes.map(node => {
            const nodeUpdate = step.nodes?.find(n => n.id === node.id);
            if (nodeUpdate) {
              return { ...node, ...nodeUpdate };
            }
            return node;
          });
        });
      }
      
      // Apply edge changes
      if (step.edges) {
        setEdges(prevEdges => {
          return prevEdges.map(edge => {
            const edgeUpdate = step.edges?.find(e => e.id === edge.id);
            if (edgeUpdate) {
              return { ...edge, ...edgeUpdate };
            }
            return edge;
          });
        });
      }
    }
    
    setCurrentStepIndex(stepIndex);
    setIsComplete(stepIndex === sequence.steps.length - 1);
  }, [sequence.steps, pause]);

  return {
    nodes,
    edges,
    play,
    pause,
    reset,
    goToStep,
    currentStepIndex,
    isPlaying,
    isComplete,
    totalSteps: sequence.steps.length
  };
};

export default useDiagramAnimation; 