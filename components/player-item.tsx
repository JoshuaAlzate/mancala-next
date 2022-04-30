import { Box, Flex, FormControl, FormLabel, Heading, Switch } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import isMe from "utils/isMe";
import { RoomItemProps } from "./room-item";

export interface PlayerItemProps {
    id?: string;
    name?: string;
    level?: number;
    isReady?: boolean
}
const PlayerItem = ({ id, name, level, isReady }: PlayerItemProps) => {
    const [sessionIsReady, setSessionIsReady] = useState(isReady);
    const [room, setRoom] = useState<RoomItemProps>();

    const isReadyFunc = (e: ChangeEvent<HTMLInputElement>) => {
        setSessionIsReady(e.target.checked);
    }

    useEffect(() => {
        const currentRoom = window.sessionStorage.getItem('currentRoom');
        if (currentRoom) {
            const sessionRoomDetails = JSON.parse(currentRoom);
            setRoom(sessionRoomDetails);
        }
    }, []);

    useEffect(() => {
        setSessionIsReady(isReady);
    }, [isReady])

    const sendReadiness = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/player/setReady`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                roomID: room?.id,
                playerID: id,
                isReady: sessionIsReady
            })
        });
    }

    useEffect(() => {
        if (isMe(id)) {
            sendReadiness()
        };
    }, [sessionIsReady]);

    return (
        <Box border={'1px'} borderColor={'gray.200'} borderRadius={20} p={5}>
            <Flex justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                <Heading as={'h3'} size={'md'} flexGrow={1}>{name}</Heading>
                <Heading as={'h4'} size={'sm'} flexGrow={1}> Level: {level}</Heading>
            </Flex>
            <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='ready-switch' mb='0'>
                    Ready
                </FormLabel>
                <Switch onChange={isReadyFunc} isChecked={sessionIsReady} isReadOnly={!isMe(id)} id='ready-switch' />
            </FormControl>
        </Box>
    )
}

export default PlayerItem;