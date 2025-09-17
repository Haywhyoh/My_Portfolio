'use client';

import { ToastContainer } from 'react-toastify';
import RoutesScrollToTop from '../utilities/RoutesScrollToTop';
import Dependency from '../utilities/Dependency';
import BootstrapJS from './BootstrapJS';

const ClientProviders = () => {
  return (
    <>
      <BootstrapJS />
      <RoutesScrollToTop />
      <ToastContainer />
      <Dependency />
    </>
  );
};

export default ClientProviders; 