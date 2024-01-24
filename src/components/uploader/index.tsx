import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';
import { useState } from 'react';

function Uploader() {
  const [files, setFiles] = useState<Array<ExtFile>>([]);
  const updateFiles = (incommingFiles: Array<ExtFile>) => {
    setFiles(incommingFiles);
  };
  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleUploadStart = (files: Array<ExtFile>) => {};

  const handleUploadFinish = (files: Array<ExtFile>) => {};

  return (
    <Dropzone
      onChange={updateFiles}
      value={files}
      onUploadStart={handleUploadStart}
      onUploadFinish={handleUploadFinish}
      actionButtons={{
        position: 'after',
        abortButton: {},
        deleteButton: {},
        uploadButton: {},
      }}
    >
      {files.map((file) => (
        <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
      ))}
    </Dropzone>
  );
}

export default Uploader;
