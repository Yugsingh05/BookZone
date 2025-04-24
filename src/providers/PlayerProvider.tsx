import DummyBooks from "@/lib/dummyBooks";
import { AudioPlayer, useAudioPlayer } from "expo-audio"
import { createContext, PropsWithChildren, useContext } from "react";

type PlayerContextType={
    player : AudioPlayer;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export default function PlayerProvider({children} : PropsWithChildren){
    const book = DummyBooks[0];
    const player = useAudioPlayer({uri : book.audio_url});

    return (
        <PlayerContext.Provider value={{player}}>{children}</PlayerContext.Provider>
    )
}

export const usePlayer = () => useContext(PlayerContext);