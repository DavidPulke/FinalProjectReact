import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import EditCard from "../EditCard";


interface EditCardModalProps {
    onHide: Function;
    refresh: Function;
    show: boolean;
    cardId: string
}

const EditCardModal: FunctionComponent<EditCardModalProps> = ({ onHide, refresh, show, cardId }) => {
    return (<>
        <Modal
            show={show}
            onHide={() => onHide()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="bg-warning">
                <Modal.Title className="text-dark" id="contained-modal-title-vcenter">
                    Edit Your Business Card
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-light bg-dark">
                <EditCard cardId={cardId} onHide={onHide} refresh={refresh} />
            </Modal.Body>
        </Modal>
    </>);
}

export default EditCardModal;