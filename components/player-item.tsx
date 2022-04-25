import { Box, Flex, FormControl, FormLabel, Heading, Switch } from "@chakra-ui/react";

export interface PlayerItemProps {
    id?: string;
    name?: string;
    level?: number;
}
const PlayerItem = ({ name, level }: PlayerItemProps) => {
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
                <Switch id='ready-switch' />
            </FormControl>
        </Box>
    )
}

export default PlayerItem;