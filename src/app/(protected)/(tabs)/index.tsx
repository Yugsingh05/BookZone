
import { FlatList } from "react-native";

import DummyBooks from "@/lib/dummyBooks";
import BookList from "@/components/BookList";
import FloatingPLayer from "@/components/FloatingPLayer";

export default function App() {
  return (
   
<>
      <FlatList
      data={DummyBooks}
      contentContainerClassName="gap-4 py-5"
      renderItem={({ item }) => <BookList book={item} />}
      keyExtractor={(item) => item.id}
      />
</>
      
    
  );
}
