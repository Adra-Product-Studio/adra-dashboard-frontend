import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'ResuableFunctions/CustomHooks';
import { resetModalBox } from 'Views/Common/Slice/Common_slice';

const ModalComponent = ({
  componentFrom,

  show,
  modalSize,
  modalClassname,
  modalDialogClassName,
  modalClickOutsideHide,
  modalFullscreen,
  modalCentered,
  modalCloseButton,

  showModalHeader,
  modalHeaderTitleClassname,
  modalHeaderClassname,
  modalHeader,

  modalBodyClassname,
  modalBody,

  showModalFooter,
  modalFooterClassname,
  modalFooter,
}) => {
  const dispatch = useDispatch();

  return (

    <Modal
      show={show}
      size={modalSize}
      backdrop={modalClickOutsideHide ? "" : "static"}
      fullscreen={modalFullscreen}
      centered={modalCentered}
      contentClassName={modalClassname}
      dialogClassName={modalDialogClassName}
      onHide={() => dispatch(resetModalBox())}
    >

      {/* Header */}
      {
        showModalHeader ? <Modal.Header closeButton={modalCloseButton} className={modalHeaderClassname}>
          <Modal.Title className={modalHeaderTitleClassname}>
            {modalHeader}
          </Modal.Title>
        </Modal.Header>
          :
          null
      }



      {/* Body */}
      <Modal.Body className={modalBodyClassname}>
        {modalBody}
      </Modal.Body>


      {/* Footer */}
      {
        showModalFooter ? <Modal.Footer className={modalFooterClassname}>
          {modalFooter}
        </Modal.Footer>
          :
          null
      }


    </Modal>
  )
}

export default ModalComponent


//how to use modal EXAMPLE:

// const [modalShow,setModalShow] = useState(true);
// const handleModel = () => setModalShow(!modalShow);
// const modalHedaerFun = () => {
//   return (
//     <span>asdiugaiusdd</span>
//   )
// }

// const modalBodyFun = () => {
//   return (
//     <div>
//       modal body
//     </div>
//   )
// }
// return (
//   <>
//     <MoModalComponentdal
//       modalClassname="bg-light"
//       modalSize="md"
//       modalCentered={true}
//       modalShow={modalShow}
//       handleModel={handleModel}
//       modalFullscreen={true}
//       // modalDialogClassName={"modal-90w"}
//       modalHeaderClassname="text-danger"
//       modalHeader={modalHedaerFun()}
//       modalBodyClassname="ps-4"
//       modalBody={modalBodyFun()}
//       modalFooterClassname="d-flex text-end"
//       closeBtn={true}
//       closeBtnClassName={"btn col-4"}
//       saveBtn={false}
//       saveBtnClassName={"btn w-100"}
//     />
//   </>
// );