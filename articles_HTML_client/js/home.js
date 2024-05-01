var url = "http://localhost:4000/articles";

async function loadData() {

    var response = await fetch(url, { headers: { 'Accept': 'application/json' } })
    let data = await response.json();
    console.log(data);
    renderData(data);
}

function renderData(data) {
    const renderItem = (item) => {
        let article = `<h4>Title: <strong>${item.title}</strong></h4><div class="paragraf"> <p>${item.body}</p></div><a href="article.html?id=${item.id}">Link</a>`;
        // Render each item into an HTML Element 
        const listElement = document.createElement('li');
        listElement.innerHTML = article;
        return (listElement);
    }

    const renderList = (element, list) => {

        // Create a container element 
        const listElement = document.createElement('ul');

        // Loop through the list items 
        const completeListElement = list.reduce((listElement, item) => {

            // Attach the HTML Element into the container Element 
            listElement.appendChild(renderItem(item));
            return listElement;
        }, listElement);

        // Attach container element to the DOM 
        element.appendChild(completeListElement)
    }
    renderList(document.getElementById("article"), data);

}

function navigateToNew() {
    location.href = "new_article.html";
}

