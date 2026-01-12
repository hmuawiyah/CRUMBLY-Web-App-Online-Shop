import React, { ReactNode } from 'react';

import PageWrapper from '@/components/PageWrapper'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NavbarBottom from '@/components/NavbarBottom'

interface LoginSignUpLayoutProps {
  children: ReactNode;
}

const LoginSignUpLayout: React.FC<LoginSignUpLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      
      <PageWrapper>
        {children}
      </PageWrapper>

      <div className="mt-20"></div>
      <Footer />
      <NavbarBottom />
    </>
  )
}

export default LoginSignUpLayout
