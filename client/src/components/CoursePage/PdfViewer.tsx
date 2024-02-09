import React from "react";

type PdfViewerProps = {
	file_url: string;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ file_url }) => {
	return (
		<div style={{ width: "100%", height: "80vh", overflow: "hidden" }}>
			<object
				data={file_url}
				type="application/pdf"
				style={{ width: "90%", height: "100%" }}
			>
				<p>
					Your browser does not support PDFs. You can{" "}
					<a href={file_url}>download the PDF</a> instead.
				</p>
			</object>
		</div>
	);
};

export default PdfViewer;
