'use client';

import { ToastContainer } from 'react-toastify';
import RoutesScrollToTop from '../utilities/RoutesScrollToTop';
import Dependency from '../utilities/Dependency';

const ClientProviders = () => {
  return (
    <>
      <RoutesScrollToTop />
      <ToastContainer />
      <Dependency />
    </>
  );
};

export default ClientProviders; 