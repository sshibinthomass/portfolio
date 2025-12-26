import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
