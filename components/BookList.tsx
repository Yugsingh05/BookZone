import React from 'react'
import { View, Text, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

type Book = {
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
  return (
    <View className="flex flex-row items-center p-4 " key={book.id}>
           <Image
             className="w-20 aspect-square"
             source={{ uri: book.thumbnail_url }}
           />
   
           <View className="p-4 flex-1 gap-1">
             <Text className="text-white text-2xl font-bold ">{book.title}</Text>
             <Text className="text-white text-md">{book.author}</Text>
           </View>
   
           <AntDesign name="playcircleo" size={24} color="white" />  
         </View>
   
  )
}

export default BookList