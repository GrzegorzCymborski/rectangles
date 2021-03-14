import { Button, Modal } from 'react-bootstrap';

type ModalProps = {
  isOpen: boolean;
  setIsError: (arg: null) => void;
  errorMsg: string | null;
};

const MainModal: React.FC<ModalProps> = ({ errorMsg, isOpen, setIsError }: ModalProps) => {
  return (
    <Modal show={isOpen} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Something went wrong...</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{errorMsg}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsError(null)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MainModal;
