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
    pageUsers.forEach(user => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = ` 
        
        <div class="space"><strong> <img src=${user.image}></strong></div>
        <div class="space"><strong>Nome:</strong> ${user.firstName}</div>
        <div class="space"><strong>Sobrenome:</strong> ${user.lastName}</div>
        <div class="space"><strong>Email:</strong> ${user.email}</div>
        <div class="space"><strong>Idade:</strong> ${user.age}</div>
        <button onclick="removeUser(${user.id})" class="remove-btn">
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
            users.users.forEach(user => {
                pageUsers.push(new User(user.firstName, user.lastName, user.username, user.email, user.age, user.image));
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
        pageUsers.push(new User(id, firstName, lastName, email, age, image));
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
    const userIndexToRemove = pageUsers.findIndex((user) => user.id === userId);
    // Removendo usuário da lista
    pageUsers.splice(userIndexToRemove, 1);
    // Atualizando lista na tela
    displayUsers();
}