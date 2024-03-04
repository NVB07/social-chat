import { Modal, ModalContent, ModalBody, Button, useDisclosure, Image } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
const ViewPhoto = ({ photoURL, children }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <section onClick={onOpen}>{children}</section>
            <Modal
                size="full"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                hideCloseButton
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    },
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="w-full h-screen relative top-0 flex items-center justify-center ob bg-[#000] p-0 pr-4">
                                <Button
                                    color="warning"
                                    variant="ghost"
                                    isIconOnly
                                    className="absolute top-2 left-2 z-50 !w-10 h-10 rounded-full p-0 bg-[#333]"
                                    onPress={onClose}
                                >
                                    <IoClose />
                                </Button>
                                <Image src={photoURL} className="w-screen h-screen rounded-none object-contain" alt="image full" />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ViewPhoto;
