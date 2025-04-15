'use client';
import { useState } from "react";

export default function Page() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleFile(e.target.files![0])} />
      {fileUrl && <iframe src={fileUrl} width="100%" height="600"></iframe>}
    </div>
  );
}