import { buscarVagas } from './dados.js';
import { encontreMelhorVaga, mapearHabilidadesFaltantes } from './motor.js';

const campoForm = document.getElementById("form-candidato");
console.log(campoForm.value);

const formulario = document.querySelector("form-candidato");

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

    const registroCandidato = { habilidades: checkboxMarcados, nome, area, experienciaMeses }
    console.log(registroCandidato);
});


