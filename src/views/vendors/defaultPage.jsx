import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const Default = () => {
    return (
        <CRow>
            <CCol>
                <CCard className="mb-4">
                     <CCardHeader>
                        <strong>Create Menu</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className="mb-3">
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default Default;