import React, { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  return (
    <button
      className={classNames('btn', className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
