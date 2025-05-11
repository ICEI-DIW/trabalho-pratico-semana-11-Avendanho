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

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/destinos')
        .then(response => response.json())
        .then(destinos => {
            const mainContainer = document.querySelector('main');
            if (mainContainer) {
                destinos.forEach(item => {
                    const article = document.createElement('article');
                    article.classList.add('mb-5');
                    article.innerHTML = `
                        <img src="${item.imagem_principal}" alt="${item.titulo}" class="img-fluid mb-3">
                        <h3><a href="detalhes.html?id=${item.id}">${item.titulo}</a></h3>
                        <p>${item.descricao}</p>
                        <a href="detalhes.html?id=${item.id}" class="btn btn-outline-primary btn-sm">Ler Mais</a>
                    `;
                    mainContainer.appendChild(article);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao carregar destinos:', error);
            alert('Não foi possível carregar os destinos. Tente novamente mais tarde.');
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) {
        window.location.href = 'index.html';
        return;
    }

    fetch(`http://localhost:3000/destinos/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Destino não encontrado');
            return response.json();
        })
        .then(destino => {
            document.title = `${destino.titulo} | Guia de Viagens`;
            
            // Preencher detalhes principais
            const detalhesContainer = document.querySelector('#detalhes-container');
            detalhesContainer.innerHTML = `
                <h1>${destino.titulo}</h1>
                <img src="${destino.imagem_principal}" alt="${destino.titulo}" class="img-fluid mb-3">
                <p class="lead">${destino.descricao}</p>
                <div class="content-section mb-4">${destino.conteudo}</div>
            `;

            const galleryContainer = document.querySelector('#gallery-container');
            if (destino.imagens_complementares && destino.imagens_complementares.length > 0) {
                galleryContainer.innerHTML = `
                    <h3>Mais imagens</h3>
                    <div class="row g-3">
                        ${destino.imagens_complementares.map(img => `
                            <div class="col-md-4">
                                <img src="${img.src}" alt="${img.descricao}" class="img-thumbnail">
                                <p class="small text-muted mt-1">${img.descricao}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            const [lat, lng] = destino.localizacao.split(',');
            const mapaContainer = document.querySelector('#mapa');
            mapaContainer.innerHTML = `
                <iframe 
                    src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed"
                    class="w-100" 
                    height="300"
                    style="border:0;"
                    allowfullscreen>
                </iframe>
            `;
        })
        .catch(error => {
            console.error('Erro:', error);
            document.querySelector('#detalhes-container').innerHTML = `
                <div class="alert alert-danger">${error.message}</div>
                <a href="index.html" class="btn btn-primary">Voltar</a>
            `;
        });
});

const detalhesContainer = document.getElementById('detalhes-container');

fetch('http://localhost:3000/destinos')
  .then(response => response.json())
  .then(data => {
    data.forEach(destino => {
      const destinoEl = document.createElement('div');
      destinoEl.classList.add('post');

      destinoEl.innerHTML = `
        <img src="${destino.imagem}" alt="${destino.titulo}">
        <h3 class="titulo">${destino.titulo}</h3>
        <p class="descricao">${destino.descricao}</p>
      `;

      detalhesContainer.appendChild(destinoEl);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar destinos:', error);
  });