import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const LoadingBar = (): any => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
  }, []);

  return null;
};

export default LoadingBar;
