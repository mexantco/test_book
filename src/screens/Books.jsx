import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, Alert, KeyboardAvoidingView } from "react-native";
import React from "react";
import { useState } from "react";
import "../firebase/config";
import { collection, query, where, getDocs, addDoc, onSnapshot,getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import {addBook, editbook} from '../utils/authors'
import { BlurView } from 'expo-blur';
import SelectDropdown from 'react-native-select-dropdown';

const Book = ({ book, index, auth }) => {

  const [name,setName] = useState(book.name);
  const [author,setAuthor] = useState(book.author);
  const [year,setYear] = useState(book.year);
  const [izd,setIzd] = useState(book.izd);
 const [modal, setModal] = useState(false);

  const editBook = async (id)=>{

   console.log(id);
    await editbook(name, author, year, izd, id);
    setModal(false);
  }
  const firestore = getFirestore();
  console.log(book);
  return (
      <TouchableOpacity
      onPress={()=>{setModal(true), setName(book.name); setAuthor(book.author); setYear(book.year); setIzd(book.izd)}}
      style={{backgroundColor:index % 2 === 0?'#f0f0f020':'#f0f0f000', marginVertical:5, }}
      >
         <Modal
      style={{flex:1}}
      transparent={true}
      visible={modal}
      >

        <BlurView
        experimentalblurmethod='dimezisBlurView'
        blurReductionFactor={10}
        intensity={100}
        tint="dark"
        style={{flex:1, justifyContent:'center'}}
        >
            <TextInput
            onChangeText={setName}
            value={name}
            style={styles.textInput}/>
            <SelectDropdown
              buttonStyle={styles.textInput}
              defaultButtonText="Выберите автора"
              data={auth}
              onSelect={(selectedItem, index) => {
              setAuthor(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
            <TextInput
            maxLength={4}
            keyboardType='number-pad'
            onChangeText={setYear}
            value={year}
            style={styles.textInput}/>
            <TextInput
            onChangeText={setIzd}
            value={izd}
            style={styles.textInput}/>

            <TouchableOpacity
                onPress={()=>editBook(book.id)}
                style={styles.btn}
            >
              <Text>Сохранить</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{setModal(false)}}
                style={styles.btn}
                >
                  <Text style={{color:'#000'}}>закрыть</Text>
            </TouchableOpacity>
        </BlurView>
      </Modal>
          <View style={styles.innerChatCard}>
            <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ marginStart: 10,  width:10 }}>
                <Text style={styles.textA}>
                  {book.bid}
                </Text>
              </View>
              <View style={{ marginStart: 10,  width:100 }}>
                <Text style={styles.textA}>
                  {book.author}
                </Text>
              </View>
              <View style={{ marginStart: 10, width:50 }}>
                <Text style={styles.textA}>
                  {book.name}
                </Text>
              </View>
              <View style={{ marginStart: 10, width:50 }}>
                <Text style={styles.textA}>
                  {book.izd}
                </Text>
              </View>
              <View>
                <Text style={styles.textA}>
                {book.year}
                </Text>
              </View>

            </View>

          </View>

      </TouchableOpacity>

  );
};

const Books = ({auth}) => {

  const [books, setBooks] = useState();
  const [name,setName] = useState('');
  const [author,setAuthor] = useState('');
  const [year,setYear] = useState('');
  const [izd,setIzd] = useState('');
  const [modal,setModal] = useState(false);
  const [auth2,setAuth] = useState([]);
  useEffect(()=>{
    if(auth){let arr = auth.map(({first_name,papa_name,last_name})=>first_name+' '+papa_name+' '+last_name)
    setAuth(arr);}

  },[auth])

  useEffect(()=>{
    const asFn= async ()=>{
    const db = getFirestore();
    const q = query(
    collection(db, "books")
    );
    //
const  unsubscribe = onSnapshot(q, (querySnapshot)=>{
        let books = [];
        querySnapshot.forEach(async(doc)=>{
        let document = doc.data();
        document.id=doc.id;
        books.push(document);


        })
        setBooks(books);
      });
  }

    asFn();
  },[])

  const setBook = async()=>{
    console.log(name)
    console.log(author)
    console.log(year)
    console.log(izd)
    if(name==''||author==''||year==''||izd==''){
      Alert.alert('Внимание', 'Заполните все поля');
      return false;
    }
    await addBook(name,author, year, izd);
    setName('');
    setYear('');
    setAuthor('');
    setIzd('');
    setModal(false);
  }
  const sort = {
    'по названию': 'name',
    'по автору':'last_name',
    'по издателю':'izd',
    'по году':'year',
    'по id':'bid'
  };


  const sorting = (selectedItem, index)=>{
// console.log(sort[selectedItem]);
// return false;
let  sortedArray;
console.log(selectedItem);
if(selectedItem=='по id'){

     sortedArray = [...books].sort((a, b) => a.bid-b.bid);

}else{

     sortedArray = [...books].sort((a, b) => a[sort[selectedItem]].localeCompare(b[sort[selectedItem]]));
    }
    setBooks(sortedArray);
  }

    return (

    <View
     style={{

        flex: 1,
        backgroundColor: "#ffffff00",
        marginTop: 30,

      }}
    >
      <Modal
      style={{flex:1}}
      transparent={true}
      visible={modal}
      >
       <BlurView
        experimentalblurmethod='dimezisBlurView'
        blurReductionFactor={10}
        intensity={100}
        tint="dark"
        style={{flex:1, justifyContent:'flex-end'}}
        >
            <TextInput
            onChangeText={setName}
            placeholder="Название"
            style={styles.textInput}/>
            <SelectDropdown
              buttonStyle={styles.textInput}
              defaultButtonText="Выберите автора"
              data={auth2}
              onSelect={(selectedItem, index) => {
              setAuthor(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
            <TextInput
            onChangeText={setIzd}
            placeholder="Издатель"
            style={styles.textInput}/>
            <TextInput
            maxLength={4}
            keyboardType='number-pad'
            onChangeText={setYear}
            placeholder="год"
            style={styles.textInput}/>

            <TouchableOpacity
                onPress={()=>setBook()}
                style={styles.btn}
            >
              <Text>Добавить</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{setModal(false)}}
                style={styles.btn}
                >
                  <Text style={{color:'#000'}}>закрыть</Text>
            </TouchableOpacity>
        </BlurView>
      </Modal>
      <View
      style={{flexDirection:'row', justifyContent:"center"}}
      >
        <TouchableOpacity
      onPress={()=>{setModal(!modal)}}
      style={{height:50, width:'30%', backgroundColor:'#bbb', alignSelf:'center', justifyContent:'center', alignItems:'center', borderRadius:15}}
      >
        <Text style={{color:'#fff'}}>Добавить книгу</Text>
      </TouchableOpacity>
      <SelectDropdown
        defaultButtonText="Сортировка по"
        data={Object.keys(sort)}
        onSelect={(selectedItem, index) => {
         sorting(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 30}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={books}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => <Book index={index} auth={auth2} book={item}/>}
      />

    </View>

  );
};

export default Books;

const styles = StyleSheet.create({
  outerChatCard: {
    backgroundColor: "white",
    borderRadius: 24,
  },
  textInput:{
    marginVertical:10,
    height:50,
    width:'50%',
    backgroundColor:'#fff',
    borderRadius:15,
    alignSelf:'center'
  },
  textA:{
    color:'#0f0f0f',
    fontSize: 12
  },
  btn:{
    height:50,
    width:'30%',
    backgroundColor:'#fff',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginVertical:10
    },
  innerChatCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 24,
    padding: 20,

  },
});
