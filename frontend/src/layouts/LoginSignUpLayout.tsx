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
        {/* <div className='max-w-[1920px] mx-4 md:mx-8 lg:mx-30'> */}
        {children}
        {/* </div> */}
      </PageWrapper>

      <div className="mt-20"></div>
      <Footer />
      <NavbarBottom />
    </>
  )
}

export default LoginSignUpLayout
