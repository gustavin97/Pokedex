const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

// Modal elements
const modal = document.getElementById('pokemonDetailModal')
const closeModal = document.getElementById('closeModal')
const detailName = document.getElementById('detailName')
const detailImage = document.getElementById('detailImage')
const detailNumber = document.getElementById('detailNumber')
const detailTypes = document.getElementById('detailTypes')
const detailHeight = document.getElementById('detailHeight')
const detailWeight = document.getElementById('detailWeight')
const detailAbilities = document.getElementById('detailAbilities')

// Função para exibir modal
function showPokemonDetail(pokemon) {
    detailName.textContent = pokemon.name
    detailImage.src = pokemon.photo
    detailNumber.textContent = pokemon.number
    detailTypes.textContent = pokemon.types.join(', ')
    detailHeight.textContent = pokemon.height || 'N/A'
    detailWeight.textContent = pokemon.weight || 'N/A'
    detailAbilities.textContent = (pokemon.abilities || []).join(', ')
    
    modal.style.display = 'block'
}

// Fechar modal
closeModal.onclick = () => modal.style.display = 'none'
window.onclick = (event) => {
    if(event.target == modal) modal.style.display = 'none'
}

// Função para converter cada Pokémon em li
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick='showPokemonDetail(${JSON.stringify(pokemon)})'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

// Função para carregar os Pokémons
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

// Carregar os primeiros Pokémons
loadPokemonItens(offset, limit)

// Botão Load More
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
