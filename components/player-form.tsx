import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useEffect, useRef } from "react";
import InputField from "./input-field";
import { PlayerItemProps } from "./player-item";

export interface PlayerFormProp {
    openModal?: boolean;
    onCloseModal?: (playerDetails: PlayerItemProps) => void;
}

const PlayerForm = ({ openModal, onCloseModal }: PlayerFormProp) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef();

    useEffect(() => {
        if (openModal) onOpen();
    }, []);

    const submitPlayerForm = async ({ name }: PlayerItemProps) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/player/create`, {
            body: name,
            headers: {
                'Content-Type': 'text/plain'
            },
            method: 'PUT'
        });
        return await (await result.json() as Promise<PlayerItemProps>);
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a player</ModalHeader>
                    <ModalCloseButton />
                    <Formik initialValues={{ name: '' }} onSubmit={async (values, { setErrors }) => {
                        if (!values.name) {
                            setErrors({ name: 'Name is required' });
                            return
                        }
                        const player = await submitPlayerForm(values);
                        if (typeof window !== 'undefined') window.sessionStorage.setItem('currentPlayer', JSON.stringify(player));
                        if(onCloseModal) onCloseModal(player);

                        onClose();
                    }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <ModalBody pb={6}>
                                    <InputField name={'name'} label={'Name'} required={true} />
                                </ModalBody>

                                <ModalFooter>
                                    <Button type="submit" colorScheme='blue' mr={3}>
                                        Save
                                    </Button>
                                    <Button isLoading={isSubmitting} onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </ModalContent>
            </Modal>
        </>
    )

}

export default PlayerForm;