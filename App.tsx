import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import "./global.css";
import DummyBooks from "./lib/dummyBooks";
import {AntDesign} from '@expo/vector-icons'
import BookList from "./components/BookList";




export default function App() {
  return (
   <ScrollView >
     <View className="flex-1 items-center justify-center bg-slate-800 flex-col">

{DummyBooks.map((book) => {
  return <BookList book={book} />
})}
 <StatusBar style="auto" />
</View>
   </ScrollView>
  );
}
