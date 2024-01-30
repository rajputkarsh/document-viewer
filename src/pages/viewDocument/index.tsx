import { useEffect, useState } from 'react';
import firebase, { FileData } from '../../utils/firebase';
import { useParams } from 'react-router-dom';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import Loader from '../../components/loader';

function ViewDocument() {
  const { documentId } = useParams();
  const [file, setFile] = useState<FileData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getFile = async () => {
      try {
        if (!documentId) return;
        const data = await firebase.getFileFromDb(documentId);
        if (!data?.exists()) return;

        setFile(() => data.data() as FileData);
      } catch (error) {
        console.trace(error);
        alert('Error while getting file');
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    getFile();
  }, []);

  return (
    <>
      {!loading && file?.url && <DocViewerDoc url={file.url} />}
      {(loading || !file?.url) && <Loader />}
    </>
  );
}

function DocViewerDoc({ url }: { url: string }) {
  console.log(`rendering - `, url);

  return (
    <DocViewer
      documents={[{ uri: url }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}

export default ViewDocument;
