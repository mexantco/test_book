
import RootNavigation from "./src/Navigations/RootNavigation";
import { SafeAreaView, StatusBar } from "react-native";

export default function App() {

  return (
    <SafeAreaView style={{flex:1,  marginTop: StatusBar.currentHeight || 0,}}>
    <RootNavigation/>
    </SafeAreaView>
  );
}


