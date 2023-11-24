const pageUsers = []
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
    pageUsers.forEach(users => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `<div class="space"><strong>Nome:</strong> ${users.firstName}</div>
    <div class="space"><strong>Sobrenome:</strong> ${users.lastName}</div>
    <div class="space"><strong>Email:</strong> ${users.email}</div>
    <div class="space"><strong>idade:</strong> ${users.age || 'N/A'}</div>
    <div class="space"><strong>Foto:</strong> ${users.image || 'N/A'}</div>
    <button onclick="removeUser(${users.id})" class="remove-btn">
    <i class="bi bi-trash"></i>
    </button>`;
        userList.appendChild(listItem);
    });
}

function fetchUsers() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://dummyjson.com/users";
    // Fazendo uma requisição à API
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            // Itera sobre a lista de usuários e cria elementos HTML
            users.forEach(users => {
                pageUsers.push(new users (users.id, users.firstName, users.lastName, users.email, users.age, users.image));
            });
            console.log(pageUsers);
            // Mostra lista de usuários
            displayUsers();
        })
        .catch(error => console.error("Erro ao obter dados da API:", error));
}

function addUser() {
    const addUserForm = document.getElementById("add-user-form");
    // Obtem os valores do formulário
    const id = pageUsers[pageUsers.length - 1].id + 1;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const image = document.getElementById("image").value;
    // Verifica se o campo de nome não está vazio
    if (firstName.trim() !== "") {
        pageUsers.push(new users(id, firstName, lastName, email, age, image));
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
    const userIndexToRemove = pageUsers.findIndex((users) => users.id === userId);
    // Removendo usuário da lista
    pageUsers.splice(userIndexToRemove, 1);
    // Atualizando lista na tela
    displayUsers();
}