import React, { ReactNode } from 'react';

import PageWrapper from '@/components/PageWrapper'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NavbarBottom from '@/components/NavbarBottom'
import DialogIsLogin from '@/components/DialogIsLogin';
import AlertInfoPayment from '@/components/TopBanner';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <AlertInfoPayment />

      <PageWrapper>
        {children}
      </PageWrapper>

      <div className="mt-40"></div>
      <Footer />
      <NavbarBottom />
    </>
  )
}

export default MainLayout
