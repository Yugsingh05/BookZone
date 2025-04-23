import { Pressable, Text, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { router } from "expo-router";
export default function Player() {
    return (
        <View className="flex-1 bg-gray-900 items-center justify-center">
            <Pressable className="absolute top-16 left-4 bg-gray-800 rounded-full p-2" onPress={() => router.back()}>
                <Entypo name="chevron-down" size={24} color={"white"}/>
            </Pressable>
            <Text className="text-white">Player</Text>
        </View>
    )
}