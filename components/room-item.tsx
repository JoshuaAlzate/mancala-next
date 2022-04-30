import { Box, Button, Heading } from "@chakra-ui/react";
import { RoomStatus } from "enums/RoomStatus.enum";
import { useRouter } from "next/router";
import { useState } from "react";
import getSessionPlayer from "utils/getSessionPlayer";
import { PlayerItemProps } from "./player-item";

export interface RoomItemProps {
    id?: string;
    name?: string;
    status?: RoomStatus;
    firstPlayer?: PlayerItemProps;
    secondPlayer?: PlayerItemProps;
    gameID?: string;
}

const mapRoomStatus = (status: RoomStatus): string => {
    switch (status) {
        case RoomStatus.FULL: return 'Room is full';
        case RoomStatus.WAITING_FOR_OTHER_PLAYERS: return 'Waiting for other player';
        case RoomStatus.ONGOING: return 'Game on-going';
        default: return '';
    }
}

const RoomItem = ({ name, status, id }: RoomItemProps) => {

    const [player, setPlayer] = useState<PlayerItemProps>();
    const router = useRouter();
    getSessionPlayer(setPlayer);


    const enterRoom = async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/room/enterRoom`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                roomID: id,
                playerID: player?.id
            })
        });
        const enteredRoom = await (await result.json() as Promise<RoomItemProps>);
        router.push(`/room/${enteredRoom.id}`)
    }

    return (
        <Box border={'1px'} borderColor={'gray.200'} borderRadius={20}
            p={5}>
            <Box>
                <Heading as={'h3'} size={'md'}>{name}</Heading>
                <Heading as={'h4'} size={'sm'}>{mapRoomStatus(status)}</Heading>
            </Box>
            <Button onClick={async () => await enterRoom()} mt={5}>Enter Room</Button>
        </Box>
    );
}

export default RoomItem;