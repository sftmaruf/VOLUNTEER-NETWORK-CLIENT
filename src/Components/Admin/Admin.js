import React, { useContext } from 'react';
import { context } from '../../App';
import './Admin.css';
import addicon from '../../resources/logos/plus 1.png';
import volunteericon from '../../resources/logos/users-alt 1.png';
import { Link } from 'react-router-dom';

const Admin = (props) => {

    const [isHome, setIsHome] = useContext(context);
    setIsHome(true);

    return (
        <div className='admin-component'>
            <div className='side-panel'>

                <Link to="/volunteerList">
                    <div className="sidepanel-option-alignment">
                        <img src={volunteericon} alt="" />
                        <p>Volunteer registeer list</p>
                    </div>
                </Link>

                <Link to="/eventEntry">
                    <div className="sidepanel-option-alignment">
                        <img src={addicon} alt="" />
                        <p>Add event</p>
                    </div>
                </Link>
            </div>
            <div className='volunteer-panel-container'>
                <div className='customize-panel'>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Admin;