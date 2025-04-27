
import { ActivityIndicator, FlatList, Text } from "react-native";
import BookList from "@/components/BookList";
import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const supabase = useSupabase();

  const { data, error, isLoading } = useQuery({
    queryKey: ['my-books'],
    queryFn: async () =>
      supabase.from('user-books').select('*, book:books(*)').throwOnError(),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
 

  if(data?.data.length === 0){
    return (
      <Text className="text-white text-2xl text-center my-auto">No Books found</Text>
    )
  }

  return (
    <FlatList
      data={data?.data || []}
      contentContainerClassName='gap-4 p-2'
      renderItem={({ item }) => <BookList book={item.book} />}
    />
  );
}