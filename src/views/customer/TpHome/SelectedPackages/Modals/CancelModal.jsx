import React, { useState } from "react";
import { Button, Modal } from "antd";
const PackageCancelModal = ({ isModalOpen, setIsModalOpen, handleOk }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        style={{
          top: 200,
        }}
        title="Cancel package conformation"
        okText="Yes"
        cancelText="No"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you would like to cancel this package</p>
      </Modal>
    </>
  );
};
export default PackageCancelModal;
