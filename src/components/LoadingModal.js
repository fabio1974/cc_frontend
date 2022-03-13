import React from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";
import "./LoadModal.css";

function LoadingModal({ isOpen, message = "wait a moment..." }) {
  return (
    <Modal isOpen={isOpen} size={"sm"} centered={false}>
      <ModalBody>
        <div className="row">
          <div className="col-4 text-center">
            <Spinner title={"minha nossa"} size={"lg"}>
              Loading...
            </Spinner>
          </div>
          <div className="col-8 d-flex align-items-center">{message}</div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default LoadingModal;
