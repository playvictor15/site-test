// Registra o Service Worker diretamente pelo script
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registrado'))
        .catch(err => console.error('Erro ao registrar o Service Worker:', err));
    
    // Código do Service Worker embutido
    navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage('Service Worker ativo');
    });

    navigator.serviceWorker.onmessage = (event) => {
        console.log('Mensagem do Service Worker:', event.data);
    };
}

// Solicita permissão para notificações ao usuário
Notification.requestPermission();

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
            data: { treino },
        });
    });
}

// Código do Service Worker incorporado para gerenciar notificações
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Exemplo de ação ao clicar na notificação, se desejado
    console.log('Notificação clicada:', event.notification.data.treino);
});
