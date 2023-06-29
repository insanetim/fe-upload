import { useContext, useEffect, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import type { PreviewImageHookProps } from './types'
import { UploadActionType, UploadContext } from '../../context/UploadContext'

const useContainer = ({ file }: PreviewImageHookProps) => {
  const { storage, isUploading, dispatch } = useContext(UploadContext)
  const [isRemoving, setIsRemoving] = useState(false)
  const [progress, setProgress] = useState('0%')

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      dispatch({ type: UploadActionType.REMOVE, payload: file.name })
    }, 300)
  }

  useEffect(() => {
    if (isUploading) {
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
          setProgress(progress)
        },
        error => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log('File available at', downloadURL)
          })
        }
      )
    }
  }, [isUploading])

  return { progress, isRemoving, isUploading, handleRemove }
}

export default useContainer
