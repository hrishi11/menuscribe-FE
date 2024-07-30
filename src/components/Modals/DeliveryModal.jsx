import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function DeliveryModal({
  text,
  isOpen,
  onOpen,
  onOpenChange,
  runFuction,
}) {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmation Modal
              </ModalHeader>
              <ModalBody>
                <p>{text}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onClick={() => {
                    onClose();
                  }}
                  //   onPress={onClose}
                >
                  No
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    runFuction();
                    onClose();
                  }}
                  //   onPress={onClose}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
