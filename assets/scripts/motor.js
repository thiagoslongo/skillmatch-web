let maiorCompatibilidade = 0;
let melhorVaga;
let recomendacaoEstudo = [];

class Vaga {
    constructor(empresa, cargo, requisitos, salario, modalidade) {
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
    }

    calcularCompatibilidade(candidato) {
        const comparaHabilidades = candidato.habilidades.filter(habilidades => this.requisitos.includes(habilidades));
        const habilidadeFaltantes = this.requisitos.filter(requisitos => !candidato.habilidades.includes(requisitos));

        const qtdeRequiAtend = comparaHabilidades.length;
        const totalReqVaga = this.requisitos.length;
        const compatibilidade = (qtdeRequiAtend / totalReqVaga) * 100;

        let classificacao;

        if (compatibilidade >= 80) {
            classificacao = 'Alta Compatibilidade 80-100%'

        } else if (compatibilidade >= 50) {
            classificacao = 'Média Compatibilidade 50-79%'

        } else {
            classificacao = 'Baixa Compatibilidade 0-49%'
        }

        return { compatibilidade: compatibilidade, qtdeRequiAtend, habilidadeFaltantes, classificacao };
    }

    exibirResumo() {
        return `${this.cargo} na empresa ${this.empresa}`;
    }
}

function encontreMelhorVaga(listaVagas, candidato) {
    const melhorVagaComparada = listaVagas.reduce((vagaSelecionada, vagaAtual) => {
        return (vagaSelecionada.calcularCompatibilidade(candidato).compatibilidade) > 
        (vagaAtual.calcularCompatibilidade(candidato).compatibilidade) ? vagaSelecionada : vagaAtual;
    }, listaVagas[0]);

    return melhorVagaComparada;
}



const vagaTeste = new Vaga('NewTech', 'Dev Jr', ['JavaScript', 'GitHub'], 2700, 'Remoto');
const vagateste1 = new Vaga('JockPower', 'Fullstack', ['JavaScript','Kanban'], 3000, 'Presencial');
const todasVagas = [vagaTeste, vagateste1];
const candidatoTeste = { habilidades: ['JavaScript', 'Kanban'] };
console.log(encontreMelhorVaga(todasVagas, candidatoTeste));