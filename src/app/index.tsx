import { StatusBar } from "expo-status-bar";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import "../../global.css";
import DummyBooks from "../../lib/dummyBooks";
import BookList from "../../components/BookList";

export default function App() {
  return (
    <View className="flex-1  bg-slate-800">

      <FlatList
      data={DummyBooks}
      contentContainerClassName="gap-4 py-5"
      renderItem={({ item }) => <BookList book={item} />}
      keyExtractor={(item) => item.id}
      />


      <StatusBar style="auto" />
    </View>
  );
}
