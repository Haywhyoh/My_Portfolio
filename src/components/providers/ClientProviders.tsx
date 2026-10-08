'use client';

import { ToastContainer } from 'react-toastify';
import RoutesScrollToTop from '../utilities/RoutesScrollToTop';

const ClientProviders = () => {
  return (
    <>
      <RoutesScrollToTop />
      <ToastContainer theme="dark" position="bottom-right" />
    </>
  );
};

export default ClientProviders;
