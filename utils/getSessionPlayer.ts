import { PlayerItemProps } from "components/player-item";
import { Dispatch, SetStateAction, useEffect } from "react";

const getSessionPlayer = (setPlayer: Dispatch<SetStateAction<PlayerItemProps | undefined>>) => {
    useEffect(() => {
        const currentPlayer = window.sessionStorage.getItem('currentPlayer');
        if (currentPlayer) {
            const sessionPlayerDetails = JSON.parse(currentPlayer);
            setPlayer(sessionPlayerDetails);
        }
    }, []);
}
export default getSessionPlayer;