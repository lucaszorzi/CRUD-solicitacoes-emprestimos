const database = require('../db');
const Solicitacao = require('../models/model');

exports.list = async (req, res, next) => {
    try {
      const solicitacoes = await Solicitacao.findAll();
      console.log(solicitacoes);
      return res.json(solicitacoes);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
}

exports.add = async (req, res, next) => {
    try {
        //sync as tabelas do db e model
        const result = await database.sync();
        console.log(result);

        VerificacaoCPF(req.body.cpf);
        VerificacaoCNPJ(req.body.cnpj);
    
        const resultCreate = await Solicitacao.create({
            cnpj: req.body.cnpj,
            valor_emprestimo: req.body.valor_emprestimo,
            faturamento: req.body.faturamento,
            endereco: req.body.endereco,
            nome: req.body.nome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            email: req.body.email
        })
        console.log(resultCreate);
        return res.json(resultCreate);

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        const solicitacao = await Solicitacao.findByPk(id);
        solicitacao.destroy();
        return res.json(solicitacao);

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
}


exports.edit = async (req, res, next) => {

    VerificacaoCPF(req.body.cpf);
    VerificacaoCNPJ(req.body.cnpj);

    const id = req.params.id;

    try {
        const solicitacao = await Solicitacao.findByPk(id);
        solicitacao.cnpj = req.body.cnpj;
        solicitacao.valor_emprestimo = req.body.valor_emprestimo;
        solicitacao.faturamento = req.body.faturamento;
        solicitacao.endereco = req.body.endereco;
        solicitacao.nome = req.body.nome;
        solicitacao.cpf = req.body.cpf;
        solicitacao.telefone = req.body.telefone;
        solicitacao.email = req.body.email;

        const result = await solicitacao.save();

        console.log(result);
        return res.json(solicitacao);

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
}


function VerificacaoCPF(cpf) {
    
    cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') throw 'CPF inválido';
	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
        throw 'CPF inválido';
	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
	
    rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)		
		rev = 0;	
	if (rev != parseInt(cpf.charAt(9)))		
        throw 'CPF inválido';
	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	

	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
        throw 'CPF inválido';

	return true;  
}

function VerificacaoCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
    if(cnpj == '')  throw 'CNPJ inválido';
    if (cnpj.length != 14)  throw 'CNPJ inválido';
 
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        throw 'CNPJ inválido';
         
    
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        throw 'CNPJ inválido';
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        throw 'CNPJ inválido';
           
    return true;
}