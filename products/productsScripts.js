// Defina a classe Product
class Product {
    constructor(id, title, description, price, brand, category, thumbnail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail;
    }
}

const pageproducts = []
function displayUsers() { }
function fetchUsers() { }
function addUser() { }
function removeUser(userId) { }
document.addEventListener("DOMContentLoaded", function () {
    // Cria lista de usuários a partir da chamada da API
    fetchUsers();
});

const form = document.getElementById('add-user-form');

// Função para exibir mensagem de erro
const showsError = (input, message) => {
    const formField = input.parentNode;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};

// Função para exibir mensagem de sucesso
const showsSuccess = (input) => {
    const formField = input.parentNode;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
};

// Checa entrada obrigatória
const isRequired = value => value === '' ? false : true;
// Checa tamanho da entrada
const isBetween = (length, min, max) => length < min || length > max ? false : true;

function displayUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    pageproducts.forEach(products => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `
        <div class="space"><strong> <img src="${products.thumbnail}" style="width: 200px; height: auto; max-height: 200px;"></strong></div>
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
                pageproducts.push(new Product(products.id, products.title, products.description, products.price, products.brand, products.category, products.thumbnail));
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
    const id = pageproducts.length > 0 ? pageproducts[pageproducts.length - 1].id + 1 : 1;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;

    // Validate form fields
    const isTitleValid = checkTitle(title);
    const isDescriptionValid = checkDescription(description);
    const isPriceValid = checkPrice(price);
    const isBrandValid = checkBrand(brand);
    const isCategoryValid = checkCategory({ value: category });
    const isThumbnailValid = checkThumbnail(thumbnail);

    // Check if all validations pass
    if (isTitleValid && isDescriptionValid && isPriceValid && isBrandValid && isCategoryValid && isThumbnailValid) {
        // Add the new product to the array
        pageproducts.push(new Product(id, title, description, price, brand, category, thumbnail));

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
    const userIndexToRemove = pageproducts.findIndex((products) => products.id === userId);
    // Removendo usuário da lista
    pageproducts.splice(userIndexToRemove, 1);
    // Atualizando lista na tela
    displayUsers();
}

// Valida o campo do título
const checkTitle = () => {
    let valid = false;
    const title = document.getElementById("title");
    const titleVal = title.value.trim();
    const min = 3, max = 50;

    if (!isRequired(titleVal)) {
        showsError(title, 'Título não pode ficar em branco.');
    } else if (!isBetween(titleVal.length, min, max)) {
        showsError(title, `Título deve ter entre ${min} e ${max} caracteres.`);
    } else {
        showsSuccess(title);
        valid = true;
    }
    return valid;
};

// Valida o campo da descrição
const checkDescription = () => {
    let valid = false;
    const description = document.getElementById("description");
    const descriptionVal = description.value.trim();
    const min = 3, max = 50;

    if (!isRequired(descriptionVal)) {
        showsError(description, 'Descrição não pode ficar em branco.');
    } else if (!isBetween(descriptionVal.length, min, max)) {
        showsError(description, `Descrição deve ter entre ${min} e ${max} caracteres.`);
    } else {
        showsSuccess(description);
        valid = true;
    }
    return valid;
};

// Checa se é um número positivo
const isPositiveNumber = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) && number > 0;
};

// Valida o campo de preço
const checkPrice = () => {
    let valid = false;
    const priceVal = price.value.trim();

    if (!isRequired(priceVal)) {
        showsError(price, 'Preço não pode ficar em branco.');
    } else if (!isPositiveNumber(priceVal)) {
        showsError(price, 'Preço deve ser um número positivo.');
    } else if (parseInt(priceVal) >= 120) {
        showsError(price, 'Preço deve ser menor que 120.');
    } else {
        showsSuccess(price);
        valid = true;
    }
    return valid;
};

// Valida o campo da Marca
const checkBrand = () => {
    let valid = false;
    const brandVal = brand.value.trim();
    const min = 3, max = 50;

    if (!isRequired(brandVal)) {
        showsError(brand, 'Marca não pode ficar em branco.');
    } else if (!isBetween(brandVal.length, min, max)) {
        showsError(brand, `Marca deve ter entre ${min} e ${max} caracteres.`)
    } else {
        showsSuccess(brand);
        valid = true;
    }
    return valid;
};

// Valida o campo da Categoria
const checkCategory = () => {
    let valid = false;
    const categoryVal = category.value.trim();
    const min = 3, max = 50;

    if (!isRequired(categoryVal)) {
        showsError(category, 'Categoria não pode ficar em branco.');
    } else if (!isBetween(categoryVal.length, min, max)) {
        showsError(category, `Categoria deve ter entre ${min} e ${max} caracteres.`)
    } else {
        showsSuccess(category);
        valid = true;
    }
    return valid;
};

// Function to validate URL format
const isValidUrl = (url) => {
    // Use a regular expression to check if the URL is in a valid format
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
};

// Valida o campo do Thumbnail (opcional)
const checkThumbnail = () => {    
    const thumbnail = document.getElementById("thumbnail");
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

    const isTitleValid = checkTitle();
    const isDescriptionValid = checkDescription();
    const isPriceValid = checkPrice();
    const isBrandValid = checkBrand();
    const isCategoryValid = checkCategory();
    const isThumbnailValid = checkThumbnail();

    if (isTitleValid && isDescriptionValid && isPriceValid && isBrandValid && isCategoryValid && isThumbnailValid) {
        console.log('Formulário válido. Adicionando usuário.');
        addUser();
    } else {
        console.log('Formulário inválido. Por favor, corrija os campos.');
    }
});