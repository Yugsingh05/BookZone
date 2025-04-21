import { StatusBar } from "expo-status-bar";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import "./global.css";
import DummyBooks from "./lib/dummyBooks";
import { AntDesign } from "@expo/vector-icons";
import BookList from "./components/BookList";

export default function App() {
  return (
    <View className="flex-1  bg-slate-800">

      <FlatList
      data={DummyBooks}
      contentContainerClassName="py-8"
      renderItem={({ item }) => <BookList book={item} />}
      keyExtractor={(item) => item.id}
      />


      <StatusBar style="auto" />
    </View>
  );
}
