const pontos = {
  1: {
    lat: 29.425967,
    lng: -98.486142,
    nome: "The Alamo",
    cidade: "San Antonio",
    descricao:
      "Palco da lendária batalha de 1836, o Álamo é um símbolo crucial da luta pela independência do Texas e um marco histórico nacional.",
    imagem: "img/The_Alamo.jfif",
    curiosidade:
      "A frase 'Lembrem-se do Álamo!' tornou-se um grito de guerra pela independência do Texas.",
  },
  2: {
    lat: 32.7876,
    lng: -97.3487,
    nome: "Fort Worth Stockyards",
    cidade: "Fort Worth",
    descricao:
      "Reviva o Velho Oeste neste distrito histórico. Assista ao famoso desfile de gado Longhorn, uma tradição que ocorre diariamente.",
    imagem: "img/Fort_Worth.jfif",
    curiosidade:
      "O desfile de gado Longhorn acontece duas vezes por dia no mesmo local há mais de 100 anos.",
  },
  3: {
    lat: 34.9375,
    lng: -101.6438,
    nome: "Palo Duro Canyon",
    cidade: "Canyon",
    descricao:
      "Explore o segundo maior cânion dos EUA. Suas paredes coloridas e trilhas foram refúgio para tribos nativas e cowboys.",
    imagem: "img/Palo_Duro_Canyon.jfif",
    curiosidade:
      "É o segundo maior cânion dos EUA, atrás apenas do Grand Canyon.",
  },
  4: {
    lat: 29.8113,
    lng: -101.5616,
    nome: "Judge Roy Bean Center",
    cidade: "Langtry",
    descricao:
      "Conheça o salão do juiz Roy Bean, famoso por aplicar a 'Lei a Oeste do Pecos' com seu estilo único de justiça na fronteira.",
    imagem: "img/Judge_Roy_Bean_Center.jfif",
    curiosidade:
      "O juiz uma vez multou um cadáver em $40 por portar uma arma escondida.",
  },
  5: {
    lat: 31.5584,
    lng: -97.1152,
    nome: "Texas Ranger Museum",
    cidade: "Waco",
    descricao:
      "Descubra a história da mais antiga força policial do estado. O museu homenageia os Texas Rangers que ajudaram a moldar a lei no Oeste.",
    imagem: "img/Texas_Ranger_Museum.jfif",
    curiosidade:
      "Os Texas Rangers são a agência de aplicação da lei mais antiga do estado.",
  },
};

const starIcon = L.icon({
  iconUrl: "img/cowboy-hat.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

function gerarCards() {
  const containerTopo = document.getElementById("cards-container-topo");
  const containerBase = document.getElementById("cards-container-base");

  for (const id in pontos) {
    const ponto = pontos[id];
    // AQUI ESTÁ A MUDANÇA:
    const cardHTML = `
      <div class="card-velho-oeste">
        <h2 class="card-titulo">${ponto.nome}</h2>
        <img class="img-velho-oeste" src="${ponto.imagem}" alt="Foto de ${ponto.nome}">
        <div class="card-conteudo">
          <p class="card-cidade"><strong>Cidade:</strong> ${ponto.cidade}</p>
          <p class="card-descricao">${ponto.descricao}</p>
        </div>
        <button class="botao-velho-oeste" onclick="MostrarMapa(${id})">
          Ver no Mapa
        </button>
        <div class="mapa" id="mapa${id}"></div>
      </div>
    `;

    if (id <= 3) {
      containerTopo.innerHTML += cardHTML;
    } else {
      containerBase.innerHTML += cardHTML;
    }
  }
}

function MostrarMapa(id) {
  const mapaClicado = document.getElementById("mapa" + id);
  const estavaAtivo = mapaClicado.style.display === "block";

  document.querySelectorAll(".mapa").forEach((mapaDiv) => {
    mapaDiv.style.display = "none";
  });

  if (!estavaAtivo) {
    mapaClicado.style.display = "block";
    if (!mapaClicado.dataset.mapaCriado) {
      mapaClicado.dataset.mapaCriado = "true";
      const ponto = pontos[id];
      const mapa = L.map(mapaClicado).setView([ponto.lat, ponto.lng], 15);
      L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
        {
          attribution:
            '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(mapa);
      L.marker([ponto.lat, ponto.lng], { icon: starIcon })
        .addTo(mapa)
        .bindPopup(
          `<div class="popup-velho-oeste"><h3>${ponto.nome}</h3><p>${ponto.curiosidade}</p></div>`
        )
        .openPopup();
    }
  }
}

document.addEventListener("DOMContentLoaded", gerarCards);
