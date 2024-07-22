document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    const toolbarOptions = [
        [{ 'font': [] }, { 'size': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        [{ 'line-height': [] }],
        ['link', 'image', 'video'],
        ['clean']
    ];

    // Extend Parchment for line-height
    const Parchment = Quill.import('parchment');
    const LineHeightStyle = new Parchment.Attributor.Style('line-height', 'line-height', {
        scope: Parchment.Scope.BLOCK,
        whitelist: ['1', '1.5', '2', '2.5', '3']
    });
    Quill.register(LineHeightStyle, true);

    const quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions,
            imageResize: {
                displaySize: true
            }
        },
        theme: 'snow',
        placeholder: 'Comece a escrever seu documento aqui...'
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
        html2canvas(document.querySelector('#editor')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF();
            doc.addImage(imgData, 'PNG', 10, 10);
            doc.save('documento.pdf');
        });
    });

    document.getElementById('uploadBtn').addEventListener('click', () => {
        document.getElementById('imageUploader').click();
    });

    document.getElementById('imageUploader').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});
