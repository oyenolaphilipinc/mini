import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  arrayUnion,
  FieldValue,
  increment,
} from "firebase/firestore"
import { app, db } from "@/utils/firebase"




async function getQuerySnapshot(userId) {
  const q = query(collection(db, "sloth"), where("userId", "==", userId))
  const qs = await getDocs(q)
  return qs
}

async function getUserData(userId, name, referralId) {
  try {
    console.log(userId)
    const qs = await getQuerySnapshot(userId)
    if (qs.empty) {
      await createUser(userId, name) // create the user if the user does not exist
      const qs = await getQuerySnapshot(userId)
      const data = qs.docs[0].data()
      if (referralId && referralId != userId) {
        await updateReferralData(userId, referralId)
      }
      return data
    }
    const data = qs.docs[0].data()
    // console.log(data)
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}


async function updateUserData(userId, updates) {
  const qs = await getQuerySnapshot(userId)
  if (qs.empty) {
    console.log("No user found with that ID.")
    return null // Or throw an error if preferred
  }
  const docRef = doc(db, "sloth", qs.docs[0].id)
  await updateDoc(docRef, { ...updates })
}

async function createUser(userId, name) {
  const docRef = await addDoc(collection(db, "sloth"), {
    coinsEarned: 1000,
    floatingTapEnergy: 1000,
    lastUpdatedTime: Date.now() / 1000,
    name,
    referrals: [],
    refillEnergy: 5,
    refillTime: 3,
    status: "active",
    tapEnergy: 1000,
    tapPower: 1,
    userId: userId,
  })
  console.log("Document written with ID: ", docRef.id)
}

async function updateReferralData(userId, referralId) {
  try {
    const qs = await getQuerySnapshot(referralId)
    if (qs.empty) {
      console.log("No user found with that ID.")
      return null // Or throw an error if preferred
    }
    const docRef = doc(db, "sloth", qs.docs[0].id)
    await updateDoc(docRef, {
      coinsEarned: increment(3000),
      referrals: arrayUnion(userId),
    })
  } catch (err) {
    console.log(err)
  }
}

export { getUserData, updateUserData, getQuerySnapshot }