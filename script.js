document.getElementById('saveBtn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;

    // Cria uma nova instância de jsPDF
    const doc = new jsPDF();

    // Obtém o texto do editor
    const text = document.getElementById('editor').value;

    // Adiciona o texto ao PDF
    doc.text(text, 10, 10);

    // Salva o PDF
    doc.save('documento.pdf');
});
