import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Admin from '../Admin/Admin';
import { useForm } from "react-hook-form";
import './AddEvent.css';
import cloudicon from '../../resources/logos/cloud-upload-outline 1.png';

const AddEvent = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [selectedImage, setSelectedImage] = useState('');
    const [prompt, setPrompt] = useState(false);

    const onSubmit = (data) => {
        const newEvent = {
            name: data.title,
            description: data.description,
            image: selectedImage,
        }

        fetch('https://cryptic-sands-30815.herokuapp.com/submitCreatedEvent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
        })
            .then(res => res.json())
            .then(res => alert(res.response));

    }

    const handleUploadImages = e => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            imageString(reader.result);
            setPrompt('true')
        }
    }

    const imageString = (base64EncodedImage) => {
        fetch('https://cryptic-sands-30815.herokuapp.com/submitImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: base64EncodedImage })
        })
            .then(res => res.json())
            .then(res => {
                setSelectedImage(res.url)
                alert('uploaded successfullty');
                setPrompt(false);
            });
    }

    const onFocusDate = e => {
        e.currentTarget.type = 'date';
    } 

    const onBlurDate = e => {
        e.currentTarget.type = 'text';
    }


    return (
        <Admin>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <Row className="event-row">
                    <Col className='coloumn'>
                        <label htmlFor="title">Event Title</label>
                        <Form.Control ref={register} placeholder="Enter Title" name="title" />
                    </Col>
                    <Col className='coloumn'>
                        <label htmlFor="date">Event Date</label>
                        <Form.Control type="text" onFocus={onFocusDate} onBlur={onBlurDate} ref={register} placeholder="Date" name="date" />
                    </Col>
                </Row>

                <Row className="event-row">
                    <Col className='coloumn'>
                        <label htmlFor="description">Description</label>
                        <Form.Control ref={register} placeholder="Enter Description" name="description" />
                    </Col>
                    <Col className='coloumn'>
                        <label htmlFor="">Banner</label>
                        <input type="file" ref={register} name="file" id="file" class="inputfile" onChange={handleUploadImages} />
                        <label className="upload-label" for="file"><img id="cloud-icon" src={cloudicon} alt="" /> {prompt ? 'Uploading...' : 'Upload Image'}</label>
                    </Col>
                </Row>
                <button className="btn btn-primary" >Submit</button>
            </form>
        </Admin>
    );
};

export default AddEvent;