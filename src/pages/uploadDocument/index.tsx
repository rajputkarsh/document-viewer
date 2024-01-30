import Uploader from '../../components/uploader';
import { Link } from 'react-router-dom';

function UploadDocument() {
  return (
    <div className="upload-documents">
      <div className="title flex space-between">
        <h2>Upload Documents</h2>
        <Link to={'/documents'}>
          <button>View Uploaded Files</button>
        </Link>
      </div>

      <Uploader />
    </div>
  );
}

export default UploadDocument;
