'use client'

import { LucideProps } from "lucide-react";
import { ComponentType } from "react";

interface IconComponentProps {
  icon?: ComponentType<LucideProps>;
  onClick?: () => void;
  htmlFor?: string;
}

export function IconComponent({ onClick, htmlFor, icon: Icon }: IconComponentProps) {
  if (!Icon) return null

  function handleIconClick() {
    if (onClick) {
      onClick()
    }
  }

  return (
    <label htmlFor={htmlFor} onClick={() => handleIconClick()} >
      <Icon
        className={`font-normal text-xs ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      />
    </label>
  )
}
