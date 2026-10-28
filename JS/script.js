import {
    novaTarefa,
    limparTarefas,
    alternarConclusao,
    removerConcluidas,
    filtrarTarefas,
    salvarTarefas,
    carregarTarefas
} from "./funcoes.js";

const formulario = document.getElementById("formTarefas");
const listaTarefas = document.getElementById("listaTarefas");
const botaoApagar = document.getElementById("botaoApagar");
const botaoExcluirConcluidas = document.getElementById("botaoExcluirConcluidas");
const filtros = document.getElementById("filtros");

const ROTULOS = {
    todas: "Todas",
    pendentes: "Pendentes",
    concluidas: "Concluídas"
};

const MENSAGENS_VAZIO = {
    todas: "Nenhuma tarefa ainda. Adicione a primeira acima.",
    pendentes: "Nenhuma tarefa pendente.",
    concluidas: "Nenhuma tarefa concluída ainda."
};

// Carrega o que já estava salvo no navegador
const tarefas = carregarTarefas();
let filtroAtual = "todas";

function formatarData(dataISO) {
    const [ano, mes, dia] = String(dataISO).split("-");
    return ano && mes && dia ? `${dia}/${mes}/${ano}` : dataISO;
}

function exibirTarefa(tarefa) {
    const item = document.createElement("li");
    item.classList.add("tarefa");
    if (tarefa.concluida) item.classList.add("tarefa--concluida");

    const caixa = document.createElement("input");
    caixa.type = "checkbox";
    caixa.classList.add("tarefa-check");
    caixa.checked = tarefa.concluida;
    caixa.dataset.id = tarefa.id;
    caixa.setAttribute("aria-label", `Concluir tarefa: ${tarefa.nome}`);
    caixa.addEventListener("change", () => {
        alternarConclusao(tarefas, tarefa.id);
        salvarTarefas(tarefas);
        renderizar(tarefa.id);
    });

    const conteudo = document.createElement("div");
    conteudo.classList.add("tarefa-conteudo");

    const titulo = document.createElement("h3");
    titulo.classList.add("tarefa-titulo");
    titulo.textContent = tarefa.nome;

    const descricao = document.createElement("p");
    descricao.classList.add("tarefa-descricao");
    descricao.textContent = tarefa.descricao;

    const data = document.createElement("p");
    data.classList.add("tarefa-data");
    data.textContent = `Data de entrega: ${formatarData(tarefa.dataConclusao)}`;

    conteudo.append(titulo, descricao, data);
    item.append(caixa, conteudo);
    listaTarefas.appendChild(item);
}

function atualizarFiltros() {
    const contagem = {
        todas: tarefas.length,
        pendentes: tarefas.filter((t) => !t.concluida).length,
        concluidas: tarefas.filter((t) => t.concluida).length
    };

    filtros.querySelectorAll("button").forEach((botao) => {
        const chave = botao.dataset.filtro;
        const ativo = chave === filtroAtual;
        botao.textContent = `${ROTULOS[chave]} (${contagem[chave]})`;
        botao.classList.toggle("ativo", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
    });

    botaoExcluirConcluidas.disabled = contagem.concluidas === 0;
}

function renderizar(idParaFocar) {
    listaTarefas.replaceChildren();

    const visiveis = filtrarTarefas(tarefas, filtroAtual);

    if (visiveis.length === 0) {
        const vazio = document.createElement("li");
        vazio.classList.add("vazio");
        vazio.textContent = MENSAGENS_VAZIO[filtroAtual];
        listaTarefas.appendChild(vazio);
    } else {
        visiveis.forEach(exibirTarefa);
    }

    atualizarFiltros();

    // Mantém o foco no checkbox para quem navega pelo teclado
    if (idParaFocar !== undefined) {
        const caixa = listaTarefas.querySelector(`input[data-id="${idParaFocar}"]`);
        if (caixa) caixa.focus();
    }
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const dataEntrega = document.getElementById("dataEntrega").value;

    const tarefa = novaTarefa(Date.now(), nome, descricao, dataEntrega);

    tarefas.push(tarefa);
    salvarTarefas(tarefas);
    renderizar();

    formulario.reset();
});

filtros.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-filtro]");
    if (!botao) return;

    filtroAtual = botao.dataset.filtro;
    renderizar();
});

botaoExcluirConcluidas.addEventListener("click", () => {
    removerConcluidas(tarefas);
    salvarTarefas(tarefas);
    renderizar();
});

botaoApagar.addEventListener("click", () => {
    if (tarefas.length > 0 && !confirm("Apagar todas as tarefas?")) return;

    limparTarefas(tarefas);
    salvarTarefas(tarefas);
    renderizar();
});

renderizar();