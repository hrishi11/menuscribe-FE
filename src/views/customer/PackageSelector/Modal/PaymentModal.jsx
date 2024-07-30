import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  //   DatePicker,
} from "@nextui-org/react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { Steps, DatePicker } from "antd";
import SelectedPackage from "./Comp/SelectedPackage";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import PaymentDetail from "./Comp/PaymentDetail";
export default function PaymentModal({
  isOpen,
  onOpen,
  setDate,
  date,
  formData,
  setFormData,
  handleSubmit,
  onOpenChange,
  handleChange,
  tableInfo,
}) {
  const [current, setCurrent] = useState(1);
  let formatter = useDateFormatter({ dateStyle: "full" });
  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => handleSubmit(e, onClose)}
                  className="space-y-4"
                >
                  <Steps
                    direction="vertical"
                    current={current}
                    onChange={(val) => setCurrent(val)}
                    items={[
                      {
                        title: "SELECTED PACKAGE",
                        description: <SelectedPackage info={tableInfo} />,
                      },
                      {
                        title: "SELECT A STARTED DATE",
                        description: (
                          <>
                            <DatePicker
                              //   defaultValue={dayjs("01/01/2015", "DD MM YYYY")}
                              format={"DD MMM YYYY"}
                              className="w-full p-2 text-[24px]"
                              onChange={(e) => {
                                console.log(e);
                                onOpen();
                                setDate(
                                  formatter.format(e.toDate(getLocalTimeZone()))
                                );
                                setCurrent(2);
                              }}
                            />
                          </>
                          //   <DatePicker
                          //     label="Birth date"
                          //     className="max-w-[284px]"
                          //     isRequired={true}
                          //     onChange={(e) => {
                          //       setDate(
                          //         formatter.format(e.toDate(getLocalTimeZone()))
                          //       );
                          //       setCurrent((pre) => pre + 1);
                          //     }}
                          //   />
                        ),
                      },
                      {
                        title: "ENTER YOUR PAYMENT DETAILS",
                        description: (
                          <>
                            {current == 2 && (
                              <PaymentDetail
                                formData={formData}
                                setFormData={setFormData}
                                handleSubmit={handleSubmit}
                                onClose={onClose}
                                onOpen={onOpen}
                              />
                            )}
                          </>
                        ),
                      },
                    ]}
                  />

                  {current == 2 && (
                    <div className="text-center">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-400 text-[20px] w-full text-white rounded-2xl hover:bg-blue-700"
                      >
                        CONFIRM ORDER
                      </button>
                    </div>
                  )}
                </form>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
