import { ReactNode } from "react";
import { createPortal } from "react-dom";
const modalContainer = document.getElementById("overlays");

type ModalContainerProps = {
  children: ReactNode;
};

function ModalContainer({ children }: ModalContainerProps) {
  if (modalContainer) return createPortal(children, modalContainer);
}

export default ModalContainer;
