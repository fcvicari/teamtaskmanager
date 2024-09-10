import { LabelHTMLAttributes, ReactNode } from 'react'

interface TitleProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'h1' | 'h2' | 'h3'
  children: ReactNode
}

export function Title({ size = 'h1', children, ...props }: TitleProps) {
  const buttonClass = {
    size: {
      h1: 'text-xl',
      h2: 'text-base',
      h3: 'text-xs',
    },
  }

  return (
    <label
      {...props}
      className={`w-full text-center font-semibold ${buttonClass.size[size]}`}
    >
      {children}
    </label>
  )
}
