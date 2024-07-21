document.getElementById('saveBtn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;

    // Cria uma nova instância de jsPDF
    const doc = new jsPDF();

    // Obtém o texto do editor
    const text = document.getElementById('editor').value;

    // Obtém as opções de formatação
    const fontSize = document.getElementById('fontSize').value;
    const fontColor = document.getElementById('fontColor').value;
    const isBold = document.getElementById('bold').checked;

    // Define o estilo da fonte
    if (isBold) {
        doc.setFont('helvetica', 'bold');
    } else {
        doc.setFont('helvetica', 'normal');
    }

    // Define o tamanho e a cor da fonte
    doc.setFontSize(fontSize);
    doc.setTextColor(fontColor);

    // Adiciona o texto ao PDF
    doc.text(text, 10, 10);

    // Salva o PDF
    doc.save('documento.pdf');
});
