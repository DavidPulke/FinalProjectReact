import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import AddCard from "../AddCard";


interface AddCardModalProps {
    onHide: Function;
    refresh: Function;
    show: boolean;
}

const AddCardModal: FunctionComponent<AddCardModalProps> = ({ onHide, refresh, show }) => {
    return (<>
        <Modal
            show={show}
            onHide={() => onHide()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="text-light" id="contained-modal-title-vcenter">
                    Add Your Business Card
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-light bg-dark">
                <AddCard onHide={onHide} refresh={refresh} />
            </Modal.Body>
        </Modal>
    </>);
}

export default AddCardModal;