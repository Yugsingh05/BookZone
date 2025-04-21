import { Slot } from "expo-router"
import { ThemeProvider, DarkTheme } from "@react-navigation/native"
import "@/../global.css"

const theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: "#010D1A",
        card : "#010D1A",
        primary : "white"
    },
}

export default function RootLayout() {
    return (
        <ThemeProvider value={theme}>
            <Slot/>

        </ThemeProvider>
    )
}