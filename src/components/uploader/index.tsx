import { useState } from 'react';
import { toast } from 'react-toastify';
import firebase from '../../utils/firebase';
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';
import Loader from '../loader';

function Uploader() {
  const [files, setFiles] = useState<Array<ExtFile>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const updateFiles = (incommingFiles: Array<ExtFile>) => {
    setFiles(incommingFiles);
  };
  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleUpload = async () => {
    try {
      if (!files || !files.length) {
        toast.error('No Files Selected!');
        return;
      }

      setLoading(true);

      const filesArray: Array<File> = files.map((file) => file.file as File);
      const uploadedFiles = await firebase.uploadMultipleFiles(filesArray);

      const saveData = (uploadedFiles || [])
        .filter((uf) => uf?.url)
        .map((uf) => ({
          id: crypto.randomUUID(),
          name: uf?.name as string,
          url: uf?.url as string,
          uploadedOn: new Date().toISOString() as string,
        }));

      await firebase.saveMultipleInDB(saveData);
      setFiles(() => [] as Array<ExtFile>);
      toast.success('File(s) Saved!');
    } catch (error) {
      console.trace(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
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
      {isLoading && <Loader />}
    </>
  );
}

export default Uploader;
