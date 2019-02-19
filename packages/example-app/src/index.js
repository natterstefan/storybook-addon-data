import React from 'react'

const Button = ({ children, onClick, title }) => {
  return (
    <button type="button" onClick={onClick} title={title}>
      {children}
    </button>
  )
}

Button.displayName = 'Button'

export default Button
