import React from 'react'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

import Container from './components/UI/Container/component'
import Card from './components/UI/Card/component'
import Upload from './components/Upload/component'
import UploadContextProvider from './context/UploadContext'
import { firebaseConfig } from './constants'

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export function App() {
  return (
    <UploadContextProvider storage={storage}>
      <Container>
        <Card>
          <Upload
            accept={['.png', '.jpg', '.jpeg', '.gif']}
            multiple
          />
        </Card>
      </Container>
    </UploadContextProvider>
  )
}
