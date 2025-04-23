import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Redirect, Slot } from 'expo-router'
import { ActivityIndicator } from 'react-native'

export default function RootLayoutNav() {


    const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/profile'} />
  }

  return (
   
      <Slot />
 
  )
}