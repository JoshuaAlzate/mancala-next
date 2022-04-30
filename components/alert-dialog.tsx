import { useDisclosure, Button, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialog } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface AlertDialogProps {
    text: string;
    open: boolean;
    onCloseAlert?: () => void;
}

const Alert = ({ text, open, onCloseAlert }: AlertDialogProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    useEffect(() => {
        if (open) onOpen();
    }, [open])

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>

                        <AlertDialogBody>
                            {text}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} colorScheme='red' onClick={() => {
                                onClose();
                                if (onCloseAlert) onCloseAlert();
                            }} ml={3}>
                                Okay
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default Alert;