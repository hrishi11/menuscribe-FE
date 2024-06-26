import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function SendMessagePopup() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="secondary">Open Modal</Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        className="text-black"
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#e1e2e3] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] bg-[#94d8ff]",
          footer: "border-t-[1px] bg-[#94d8ff]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody className="">
               <div className="bg-white">
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quas voluptates suscipit autem expedita, facere ratione velit sed perferendis eius optio sequi atque ut aut veniam? Dicta vero quod tempora?</span>
               </div>
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" className={'bg-white'} onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-[#1674f0] text-white shadow-lg shadow-indigo-500/20"  onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
