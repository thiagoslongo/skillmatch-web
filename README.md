# SkillMatch Web

## Sobre o projeto

O SkillMatch Web é a evolução do SkillMatch JS (mini-projeto do Módulo 01): o mesmo motor de comparação de compatibilidade, agora dentro de uma aplicação web completa, que roda no navegador. O candidato preenche seu perfil através de um formulário, e a aplicação calcula, em tempo real, a compatibilidade dele com um catálogo de vagas de Front-End, carregado via fetch.

O projeto faz a comparação entre as habilidades do candidato e os requisitos de cada vaga, apresentando:
- percentual de compatibilidade;
- classificação (Alta / Média / Baixa);
- habilidades encontradas e faltantes;
- a vaga mais compatível;
- recomendação de estudo, baseada nas habilidades que mais aparecem como faltantes.

## Como a internet funciona / Arquitetura cliente-servidor

O cliente é quem faz a requisição (o navegador, através da aplicação) e o servidor é quem responde com os dados. Nesta versão, essa arquitetura deixou de ser simulada: o `dados.js` usa `fetch` de verdade para buscar o catálogo de vagas a partir de um arquivo `vagas.json`, tratando os três estados possíveis de uma requisição real — carregando, vazio e erro.

## Tecnologias e técnicas utilizadas

- **HTML5 semântico** — landmarks, hierarquia de títulos, acessibilidade (label/for, aria-live, alt, foco visível)
- **CSS3** — Flexbox, responsividade mobile-first, media queries
- **JavaScript (ES Modules)** — código dividido em módulos (`motor.js`, `dados.js`, `ui.js`, `main.js`), comunicando-se via `import`/`export`
- **POO** — classes `Vaga` e `VagaFrontEnd` (herança), com métodos usando `this`
- **Métodos de array** — `filter`, `map`, `reduce`
- **Callback e closure** — controle de fluxo e contador de análises da sessão
- **Fetch + async/await** — carregamento do catálogo de vagas
- **localStorage** — persistência do perfil do candidato entre visitas

## Objetivo

Praticar os principais conceitos do Módulo 01 aplicados a um produto web real:
lógica de programação, JavaScript, tipos de dados, condicionais, operadores, escopo, laços, funções, arrow functions, arrays e métodos de array, objetos, classes, herança, `this`, callbacks, closures, Promises, async/await, DOM e eventos, HTML semântico, acessibilidade, SEO, CSS/Flexbox, responsividade, fetch, localStorage, módulos ES, Git/GitHub e Kanban.

## Como executar

1. Clonar o repositório
2. Abrir a pasta no VS Code
3. Abrir o arquivo `index.html` com a extensão **Live Server** (botão direito → "Open with Live Server")

> ⚠️ Importante: o projeto usa módulos ES e `fetch`, por isso **não funciona** abrindo o arquivo direto (`file://`) — precisa ser servido por um servidor local, como o Live Server.

## Estrutura do projeto

```txt
skillmatch-web/
├── index.html
├── README.md
└── assets/
    ├── styles/
    │   └── index.style.css
    ├── scripts/
    │   ├── main.js
    │   ├── motor.js
    │   ├── ui.js
    │   └── dados.js
    ├── dados/
    │   └── vagas.json
    └── img/
        └── logo.svg
```

## Melhorias futuras

- Agrupar e ordenar a recomendação de estudo por frequência (hoje ela lista as habilidades faltantes de todas as vagas, incluindo repetições — o que já indica visualmente quais aparecem mais, mas poderia ser refinado)
- Estruturar melhor visualmente os cards de vaga (hoje as informações aparecem em texto corrido)
- Deploy no GitHub Pages

## Link do vídeo explicando o projeto
Link: https://youtu.be/Imqe1uBVqe4 