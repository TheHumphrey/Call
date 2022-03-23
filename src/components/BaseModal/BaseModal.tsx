import { memo, useEffect, useRef } from "react";
import { Container, BodyModal, CloseButton } from "./style";

interface Props {
  toggleModal?: any,
  setToggleModal?: any,
  maxWidth?: any,
  maxHeight?: any,
  children: any,
  blockOutsideClick?: any,
  withoutPadding?: any,
}

const BaseModal = ({
  toggleModal,
  setToggleModal,
  maxWidth,
  maxHeight,
  children,
  blockOutsideClick,
  withoutPadding,
  ...props
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toggleModal === true) {
      if (containerRef.current) containerRef.current.style.display = "flex";
      if (modalRef.current) modalRef.current.style.display = "flex";

      setTimeout(() => {
        containerRef.current?.addEventListener("click", handleClose);
      }, 200);
    } else {
      if (containerRef.current) containerRef.current.style.display = "none";
      if (modalRef.current) modalRef.current.style.display = "none";

      if (containerRef.current) containerRef.current.addEventListener("click", handleClose);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleModal]);

  function handleClose(event: any) {
    if (!blockOutsideClick) {
      if (!modalRef.current?.contains(event.target)) {
        if (containerRef.current) containerRef.current.style.display = "none";
        if (modalRef.current) modalRef.current.style.display = "none";

        if (containerRef.current) containerRef.current.addEventListener("click", handleClose);

        setToggleModal(false);
      }
    }
  }

  return (
    <Container ref={containerRef} {...props}>
      <BodyModal
        ref={modalRef}
        // maxWidth={maxWidth}
        // maxHeight={maxHeight}
        withoutPadding={withoutPadding}
      >
        <CloseButton onClick={() => setToggleModal(false)}>x</CloseButton>
        {children}
      </BodyModal>
    </Container>
  );
}

export default memo(BaseModal);
