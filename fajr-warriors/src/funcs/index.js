import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
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
    const usersSnapshot = (await getDocs(usersCollection))
    const usersList = usersSnapshot.docs.map(doc => doc.data().email)
    return usersList
}


export const getStreakForUser = async (username) => {
    const usersCollection = collection(db, 'User')
    const q = query(usersCollection, where("name", "==", username))
    const usersSnapshot = await getDocs(q)
    if (!usersSnapshot.empty) {
      const user = usersSnapshot.docs[0]; 
      return user.data().streak; 
    } else {
      throw new Error('User not found');
    }
}

export const updateAttendedUser = async (username) => {
    const usersCollection = collection(db, 'User')
    const q = query(usersCollection, where("name", "==", username))
    const usersSnapshot = await getDocs(q)
    if (!usersSnapshot.empty) {
      const user = usersSnapshot.docs[0]; 
      const userRef = user.ref;
      userRef.update({
        last_attendance: new Date().getTime(),
        total_count : user.data().total_count + 1,
        // if last attendance is yesterday, append streak, else reset streak
        streak: user.data().last_attended == new Date(today.getTime() - (24 * 60 * 60 * 1000)) ? user.data().streak + 1 : 1
      })
    } else {
      throw new Error('User not found');
    }
    
}

export const createAttendanceList = async (usernames) => {
  if (usernames.length == 0) {
      return;
  }

  const usersCollection = collection(db, 'User')
  const q = query(usersCollection, where("name", "in", usernames))
  const usersSnapshot = await getDocs(q)
  if (!usersSnapshot.empty) {
    const users = usersSnapshot.docs;
    users.forEach(user => {
      updateAttendedUser(user.data().name)
    })
  } else {
    throw new Error('User not found');
  }
}
