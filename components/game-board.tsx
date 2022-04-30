
import { Flex } from '@chakra-ui/react';
import { PlayerTurnEnum } from 'enums/PlayerTurn.enum';
import { Container } from 'konva/lib/Container';
import { GamePageProps } from 'pages/game/[id]';
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import getSessionPlayer from 'utils/getSessionPlayer';
import HousePitComponent from './house-pit';
import PitComponent from './pit';
import { PlayerItemProps } from './player-item';

const GameBoardComponent = (game: GamePageProps) => {

    const container = useRef<HTMLDivElement>(null);
    const mainStage = useRef<Container>(null);

    const [player, setPlayer] = useState<PlayerItemProps>();

    getSessionPlayer(setPlayer);

    useEffect(() => {
        fitStageIntoParentContainer();
        window.addEventListener('resize', fitStageIntoParentContainer);

    }, []);

    const fitStageIntoParentContainer = () => {
        const containerWidth = container.current?.offsetWidth;
        const scale = containerWidth / window.innerHeight;

        mainStage.current?.width((window.innerHeight) * scale);
        mainStage.current?.height((window.innerHeight) * scale);
        mainStage.current?.scale({ x: scale, y: scale });
    }

    const makeAMove = async (pitIndex: number) => {
        if (
            (game.playerTurn === PlayerTurnEnum.FIRST_PLAYER && game.firstPlayer.id !== player?.id) ||
            (game.playerTurn === PlayerTurnEnum.SECOND_PLAYER && game.secondPlayer.id !== player?.id)
        ) {
            return;
        } else if (game.firstPlayer.id === player?.id && pitIndex < 6 || game.secondPlayer.id === player?.id && pitIndex > 6) {
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/game/move`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    gameID: game.id,
                    pitIndex
                })
            });
        }
    }

    const pits = () => {
        const pits = [];
        let yPos = 215;
        let xPos = 320;
        const xSpacing = 220;
        const ySPacing = 90;

        for (let x = 0; x < game.pits.length; x++) {
            if (x === 6) {
                pits.push(<HousePitComponent key={x} xPos={270} yPos={725} pit={game.pits[x]} />)
            } else if (x === 13) {
                pits.push(<HousePitComponent key={x} xPos={400} yPos={130} isLeftText pit={game.pits[x]} />);
            } else {
                if (x < 6) {
                    pits.push(<PitComponent key={x} xPos={xPos} yPos={yPos} pit={game.pits[x]} move={makeAMove} />);
                    yPos += ySPacing;
                } else {
                    yPos -= ySPacing;
                    pits.push(<PitComponent key={x} xPos={xPos + xSpacing} yPos={yPos} isLeftText pit={game.pits[x]} move={makeAMove} />)
                }
            }
        }
        return pits;
    }
    return (
        <Flex ref={container} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
            <Stage ref={mainStage}>
                <Layer>
                    <Text text={
                        `${(game.playerTurn === PlayerTurnEnum.FIRST_PLAYER ? game.firstPlayer.name : game.secondPlayer.name)}'s turn`
                    } fontSize={30}
                        x={230}
                    />
                    <Rect
                        x={230}
                        y={100}
                        width={400}
                        height={700}
                        stroke={'black'}
                        cornerRadius={50} />
                    {pits()}
                </Layer>
            </Stage>
        </Flex >

    );
}

export default GameBoardComponent;