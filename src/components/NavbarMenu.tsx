import '../App.css';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

function NavbarMenu() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const navigate = useNavigate();
    const totalProduct = useSelector((state: RootState) => state.cart.items.length);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
            document.body.classList.toggle('dark-mode', storedTheme === 'dark');
        }
    }, [totalProduct]);

    const toggleDarkMode = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);

        document.body.classList.toggle('dark-mode', !isDarkMode);

        localStorage.setItem('theme', newTheme);
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand>
                    <img src="src/assets/react.svg" alt="" height={40} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link as="div">
                            <Link
                                to="/vitualize"
                                className={location.pathname === '/vitualize' ? 'active' : ''}
                            >
                                <span>Virtualized</span>
                            </Link>
                        </Nav.Link>
                        <Nav.Link as="div">
                            <Link
                                to="/"
                                className={location.pathname === '/' ? 'active' : ''}
                            >
                                <span>Product Management</span>
                            </Link>
                        </Nav.Link>
                        <Nav.Link as="div">
                            <Link
                                to="/member-management"
                                className={location.pathname === '/member-management' ? 'active' : ''}
                            >
                                <span>Member</span>
                            </Link>
                        </Nav.Link>
                        <Nav.Link as="div">
                            <Link
                                to="/infinite-scroll"
                                className={location.pathname === '/infinite-scroll' ? 'active' : ''}
                            >
                                <span>Scroll</span>
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <div className="">
                        <button type="button" className="btn btn-light btn-sm mx-2" onClick={() => navigate(`/registor`)}>
                            Registor
                        </button>
                        <button type="button" className="btn btn-dark btn-sm mx-2" onClick={() => navigate(`/cart`)}>
                           Your Cart <small>{totalProduct}</small>
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm mx-4"
                            onClick={toggleDarkMode}
                        >
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarMenu;
