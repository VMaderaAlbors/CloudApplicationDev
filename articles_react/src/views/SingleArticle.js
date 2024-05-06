import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Article from '../components/Article';

function SingleArticle() {
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const [updateBody, setUpdateBody] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updatePublished, setUpdatePublished] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {

        getData()
    }, [])
    // fetching data for single article GET
    async function getData() {
        try {
            let response = await axios.get(`http://localhost:4000/articles/${id}`, {
                headers: { 'Accept': 'application/json' },

            });
            response.data.isEditMode = false;

            console.log(id);
            console.log(response.data);
            setArticle(response.data);
            setUpdateBody(response.data.body);
            setUpdateTitle(response.data.title);
            setUpdatePublished(response.data.published);
            setMessage("");
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("Error fetching data");
        }
    }
    // toggle to edit mode
    function handleEdit() {

        setArticle(prevArticle => ({
            ...prevArticle,
            isEditMode: true
        }));

    }
    // setting updated values to the respective fields
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
    // updating the backend with a PUT request
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
            await axios.put(`http://localhost:4000/articles/${article.id}`, requestData, {
                method: "PUT",
                headers: { 'Accept': 'application/json' }
            });
            await getData();
            setMessage("Article updated successfully");
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("Error updating article");
        }
    }

    async function handleDelete() {
        try {
            await axios.delete(`http://localhost:4000/articles/${article.id}`, {
                method: "DELETE",
                headers: { 'Accept': 'application/json' }
            });
            setMessage("Article successfully deleted");
            setArticle([])
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("Error deleting the article");
        }


    }
    if (message === "Article successfully deleted") {
        return (
            <h2>{message}</h2>
        )
    } else {
        return (
            <div>
                <h2>{message}</h2>
                {article.isEditMode ?
                    <div>
                        <Article title={updateTitle} body={updateBody} published={updatePublished} isEditMode={article.isEditMode} handleUpdateTitle={handleUpdateTitle} handleUpdateBody={handleUpdateBody} handleUpdatePublished={handleUpdatePublished} handleUpdate={handleUpdate} />

                    </div>
                    :
                    <div>
                        <Article title={article.title} body={article.body} published={article.published} />
                        <button onClick={() => handleEdit()}>Edit</button>
                        <button onClick={() => handleDelete()}>Delete</button>
                    </div>
                }
            </div>
        )
    }
    return (
        <div>
            <h2>{message}</h2>
            {article.isEditMode ?
                <div>
                    <Article title={updateTitle} body={updateBody} published={updatePublished} isEditMode={article.isEditMode} handleUpdateTitle={handleUpdateTitle} handleUpdateBody={handleUpdateBody} handleUpdatePublished={handleUpdatePublished} handleUpdate={handleUpdate} />

                </div>
                :
                <div>
                    <Article title={article.title} body={article.body} published={article.published} />
                    <button onClick={() => handleEdit()}>Edit</button>
                    <button onClick={() => handleDelete()}>Delete</button>
                </div>
            }
        </div>
    )
}

export default SingleArticle