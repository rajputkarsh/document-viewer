import { useState } from 'react';
import { toast } from 'react-toastify';
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';

function Uploader() {
  const [files, setFiles] = useState<Array<ExtFile>>([]);
  const updateFiles = (incommingFiles: Array<ExtFile>) => {
    setFiles(incommingFiles);
  };
  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleUpload = () => {
    console.log(`inside handleUploadStart - `, files);
    if (!files || !files.length) {
      toast.error('No Files Selected!');
      return;
    }

    console.log(`files - `, files);
  };

  const handleUploadFinish = (files: Array<ExtFile>) => {
    let message = 'File Uploaded!';
    if (files.length > 1) {
      message = 'Files Uploaded!';
    }

    toast.success(message);
  };

  return (
    <>
      <Dropzone
        onChange={updateFiles}
        value={files}
        onUploadFinish={handleUploadFinish}
      >
        {files.map((file) => (
          <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
        ))}
      </Dropzone>
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}

export default Uploader;
