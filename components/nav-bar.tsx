import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon, } from '@chakra-ui/icons';

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex borderBottom={'1px'} borderColor={'gray.200'} py={5} mb={5}>
            <Heading as="h1" size={'lg'}>Mancala</Heading>
            <Button onClick={toggleColorMode} ml={'auto'}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
        </Flex>
    );
}

export default NavBar;