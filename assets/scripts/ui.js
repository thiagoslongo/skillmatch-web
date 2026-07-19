import { buscarVagas } from './dados.js';
import { encontreMelhorVaga, mapearHabilidadesFaltantes } from './motor.js';

const campoForm = document.getElementById("form-candidato");

campoForm.addEventListener("submit", (evento) => {
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

});




