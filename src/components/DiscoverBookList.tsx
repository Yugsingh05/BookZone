import React from "react";
import { View, Text, Image, Pressable, Alert, ToastAndroid } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { usePlayer } from "@/providers/PlayerProvider";
import { Book } from "./BookList";
import { useSupabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

type DiscoverBookListProps = {
  book: Book;
};

const DiscoverBookList: React.FC<DiscoverBookListProps> = ({ book }) => {
  const { book: contextBook, setBook, player } = usePlayer();

  const {user} = useUser();
  const queryClient = useQueryClient();

  const supabase = useSupabase();
  const { mutate } = useMutation({
    mutationFn: async () =>
      supabase
        .from('user-books')
        .insert({
          user_id: user?.id,
          book_id: book.id,
          position: 0,
        })
        .throwOnError(),
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Book added successfully',
          });
          queryClient.invalidateQueries({ queryKey: ['my-books'] });
        },
        
  });


  return (
    <Pressable
      className={`flex flex-row items-center px-4 ${
        contextBook?.id === book?.id ? "bg-green-900" : " bg-slate-900"
      }`}
      onPress={() => setBook(book)}
    >
      <Image
        className="w-20 aspect-square"
        source={{ uri: book.thumbnail_url }}
      />

      <View className="p-4 flex-1 gap-1">
        <Text className="text-white text-2xl font-bold ">{book.title}</Text>
        <Text className="text-white text-md">{book.author}</Text>
      </View>

      <AntDesign onPress={() => mutate()} name={"pluscircleo"} size={24} color="white" />
    </Pressable>
  );
};

export default DiscoverBookList;
