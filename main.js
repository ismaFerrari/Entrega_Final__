const API_URL = 'https://jsonplaceholder.typicode.com/users';

function renderUser(user) {
    const userList = document.getElementById('user-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Nombre: ${user.name} (${user.email})`;
    userList.appendChild(listItem);
}

function saveUserLocally(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function deleteUser(user) {
    const userList = document.getElementById('user-list');
    const userIndex = localUsers.findIndex(u => u.name === user.name && u.email === user.email);

    if (userIndex !== -1) {
        localUsers.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(localUsers));

        // Remove the corresponding list item from the HTML
        userList.removeChild(userList.children[userIndex]);

        // Remove the corresponding option from the user-select dropdown
        updateSelectOptions();
    }
}

function updateSelectOptions() {
    const userSelect = document.getElementById('user-select');
    
    // Clear existing options
    userSelect.innerHTML = '';

    // Add updated options
    localUsers.forEach(user => {
        const option = document.createElement('option');
        option.value = user.email;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

const localUsers = JSON.parse(localStorage.getItem('users')) || [];
localUsers.forEach(user => {
    renderUser(user);
});

const userForm = document.getElementById('user-form');
userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    const newUser = {
        name: nameInput.value,
        email: emailInput.value
    };

    renderUser(newUser);
    saveUserLocally(newUser);

    nameInput.value = '';
    emailInput.value = '';
});

const userSelect = document.getElementById('user-select');
localUsers.forEach(user => {
    const option = document.createElement('option');
    option.value = user.email;
    option.textContent = user.name;
    userSelect.appendChild(option);
});

const deleteButton = document.getElementById('delete-user');
deleteButton.addEventListener('click', () => {
    const selectedEmail = userSelect.value;
    const selectedUser = localUsers.find(user => user.email === selectedEmail);

    if (selectedUser) {
        deleteUser(selectedUser);
        userSelect.value = '';
    }
});

    
