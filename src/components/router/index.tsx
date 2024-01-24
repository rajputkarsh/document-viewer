import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadDocument from '../../pages/uploadDocument';
import DocumentList from '../../pages/documentList';
import ViewDocument from '../../pages/viewDocument';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadDocument />} />
        <Route path="/view/:documentId" element={<ViewDocument />} />
        <Route path="/documents" element={<DocumentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
