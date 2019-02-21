import React from 'react'

const Button = ({ onClick, title }) => {
  return (
    <button type="button" onClick={onClick} title={title}>
      {title}
    </button>
  )
}

Button.displayName = 'Button'

export default Button
