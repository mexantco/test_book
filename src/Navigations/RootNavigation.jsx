import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AuthenticationNavigation from "./AuthenticationNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {auth} from '../../src/firebase/config'
import { View,Text, Image, ImageBackground } from "react-native";


const RootNavigation = () => {

  const firestore = getFirestore();


  return (
      <NavigationContainer >
        <AuthenticationNavigation />
      </NavigationContainer>
  );
};

export default RootNavigation;
