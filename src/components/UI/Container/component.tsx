import React from 'react'

import type { ContainerProps } from './types'

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className='container'>{children}</div>
}

export default Container
