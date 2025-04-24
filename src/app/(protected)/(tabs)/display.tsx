
import DiscoverBookList from '@/components/DiscoverBookList'
import { useSupabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Text } from 'react-native'


export default function Display() {

  const supabase = useSupabase();
 const {data , error,isLoading} = useQuery({
  queryKey: ['books'],
  queryFn: () => supabase.from('books').select().throwOnError(),
 });

console.log(data);

 if(isLoading){
  return <ActivityIndicator/>
 }

 if(error){
  return <Text>{error.message}</Text>
 }

  return (
    <>
    <FlatList
    data={data?.data ?? []}
    contentContainerClassName="gap-4 py-5"
    renderItem={({ item }) => <DiscoverBookList book={item} />}
    keyExtractor={(item) => item.id}
    />
</>
  )
}

