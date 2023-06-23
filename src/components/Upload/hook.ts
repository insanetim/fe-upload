import { ChangeEventHandler, useContext, useEffect, useRef } from 'react'
import { UploadActionType, UploadContext } from '../../context/UploadContext'

const useContainer = () => {
  const { files, dispatch } = useContext(UploadContext)
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null)

  const handleOpenInput = () => {
    inputRef.current?.click()
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const inputFiles = event.target.files
    if (inputFiles) {
      dispatch({ type: UploadActionType.ADD, payload: inputFiles })
    }
  }

  const handleUpload = () => {
    dispatch({ type: UploadActionType.UPLOAD })
  }

  useEffect(() => {
    const dt = new DataTransfer()
    files.forEach(file => dt.items.add(file))
    inputRef.current!.files = dt.files
  }, [files])

  return { files, inputRef, handleOpenInput, handleInputChange, handleUpload }
}

export default useContainer
