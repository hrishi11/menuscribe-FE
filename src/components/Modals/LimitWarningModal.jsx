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

export default function LimitWarningModal({
  name,
  limit,
  isOpen,
  onOpen,
  onOpenChange,
  handleChangeLimit,
}) {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Limit Change
              </ModalHeader>
              <ModalBody>
                <p>
                  The user currently has {limit}{" "}
                  {name.split("_").slice(2, 4).join(" ")}. Are you sure you
                  would like to change this?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handleChangeLimit();
                    onClose();
                  }}
                >
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
