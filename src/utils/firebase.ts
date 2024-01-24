import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  uploadBytes,
  getStorage,
  ref,
  FirebaseStorage,
} from 'firebase/storage';

class FirebaseFunctions {
  #firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  #app: FirebaseApp;
  #storage: FirebaseStorage;

  constructor() {
    this.#app = initializeApp(this.#firebaseConfig);
    this.#storage = getStorage(this.#app);
  }

  uploadFile(file: File) {
    try {
      const storageRef = ref(this.#storage, file.name);
      return uploadBytes(storageRef, file);
    } catch (error) {
      console.trace(error);
      alert('Something went wrong file uploading file');
    }
  }
}

export default new FirebaseFunctions();
