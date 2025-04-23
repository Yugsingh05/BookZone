import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";

export default function ProtectedLayout() {
  const { isSignedIn } = useAuth();


 

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

 

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="player" options={{ headerShown: false }} />
    </Stack>
  );
}
