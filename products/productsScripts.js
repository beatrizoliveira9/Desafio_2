const pageproducts = []
function displayUsers() { }
function fetchUsers() { }
function addUser() { }
function removeUser(userId) { }
document.addEventListener("DOMContentLoaded", function () {
    // Cria lista de usuários a partir da chamada da API
    fetchUsers();
});

function displayUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    pageproducts.forEach(products => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `

        <div class="space"><strong> <img src=${products.thumbnail}></strong></div>
        <div class="space"><strong>Título:</strong> ${products.title}</div>
        <div class="space"><strong>Descrição:</strong> ${products.description}</div>
        <div class="space"><strong>Preço: R$${products.price}</strong></div>
        <div class="space"><strong>Marca:</strong> ${products.brand}</div>
        <div class="space"><strong>Categoria:</strong> ${products.category}</div>
        <button onclick="removeUser(${products.id})" class="remove-btn">
        <i class="bi bi-trash"></i>
        </button>`;
        userList.appendChild(listItem);
    });
}

function fetchUsers() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://dummyjson.com/products";
    // Fazendo uma requisição à API
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            // Itera sobre a lista de usuários e cria elementos HTML
            products.products.forEach(products => {
                pageproducts.push(new product (products.id, products.title, products.description, products.price, products.brand, products.category, products.thumbnail));
            });
            console.log(pageproducts);
            // Mostra lista de usuários
            displayUsers();
        })
        .catch(error => console.error("Erro ao obter dados da API:", error));
}

function addUser() {
    const addUserForm = document.getElementById("add-user-form");
    // Obtem os valores do formulário
    const id = pageproducts[pageproducts.length - 1].id + 1;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;
    // Verifica se o campo de titulo não está vazio
    if (title.trim() !== "") {
        pageproducts.push(new product(id, title, description, price, brand, category, thumbnail));
        // Limpa o formulário
        addUserForm.reset();
        // Mostra lista de usuários
        displayUsers();
    }
}

function removeUser(userId) {
    // Apenas checando se é o usuário correto
    console.log("Removendo usuário com ID:", userId);
    // Encontrando índice do usuário que vai ser removido
    const userIndexToRemove = pageproducts.findIndex((productsr) => products.id === userId);
    // Removendo usuário da lista
    pageproducts.splice(userIndexToRemove, 1);
    // Atualizando lista na tela
    displayUsers();
}