import React, { useContext } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import DummyBooks from "@/lib/dummyBooks";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { usePlayer } from "@/providers/PlayerProvider";

type Book = {
  id: string;
  title: string;
  author: string;
  audio_url: string;
  thumbnail_url: string;
};

type BookListProps = {
  book: Book;
};

const FloatingPLayer = () => {
  // console.log(book);

 
  const {player,book,setBook} = usePlayer();
  const playingStatus = useAudioPlayerStatus(player);
  return (
    <Link href={"/player"} asChild>
      <Pressable className="flex flex-row items-center p-2 bg-slate-900 ">
        <Image
          className="w-20 aspect-square"
          source={{ uri: book.thumbnail_url }}
        />

        <View className="p-4 flex-1 gap-1">
          <Text className="text-white text-2xl font-bold ">{book.title}</Text>
          <Text className="text-white text-md">{book.author}</Text>
        </View>

        <AntDesign
          onPress={() => playingStatus.playing ? player.pause() : player.play()}
          name={playingStatus.playing ? "pausecircleo" : "playcircleo"}
          size={24}
          color="white"
        />
      </Pressable>
    </Link>
  );
};

export default FloatingPLayer;
