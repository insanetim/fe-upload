import React from 'react'
import classNames from 'classnames'

import type { PreviewImageProps } from './types'
import bytesToSize from '../../utils/bytesToSize'
import useContainer from './hook'

const Preview: React.FC<PreviewImageProps> = ({ file }) => {
  const { progress, isRemoving, isUploading, handleRemove } = useContainer({ file })

  return (
    <div
      className={classNames('preview-image', {
        removing: isRemoving,
        uploading: isUploading
      })}
    >
      {!isUploading && (
        <div
          className='preview-remove'
          onClick={handleRemove}
        >
          &times;
        </div>
      )}
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
      />
      <div className='preview-info'>
        {isUploading ? (
          <>
            {progress}
            <div
              className='preview-info-progress'
              style={{ width: progress }}
            ></div>
          </>
        ) : (
          <>
            <span>{file.name}</span>
            {bytesToSize(file.size)}
          </>
        )}
      </div>
    </div>
  )
}

export default Preview
