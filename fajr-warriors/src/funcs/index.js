import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCDxv-DFSPRl8ilfROVlPeVyWrsE1W-EmM",
    authDomain: "fajr-warriors-gatech.firebaseapp.com",
    projectId: "fajr-warriors-gatech",
    storageBucket: "fajr-warriors-gatech.appspot.com",
    messagingSenderId: "884425253096",
    appId: "1:884425253096:web:68716d2ba7394e24c2e95d"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log(db)


export const getUsersEmails = async () => {
    const usersCollection = collection(db, 'User')
    const usersSnapshot = await getDocs(usersCollection)
    const usersList = usersSnapshot.docs.map(doc => doc.data().email)
    return usersList
}
