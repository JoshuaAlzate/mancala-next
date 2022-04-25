import { Heading, Grid, GridItem } from "@chakra-ui/react";
import PlayerItem, { PlayerItemProps } from "./player-item";

interface PlayerListProps {
    firstPlayer: PlayerItemProps;
    secondPlayer: PlayerItemProps;
}

const PlayerList = ({ firstPlayer, secondPlayer }: PlayerListProps) => {
    return (
        <>
            <Heading as={'h2'} size={'md'} mb={3}>Players</Heading>
            <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', null, 'repeat(3, 1fr)']} gap={6}>
                {firstPlayer ?
                    <GridItem >
                        <PlayerItem name={firstPlayer.name} level={firstPlayer.level} />
                    </GridItem>
                    : null
                }
                {secondPlayer ?
                    <GridItem >
                        <PlayerItem name={secondPlayer.name} level={secondPlayer.level} />
                    </GridItem>
                    : null
                }
            </Grid>
        </>
    );
}

export default PlayerList;