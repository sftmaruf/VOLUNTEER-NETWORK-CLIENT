import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import logo from '../../../src/resources/logos/Group 1329.png';
import { context, signedUserContext } from '../../App';
import { signOut } from '../AuthenticationMechanism/AuthenticationMechanism';

const NavigationBar = () => {

    const history = useHistory();
    const [signedUser, setSignedUser, nameOnNotification] = useContext(signedUserContext);
    const [isHome] = useContext(context);

    const style = {
        width: '202.81px',
        height: '60px',
    }

    const btnSizing = {
        width: '147px',
        height: '48px',
    }

    return (
        <Navbar style={{ zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: !isHome && 'center' }} bg="transparent" expand="lg">
            <Navbar.Brand onClick={() => history.replace('/')} href="#home"><img style={style} src={logo} alt="" /></Navbar.Brand>
            {
                isHome &&
                <>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#donation">Donation</Nav.Link>
                            <Nav.Link href="#events">Events</Nav.Link>
                            <Nav.Link href="#blog">Blog</Nav.Link>
                        </Nav>

                        {
                            nameOnNotification ?
                                <Nav.Link onClick={() => signOut()} href="#blog">{signedUser.name}</Nav.Link> :
                                
                                <>
                                    <Button style={btnSizing} variant="primary" onClick={() => history.push('/registeredProfile')}>Register</Button>
                                    <Button className="ml-3" style={btnSizing} variant="secondary" onClick={() => history.push('/volunteerList')}>Admin</Button>
                                </>
                        }

                    </Navbar.Collapse>
                </>
            }
        </Navbar>
    );
};

export default NavigationBar;