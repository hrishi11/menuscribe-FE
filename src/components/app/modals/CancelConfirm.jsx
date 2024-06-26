import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
//import { getPackages, addDefaultItem, deleteDefaultItem } from '../../actions/vendorReducers/VendorActions'
import { useDispatch } from "react-redux";
import { cancelCustomerOrder } from "../../../actions/customerReducer/CustomerActions";
import { Toast } from "../Toast";

const CancelConfirm = ({
  showConfirmModal,
  setShowConfirmModal,
  packageId,
  customerId,
  updateTrigger,
  setUpdateTrigger,
}) => {
  const [itemValidated, setItemValidated] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    const response = await dispatch(
      cancelCustomerOrder({ customer_id: customerId, package_id: packageId })
    );
    setShowConfirmModal(false);
    setUpdateTrigger(!updateTrigger);
    if (response && response.success) {
      Toast({ message: "Package removed successfully.", type: "success" });
    }
  };

  const handleCancel = (async) => {
    setShowConfirmModal(false);
  };

  return (
    <CRow>
      <CModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => showConfirmModal(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Confirm</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CButton
                className="mx-1 float-end"
                color="primary"
                onClick={handleCancel}
              >
                Cancel
              </CButton>
              <CButton
                className="mx-1 float-end text-white"
                color="danger"
                onClick={handleConfirm}
              >
                Confirm
              </CButton>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </CRow>
  );
};

export default CancelConfirm;
