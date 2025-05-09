import React, { useEffect, useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { AntDesign , MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { usePlayer } from '@/providers/PlayerProvider';

export type Book = {
    id : string,
    title : string,
    author : string,
    audio_url : string,
    thumbnail_url : string
}

type BookListProps = {
    book : Book
}


const BookList : React.FC<BookListProps> = ({book}) => {

  const {book : contextBook,setBook,player} = usePlayer();
  // const [isPlaying,setIsPlaying] = useState(false)

  // function checkPLaying () {
  //   return (contextBook?.id === book?.id && player.playing) ?  setIsPlaying(true) :  setIsPlaying(false)
  // }
    // console.log(book);
  return (
   <Link href={"/player"} asChild>
    <Pressable className={`flex flex-row items-center px-4 ${contextBook?.id === book?.id ? "bg-green-900" :" bg-slate-900"}`} onPress={() => setBook(book)}>
           <Image
             className="w-20 aspect-square"
             source={{ uri: book.thumbnail_url }}
           />
   
           <View className="p-4 flex-1 gap-1">
             <Text className="text-white text-2xl font-bold ">{book.title}</Text>
             <Text className="text-white text-md">{book.author}</Text>
           </View>
   
         { contextBook?.id === book?.id ? <MaterialCommunityIcons name="music" size={24} color="white" /> : <AntDesign name="playcircleo" size={24} color="white" /> }
         </Pressable>
   </Link>
  )
}

export default BookList