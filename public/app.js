const dados = [
    {
        "id": 1,
        "titulo": "Paris",
        "descricao": "Paris, a capital da França, é uma das cidades mais icônicas e românticas do mundo...",
        "conteudo": "Paris é conhecida por seus monumentos históricos, como a Torre Eiffel e o Museu do Louvre, além de sua gastronomia e cultura vibrante.",
        "imagem": "img/Paris.jpg"
    },
    {
        "id": 2,
        "titulo": "Las Vegas",
        "descricao": "Las Vegas, conhecida como a Cidade que não dorme, é o destino perfeito para quem busca diversão...",
        "conteudo": "Las Vegas é famosa por seus cassinos, shows grandiosos e vida noturna vibrante, atraindo turistas do mundo inteiro.",
        "imagem": "img/Las Vegas.jpg"
    },
    {
        "id": 3,
        "titulo": "Sydney",
        "descricao": "Sydney, a maior cidade da Austrália, é um destino vibrante e cosmopolita...",
        "conteudo": "Sydney oferece atrações como a Opera House, a Harbour Bridge e praias incríveis como Bondi Beach.",
        "imagem": "img/Sydney.jpg"
    }
];
document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');

    if (mainContainer) {
        dados.forEach(item => {
            const article = document.createElement('article');
            article.classList.add('mb-5');

            article.innerHTML = `
                <img src="${item.imagem}" alt="${item.titulo}" class="img-fluid mb-3">
                <h3><a href="detalhes.html?id=${item.id}">${item.titulo}</a></h3>
                <p>${item.descricao}</p>
                <a href="detalhes.html?id=${item.id}" class="btn btn-outline-primary btn-sm">Ler Mais</a>
            `;

            mainContainer.appendChild(article);
        });
    }
    const detalhesContainer = document.querySelector('#detalhes-container');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (detalhesContainer && id) {
        const item = dados.find(d => d.id === parseInt(id));
        if (item) {
            detalhesContainer.innerHTML = `
                <h1>${item.titulo}</h1>
                <img src="${item.imagem}" alt="${item.titulo}" class="img-fluid mb-3">
                <p>${item.conteudo}</p>
            `;
        } else {
            detalhesContainer.innerHTML = '<p>Item não encontrado.</p>';
        }
    }
});
