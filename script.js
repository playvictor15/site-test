// Carregar tarefas ao iniciar
document.addEventListener('DOMContentLoaded', loadSchedules);

function addSchedule() {
    const taskName = document.getElementById('task').value.trim();
    const taskTime = document.getElementById('time').value;

    if (taskName === '' || taskTime === '') {
        showAlert('Preencha todos os campos!', 'warning');
        return;
    }

    const taskTimeDate = new Date(taskTime);
    const now = new Date();

    if (taskTimeDate <= now) {
        showAlert('Defina um horário futuro!', 'warning');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        time: taskTimeDate.toISOString(),
    };

    saveSchedule(task);
    displayTask(task);
    showAlert('Tarefa adicionada com sucesso!', 'success');
}

function saveSchedule(task) {
    const schedules = getSchedules();
    schedules.push(task);
    localStorage.setItem('schedules', JSON.stringify(schedules));
}

function getSchedules() {
    return JSON.parse(localStorage.getItem('schedules')) || [];
}

function loadSchedules() {
    const schedules = getSchedules();
    schedules.forEach(displayTask);
}

function displayTask(task) {
    const taskTimeDate = new Date(task.time);

    const taskItem = document.createElement('li');
    taskItem.className = 'list-group-item animate__animated animate__fadeInUp';
    taskItem.textContent = `${task.name} - ${taskTimeDate.toLocaleString()}`;

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm';
    editButton.textContent = 'Editar';
    editButton.onclick = () => editTask(task, taskItem);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Excluir';
    deleteButton.onclick = () => deleteTask(task, taskItem);

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    document.getElementById('schedule-list').appendChild(taskItem);

    setAlarm(task);
}

function editTask(task, taskItem) {
    const newName = prompt('Edite o nome da tarefa:', task.name);
    const newTime = prompt('Edite o horário da tarefa:', task.time);

    if (!newName || !newTime) return;

    task.name = newName;
    task.time = new Date(newTime).toISOString();

    const schedules = getSchedules().map(t => (t.id === task.id ? task : t));
    localStorage.setItem('schedules', JSON.stringify(schedules));

    taskItem.textContent = `${task.name} - ${new Date(task.time).toLocaleString()}`;
    taskItem.appendChild(taskItem.querySelector('.btn-warning'));
    taskItem.appendChild(taskItem.querySelector('.btn-danger'));
}

function deleteTask(task, taskItem) {
    const schedules = getSchedules().filter(t => t.id !== task.id);
    localStorage.setItem('schedules', JSON.stringify(schedules));
    taskItem.remove();
    showAlert('Tarefa excluída!', 'danger');
}

function setAlarm(task) {
    const taskTimeDate = new Date(task.time);
    const now = new Date();
    const timeDifference = taskTimeDate - now;

    setTimeout(() => {
        alert(`Hora de: ${task.name}`);
        document.getElementById('alarm-sound').play();
        showAlert(`Hora de: ${task.name}`, 'info');
    }, timeDifference);
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} animate__animated animate__fadeInDown`;
    alertDiv.textContent = message;
    document.body.prepend(alertDiv);

    setTimeout(() => {
        alertDiv.classList.replace('animate__fadeInDown', 'animate__fadeOutUp');
        alertDiv.addEventListener('animationend', () => alertDiv.remove());
    }, 3000);
}
