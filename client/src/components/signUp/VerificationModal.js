import { Divider, Modal } from "antd";
import "./VerificationModal.scss";
import { CloseIcon } from "../icons/Icons";
const VerificationModal = ({ isModalOpen, handleCancel, handleOk }) => {
  return (
    <>
      <Modal
        title="Verify Email"
        wrapClassName="verification-modal"
        closeIcon={<CloseIcon />}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>
          <Divider />
          Please verify your account. We have sent an email to arkomaini@gmail.com. If you are unable to find the verification email please contact us
          at: +91-9380644532
        </p>
      </Modal>
    </>
  );
};
export default VerificationModal;
