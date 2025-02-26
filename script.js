//Script para buscar artista

// Captura os elementos da página
const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlist');

// Função para buscar na API
function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Filtramos os resultados manualmente para evitar problemas com maiúsculas/minúsculas
            const filteredResults = data.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            displayResults(filteredResults);
        })
        .catch(error => console.error("Erro ao buscar artistas:", error));
}

// Função para exibir os resultados na tela
function displayResults(result) {
    resultPlaylist.classList.add("hidden");

    if (result.length === 0) {
        resultArtist.innerHTML = "<p>Nenhum artista encontrado.</p>";
        return;
    }

    resultArtist.innerHTML = result.map(element => 
        `<div>
            <img src="${element.urlImg}" alt="${element.name}">
            <p>${element.name}</p>
        </div>`
    ).join('');

    resultArtist.classList.remove('hidden');
}

// Evento que monitora a entrada do usuário e dispara a busca
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});
