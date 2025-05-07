"use client";

import React from 'react';
import { PButton as PDSButton } from '@porsche-design-system/components-react';

interface PButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  className?: string;
}

const PButton: React.FC<PButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  return (
    <PDSButton
      onClick={onClick}
      disabled={disabled}
      className={className}
      variant={variant}
    >
      {children}
    </PDSButton>
  );
};

export default PButton; 