const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('character-container');
async function fetchCharacters() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.results)) {
            throw new Error('La respuesta de la API no tiene el formato esperado.');
        }
        displayCharacters(data.results);
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        container.innerHTML = '<p>No se pudieron cargar los personajes. Revisa tu conexión.</p>';
    }
}
function displayCharacters(characters) {
    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        let statusClass = 'status-unknown';
        if (character.status === 'Alive') statusClass = 'status-alive';
        if (character.status === 'Dead') statusClass = 'status-dead';
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="card-info">
                <h2>${character.name}</h2>
                <p>Estado: <span class="${statusClass}">${character.status}</span></p>
                <p>Especie: ${character.species}</p>
            </div>
        `;
        container.appendChild(card);
    });
}
fetchCharacters();