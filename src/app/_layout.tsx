import { Slot } from "expo-router";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import "@/../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import PlayerProvider from "@/providers/PlayerProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#010D1A",
    card: "#010D1A",
    primary: "white",
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider tokenCache={tokenCache}>
          <PlayerProvider>
            <Slot />
          </PlayerProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
