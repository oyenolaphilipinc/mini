import { app, auth, db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc , onSnapshot} from "firebase/firestore";




const createTapDetails = async (userId) => {
  const userRef = doc(db, 'tapDetails', userId);
  
  // Check if the document already exists
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log('TapDetails already exist for user:', userId);
    return docSnap.data();  // Return the existing tap details
  }

  // Default values for new tap details
  const newTapDetails = {
    tapBalance: 0,
    tapEnergy: 750,
    coinLevel: 1,
    online: false,
    pointPerTap: 1,
    multitapLevel: 1,
    energyLevel : 1,
    rechargeLevel: 1,
    tapbotLevel: 1,
  };

  // Create a new document in Firestore
  try {
    await setDoc(userRef, newTapDetails);
    console.log('TapDetails created for user:', userId);
    return newTapDetails;  // Return the newly created tap details
  } catch (error) {
    console.error('Error creating TapDetails:', error);
    return null;
  }
};

const createUser = async (userId) => {
  const userRef = doc(db, 'users', userId);

  // Check if the document already exists
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log('User already exists with ID:', userId);
    return;
  }

  // Create a new user document
  try {
    await setDoc(userRef, userData);
    console.log('User created with ID:', userId);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const getTapDetails = (userId, callback) => {
  const tapDetailsRef = doc(db, 'tapDetails', userId);

  const unsubscribe = onSnapshot(tapDetailsRef, (doc) => {
    if (doc.exists()) {
      const tapDetails = doc.data();
      callback(tapDetails);
    } else {
      console.log('No such document!');
    }
  }, (error) => {
    console.error('Error getting document:', error);
  });

  return unsubscribe;
};


const updateTapDetails = async (userId, updates) => {
  const tapDetailsRef = doc(db, 'tapDetails', userId);

  try {
    await updateDoc(tapDetailsRef, updates);
    console.log('Tap details updated successfully');
  } catch (error) {
    console.error('Error updating tap details:', error);
    throw error;
  }
};



export {
    updateTapDetails,
    getTapDetails,
    createTapDetails
}




