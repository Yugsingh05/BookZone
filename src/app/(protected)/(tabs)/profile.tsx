import { useClerk, useUser } from "@clerk/clerk-expo";
import { Button, Text, View } from "react-native";

export default function Profile (){
    const { signOut } = useClerk();
    const {user} = useUser();
    return (
        <View>
            <Text className="text-white">
                Hi I this is Profile of {user?.emailAddresses[0].emailAddress}
            </Text>

            <Button title="Logout" onPress={() => signOut()} />
        </View>
    )
}