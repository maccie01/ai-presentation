"use client";

import React from 'react';
import { PHeading as PDSHeading } from '@porsche-design-system/components-react';

interface PHeadingProps {
  children: React.ReactNode;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'inherit';
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

const PHeading: React.FC<PHeadingProps> = ({
  children,
  tag = 'h2',
  size = 'medium',
  className = '',
  id,
  style,
}) => {
  return (
    <PDSHeading
      tag={tag}
      size={size}
      className={className}
      id={id}
      style={style}
    >
      {children}
    </PDSHeading>
  );
};

export default PHeading; 