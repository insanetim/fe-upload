import React from 'react'
import type { UploadProps } from './types'
import Button from '../UI/Button'
import Preview from '../Preview'
import useContainer from './hook'

const Upload: React.FC<UploadProps> = ({ accept, multiple }) => {
  const { files, inputRef, handleOpenInput, handleInputChange, handleUpload } = useContainer()

  return (
    <>
      <input
        ref={inputRef}
        id='file'
        type='file'
        accept={accept.join(',')}
        multiple={multiple}
        onChange={handleInputChange}
      />
      <Button onClick={handleOpenInput}>Открыть</Button>
      {files.length > 0 && (
        <Button
          className='primary'
          onClick={handleUpload}
        >
          Загрузить
        </Button>
      )}
      {files.length > 0 && (
        <div className='preview'>
          {files.map(file => {
            return (
              <Preview
                key={file.name}
                file={file}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Upload
