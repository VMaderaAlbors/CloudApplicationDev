import React from 'react'
import { Link } from 'react-router-dom';

function Article(props) {

    if (props.isEditMode) {

        return (
            <div>
                <form method='post' onSubmit={props.handleUpdate}>
                    <div>
                        <label htmlFor="article_title" >Title:</label>
                        <input maxLength="40" type="text" placeholder="max 40 characters" id="article_title" onChange={props.handleUpdateTitle} required value={props.title} ></input>
                    </div>
                    <div>
                        <label htmlFor="article_body" >Body:</label>
                        <textarea maxLength="1000" placeholder="max 1000 characters" name="article[body]" id="article_body" onChange={props.handleUpdateBody} value={props.body} required />
                    </div>
                    <div>
                        <label htmlFor="article_published" >Published</label>
                        <input name="article[published]" type="hidden" value="0" autoComplete="off" />
                        {/* {props.published ? <input type="checkbox" checked="checked" value="1" name="article[published]" id="article_published" /> : <input type="checkbox" value="1" name="article[published]" id="article_published" />} */}
                        <input type="checkbox" checked={props.published} value="1" name="article[published]" id="article_published" onChange={props.handleUpdatePublished} />

                    </div>

                    <div>
                        {props.origin === "new_article" ? <button type="submit" data-disable-with="Update Article">Create Article</button> : <button type="submit" data-disable-with="Update Article">Update Article</button>}

                    </div>
                </form>


            </div>
        )


    } else if (props.origin === "article_list") {
        return (
            <div>
                <h3>Title: <strong>{props.title}</strong></h3>
                <Link to={`/article/${props.id}`} >See more details</Link>
            </div>
        )


    } else {
        return (
            <div>
                <h3>Title: <strong>{props.title}</strong></h3>
                <p className='paragraf'>{props.body}</p>
                {props.published !== undefined && (
                    <label>
                        <input type="checkbox" checked={props.published} disabled />
                        Published
                    </label>
                )}


            </div>
        )
    }
}

export default Article