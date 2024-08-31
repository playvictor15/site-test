// script.js
const form = document.getElementById('form');
const cronograma = document.getElementById('cronograma');

function adicionarTreino() {
    const dia = document.getElementById('dia').value;
    const treino = document.getElementById('treino').value;

    // Armazenar os dados no Web Storage (localStorage ou sessionStorage)
    // ...

    // Criar uma nova linha na tabela
    const novaLinha = document.createElement('tr');
    // ...

    // Adicionar a nova linha à tabela
    cronograma.appendChild(novaLinha);

    // Agendar a notificação (utilizando a API de Notificações da Web)
    // ...
}
