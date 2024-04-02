document.getElementById('gerarPDF').addEventListener('click', function() {
    var responsavel = document.getElementById('responsavel').value;
    var documento = document.getElementById('documento').value;
    var cpf_cnpj = document.getElementById('cpf_cnpj').value.toUpperCase();
    var area = document.getElementById('area').value.toUpperCase();
    var unidade = document.getElementById('unidade').value;
    var localizacao = document.getElementById('localizacao').value.toUpperCase();
    var regiao = document.getElementById('regiao').value.toUpperCase();
    var data = document.getElementById('data').value;
    var numero_controle = document.getElementById('numero_controle').value;

    // Obtendo o valor do campo proprietário
    var proprietario = document.getElementById('nome_proprietario').value.toUpperCase();

    // Verificar se todos os campos estão preenchidos
    if (!responsavel || !documento || !cpf_cnpj || !area || !unidade || !localizacao || !regiao || !data || !numero_controle) {
        document.getElementById('error-message').textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Limpar mensagem de erro
    document.getElementById('error-message').textContent = '';

    // Nome do arquivo
    var nomeArquivo = 'REQUERIMENTO_CEMIG_RURAL_' + proprietario.replace(/\s+/g, '_') + '_NUMERO-CONTROLE' + numero_controle + '.pdf';

    // Definindo o cargo do responsável
    var cargo;
    switch (responsavel) {
        case 'LUCAS RENAN SANTANA BARBOSA':
            cargo = 'FISCAL DE POSTURAS';
            break;
        case 'ALISSON GUSMÃO CORDEIRO':
            cargo = 'CHEFE DO DEPARTAMENTO DE OBRAS';
            break;
        case 'LUIZ FILLIPE MARTINS DA SILVA':
            cargo = 'SECRETÁRIO DE INFRAESTRUTURA';
            break;
        default:
            break;
    }

    // Gerar o PDF com os dados do formulário
    var conteudoPDF = `
    <div>
        <img src="img/logo prefeitura.png" alt="Logo Prefeitura" style="width: 80px; height: 80px; display: block; margin:0 auto; margin-top:40px;">           
        <strong><p style="margin:125px; margin-top:40px; margin-bottom:0; text-align:center;">PREFEITURA MUNICIPAL DE SÃO JOÃO DA PONTE
            ESTADO DE MINAS GERAIS</p>
        </strong>

        <div class="container">
            <h1 style="color: black; text-align: center; text-decoration:underline; font-size:25px; margin: 120px; ">DECLARAÇÃO DE NÃO IMPEDIMENTO RURAL</h1>
            <div class="pdf-content">
                <p style="text-align:justify; margin:50px;">A PREFEITURA DE SÃO JOÃO DA PONTE, sediada na PRAÇA OLÍMPIO CAMPOS, Nº 128, CENTRO, nesta cidade de SÃO JOÃO DA PONTE, ora representada pelo Sr. ${responsavel}, Declara que NÃO HÁ IMPEDIMENTOS PARA LIGAÇÃO de ENERGIA ELÉTRICA em uma ÁREA RURAL com área de aproximadamente ${area} ${unidade}, situado em um lugar denominado ${localizacao}, situada na região de ${regiao}, neste município, de responsabilidade ${responsavel}, inscrito no ${documento.toUpperCase()}: ${cpf_cnpj.toUpperCase()}, SN, neste município de São João da Ponte - MG.</p>
                <p style="text-align:justify; margin-left:50px;">Número de Controle: ${numero_controle}</p>
                <p style="text-align:justify; margin-left:50px;">São João da Ponte – MG, ${data}.</p>
            </div>
            
            <div class="assinatura" style="text-align: center; margin-top:60px;">
            <p>___________________________________________</p><br>
            <strong style="text-align:center;">${responsavel}</strong><br><br>
            <strong style="text-align:center;">
                ${cargo}
            </strong>
        </div>
    </div>
    `;

    // Gerar o PDF com ajustes de qualidade
    var opt = {
        filename: nomeArquivo,
        pagebreak: { mode: 'avoid-all' },
        html2canvas: { scale: 3 }, // Aumenta a escala da captura de tela
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' } // Ajusta a qualidade do PDF
    };

    html2pdf().from(conteudoPDF).set(opt).save();
});

// Lógica para mostrar o campo CPF ou CNPJ com base na escolha do usuário
document.getElementById('documento').addEventListener('change', function() {
    var documentoSelecionado = this.value;
    var labelCPF = document.getElementById('label-cpf');
    var inputCPF = document.getElementById('cpf_cnpj');

    if (documentoSelecionado === 'cpf') {
        labelCPF.textContent = 'CPF DO PROPRIETÁRIO:';
        inputCPF.setAttribute('placeholder', 'Informe o CPF');
    } else if (documentoSelecionado === 'cnpj') {
        labelCPF.textContent = 'CNPJ DO PROPRIETÁRIO:';
        inputCPF.setAttribute('placeholder', 'Informe o CNPJ');
    }
});