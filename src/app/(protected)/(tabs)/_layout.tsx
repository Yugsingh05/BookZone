import {  Tabs } from "expo-router"
import {Ionicons} from "@expo/vector-icons"

export default function TabsLayout() {
    
    return <Tabs>
        <Tabs.Screen name="index" options={{ title:"Library" , tabBarIcon: ({size , color}) =>  
        <Ionicons name="library" size={size} color={color} />}} />

        <Tabs.Screen name="display"  options={{ title:"Search" , tabBarIcon: ({size , color}) =>  
        <Ionicons name="search" size={size} color={color} />}}/>

        <Tabs.Screen  name="profile" options={{
            title:"Profile" , tabBarIcon: ({size , color}) =>  
            <Ionicons name="person" size={size} color={color} />
        }}/>
    </Tabs>
}