import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc, onSnapshot,getFirestore } from "firebase/firestore";
import Authors from "../screens/Authors";
import Books from "../screens/Books";

import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";




const Tab = createMaterialTopTabNavigator();



const Navigation = () => {

  const [authors, setAuthors] = useState();

  useEffect(()=>{                                             ////получаем массив авторов
    const asFn= async ()=>{
    const db = getFirestore();
    const q = query(
    collection(db, "authors")
    );
    //
const  unsubscribe = onSnapshot(q, (querySnapshot)=>{           ////вешаем слушатель на изменение авторов в БД
        let auts = [];
        querySnapshot.forEach(async(doc)=>{
          let document  = doc.data();
          document.id = doc.id;
          auts.push(document);


        })

        setAuthors(auts);
      });
  }

    asFn();
  },[])


  return (

    <Tab.Navigator

          screenOptions={{

            tabBarActiveTintColor:'black',
            tabBarInactiveTintColor:'#0f0f0f',

            tabBarStyle: {

              backgroundColor:'transparent',
              elevation:0,
              borderBottomStartRadius: 25,
              borderBottomEndRadius: 25,
              overflow: "hidden",
            },
          }}
        >
          <Tab.Screen

            name="Authors"

            component={()=><Authors auth={authors}/>}   /////передаем текущее состояние коллекции авторов в компонет Авторы
            options={{

              title: "Авторы" }}
          />

          <Tab.Screen

            name="Books"
            component={()=><Books auth={authors}/>}     /////передаем текущее состояние коллекции авторов в компонет Книги
            options={{
              title: "Книги",
           }}
          />
          </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
