import { Vaga, VagaFrontEnd } from './motor.js';

async function buscarVagas() {
    try {
        console.log("Carregando Vagas... Aguardo um momento!");
        let resposta = await fetch('./assets/dados/vagas.json');
        if (!resposta.ok) {
            throw new Error('Servidor respondeu ' + resposta.status);
        }
        let data = await resposta.json();
        if (!data || data.length === 0) {
            console.error("Buscando vagas ... Nenhuma vaga encontrada ", data);
        }
        const vagaDados = data.map((vagaJson) => {
            if (vagaJson.nivelMinimo) {
                return new VagaFrontEnd(vagaJson.empresa, vagaJson.cargo, vagaJson.requisitos, vagaJson.salario, vagaJson.modalidade, vagaJson.nivelMinimo)
            } else {
                return new Vaga(vagaJson.empresa, vagaJson.cargo, vagaJson.requisitos, vagaJson.salario, vagaJson.modalidade)
            }
        })

        return vagaDados;

    } catch (retorno) {
        console.error("Não há vagas disponíveis. Tente de novo", retorno);
    }
}

function carregaCandidato() {
    return JSON.parse(localStorage.getItem('dadosCandidato'));
}

function salvarCandidato(dadosCandidato) {
    localStorage.setItem('dadosCandidato', JSON.stringify(dadosCandidato));
}

export { buscarVagas, carregaCandidato, salvarCandidato }