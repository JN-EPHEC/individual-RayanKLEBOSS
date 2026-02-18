function init() {
    loadUsers();
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', addUser);
    }
}

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            // On utilise les noms du modèle Sequelize
            li.textContent = `${user.firstName} ${user.lastName}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.textContent = 'X';
            deleteBtn.onclick = () => deleteUser(user.id);

            li.appendChild(deleteBtn);
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function addUser(event) {
    event.preventDefault();
    const firstName = document.getElementById('prenom').value;
    const lastName = document.getElementById('nom').value;

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName }) // Noms synchronisés !
        });

        if (response.ok) {
            document.getElementById('userForm').reset();
            loadUsers();
        }
    } catch (error) {
        console.error('Erreur ajout:', error);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
        if (response.ok) loadUsers();
    } catch (error) {
        console.error('Erreur suppression:', error);
    }
}