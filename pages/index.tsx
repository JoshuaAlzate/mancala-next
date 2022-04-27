import { Button, Heading } from "@chakra-ui/react";
import NavBar from "components/nav-bar";
import PlayerForm from "components/player-form";
import { PlayerItemProps } from "components/player-item";
import { RoomItemProps } from "components/room-item";
import RoomList from "components/room-list";
import useSockClient from "hooks/useSockClient";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface HomeProps {
  initialRooms: RoomItemProps[];
}

const Home: NextPage = ({ initialRooms }: HomeProps) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [player, setPlayer] = useState<PlayerItemProps>();
  const roomsSubject = useSockClient("/topic/room-list-update");
  const router = useRouter();

  useEffect(() => {
    const currentPlayer = window.sessionStorage.getItem('currentPlayer');
    if (currentPlayer) {
      const sessionPlayerDetails = JSON.parse(currentPlayer);
      setPlayer(sessionPlayerDetails);
    }
  }, []);

  useEffect(() => {
    roomsSubject?.subscribe((data: any) => {
      if (data) setRooms(data);
    });

    return () => {
      roomsSubject?.unsubscribe();
    }
  }, [roomsSubject])

  const openPlayerModal = () => {
    return typeof window !== 'undefined' && window.sessionStorage.getItem('currentPlayer');
  }

  const roomCreation = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/room/create`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(player)
    });
    const createdRoom = await result.json() as Promise<RoomItemProps>;
    router.push(`/room/${(await createdRoom).id}`)
  }

  return (
    <>
      <PlayerForm openModal={!openPlayerModal()} />
      <NavBar />
      <Heading as={'h1'} size={'lg'}>Hey {player ? player.name : 'there'}!</Heading>
      <Button onClick={roomCreation} my={5}>Create a Room</Button>
      <RoomList rooms={rooms} />
    </>
  );
}

export const getServerSideProps = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/room/getAll`);
  const rooms = await (await result.json() as Promise<RoomItemProps[]>);

  return { props: { initialRooms: rooms } }
}

export default Home; 