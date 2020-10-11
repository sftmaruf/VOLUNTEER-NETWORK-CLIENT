import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './JoinedTaskCard.css';

const JoinedTaskCard = (props) => {

    const { chooseWork, date, image } = props.work.data;

    return (
        <Card id='joined-card-design'>
            <Card.Img id="joined-card-image" variant="top" src={image} />
            <Card.Body id="joined-card-body">
                <span>
                    <Card.Title>{chooseWork}</Card.Title>
                    <Card.Text>{date}</Card.Text>
                </span>
            </Card.Body>
            <Button onClick = {(e) => props.handleDeleteTask(e, props.work._id)} id="joined-card-button" variant="primary">Cancel</Button>
        </Card>
    );
};

export default JoinedTaskCard;