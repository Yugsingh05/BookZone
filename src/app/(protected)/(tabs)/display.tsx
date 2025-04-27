
import DiscoverBookList from '@/components/DiscoverBookList'
import { useSupabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Text } from 'react-native'
import Toast from 'react-native-toast-message'


export default function Display() {

  const supabase = useSupabase();
 const {data , error,isLoading} = useQuery({
  queryKey: ['books'],
  queryFn: () => supabase.from('books').select().throwOnError(),
 });

 if(isLoading){
  return <ActivityIndicator size={"large"} className='flex-1' />
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
    <Toast/>
</>
  )
}

