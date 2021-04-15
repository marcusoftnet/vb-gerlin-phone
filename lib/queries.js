import firebase from 'firebase';
import { db } from '../firebase';
import { generateSearchTermArray } from './searchTermsGenerator';

const DatabaseCollections = {
  MATERIALS: 'materials',
  USERS: 'users',
  COUNTERS: 'counters',
};

export const searchMusic = async (searchString) => {
  if (searchString.length === 0) {
    return [];
  }

  return await db
    .collection(DatabaseCollections.MATERIALS)
    .where('searchTerms', 'array-contains', searchString.toLowerCase())
    .limit(50)
    .orderBy('seriesNumber', 'asc')
    .get();
};

export const getMaterialById = async (id) => {
  return await db.collection(DatabaseCollections.MATERIALS).doc(id).get();
};

export const setUserData = (user) => {
  db.collection(DatabaseCollections.USERS).doc(user.uid).set(
    {
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    },
    {
      merge: true,
    }
  );
};

export const getUserData = async (userId) => {
  return await await db.collection(DatabaseCollections.USERS).doc(userId).get();
};

export const addNewMaterial = async (material, user) => {
  await db.collection(DatabaseCollections.MATERIALS).add({
    ...material,
    searchTerms: generateSearchTermArray(material),
    updatedBy: user?.displayName || '---',
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
  });

  await incrementNumberOfMaterials();
};

const incrementNumberOfMaterials = async () => {
  await db
    .collection(DatabaseCollections.COUNTERS)
    .doc('YOAMBfYrofaUGXgWbOcg')
    .update({
      numberOfMaterials: firebase.firestore.FieldValue.increment(1),
    });
};

export const updateMaterialData = async (material, user) => {
  console.log(material.id);
  console.log(user.displayName);
  await db
    .collection(DatabaseCollections.MATERIALS)
    .doc(material.id)
    .set(
      {
        ...material,
        searchTerms: generateSearchTermArray(material),
        updatedBy: user.displayName,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
};
