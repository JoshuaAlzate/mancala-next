import { Button, Flex, Heading } from "@chakra-ui/react";
import NavBar from "components/nav-bar";
import { PlayerItemProps } from "components/player-item";
import PlayerList from "components/player-list";
import { RoomItemProps } from "components/room-item";
import useSockClient from "hooks/useSockClient";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getSessionPlayer from "utils/getSessionPlayer";

const RoomTokenPage: NextPage = (room: RoomItemProps) => {
    const [player, setPlayer] = useState<PlayerItemProps>();
    const [sessionRoom, setSessionRoom] = useState<RoomItemProps>(room);

    const roomSubject = useSockClient(`/topic/room-update/${room.id}`);

    const router = useRouter();
    const { id } = router.query;

    getSessionPlayer(setPlayer);

    useEffect(() => {
        window.sessionStorage.setItem('currentRoom', JSON.stringify(sessionRoom));
    }, [sessionRoom])


    useEffect(() => {
        roomSubject?.subscribe((data: RoomItemProps[]) => {
            if (data) setSessionRoom(prevValue => {
                return {
                    ...prevValue,
                    ...data
                }
            });
        });

        return () => {
            roomSubject?.unsubscribe();
        }
    }, [roomSubject])

    useEffect(() => {
        router.beforePopState(({ as }) => {
            if (as !== router.asPath) {
                window.sessionStorage.removeItem('currentRoom');
                exitRoom(player?.id);
            }
            return true;
        });

        return () => {
            router.beforePopState(() => true);
        };
    }, [router, player]);

    useEffect(() => {
        if (sessionRoom.gameID) router.push(`/game/${sessionRoom.gameID}`)
    }, [sessionRoom.gameID]);

    const exitRoom = async (playerID: string | undefined) => {
        return await fetch(`${process.env.NEXT_PUBLIC_HOST}/room/checkRoomPlayers`, {
            body: JSON.stringify({
                roomID: id,
                playerID
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }

    return (
        <>
            <NavBar />
            <Flex>
                <Heading as={'h2'} size={'md'}>Waiting for opponent</Heading>
                <Button onClick={router.back} colorScheme={'red'} ml={'auto'}>Exit Room</Button>
            </Flex>
            <PlayerList firstPlayer={sessionRoom.firstPlayer} secondPlayer={sessionRoom.secondPlayer} />

        </>
    )
}

RoomTokenPage.getInitialProps = async ({ query }) => {
    const { id } = query;
    const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/room/getDetails/${id}`);
    const room = await (await result.json() as Promise<RoomItemProps>);
    return room;
}


export default RoomTokenPage;