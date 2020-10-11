import React from 'react';
import './Search.css';

const Search = () => {
    return (
        <div className="search-component">
            <h1 className="search-title">I GROW BY HELPING PEOPLE IN NEED</h1>
            <div className="search-box input-group mb-1">
                <input type="text" className="rounded-left form-control" placeholder="Search...." aria-label="" aria-describedby="basic-addon1" />
                <div className="input-group-prepend">
                    <button className="rounded-right btn btn-primary" type="button">Button</button>
                </div>
            </div>
        </div>
    );
};

export default Search;