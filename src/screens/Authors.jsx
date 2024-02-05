import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, Alert, KeyboardAvoidingView } from "react-native";
import React from "react";
import { useState } from "react";
import "../firebase/config";
import { collection, query, where, getDocs, addDoc, onSnapshot,getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import {addAuthor, editAuth} from '../utils/authors'
import { BlurView } from 'expo-blur';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';


const Author = ({ author, index }) => {
  let bDate = new   Date(author.date*1000);
  const [name,setName] = useState(author.first_name);
  const [papa,setPapa] = useState(author.papa_name);
  const [fam,setFam] = useState(author.last_name);
  const [datePick, setDatepick] = useState(false);
  const [newDate, setNewdate]= useState(bDate);
  const [modal, setModal] = useState(false);

  const editAuthor = async (id)=>{
  //   console.log(bDate)
  // console.log(newDate)
    await editAuth(name, papa, fam, newDate, id);
    setModal(false);
  }
  const firestore = getFirestore();

  return (
      <TouchableOpacity
      onPress={()=>{setModal(true), setName(author.first_name); setPapa(author.papa_name); setFam(author.last_name)}}
      style={{backgroundColor:index % 2 === 0?'#f0f0f020':'#f0f0f000', marginVertical:5}}
      >
         <Modal
      style={{flex:1}}
      transparent={true}
      visible={modal}
      >
        <DatePicker
        mode="date"
        modal={true}
        androidVariant = 'iosClone'
        open={datePick}
        date={newDate}
        onConfirm={(date) => {

          setDatepick(false)
           setNewdate(date)
        }}
        onCancel={() => {
           setDatepick(false)
        }}
      />
        <BlurView
        experimentalblurmethod='dimezisBlurView'
        blurReductionFactor={10}
        intensity={100}
        tint="dark"
        style={{flex:1, justifyContent:'center'}}
        >
            <TextInput
            onChangeText={setName}
            placeholder={author.first_name}
            value={name}
            style={styles.textInput}/>
            <TextInput
            onChangeText={setPapa}
            placeholder={author.papa_name}
            value={papa}
            style={styles.textInput}/>
            <TextInput
            onChangeText={setFam}
            placeholder={author.last_name}
            value={fam}
            style={styles.textInput}/>
            <TouchableOpacity
                onPress={()=>setDatepick(true)}
                style={styles.btn}
            >
              <Text>Дата рождения</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>editAuthor(author.id)}
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
            <View style={{ marginStart: 10, flexGrow:1 }}>
                <Text style={styles.textA}>
                  {author.aid}
                </Text>
              </View>
              <View style={{ marginStart: 10, flexGrow:1 }}>
                <Text style={styles.textA}>
                  {author.first_name+' '+author.papa_name+' '+author.last_name}
                </Text>
              </View>
              <View>
                <Text style={styles.textA}>
                {bDate.getDate()+'.'+bDate.getMonth()+'.'+bDate.getFullYear()}
                </Text>
              </View>

            </View>

          </View>

      </TouchableOpacity>

  );
};

const Authors = ({navigation, auth}) => {
  const [authors2, setAuthors] = useState();
  const [modal, setModal] = useState(false);
  const [name,setName] = useState('');
  const [papa,setPapa] = useState('');
  const [fam,setFam] = useState('');
  const [datePick, setDatepick] = useState(false);
  const [newDate, setNewdate]  =useState(null);

  useEffect(()=>{
    console.log(auth)

    setAuthors(auth)
  },[auth])

  const setAuthor = async()=>{
    if(name==''||papa==''||fam==''||newDate==null){
      Alert.alert('Внимание', 'Заполните все поля');
      return false;
    }
    await addAuthor(name,papa, fam, newDate);
    setName('');
    setPapa('');
    setFam('');
    setNewdate(null);
    setModal(false);
  }
  const sort = {
    'по имени': 'first_name',
    'по фамилии':'last_name',
    'по отчеству':'papa_name',
    'по id':'aid'
  };


  const sorting = (selectedItem, index)=>{
// console.log(sort[selectedItem]);
// return false;
let  sortedArray;
console.log(selectedItem);
if(selectedItem=='по id'){

     sortedArray = [...authors2].sort((a, b) => a.aid-b.aid);

}else{

     sortedArray = [...authors2].sort((a, b) => a[sort[selectedItem]].localeCompare(b[sort[selectedItem]]));
    }
    setAuthors(sortedArray);
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
        <DatePicker
        mode="date"
        modal={true}
        androidVariant = 'iosClone'
        open={datePick}
        date={new Date()}
        onConfirm={(date) => {

          setDatepick(false)
           setNewdate(date)
        }}
        onCancel={() => {
           setDatepick(false)
        }}
      />
        <BlurView
        experimentalblurmethod='dimezisBlurView'
        blurReductionFactor={10}
        intensity={100}
        tint="dark"
        style={{flex:1, justifyContent:'flex-end'}}
        >
            <TextInput
            onChangeText={setName}
            placeholder="Имя"
            style={styles.textInput}/>
            <TextInput
            onChangeText={setPapa}
            placeholder="Отчество"
            style={styles.textInput}/>
            <TextInput
            onChangeText={setFam}
            placeholder="Фамилия"
            style={styles.textInput}/>
            <TouchableOpacity
                onPress={()=>setDatepick(true)}
                style={styles.btn}
            >
              <Text>Дата рождения</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>setAuthor()}
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
        <Text style={{color:'#fff'}}>Добавить автора</Text>
      </TouchableOpacity>
      <SelectDropdown
        defaultButtonText="Сортировка по"
        data={Object.keys(sort)}
        onSelect={(selectedItem, index) => {
         sorting(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 30}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={authors2}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => <Author index={index} author={item}/>}
      />

    </View>

  );
};

export default Authors;

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
