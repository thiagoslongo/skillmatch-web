import { Vaga, VagaFrontEnd } from './motor.js';

async function buscarVagas(){
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
        console.log(data)
    } catch (retorno) {
        console.error("Não há vagas disponíveis. Tente de novo", retorno);
    }    
}

buscarVagas();

