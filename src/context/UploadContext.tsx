import React, { Dispatch, createContext, useReducer } from 'react'

export enum UploadActionType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  UPLOAD = 'UPLOAD'
}

type UploadAction =
  | {
      type: UploadActionType.ADD
      payload: FileList
    }
  | { type: UploadActionType.REMOVE; payload: string }
  | { type: UploadActionType.UPLOAD }

type UploadState = {
  files: File[]
  isUploading: boolean
}

interface IUploadContext {
  files: File[]
  isUploading: boolean
  dispatch: Dispatch<any>
}

const uploadReducer = (state: UploadState, action: UploadAction): UploadState => {
  switch (action.type) {
    case UploadActionType.ADD:
      return {
        files: Array.from(action.payload),
        isUploading: false
      }
    case UploadActionType.REMOVE:
      return {
        ...state,
        files: state.files.filter(f => f.name !== action.payload)
      }
    case UploadActionType.UPLOAD:
      return {
        ...state,
        isUploading: true
      }
    default:
      return state
  }
}

export const UploadContext = createContext<IUploadContext>({
  files: [],
  isUploading: false,
  dispatch: () => {}
})

const UploadContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uploadReducer, {
    files: [],
    isUploading: false
  })

  const contextValue = {
    files: state.files,
    isUploading: state.isUploading,
    dispatch
  }

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>
}

export default UploadContextProvider
