import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon, } from '@chakra-ui/icons';
import Link from "next/link";

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex borderBottom={'1px'} borderColor={'gray.200'} py={5} mb={5}>
            <Link href={'/'}>
                <Heading as="h1" size={'lg'} cursor={'pointer'}>Mancala</Heading>
            </Link>
            <Button onClick={toggleColorMode} ml={'auto'}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
        </Flex>
    );
}

export default NavBar;