import { buscarVagas, salvarCandidato, carregaCandidato } from './dados.js';
import { encontreMelhorVaga, mapearHabilidadesFaltantes } from './motor.js';

const campoForm = document.getElementById("form-candidato");

campoForm.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    console.log("Formulário enviado!");

    const nome = document.getElementById('nome').value

    const area = document.getElementById('area').value

    const checkbox = Array.from(document.querySelectorAll('#form-candidato input[type="checkbox"]'))
    const checkboxMarcados = checkbox
        .filter(item => item.checked === true)
        .map(item => item.value);

    const experienciaMeses = Number(document.getElementById('experienciaMeses').value);

    const validacaoFormulario = document.getElementById('status-formulario');

    if (nome.length < 5) {
        validacaoFormulario.innerText = "O nome deve conter pelo menos 5 caracteres!";
        return;
    }

    if (area === "") {
        validacaoFormulario.innerText = "Precisa escolher a área da vaga que deseja!";
        return;
    }

    if (checkboxMarcados.length < 1) {
        validacaoFormulario.innerText = "Precisa selecionar pelo menos 1 habilidade!";
        return;
    }

    if (experienciaMeses < 0) {
        validacaoFormulario.innerText = "Experiencia precisa ser igual ou maior que zero!";
        return;
    }

    const registroCandidato = { habilidades: checkboxMarcados, nome, area, experienciaMeses }
    console.log(registroCandidato);
    salvarCandidato(registroCandidato);

    const cardMensagemStatus = document.getElementById('status-mensagem');
    cardMensagemStatus.innerText = "Carregando Vagas...";

    const retornoVagas = await buscarVagas();
    if(!retornoVagas || retornoVagas.length === 0) {
        cardMensagemStatus.innerText = "Erro ao buscar uma vaga...";
        return;
    }

    const listaVagasContainer = document.getElementById('lista-vagas');

    retornoVagas.forEach(umaVaga => {
        const resultadoCompatibilidade = umaVaga.calcularCompatibilidade(registroCandidato);
        const cardResumoVaga = document.createElement('div');
        cardResumoVaga.innerText = `${umaVaga.cargo}, ${umaVaga.empresa}, ${resultadoCompatibilidade.compatibilidade}, ${resultadoCompatibilidade.classificacao}, ${resultadoCompatibilidade.habilidadesFaltantes}, ${resultadoCompatibilidade.habilidadesEncontradas}`;
        listaVagasContainer.append(cardResumoVaga);
    });

    const melhorVagaEncontrada = encontreMelhorVaga(retornoVagas, registroCandidato);

    const habilidadesFaltantesMapeadas = mapearHabilidadesFaltantes(retornoVagas, registroCandidato);

    console.log(melhorVagaEncontrada);
    console.log(habilidadesFaltantesMapeadas);

    const cardMelhorVagaEncontrada = document.getElementById('melhor-vaga-conteudo');
    cardMelhorVagaEncontrada.innerText = melhorVagaEncontrada.exibirResumo();

    const cardRecomendacaoEstudo = document.getElementById('recomendacao-conteudo');
    cardRecomendacaoEstudo.innerText = habilidadesFaltantesMapeadas.join(', ');
});

const checkbox = Array.from(document.querySelectorAll('#form-candidato input[type="checkbox"]'))

const dadosCarregadosCandidato = carregaCandidato();

if (dadosCarregadosCandidato === null) {
} else {
    document.getElementById('nome').value = dadosCarregadosCandidato.nome;
    document.getElementById('area').value = dadosCarregadosCandidato.area;
    document.getElementById('experienciaMeses').value = dadosCarregadosCandidato.experienciaMeses;
    
    checkbox.forEach(umCheckbox => {
        if (dadosCarregadosCandidato.habilidades.includes(umCheckbox.value)) {
            umCheckbox.checked = true;
        }
    });
}