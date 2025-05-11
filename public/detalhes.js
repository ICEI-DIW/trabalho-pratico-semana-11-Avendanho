
const destinos = [
    {
        id: 1,
        titulo: "Paris",
        descricao: "Paris, a capital da França, é uma das cidades mais icônicas e românticas do mundo.",
        conteudo: "Paris é conhecida por seus monumentos históricos, como a Torre Eiffel e o Museu do Louvre, além de sua gastronomia e cultura vibrante.",
        imagem: "img/Paris.jpg",
        fotos: ["img/Paris1.jpg", "img/Paris2.jpg", "img/Paris3.jpg"]
    },
    {
        id: 2,
        titulo: "Las Vegas",
        descricao: "Las Vegas, conhecida como a Cidade que não dorme, é o destino perfeito para quem busca diversão.",
        conteudo: "Las Vegas é famosa por seus cassinos, shows grandiosos e vida noturna vibrante, atraindo turistas do mundo inteiro.",
        imagem: "img/Las Vegas.jpg",
        fotos: ["img/LasVegas1.jpg", "img/LasVegas2.jpg", "img/LasVegas3.jpg"]
    },
    {
        id: 3,
        titulo: "Sydney",
        descricao: "Sydney, a maior cidade da Austrália, é um destino vibrante e cosmopolita.",
        conteudo: "Sydney oferece atrações como a Opera House, a Harbour Bridge e praias incríveis como Bondi Beach.",
        imagem: "img/Sydney.jpg",
        fotos: ["img/Sydney1.jpg", "img/Sydney2.jpg", "img/Sydney3.jpg"]
    }
];

function pegarIdDaUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function mostrarDetalhes() {
    const id = pegarIdDaUrl();
    const destino = destinos.find(d => d.id == id);
    const container = document.getElementById('detalhes-container');
    
    if (destino && container) {
        container.innerHTML = `
            <h1>${destino.titulo}</h1>
            <img src="${destino.imagem}" alt="${destino.titulo}" class="img-fluid mb-3">
            <p class="lead">${destino.descricao}</p>
            <p>${destino.conteudo}</p>
            <button onclick="curtir()" class="btn btn-outline-primary mb-3">Curtir</button>
        `;
        
        if (destino.fotos && destino.fotos.length > 0) {
            const galeria = document.getElementById('galeria');
            galeria.innerHTML = '<h3>Mais fotos:</h3><div class="row"></div>';
            const row = galeria.querySelector('.row');
            
            destino.fotos.forEach(foto => {
                row.innerHTML += `
                    <div class="col-md-4 mb-3">
                        <img src="${foto}" class="img-thumbnail">
                    </div>
                `;
            });
        }
    } else {
        container.innerHTML = '<p>Destino não encontrado. <a href="index.html">Voltar</a></p>';
    }
}

function mostrarOutrosDestinos() {
    const idAtual = pegarIdDaUrl();
    const container = document.getElementById('outros-destinos');
    
    const outros = destinos.filter(d => d.id != idAtual);
    
    outros.forEach(destino => {
        container.innerHTML += `
            <div class="mb-3">
                <a href="detalhes.html?id=${destino.id}">
                    <img src="${destino.imagem}" alt="${destino.titulo}" class="img-thumbnail me-2" style="width: 80px; height: 80px; object-fit: cover;">
                    ${destino.titulo}
                </a>
            </div>
        `;
    });
}

function curtir() {
    alert('Obrigado por curtir este destino!');
}

document.getElementById('form-comentario').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Comentário enviado com sucesso!');
    this.reset();
});

window.onload = function() {
    mostrarDetalhes();
    mostrarOutrosDestinos();
    carregarMapa();
}
const mapasDestinos = {
    1: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.75769373676!2d2.277019943066031!3d48.858950681532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20Fran%C3%A7a!5e0!3m2!1spt-BR!2sbr!4v1689995404204!5m2!1spt-BR!2sbr",
    2: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6437348.708423893!2d-117.50502235!3d37.783010449999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV%2C%20EUA!5e0!3m2!1spt-BR!2sbr!4v1689995437911!5m2!1spt-BR!2sbr",
    3: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.102672726!2d150.65178995!3d-33.84735675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632aecd!2sSydney%2C%20Nova%20Gales%20do%20Sul%2C%20Austr%C3%A1lia!5e0!3m2!1spt-BR!2sbr!4v1689995472037!5m2!1spt-BR!2sbr"
};

function carregarMapa() {
    const id = pegarIdDaUrl();
    const mapaContainer = document.getElementById('mapa');
    
    if (mapaContainer && mapasDestinos[id]) {
        mapaContainer.innerHTML = `
            <iframe 
                src="${mapasDestinos[id]}" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `;
    }
}