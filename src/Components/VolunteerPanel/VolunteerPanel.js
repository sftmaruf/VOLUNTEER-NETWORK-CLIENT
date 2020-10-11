import React, { useEffect, useState } from 'react';
import trashicon from '../../resources/logos/trash-2 9.png';
import Admin from '../Admin/Admin';
import './VolunteerPanel.css';

const VolunteerPanel = () => {

    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        fetch('https://cryptic-sands-30815.herokuapp.com/volunteersList')
            .then(res => res.json())
            .then(res => {
                setVolunteers(res);
            })

    }, [])


    const handleDeleteVolunteer = (e, volunteer) => {
        const userName = volunteer.data.username;
        const parent = e.currentTarget.parentNode;
        
        fetch(`https://cryptic-sands-30815.herokuapp.com/deleteVolunteer/${userName}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    parent.style.display = 'none';
                }
            });
    }

    return (
        <Admin>
            <div id='table-view-container'>
                <div id="table-rows" className='table-header'>
                    <div className="col-2">
                        Name
                        </div>
                    <div className="col-3">
                        Email
                        </div>
                    <div className="col-2">
                        Registration date
                        </div>
                    <div className="col-2">
                        Volunteer list
                        </div>
                    <div className="col-1">
                        Action
                        </div>
                </div>

                {
                    volunteers.map(volunteer => {
                        return <div id='table-rows' className=' row'>
                            <div className="col-2">
                                {volunteer.data.fullname}
                            </div>
                            <div className="col-3">
                                {volunteer.data.username}
                            </div>
                            <div className="col-2">
                                {volunteer.dateOfRegistration}
                            </div>
                            <div className="col-2">
                                {volunteer.data.chooseWork}
                            </div>
                            <div onClick={(e) => handleDeleteVolunteer(e, volunteer)} id="trashicon-container" className="col-1">
                                <div className="trash-image-container">
                                    <img className="trash-image" src={trashicon} alt="" />
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </Admin>
    );
};

export default VolunteerPanel;