import { Image, Pressable, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DummyBooks from "@/lib/dummyBooks";
import { Ionicons } from "@expo/vector-icons";
import PlaybackBar from "@/components/PlayBackBar";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

export default function Player() {
  const book = DummyBooks[0];

  const player = useAudioPlayer(book.audio_url);
  const playerStatus = useAudioPlayerStatus(player);

  return (
    <SafeAreaView className="flex-1  p-4 py-10 gap-4">
      <Pressable
        className="absolute top-4 left-4 bg-gray-800 rounded-full p-2"
        onPress={() => router.back()}
      >
        <Entypo name="chevron-down" size={24} color={"white"} />
      </Pressable>

      <Image
        source={{ uri: book.thumbnail_url }}
        className="w-[95%] aspect-square rounded-[30px] self-center mt-10"
      />

      <View className="gap-8 flex-1 justify-end">
        <Text className="text-white text-2xl font-bold text-center">
          {book.title}
        </Text>

        <PlaybackBar currentTime={playerStatus.currentTime} duration={playerStatus.duration}/>

        <View className="flex-row items-center justify-between mt-8">
          <Ionicons name="play-skip-back" size={24} color="white" />
          <Ionicons name="play-back" size={24} color="white" />
          <Ionicons
            onPress={() =>playerStatus.playing ? player.pause() : player.play()}
            name={playerStatus.playing ? "pause" : "play"}
            size={50}
            color="white"
          />
          <Ionicons name="play-forward" size={24} color="white" />
          <Ionicons name="play-skip-forward" size={24} color="white" />
        </View>
      </View>
    </SafeAreaView>
  );
}
