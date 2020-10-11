import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import Search from '../Search/Search';
import { context } from '../../App';
import TaskCards from '../TaskCards/TaskCards';
import { extractSessionStorage, pushSessionStorage } from '../SessionStorageMechanism/SessionStorageMechanism';

const Home = () => {

    const [works, setWorks] = useState([]);
    const [isHome, setIsHome, nameOnNotification, setNameOnNotification] = useContext(context);
    const color = ['#FFBD3E', '#FF7044', ' #3F90FC', '#421FCF']

    setIsHome(true);
    setNameOnNotification(false);

    (function () {
        if (window.sessionStorage) {
            if (!extractSessionStorage('firstLoad')) {
                pushSessionStorage('firstLoad', true)
                window.location.reload();
            }
        }
    })();


    useEffect(() => {
        fetch('https://cryptic-sands-30815.herokuapp.com/volunteerWorks')
            .then(res => res.json())
            .then(arrayOfWorks => {
                setWorks(arrayOfWorks)
            })


    }, []);

    return (
        <div>
            <div>
                <div className="background-container" >
                    <Search></Search>
                </div>
            </div>
            <div className="card-container">
                {
                    works.map(work => <TaskCards key={work._id} work={work} color={color[Math.floor(Math.random() * color.length)]}></TaskCards>)
                }
            </div>
        </div>
    );
};

export default Home;