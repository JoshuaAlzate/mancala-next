import { PlayerItemProps } from "components/player-item";
import { isServer } from "./isServer";

const isMe = (playerID: string | undefined): boolean => {
    const sessionPlayer = isServer() ? null : window.sessionStorage.getItem("currentPlayer");
    if(sessionPlayer) {
        const player: PlayerItemProps = JSON.parse(sessionPlayer);
        return player.id === playerID;
    }
    return false;
}

export default isMe;