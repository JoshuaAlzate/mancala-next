import Alert from "components/alert-dialog";
import { PlayerItemProps } from "components/player-item";
import { RoomItemProps } from "components/room-item";
import { PlayerTurnEnum } from "enums/PlayerTurn.enum";
import useSockClient from "hooks/useSockClient";
import { Pit } from "models/pit.model";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const GameBoardComponent = dynamic(() => import("../../components/game-board"), {
    ssr: false
});

export interface GamePageProps {
    id: string;
    room: RoomItemProps;
    pits: Pit[];
    playerTurn: PlayerTurnEnum;
    firstPlayer: PlayerItemProps;
    secondPlayer: PlayerItemProps;
    winnerPlayer: PlayerItemProps;
}

const GamePage: NextPage<GamePageProps> = (initialGameSetup: GamePageProps) => {
    const [game, setGame] = useState<GamePageProps>(initialGameSetup);
    const [winner, setWinner] = useState<PlayerItemProps>(initialGameSetup.winnerPlayer);
    const gameSubject = useSockClient(`/topic/game-progress/${game.id}`);
    const router = useRouter();
    useEffect(() => {
        gameSubject?.subscribe((data) => {
            if (data) setGame(data);
        });

        return () => {
            gameSubject?.unsubscribe();
        }
    }, [gameSubject]);

    useEffect(() => {
        setWinner(game.winnerPlayer);
    }, [game.winnerPlayer]);

    const onCloseAlert = () => {
        router.push(`/room/${game.room.id}`);
    }

    return (
        <>
            <Alert text={`We have a winner! ${winner?.name}!`} open={!!winner} onCloseAlert={onCloseAlert} />
            <GameBoardComponent {...game} />
        </>
    );
};

GamePage.getInitialProps = async ({ query }) => {
    const { id } = query;
    const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/game/getDetails/${id}`);
    const game = await (await result.json() as Promise<GamePageProps>);
    return game;
}

export default GamePage;