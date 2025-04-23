import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Redirect, Slot } from 'expo-router'

export default function RootLayoutNav() {


    const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/profile'} />
  }

  return (
   
      <Slot />
 
  )
}