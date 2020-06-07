import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

interface Props {
  onFileUploded: (f: File) => void;
}

const DropZone: React.FC<Props> = ({ onFileUploded }) => {
  const [selectedFile, setSelectedFile] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);

      setSelectedFile(fileUrl);
      onFileUploded(file);
    },
    [onFileUploded]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFile ? (
        <img src={selectedFile} alt="Point thumbnail" />
      ) : (
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      )}
    </div>
  );
};

export default DropZone;
