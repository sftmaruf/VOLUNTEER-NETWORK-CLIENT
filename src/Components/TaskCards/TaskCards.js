import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { context } from '../../App';
import { pushSessionStorage } from '../SessionStorageMechanism/SessionStorageMechanism';
import './TaskCards.css';

const TaskCards = (props) => {

    const history = useHistory();
    const { name, image } = props.work;
    const [isHome, setIsHome, activeCard, setActiveCard] = useContext(context);

    const handleCardClick = () => {
        setActiveCard({name, image});
        pushSessionStorage('activecard', { name, image });
        history.push(`/signup`);
    }

    return (
        <Card onClick={handleCardClick} id="card-component">
            <Card.Img id="card-picture" variant="top" src = {image} />
            <Card.Body style={{ background: props.color }} id="card-body">
                <Card.Title>{name}</Card.Title>
            </Card.Body>
        </Card>
    );
};

export default TaskCards;