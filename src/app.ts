import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { upload } from './upload'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyARQfq5K_k9_8G8qFgZdjr2wSmZmSwdt2c',
  authDomain: 'fe-upload-81290.firebaseapp.com',
  projectId: 'fe-upload-81290',
  storageBucket: 'fe-upload-81290.appspot.com',
  messagingSenderId: '889138584710',
  appId: '1:889138584710:web:cc781945244445ee37c507'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files: File[], blocks: NodeListOf<HTMLElement>) {
    files.forEach((file, index) => {
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
          const block = blocks[index].querySelector('.preview-info-progress') as HTMLElement
          block.textContent = progress
          block.style.width = progress
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
    })
  }
})
