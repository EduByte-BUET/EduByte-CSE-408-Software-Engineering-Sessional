import React from "react";
import { Modal } from "react-bootstrap";

interface Props {
	description: string;
	toggle: (boolean) => void;
}

const Popup = (props: Props) => {
	const { description, toggle } = props;

	return (
		<Modal show onHide={() => toggle(false)}>
			<Modal.Header>
				<Modal.Title>Alert</Modal.Title>
			</Modal.Header>

			<Modal.Body>{description}</Modal.Body>

			<Modal.Footer>
				<button className="btn red-button" onClick={() => toggle(false)}>
					Close
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default Popup;
