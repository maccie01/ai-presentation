import { useState, useEffect } from 'react';
import { Node, Edge } from 'reactflow';

export interface DiagramData {
  nodes: Node[];
  edges: Edge[];
  metadata?: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

type DataSource = string | DiagramData | (() => Promise<DiagramData>);

/**
 * A hook for loading diagram data dynamically from various sources
 * 
 * @param source - The data source, can be a URL, a data object, or a loader function
 * @param options - Additional options for data loading
 * @returns The loaded diagram data and loading state
 */
export const useDiagramData = (
  source: DataSource,
  options: {
    transform?: (data: any) => DiagramData;
    initialData?: DiagramData;
    refreshInterval?: number;
  } = {}
) => {
  const { transform, initialData, refreshInterval } = options;
  
  const [data, setData] = useState<DiagramData>(initialData || { nodes: [], edges: [] });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let result: DiagramData;

        if (typeof source === 'string') {
          // Load from URL
          const response = await fetch(source);
          if (!response.ok) {
            throw new Error(`Failed to fetch diagram data: ${response.statusText}`);
          }
          const responseData = await response.json();
          result = transform ? transform(responseData) : responseData;
        } else if (typeof source === 'function') {
          // Load from function
          const responseData = await source();
          result = transform ? transform(responseData) : responseData;
        } else {
          // Direct data object
          result = transform ? transform(source) : source;
        }

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load diagram data'));
        console.error('Error loading diagram data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Set up refresh interval if specified
    let intervalId: NodeJS.Timeout | undefined;
    if (refreshInterval && refreshInterval > 0) {
      intervalId = setInterval(loadData, refreshInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [source, transform, refreshInterval]);

  return { data, isLoading, error, setData };
};

export default useDiagramData; 