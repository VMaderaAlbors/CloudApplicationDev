import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Article from './Article';





function ArticleList() {
    let origin = "article_list";
    const [articleList, setArticleList] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {

        getData()
    }, [])
    // Getting the data
    async function getData() {
        try {
            let response = await axios.get("http://localhost:4000/articles", {
                headers: { 'Accept': 'application/json' }
            });

            console.log(response.data);
            setArticleList(response.data);
            setMessage("");

        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("Error fetching data- " + error);
        }

    }

    function handleFilter(e) {
        // setting if is "" for the All.. option
        if (e.target.value === "") {
            setSelectedValue(e.target.value);
        } else {
            // converting value to a boolean and setting 
            let booleanValue = (e.target.value === "true")
            setSelectedValue(booleanValue);
        }

    }
    // creating an array with either not filtered or filtered by published status
    const filteredArticles = selectedValue === "" ? articleList : articleList.filter((article) => article.published === selectedValue);
    // waiting until data is set in the variable
    if (filteredArticles) {
        return (
            <div>
                <div>
                    <div>
                        <h3>Filter by published:</h3>
                        <select value={selectedValue} onChange={handleFilter}>
                            <option value="">All...</option>
                            <option value={true}>Published</option>
                            <option value={false}>Unpublished</option>

                        </select></div>
                </div>
                <div>

                    <h2>{message}</h2>
                    {filteredArticles.map((i, index) => {
                        return (
                            <div key={index}>
                                <Article origin={origin} title={i.title} body={i.body} id={i.id} />

                            </div>
                        )
                    })}
                </div>


            </div>
        )
    } else {
        <p>Loading...</p>
    }
}

export default ArticleList