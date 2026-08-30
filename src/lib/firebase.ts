import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0254884805",
  appId: "1:975438268787:web:59d3d7c7d725df19789d06",
  apiKey: "AIzaSyCGyUI3_HEYgyL33HenEkmqk4MKh6SfC9U",
  authDomain: "gen-lang-client-0254884805.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-aeriomaccleaner-a9eca073-172f-465a-b336-3ca524cb8437",
  storageBucket: "gen-lang-client-0254884805.firebasestorage.app",
  messagingSenderId: "975438268787",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
