import React from 'react';

type PdfViewerProps = {
  pdf_content: string;
  file_url: string;
};

const PdfViewer: React.FC<PdfViewerProps> = ({pdf_content, file_url }) => {
  return (
    <div>
      <p>{pdf_content}</p>
      <a href={file_url} target="_blank" rel="noopener noreferrer">Download PDF</a>
      {/* <iframe src={file_url} style={{width: '100%', height: '500px'}}></iframe> */}
      <embed src={file_url} type="application/pdf" width="100%" height="600px" />
    </div>
  );
};

export default PdfViewer;