document.addEventListener('DOMContentLoaded', function () {
    let botaoFavoritar = document.getElementById('botaoFavoritar');

    if (botaoFavoritar) {
        botaoFavoritar.addEventListener('click', cliqueFavoritar);
    }

    function cliqueFavoritar(event) {
        event.preventDefault();
        let botaoFavoritar = document.getElementById('botaoFavoritar');
        let titulo = document.getElementById('titulo').textContent;
        let descricao = document.getElementById('overview').textContent;
        let imagem = document.getElementById('poster').src;
        descricao = descricao === '' ? 'Sem descrição' : descricao;

        fetch('http://localhost:3000/seriesFavoritas')
            .then(response => response.json())
            .then(data => {
                let serieFavoritada = data.find(serie => serie.titulo === titulo);

                if (serieFavoritada) {
                    let confirmacao = confirm('Série já favoritada. Deseja removê-la dos favoritos?');
                    if (confirmacao) {
                        fetch(`http://localhost:3000/seriesFavoritas/${serieFavoritada.id}`, {
                            method: 'DELETE'
                        })
                            .catch(error => console.error('Erro ao remover a série dos favoritos:', error));
                        window.location.href = 'tela1.html?favoritas';
                    }
                } else {
                    fetch('http://localhost:3000/seriesFavoritas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            titulo: titulo,
                            descricao: descricao,
                            imagem: imagem,
                            url: window.location.href
                        })
                    })
                        .then(response => response.json())
                        .catch(error => console.error('Erro ao adicionar a série aos favoritos:', error));
                        window.location.href = 'tela1.html?favoritas';


                }
            })
            .catch(error => console.error('Erro ao carregar séries favoritas:', error));

    }
});

function carregarSeriesFavoritas() {
    fetch('http://localhost:3000/seriesFavoritas')
        .then(response => response.json())
        .then(data => {
            data.forEach(serie => {
                adicionarSerieFavorita(serie.titulo, serie.descricao, serie.imagem, serie.url);
            });
        });
}

function adicionarSerieFavorita(titulo, descricao, imagem, url) {
    let telaSeriesFavoritas = document.getElementById('seriesFavoritas');

    descricao.length > 100 ? descricao = descricao.substring(0, 100) + '...' : descricao;

    telaSeriesFavoritas.innerHTML += `<div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-4" id="cardFavorito">
          <div class="card m-auto my-3 border border-danger border-3 rounded-3" style="width: 18rem">
            <a href="${url}"><img src="${imagem}" class="card-img-top" alt="..." /></a>
            <div class="card-body bg-black rounded-bottom">
              <a href="${url}" class="text-decoration-none">
                <h4 class="card-title text-danger fw-bold">${titulo}</h4>
              </a>
              <p class="card-text text-white">
                ${descricao}
              </p>
            </div>
          </div>
        </div>`
}
