import React from 'react'

import type { CardProps } from './types'

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className='card'>{children}</div>
}

export default Card
