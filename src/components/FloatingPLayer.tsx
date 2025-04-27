import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useAudioPlayerStatus } from "expo-audio";
import { usePlayer } from "@/providers/PlayerProvider";

const FloatingPlayer = () => {
  const { player, book } = usePlayer();
  
  // This hook should always be called
  const playingStatus = useAudioPlayerStatus(player);

  // Do not call hooks conditionally, only return null after hooks
  if (!book || !playingStatus) {
    return null;
  }

  const handleTogglePlay = () => {
    if (playingStatus.playing) {
      player.pause();
    } else {
      player.play();
    }
  };


  return (
    <View>
      <Link href="/player" asChild>
        <Pressable className="flex flex-row items-center p-2 bg-slate-900">
          <Image
            className="w-20 aspect-square"
            source={{ uri: book.thumbnail_url }}
          />
          <View className="p-4 flex-1 gap-1">
            <Text className="text-white text-2xl font-bold">
              {book.title}
            </Text>
            <Text className="text-white text-md">{book.author}</Text>
          </View>

          <AntDesign
            onPress={handleTogglePlay}
            name={
              player.isBuffering
                ? "loading1"
                : playingStatus.playing
                ? "pausecircleo"
                : "playcircleo"
            }
            size={24}
            color="white"
          />
        </Pressable>
      </Link>
    </View>
  );
};

export default FloatingPlayer;
