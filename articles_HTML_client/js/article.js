let data;
const productId = new URLSearchParams(window.location.search).get("id");
async function loadData() {

    var url = `http://localhost:4000/articles/${productId}`;
    var response = await fetch(url, { headers: { 'Accept': 'application/json' } })
    data = await response.json();
    console.log(data);
    renderData(document.getElementById("article"), data);
}
function renderData(element, item) {
    const listElement = document.createElement('ul');

    let article = `<h4>Title: <strong>${item.title}</strong></h4> <div class="paragraf"> <p>${item.body}</p></div>`;

    const oneItem = document.createElement('li');
    oneItem.innerHTML = article;
    listElement.appendChild(oneItem);
    element.appendChild(listElement)


}
function deleteArticle() {
    fetch(`http://localhost:4000/articles/${data.id}`, {
        headers: { 'Accept': 'application/json' },
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete article');
            }
            console.log("Article successfully deleted.");
            // Redirect to index.html after successful deletion
            location.href = 'index.html';
        })
        .catch(error => {
            console.error("Error deleting article:", error);
            // Handle error
            renderHeader(error);
        });
}


function navigateToEdit() {
    location.href = `edit_article.html?id=${data.id}`;
}
