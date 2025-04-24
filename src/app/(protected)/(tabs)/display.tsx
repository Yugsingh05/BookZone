import BookList from '@/components/BookList'
import { Supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'


export default function Display() {

 const {data , error,isLoading} = useQuery({
  queryKey: ['books'],
  queryFn: () => Supabase.from('books').select().throwOnError(),
 });

 if(isLoading){
  return <ActivityIndicator/>
 }

 if(error){
  return <Text>{error.message}</Text>
 }

  return (
    <>
    <FlatList
    data={data?.data}
    contentContainerClassName="gap-4 py-5"
    renderItem={({ item }) => <BookList book={item} />}
    keyExtractor={(item) => item.id}
    />
</>
  )
}

