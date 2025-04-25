import { useState } from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";

type PlayBackBarProps = {
  currentTime: number;
  duration: number;
  seekTo: (time: number) => void;
};

export default function PlaybackBar({
  currentTime,
  duration,
  seekTo,
}: PlayBackBarProps) {
  const progress = currentTime / duration;

  const [width, setWidth] = useState(0);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSeek = (event: GestureResponderEvent) => {
  const pressX = event.nativeEvent.locationX;
  const percentage = pressX / width;
  const seekTime = Math.min(Math.max( duration * percentage,0), duration);

  seekTo(seekTime);
  };
  return (
    <View className=" gap-4">
      <Pressable
        onPress={handleSeek}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        className="w-full bg-slate-900 h-2 rounded-full justify-center"
        hitSlop={20}

      >
        <View
          className="bg-orange-400 h-full rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
        <View
          className="absolute w-3 h-3 -translate-x-1/2 rounded-full bg-orange-400"
          style={{ left: `${progress * 100}%` }}
        />
      </Pressable>

      <View className="flex justify-between align-center flex-row ">
        <Text className="text-white">{formatTime(currentTime)}</Text>
        <Text className="text-white">{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
