// Defina a classe User
class User {
    constructor(id, firstName, lastName, email, age, image) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.image = image;
    }
}

const pageUsers = []
function displayUsers() { }
function fetchUsers() { }
function addUser() { }
function removeUser(userId) { }
document.addEventListener("DOMContentLoaded", function () {
    // Cria lista de usuários a partir da chamada da API
    fetchUsers();
});

const form = document.getElementById('add-user-form');
const userList = document.getElementById("user-list");

function displayUsers() {
    userList.innerHTML = "";
    pageUsers.forEach(user => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");

        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `
            <div class="space"><strong><img src=${user.image}></strong></div>
            <div class="space"><strong>Nome:</strong> ${user.firstName}</div>
            <div class="space"><strong>Sobrenome:</strong> ${user.lastName}</div>
            <div class="space"><strong>Email:</strong> ${user.email}</div>
            <div class="space"><strong>Idade:</strong> ${user.age}</div>
            <button data-user-id="${user.id}" class="remove-btn">
                <i class="bi bi-trash"></i>
            </button>`;
        
        userList.appendChild(listItem);
    });

    // Adiciona eventos de clique aos botões de remoção
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userId = button.dataset.userId;
            removeUser(userId);
        });
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
    const id = pageUsers.length > 0 ? pageUsers[pageUsers.length - 1].id + 1 : 1; // Defina o ID de acordo com a lista existente
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const image = document.getElementById("image").value;
    
    // Validate form fields
    const isNameValid = checkName(firstName);
    const isSobrenomeValid = checkSobrenome(lastName);
    const isEmailValid = checkEmail(email);
    const isIdadeValid = checkIdade(age);
    const isThumbnailValid = checkThumbnail(image);

    // Check if all validations pass
    if (isNameValid && isSobrenomeValid && isEmailValid && isIdadeValid && isThumbnailValid) {
        // Add the new product to the array
        pageUsers.push(new User(id, firstName, lastName, email, age, image));

        // Limpa o formulário
        addUserForm.reset();

        // Mostra lista de produtos
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


// Checa entrada obrigatória
const isRequired = value => value === '' ? false : true;
// Checa tamanho da entrada
const isBetween = (length, min, max) => length < min || length > max ? false : true;
// Checa se e-mail é válido
const isEmailValid = (email) => {
 const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 return re.test(email);
};

// Checa se é um número positivo
const isPositiveNumber = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) && number > 0;
};


const showsError = (input, message) => {
    const formField = input.parentNode;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showsSuccess = (input) => {
    const formField = input.parentNode;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
};

// Valida o campo do nome
const checkName = () => {
    let valid = false;
    const firstname = document.getElementById('firstName');
    const min = 3, max = 50;
    const nomeVal = firstname.value.trim();
    if (!isRequired(nomeVal)) {
    showsError(firstname, 'Nome não pode ficar em branco.');
    } else if (!isBetween(nomeVal.length, min, max)) {
    showsError(firstname, `Nome deve ter entre ${min} e ${max} caracteres.`)
    } else {
    showsSuccess(firstname);
    valid = true;
    }
    return valid;
};

// Valida o campo do sobrenome
const checkSobrenome = () => {
    let valid = false;
    const lastname = document.getElementById('lastName');
    const min = 3, max = 50;
    const lastnameVal = lastname.value.trim();
    if (!isRequired(lastnameVal)) {
    showsError(lastname, 'Sobrenome não pode ficar em branco.');
    } else if (!isBetween(lastnameVal.length, min, max)) {
    showsError(lastname, `Sobrenome deve ter entre ${min} e ${max} caracteres.`)
    } else {
    showsSuccess(lastname);
    valid = true;
    }
    return valid;
};


// Valida o campo de e-mail
const checkEmail = () => {
    let valid = false;
    const emailVal = email.value.trim();
    if (!isRequired(emailVal)) {
    showsError(email, 'E-mail não pode ficar em branco.');
    } else if (!isEmailValid(emailVal)) {
    showsError(email, 'E-mail inválido.')
    } else {
    showsSuccess(email);
    valid = true;
    }
    return valid;
};

// Valida o campo de idade
const checkIdade = () => {
    let valid = false;
    const ageVal = age.value.trim();

    if (!isRequired(ageVal)) {
        showsError(age, 'Idade não pode ficar em branco.');
    } else if (!isPositiveNumber(ageVal)) {
        showsError(age, 'Idade deve ser um número positivo.');
    } else if (parseInt(ageVal) >= 120) {
        showsError(age, 'Idade deve ser menor que 120.');
    } else {
        showsSuccess(age);
        valid = true;
    }
    return valid;
};

// Valida o campo do Thumbnail (opcional)
const checkThumbnail = () => {    
    const thumbnail = document.getElementById("image");
    const thumbnailVal = thumbnail.value.trim();

    // If thumbnail is not provided, consider it as valid
    if (thumbnailVal === '') {
        return true;
    }

    // If thumbnail is provided, validate it as a valid URL
    if (isValidUrl(thumbnailVal)) {
        return true;
    } else {
        showsError(thumbnail, 'Thumbnail deve ser uma URL válida.');
        return false;
    }
};

// Modifica o manipulador de eventos de envio
form.addEventListener('submit', function (e) {
    e.preventDefault();
 
});
