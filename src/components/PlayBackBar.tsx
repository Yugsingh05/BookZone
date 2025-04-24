import { Text, View } from "react-native";

type PlayBackBarProps = {
  currentTime: number;
  duration: number;
};

export default function PlaybackBar({
  currentTime,
  duration,
}: PlayBackBarProps) {
  const progress = currentTime / duration;

  const formatTime = (time : number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  return (
    <View className=" gap-4">
      <View className="w-full bg-slate-900 h-2 rounded-full justify-center">
        <View
          className="bg-orange-400 h-full rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
        <View
          className="absolute w-3 h-3 -translate-x-1/2 rounded-full bg-orange-400"
          style={{ left: `${progress * 100}%` }}
        />
      </View>

      <View className="flex justify-between align-center flex-row ">
        <Text className="text-white">{formatTime(currentTime)}</Text>
        <Text className="text-white">{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
