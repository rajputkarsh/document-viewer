import { useEffect, useState } from 'react';
import firebase, { FileData } from '../../utils/firebase';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader';

function DocumentList() {
  const [fileList, setFileList] = useState<Array<FileData>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getFiles = async () => {
      const data = await firebase.getMultipleFilesFromDB();
      const list: Array<FileData> = [];
      data?.forEach((doc) => {
        const docData = doc.data() as FileData;
        list.push(docData);
      });
      setLoading(false);
      setFileList(() => list);
    };

    setLoading(true);
    getFiles();
  }, []);

  return (
    <div className="file-list">
      <div className="flex space-between">
        <h2 className="title">File List</h2>
        <Link to="/">
          <button>Upload new File</button>
        </Link>
      </div>
      <div className="file-data">
        {fileList.length === 0 && (
          <div className="margin-top">
            <h1 className="title">No Files Found</h1>
          </div>
        )}
        {fileList.length > 0 && (
          <table>
            <tr>
              <th>Name</th>
              <th>Uploaded On</th>
              <th>Action</th>
            </tr>
            {fileList.map((f) => (
              <tr>
                <td>{f.name}</td>
                <td>{f.uploadedOn}</td>
                <td>
                  <Link target="_blank" to={`/view/${f.id}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default DocumentList;
