import { LabelHTMLAttributes, ReactNode } from 'react'

interface TitleProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'h1' | 'h2' | 'h3'
  children: ReactNode
}

export function Title({ size = 'h1', children, ...props }: TitleProps) {
  const buttonClass = {
    size: {
      h1: 'text-xl pt-2',
      h2: 'text-base pt-1',
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
