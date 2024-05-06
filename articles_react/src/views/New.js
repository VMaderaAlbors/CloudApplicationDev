import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Article from '../components/Article';

function New() {
    let origin = "new_article";
    const [updateBody, setUpdateBody] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updatePublished, setUpdatePublished] = useState("");
    const [message, setMessage] = useState("");
    const [isEditMode, setIsEditMode] = useState(true);

    function handleUpdateTitle(e) {
        e.preventDefault();
        setUpdateTitle(e.target.value);

    }
    function handleUpdateBody(e) {
        e.preventDefault();
        setUpdateBody(e.target.value);

    }

    function handleUpdatePublished() {

        setUpdatePublished(!updatePublished);

    }
    async function handleUpdate(e) {
        e.preventDefault();

        const requestData = {
            article: {
                title: updateTitle,
                body: updateBody,
                published: updatePublished ? 1 : 0
            }
        };

        console.log(requestData);
        setUpdateBody("");
        setUpdateTitle("");
        setUpdatePublished("");
        try {
            await axios.post(`http://localhost:4000/articles/`, requestData, {
                method: "POST",
                headers: { 'Accept': 'application/json' }
            });

            setMessage("Article created successfully");
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("Error creating article");
        }
    }

    return (
        <div>
            <h2>{message}</h2>

            <div>
                <Article origin={origin} title={updateTitle} body={updateBody} published={updatePublished} handleUpdateTitle={handleUpdateTitle} handleUpdateBody={handleUpdateBody} handleUpdatePublished={handleUpdatePublished} handleUpdate={handleUpdate} isEditMode={isEditMode} />

            </div>

        </div>
    )
}

export default New