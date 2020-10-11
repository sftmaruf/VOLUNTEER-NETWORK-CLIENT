import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../App';
import { signedUserContext } from '../../App';
import JoinedTaskCard from '../JoinedTaskCard/JoinedTaskCard';
import { extractSessionStorage, sessionClearByKey } from '../SessionStorageMechanism/SessionStorageMechanism';

const VolunteerTaskWindow = () => {

    const [isHome, setIsHome, activeCard, setActiveCard,token] = useContext(context);
    const [signedUser, setSignedUser, nameOnNotification, setNameOnNotification] = useContext(signedUserContext);
    const [volunteersJoinedWork, setVolunteerJoinedWork] = useState([]);

    setNameOnNotification(true);
    setIsHome(true);

    sessionClearByKey('firstLoad');

    useEffect(() => {
            fetch(`https://cryptic-sands-30815.herokuapp.com/volunteerJoinedWork?email=${signedUser.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(res => setVolunteerJoinedWork(res));
    }, []);

    const handleDeleteTask = (e, id) => {
        const parent = e.currentTarget.parentNode;
        fetch(`https://cryptic-sands-30815.herokuapp.com/deleteTask/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                parent.style.display = 'none';
            });
    }

    return (
        <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
            {
                volunteersJoinedWork.map(work => <JoinedTaskCard handleDeleteTask={handleDeleteTask} className="column" work={work}></JoinedTaskCard>)
            }
        </div>
    );
};

export default VolunteerTaskWindow;