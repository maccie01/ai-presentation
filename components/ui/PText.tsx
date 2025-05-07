"use client";

import React from 'react';
import { PText as PDSText } from '@porsche-design-system/components-react';

interface PTextProps {
  children: React.ReactNode;
  size?: 'x-small' | 'small' | 'medium' | 'large';
  weight?: 'regular' | 'semi-bold' | 'bold';
  className?: string;
  style?: React.CSSProperties;
}

const PText: React.FC<PTextProps> = ({
  children,
  size = 'medium',
  weight = 'regular',
  className = '',
  style
}) => {
  return (
    <PDSText
      size={size}
      weight={weight}
      className={className}
      style={style}
    >
      {children}
    </PDSText>
  );
};

export default PText; 