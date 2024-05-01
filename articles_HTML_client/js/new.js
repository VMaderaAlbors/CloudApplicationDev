let data;
let message;
const productId = new URLSearchParams(window.location.search).get("id");
async function loadData() {

    renderHeader()
    renderForm();
}

function renderHeader(error) {
    const header = document.createElement('h2');
    if (error) {
        console.log(error)
        header.setAttribute("class", "error-message");
        message = "Error creating article- " + error;
    } else {
        message = "Create a new Article";
    }
    header.innerHTML = message;
    document.getElementById("heading").appendChild(header);
}

function renderForm() {

    let form = document.createElement("form");

    form.innerHTML = `<div>
    <label for="article_title" style="display: block">Title</label>
    <input maxlength="40" type="text" name="article[title]" placeholder="max 40 characters" id="article_title" required>
</div>
<div>
    <label for="article_body" style="display: block">Body</label>
    <textarea maxlength="1000" placeholder="max 1000 characters" name="article[body]" id="article_body" required></textarea>
</div>
<div>
    <label for="article_published" style="display: block">Published</label>
    <input name="article[published]" type="hidden" value="0" autocomplete="off">
    <input type="checkbox" value="1"  name="article[published]" id="article_published">
</div>
<div>
    <button type="submit"  data-disable-with="Create Article">Create Article</button>
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

    fetch("http://localhost:4000/articles", {
        method: "POST",
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
            console.log("Article created:", data);
            location.href = `article.html?id=${data.id}`
        })
        .catch(error => {
            console.error("Error creating article:", error);
            renderHeader(error);

        });
}

