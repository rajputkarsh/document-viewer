import { initializeApp, FirebaseApp } from 'firebase/app';
import { doc, setDoc, getFirestore, Firestore } from 'firebase/firestore';
import {
  uploadBytes,
  getDownloadURL,
  getStorage,
  ref,
  FirebaseStorage,
} from 'firebase/storage';

interface FileData {
  name: string;
  url: string;
  uploadedOn: string;
}
class FirebaseFunctions {
  #firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  #app: FirebaseApp;
  #storage: FirebaseStorage;
  #db: Firestore;

  constructor() {
    this.#app = initializeApp(this.#firebaseConfig);
    this.#storage = getStorage(this.#app);
    this.#db = getFirestore(this.#app);
  }

  saveInDB(data: FileData) {
    try {
      return setDoc(
        doc(this.#db, 'filestorage', `${data.name}-${data.uploadedOn}`),
        data
      );
    } catch (error) {
      console.trace(error);
      alert('Something went wrong while saving in Database');
    }
  }

  saveMultipleInDB(dataArray: Array<FileData>) {
    try {
      return Promise.all(dataArray.map((d) => this.saveInDB(d)));
    } catch (error) {
      console.trace(error);
      alert('Something went wrong while saving in Database');
    }
  }

  async uploadFile(
    file: File
  ): Promise<{ name: string; url: string } | undefined> {
    try {
      const storageRef = ref(this.#storage, file.name);
      const uploadedData = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadedData.ref);

      return {
        name: file.name,
        url: url,
      };
    } catch (error) {
      console.trace(error);
      alert('Something went wrong while uploading file');
    }
  }

  uploadMultipleFiles(
    files: Array<File>
  ): Promise<Array<{ name: string; url: string } | undefined>> | undefined {
    try {
      return Promise.all(files.map((file) => this.uploadFile(file)));
    } catch (error) {
      console.trace(error);
      alert('Something went wrong while uploading files');
    }
  }
}

export default new FirebaseFunctions();
