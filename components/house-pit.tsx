import { Pit } from "models/pit.model";
import { Rect, Text } from "react-konva";


interface HousePitComponentProps {
    xPos: number;
    yPos: number;
    isLeftText?: boolean;
    pit: Pit;
}
const HousePitComponent = ({ xPos, yPos, isLeftText, pit }: HousePitComponentProps) => {
    return (
        <>
            <Rect width={180} height={40} x={xPos} y={yPos} stroke={'black'} cornerRadius={50} />
            <Text text={pit.stones.toString()} x={isLeftText ? xPos - 100 : xPos + 250} y={yPos + 10} fill={'black'} fontSize={30} />
        </>
    );
}

export default HousePitComponent;