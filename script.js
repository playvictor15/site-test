// Registra o Service Worker diretamente pelo script
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registrado'))
        .catch(err => console.error('Erro ao registrar o Service Worker:', err));
}

// Solicita permissão para notificações ao usuário
Notification.requestPermission();

document.getElementById('form-treino').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores do formulário
    const dia = document.getElementById('dia').value;
    const treino = document.getElementById('treino').value;
    const horario = document.getElementById('horario').value;

    // Adiciona o treino à tabela
    adicionarTreino(dia, treino, horario);
});

function adicionarTreino(dia, treino, horario) {
    const tabela = document.getElementById('cronograma').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();

    // Insere as células na linha
    const celulaDia = novaLinha.insertCell(0);
    const celulaTreino = novaLinha.insertCell(1);
    const celulaHorario = novaLinha.insertCell(2);
    const celulaAlarme = novaLinha.insertCell(3);

    celulaDia.textContent = dia;
    celulaTreino.textContent = treino;
    celulaHorario.textContent = horario;
    
    // Botão para ativar o alarme
    const botaoAlarme = document.createElement('button');
    botaoAlarme.textContent = 'Ativar Alarme';
    botaoAlarme.onclick = () => setAlarme(horario, treino);
    celulaAlarme.appendChild(botaoAlarme);
}

function setAlarme(horario, treino) {
    const agora = new Date();
    const [hora, minuto] = horario.split(':').map(Number);
    const horarioAlarme = new Date();
    horarioAlarme.setHours(hora, minuto, 0);

    // Se o horário já passou hoje, configura para o próximo dia
    if (horarioAlarme <= agora) {
        horarioAlarme.setDate(horarioAlarme.getDate() + 1);
    }

    const tempoAteAlarme = horarioAlarme - agora;

    // Configura o alarme para o tempo restante
    setTimeout(() => {
        enviarNotificacao(treino);
    }, tempoAteAlarme);
}

function enviarNotificacao(treino) {
    navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Hora do Treino!', {
            body: `É hora de ${treino}!`,
            icon: 'icone.png', // Adicione um ícone aqui, se quiser
            vibrate: [200, 100, 200], // Vibração curta
        });
    });
}

// Código do Service Worker incorporado para gerenciar notificações
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    console.log('Notificação clicada:', event.notification.body);
});
