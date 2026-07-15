import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBN7YxntGb72m4CZ0pSr6qbf3R6iN8ezyc',
  authDomain: 'criador-contrato.firebaseapp.com',
  projectId: 'criador-contrato',
  storageBucket: 'criador-contrato.firebasestorage.app',
  messagingSenderId: '894739410720',
  appId: '1:894739410720:web:c76a8b68611e51dc7f7145',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
