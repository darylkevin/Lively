// pnpm install react-pdf

"use client";
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf"; // Required imports for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfProps {}

export default function PdfReactPdf({}: PdfProps) {
  const [numPages, setNumPages] = useState<number | undefined>();
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages); // Set total page count when the document is loaded
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setNumPages(undefined); // Reset numPages when a new file is added
    } else {
      alert("Please upload a valid PDF file.");
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
      </div>
      {pdfFile && (
        <div
          style={{
            width: "100%",
            height: "80vh", // Adjust height according to your requirements
            overflowY: "auto", // Enable vertical scroll
            border: "1px solid #ccc",
          }}
        >
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            className="my-react-pdf"
            // options={{ externalLinkTarget: "_blank" }}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false} // Disable text layer
                renderAnnotationLayer={false} // Disable annotation layer
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}
