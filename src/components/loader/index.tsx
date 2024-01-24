import { useEffect, useState } from 'react';
import Lottie from 'lottie-web';
import loader from './loader.json';

function Loader({ timer = 30 }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const lottieInstance = Lottie.loadAnimation({
      container: document.querySelector('#lottie-loader') as Element,
      animationData: loader,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });

    setTimeout(() => {
      setShowLoader(false);
    }, timer * 1000);

    return () => lottieInstance.destroy();
  }, []);

  return (
    <>
      {showLoader && (
        <div className="loader">
          <div id="lottie-loader"></div>
        </div>
      )}
    </>
  );
}

export default Loader;
