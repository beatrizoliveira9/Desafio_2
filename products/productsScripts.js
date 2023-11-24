const pageproducts = []
function displayproducts() { }
function fetchproducts() { }
function addproducts() { }
function removeproducts(productsId) { }
document.addEventListener("DOMContentLoaded", function () {
    // Cria lista de usuários a partir da chamada da API
    fetchproducts();
});

function displayproducts() {
    const productsList = document.getElementById("user-list");
    productsList.innerHTML = "";
    pageproducts.forEach( products => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `<div class="space"><strong>Título:</strong> ${products.title}</div>
    <div class="space"><strong>Descrição:</strong> ${products.description}</div>
    <div class="space"><strong>Preço:</strong> ${products.price}</div>
    <div class="space"><strong>Marca:</strong> ${products.brand}</div>
    <div class="space"><strong>Categoria:</strong> ${products.category}</div>
    <div class="space"><strong>Foto:</strong> ${products.thumbnail}</div>
    <button onclick="removeUser(${products.id})" class="remove-btn">
    <i class="bi bi-trash"></i>
    </button>`;
    productsList.appendChild(listItem);
    });
}

function fetchproducts() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://dummyjson.com/products";
    // Fazendo uma requisição à API
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            // Itera sobre a lista de usuários e cria elementos HTML
            products.forEach(products => {
                pageproducts.push(new products (user.id, user.title, user.description, user. price, user.brand, user.category, user.thumbnail));
            });
            console.log(pageproducts);
            // Mostra lista de usuários
            displayproducts();
        })
        .catch(error => console.error("Erro ao obter dados da API:", error));
}

function addproducts() {
    const addUserForm = document.getElementById("add-user-form");
    // Obtem os valores do formulário
    const id = pageproducts[pageproducts.length - 1].id + 1;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;
    // Verifica se o campo de nome não está vazio
    if (title.trim() !== "") {
        pageproducts.push(new products(id, title, description, price, brand, category,thumbnail ));
        // Limpa o formulário
        addUserForm.reset();
        // Mostra lista de usuários
        displayUsers();
    }
}

function removeproducts(productsId) {
    // Apenas checando se é o usuário correto
    console.log("Removendo usuário com ID:", productsId);
    // Encontrando índice do usuário que vai ser removido
    const productsIndexToRemove = pageproducts.findIndex((products) => products.id === productsId);
    // Removendo usuário da lista
    pageproducts.splice(productsIndexToRemove, 1);
    // Atualizando lista na tela
    displayproducts();
}