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
        const habilidadesFaltantes = this.requisitos.filter(requisitos => !candidato.habilidades.includes(requisitos));

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

        return { compatibilidade: compatibilidade, qtdeRequiAtend, habilidadesFaltantes, classificacao };
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

function mapearHabilidadesFaltantes(listaVagas, candidato) {
    const recomendacaoEstudo = listaVagas.reduce((habilidadesAcumuladas, vagaAtual) => {
        const faltaHabilidadesDaVaga = vagaAtual.calcularCompatibilidade(candidato).habilidadesFaltantes;
        return habilidadesAcumuladas.concat(faltaHabilidadesDaVaga);
    }, []);

    return recomendacaoEstudo;
}

class VagaFrontEnd extends Vaga {
    constructor(empresa, cargo, requisitos, salario, modalidade, nivelMinimo) {
        super(empresa, cargo, requisitos, salario, modalidade);
        this.nivelMinimo = nivelMinimo;
    }

    exibirNivel() {
        return `Nível da Vaga: ${this.nivelMinimo}`;
    }

    exibirResumo() {
        return `Experiência como ${this.cargo} na ${this.empresa} alinhada ao nível ${this.nivelMinimo}.`;
    }


    verificarNivelCompativel(candidato) {
        let verificadorExperienciaMeses;

        if (this.nivelMinimo === 'Junior') {
            verificadorExperienciaMeses = 6

        } else if (this.nivelMinimo === 'Pleno') {
            verificadorExperienciaMeses = 12

        } else if (this.nivelMinimo === 'Senior') {
            verificadorExperienciaMeses = 36
        }

        const experienciaCandidato = (candidato.experienciaMeses >= verificadorExperienciaMeses) ? 'compativel' : 'incompatível';

        return { experienciaCandidato }
    }
}




const vagaTeste = new Vaga('NewTech', 'Dev Jr', ['JavaScript', 'GitHub'], 2700, 'Remoto');
const vagaTeste1 = new Vaga('JockPower', 'Fullstack', ['JavaScript', 'Kanban'], 3000, 'Presencial');
const vagaTeste2 = new Vaga('NextSolutions', 'Programador Front-End', ['JavaScript', 'Arrays', 'Objetos', 'Funções'], 3500, 'Híbrido');
const vagaTeste3 = new Vaga('LabsCode', 'Estágio Front-End', ['JavaScript', 'React', 'GitHub', 'Kanban'], 1500, 'Presencial');
const vagaTeste4 = new Vaga('DevMais', 'Front-End Pleno', ['JavaScript', 'Kanban', 'GitHub'], 4200, 'Remoto');
const vagaTeste5 = new VagaFrontEnd('DevMenos', 'Front-End Junior', ['React', 'Vue', 'GitHub'], 1000, 'Remoto', 'Junior');

const todasVagas = [vagaTeste, vagaTeste1, vagaTeste2, vagaTeste3, vagaTeste4, vagaTeste5];
const candidatoComExperiencia = { habilidades: ['JavaScript', 'Kanban',], experienciaMeses: 3 };
console.log(vagaTeste5.verificarNivelCompativel(candidatoComExperiencia));