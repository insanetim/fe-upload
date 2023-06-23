import React from 'react'

import Container from './components/UI/Container/component'
import Card from './components/UI/Card/component'
import Upload from './components/Upload/component'

export function App() {
  return (
    <Container>
      <Card>
        <Upload
          accept={['.png', '.jpg', '.jpeg', '.gif']}
          multiple
        />
      </Card>
    </Container>
  )
}
