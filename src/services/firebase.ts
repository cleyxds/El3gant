import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDCYUtvLhcpgOlj0HGNQxm4rwZyl1rIowc",
  authDomain: "el3gant-a248a.firebaseapp.com",
  projectId: "el3gant-a248a",
  storageBucket: "el3gant-a248a.appspot.com",
  messagingSenderId: "810883767362",
  appId: "1:810883767362:web:7e0848e1a2adac556421db",
  measurementId: "G-9C6N0XG9ZQ",
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export default app
export { db, auth }
