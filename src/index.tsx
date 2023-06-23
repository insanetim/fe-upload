import React from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

import { firebaseConfig } from './constants'
import UploadContextProvider from './context/UploadContext'
import { App } from './App'
import './styles/theme.scss'

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)
root.render(
  <UploadContextProvider>
    <App />
  </UploadContextProvider>
)
