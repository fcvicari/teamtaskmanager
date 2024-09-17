'use client'

import { LucideProps } from "lucide-react";
import { ComponentType } from "react";

interface IconComponentProps {
  icon?: ComponentType<LucideProps>;
  onClick?: () => void;
  disabled?: boolean;
  htmlFor?: string;
}

export function IconComponent({ onClick, htmlFor, disabled=false, icon: Icon }: IconComponentProps) {
  if (!Icon) return null

  function handleIconClick() {
    if (disabled) {
      return
    }

    if (onClick) {
      onClick()
    }
  }

  return (
    <label htmlFor={htmlFor} onClick={() => handleIconClick()} >
      <Icon
        className={`text-slate-400 size-5 ${onClick && !disabled ? 'cursor-pointer' : 'cursor-default'}`}
      />
    </label>
  )
}
