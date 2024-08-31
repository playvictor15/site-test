const treinos = [
    { dia: "Segunda", treino: "Corrida", hora: "08:00" },
    { dia: "Terça", treino: "Musculação", hora: "09:00" }
];

function renderizarTreinos() {
    const tabela = document.querySelector("#cronograma tbody");
    tabela.innerHTML = "";
    treinos.forEach((treino, index) => {
        const row = tabela.insertRow();
        row.innerHTML = `
            <td>${treino.dia}</td>
            <td contenteditable="true">${treino.treino}</td>
            <td contenteditable="true">${treino.hora}</td>
            <td><button onclick="removerTreino(${index})">Remover</button></td>
        `;
    });
}

function removerTreino(index) {
    treinos.splice(index, 1);
    renderizarTreinos();
}

document.getElementById("adicionarTreino").addEventListener("click", () => {
    treinos.push({ dia: "Novo Dia", treino: "Novo Treino", hora: "00:00" });
    renderizarTreinos();
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Erro ao registrar Service Worker: ", err));
}

Notification.requestPermission().then(permission => {
    if (permission === "granted") {
        console.log("Permissão para notificações concedida.");
    } else {
        console.log("Permissão para notificações negada.");
    }
});

function iniciarAlarmes() {
    treinos.forEach(treino => {
        const [horas, minutos] = treino.hora.split(':');
        const agora = new Date();
        const alarme = new Date();
        alarme.setHours(horas, minutos, 0, 0);

        if (alarme > agora) {
            const tempo = alarme - agora;
            setTimeout(() => {
                if (Notification.permission === "granted") {
                    new Notification(`Hora do treino: ${treino.treino}!`);
                }
            }, tempo);
        }
    });
}

renderizarTreinos();
iniciarAlarmes();
