import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './components/router';
import './App.css';

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
