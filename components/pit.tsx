import { Pit } from "models/pit.model";
import { Circle, Text } from "react-konva";

interface PitComponentProps {
    xPos: number;
    yPos: number;
    isLeftText?: boolean;
    pit: Pit;
    move: (pitIndex: number) => Promise<void>;
}

const PitComponent = ({ xPos, yPos, isLeftText, pit, move }: PitComponentProps) => {

    return (
        <>
            <Circle width={50} height={50} x={xPos} y={yPos} stroke={'black'} onClick={async () => { await move(pit.id) }} />
            <Text text={pit.stones.toString()} x={isLeftText ? xPos - 80 : xPos + 75} y={yPos - 5} fontSize={20} fill={'black'} />
        </>
    );
}

export default PitComponent;