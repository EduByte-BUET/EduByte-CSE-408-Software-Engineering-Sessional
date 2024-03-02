import React from "react";
import { Modal } from "react-bootstrap";

interface Props {
	showModal: boolean;
	setShowModal: (show: boolean) => void;
	confirmRemoveCourse: () => void;
}

const ConfirmUnregisterModal = (props: Props) => {
	const { showModal, setShowModal, confirmRemoveCourse } = props;

	return (
		<div>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header>
					<Modal.Title>Confirm Removal</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					Are you sure you want to remove this course along with it's progress?
				</Modal.Body>

				<Modal.Footer>
					<button
						className="btn blue-button"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</button>
					<button className="btn red-button" onClick={confirmRemoveCourse}>
						Confirm
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ConfirmUnregisterModal;
