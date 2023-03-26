import React from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';

const Header = () => {
    const { pathname } = useRouter();


    return (
        <header className='pt-5 mt-2'>
            <Navbar bg="light" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand>
                        <Link href={'/'} legacyBehavior>
                            <a className='text-primary text-decoration-none h3'>Comfort Product</a>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className=''>
                        <Nav
                            className="my-lg-0 d-flex justify-content-end align-content-center w-100"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link href={'/'} legacyBehavior>
                                <a className={`text-decoration-none fw-bold px-3 ps-0 ps-lg-3 py-2 ${location.pathname === '/' ? 'text-primary' : 'text-dark'}`}>Home</a>
                            </Link>
                            <Link href={'/dashboard'} legacyBehavior>
                                <a className={`px-3  ps-0 ps-lg-3 py-2 text-decoration-none fw-bold ${location.pathname === '/dashboard' ? 'text-primary' : 'text-dark'}`}>Dashboard</a>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;