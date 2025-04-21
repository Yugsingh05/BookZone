import { Slot } from "expo-router"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <Slot/>
}