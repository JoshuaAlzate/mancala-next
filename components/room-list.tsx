import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import RoomItem, { RoomItemProps } from "./room-item";

export interface RoomListProps {
    rooms: RoomItemProps[];
}

const RoomList = ({ rooms }: RoomListProps) => {
    return (
        <>
            <Heading as={'h2'} size={'md'} mb={3}>Game Rooms</Heading>
            {rooms?.length ?
                <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', null, 'repeat(3, 1fr)']} gap={6}>
                    {
                        rooms.map(({ id, name, status }) => {
                            return (
                                <GridItem key={id}>
                                    <RoomItem name={name} status={status} id={id} />
                                </GridItem>
                            )
                        })
                    }
                </Grid>
                :
                <Flex height={'25vh'} justifyContent={'center'} alignItems={'center'}>
                    <Heading as={'h2'} size={'md'}>No available game rooms</Heading>
                </Flex>
            }

        </>
    );
}

export default RoomList;