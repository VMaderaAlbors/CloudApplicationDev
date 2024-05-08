let data;
const productId = new URLSearchParams(window.location.search).get("id");
async function loadData() {


    var url = `http://localhost:4000/articles/${productId}`;
    var response = await fetch(url, { headers: { 'Accept': 'application/json' } })
    data = await response.json();
    console.log(data);

    renderHeader()
    renderForm();


}
const header = document.createElement('h2');
function renderHeader(error) {
    let message;

    if (error === "success") {
        header.setAttribute("class", "success-message");
        message = "Article has been successfully updated";

    } else if (error) {
        header.setAttribute("class", "error-message");
        message = error;

    } else {
        message = "Edit Article";
    }
    header.innerHTML = message;

    document.getElementById("heading").append(header);
}

function renderForm() {

    let form = document.createElement("form");

    form.innerHTML = `<div>
    <label for="article_title" style="display: block">Title</label>
    <input maxlength="40" type="text" name="article[title]" placeholder="max 40 characters" id="article_title" required value=${data.title}>
</div>
<div>
    <label for="article_body" style="display: block">Body</label>
    <textarea maxlength="1000" placeholder="max 1000 characters" name="article[body]" id="article_body" required>${data.body}</textarea>
</div>
<div>
    <label for="article_published" style="display: block">Published</label>
    <input name="article[published]" type="hidden" value="0" autocomplete="off">
    ${data.published ? `<input type="checkbox" checked="checked" value="1" name="article[published]" id="article_published">` : `<input type="checkbox" value="1" name="article[published]" id="article_published">`}
    
</div>
<div>
    <button type="submit" data-disable-with="Update Article">Update Article</button>
</div>`;

    form.setAttribute("id", "article-form");
    form.setAttribute("method", "post");
    form.setAttribute("onsubmit", "handleSubmit(); return false;");

    document.getElementById("article").appendChild(form);
}




function handleSubmit() {


    const formData = new FormData();


    const title = document.getElementById("article_title").value;
    const body = document.getElementById("article_body").value;
    const published = document.getElementById("article_published").checked;


    formData.append("article[title]", title);
    formData.append("article[body]", body);
    formData.append("article[published]", published);

    fetch(`http://localhost:4000/articles/${data.id}`, {


        method: "PUT",
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Article updated:", data);
            renderHeader("success");

        })
        .catch(error => {
            console.error("Error updating article:", error);
            renderHeader("Error updating article");

        });
}
module.exports = { loadData, renderHeader, renderForm, handleSubmit };