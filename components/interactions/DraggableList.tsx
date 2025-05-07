"use client";

import React, { useState, useEffect } from 'react';
import { motion, Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { FaGripVertical } from 'react-icons/fa';

export interface DraggableItem {
  id: string | number;
  [key: string]: any;
}

interface DraggableListProps<T extends DraggableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, isDragging: boolean) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  axis?: 'y' | 'x';
  showHandles?: boolean;
  handleClassName?: string;
  dragConstraints?: false | { top?: number; right?: number; bottom?: number; left?: number };
  dragElastic?: number;
  gap?: number;
  fadeInactive?: boolean;
}

/**
 * Draggable list component for reordering items through drag interactions
 */
function DraggableList<T extends DraggableItem>({
  items,
  onReorder,
  renderItem,
  className = '',
  itemClassName = '',
  axis = 'y',
  showHandles = true,
  handleClassName = '',
  dragConstraints = false,
  dragElastic = 0.2,
  gap = 4,
  fadeInactive = true,
}: DraggableListProps<T>) {
  // State for tracking reordered items
  const [listItems, setListItems] = useState<T[]>(items);
  
  // State to track which item is being dragged
  const [activeItem, setActiveItem] = useState<string | number | null>(null);
  
  // Update internal state when items prop changes
  useEffect(() => {
    setListItems(items);
  }, [items]);
  
  // Handler for reordering
  const handleReorder = (reorderedItems: T[]) => {
    setListItems(reorderedItems);
    onReorder(reorderedItems);
  };
  
  // Item component with drag handles
  const DraggableItem = ({ item }: { item: T }) => {
    const dragControls = useDragControls();
    const isDragging = activeItem === item.id;
    
    const handleDragStart = () => setActiveItem(item.id);
    const handleDragEnd = () => setActiveItem(null);
    
    return (
      <Reorder.Item
        value={item}
        id={item.id.toString()}
        dragListener={!showHandles}
        dragControls={showHandles ? dragControls : undefined}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ 
          marginBottom: axis === 'y' ? gap : 0,
          marginRight: axis === 'x' ? gap : 0,
        }}
        className={`
          relative ${itemClassName}
          ${isDragging ? 'z-10' : 'z-0'}
          ${fadeInactive && activeItem !== null && !isDragging ? 'opacity-50' : 'opacity-100'}
          transition-opacity duration-200
        `}
        dragElastic={dragElastic}
        dragConstraints={dragConstraints}
      >
        <div className="flex items-center w-full">
          {showHandles && (
            <div 
              className={`cursor-grab active:cursor-grabbing ${handleClassName}`}
              onPointerDown={(e) => dragControls.start(e)}
            >
              <FaGripVertical className="text-gray-400" />
            </div>
          )}
          <div className="flex-grow">
            {renderItem(item, isDragging)}
          </div>
        </div>
      </Reorder.Item>
    );
  };
  
  return (
    <Reorder.Group 
      axis={axis} 
      values={listItems} 
      onReorder={handleReorder}
      className={`${className} ${axis === 'x' ? 'flex' : 'block'}`}
    >
      {listItems.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </Reorder.Group>
  );
}

export default DraggableList; 