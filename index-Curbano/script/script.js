document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('gerarPDF').addEventListener('click', function() {
        var numeroControle = document.getElementById('numero_controle').value.toUpperCase();
        var endereco = document.getElementById('endereco').value.toUpperCase();
        var numero = document.getElementById('numero').value.toUpperCase();
        var comunidade = document.getElementById('comunidade').value.toUpperCase();
        var proprietario = document.getElementById('proprietario').value.toUpperCase();
        var documento = document.getElementById('documento').value.toUpperCase();
        var cpfCnpjLabel = (documento === 'CPF') ? 'CPF do Proprietário:' : 'CNPJ do Proprietário:';
        var cpfCnpj = document.getElementById('cpf_cnpj').value.toUpperCase();
        var area = document.getElementById('area').value.toUpperCase() + ' ' + document.getElementById('unidade').value.toUpperCase();
        var data = document.getElementById('data').value;
        var responsavel = document.getElementById('responsavel').value;

        // Verificar se todos os campos estão preenchidos
        if (!numeroControle || !endereco || !numero || !comunidade || !proprietario || !cpfCnpj || !area || !responsavel || !data) {
            document.getElementById('error-message').textContent = 'Por favor, preencha todos os campos.';
            return;
        }

        // Limpar mensagem de erro
        document.getElementById('error-message').textContent = '';
        
        // Nome do arquivo
        var nomeArquivo = 'REQUERIMENTO_CEMIG_URBANO_' + proprietario.replace(/\s+/g, '_') + '_NUMERO-CONTROLE' + numeroControle + '.pdf';

        // Gerar o PDF com os dados do formulário
        var conteudoPDF = `
        <div>
            <img src="img/logo prefeitura.png" alt="Logo Prefeitura" style="width: 80px; height: 80px; display: block; margin:0 auto; margin-top:40px;">           
            <strong><p style="margin:125px; margin-top:40px; margin-bottom:0; text-align:center;">PREFEITURA MUNICIPAL DE SÃO JOÃO DA PONTE ESTADO DE MINAS GERAIS</p></strong>
            <div class="container">
                <h1 style="color: black; text-align: center; text-decoration:underline; font-size:25px; margin: 120px; ">DECLARAÇÃO ENERGIA URBANO</h1>
                <p style="text-align:justify; margin:50px; margin-bottom:0;"><strong>A PREFEITURA DE SÃO JOÃO DA PONTE</strong>, entidade de direito público, vinculada ao Estado de Minas Gerais, inscrita no CNPJ sob o número <strong>16.928.483/0001-29</strong> e sediada NA PRAÇA OLÍMPIO CAMPOS, N° 128, CENTRO, SÃO JOÃO DA PONTE, vem, por meio deste, informar a <strong>CEMIG,</strong> sobre o endereço do imóvel localizado na <strong>RUA ${endereco}</strong>, <strong>N° ${numero}</strong>, <strong>BAIRRO ${comunidade}</strong>, neste município, sob responsabilidade de <strong>${proprietario}</strong>, ${cpfCnpjLabel} <strong>${cpfCnpj}</strong>, e declaramos para o devido fim que o imóvel não tem impedimentos para ligação de energia.</p><br>
                <strong style="margin-left:50px;">Número de Controle: ${numeroControle}</strong><br>
                <strong style="margin-left:50px">Área do Terreno: ${area}</strong><br>
                <strong style="margin-left:50px">São João da Ponte / MG, ${data}</strong><br>
            </div>
            <div class="assinatura" style="text-align: center; margin-top:60px;">
                <p>___________________________________________</p><br>
                <strong style="text-align:center;">${responsavel}</strong><br><br>
                <strong style="text-align:center;">
                    ${ responsavel === 'LUCAS RENAN SANTANA BARBOSA' ? 'FISCAL DE POSTURAS' : (responsavel === 'ALISSON GUSMÃO CORDEIRO' ? 'CHEFE DO DEPARTAMENTO DE OBRAS' : 'SECRETÁRIO DE INFRAESTRUTURA')}
                </strong>
            </div>
        </div>
        `;

        // Gerar o PDF com ajustes de qualidade
        html2pdf().from(conteudoPDF).set({
            filename: nomeArquivo,
            pagebreak: { mode: 'avoid-all' },
            html2canvas: { scale: 2 }, // Aumenta a escala da captura de tela
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait', output: 3 } // Ajusta a qualidade do PDF
        }).save();
    });

    // Lógica para mostrar o campo CPF ou CNPJ com base na escolha do usuário
    document.getElementById('documento').addEventListener('change', function() {
        var documentoSelecionado = this.value;
        var cpfCnpjLabel = (documentoSelecionado === 'CPF') ? 'CPF do Proprietário:' : 'CNPJ do Proprietário:';
        document.getElementById('label-cpf').textContent = cpfCnpjLabel;
        document.getElementById('cpf_cnpj').setAttribute('placeholder', `Informe o ${documentoSelecionado}`);
    });
});
