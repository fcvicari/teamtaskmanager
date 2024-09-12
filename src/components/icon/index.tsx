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
        className={`text-slate-400 size-5 ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      />
    </label>
  )
}
