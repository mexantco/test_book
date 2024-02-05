import "../firebase/config";
import { collection, query, where, getDoc, addDoc, update, doc, docs, updateDoc, getDocs, QuerySnapshot} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';


const db = getFirestore();

export const addAuthor = async (name, papa, fam, date) => {

  let count;
  const coll =await  getDocs(collection(db, 'authors'));
  count =coll.size;
  await addDoc(collection(db, "authors"), {
    id:(count+1),
    first_name: name,
    papa_name: papa,
    last_name: fam,
    date:(date.getTime()/1000)+'',

  });

};
export const editAuth = async (name, papa, fam, date, id) => {
  let docref =doc(db, "authors", id);
  await updateDoc(docref,{
    first_name: name,
    papa_name: papa,
    last_name: fam,
    date:(date.getTime()/1000)+'',
  })

};
export const editbook = async (name, author, year, izd, id) => {
  console.log(id);
  let docref =doc(db, "books", id);
  await updateDoc(docref,{
    name: name,
    author: author,
    year: year,
    izf:izd,
  })

};

export const addBook = async (name, author, year, izd) => {

  let count;
  const coll =await  getDocs(collection(db, 'books'));
  count =coll.size;
  await addDoc(collection(db, "books"), {
    bid:(count+1),
    name: name,
    author: author,
    izd: izd,
    year:year,

  });

};
