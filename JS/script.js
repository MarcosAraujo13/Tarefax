import { novaTarefa } from "./funcoes.js";
import { limparTarefas } from "./funcoes.js";  

const formulario = document.getElementById("formTarefas");
const listaTarefas = document.getElementById("listaTarefas");
const botaoApagar = document.getElementById("botaoApagar");

const tarefas = [];

function exibirTarefa(tarefa) {
    const item = document.createElement('li');
    item.classList.add('tarefa');

    const titulo = document.createElement('h3');
    titulo.classList.add('tarefa-titulo');
    titulo.textContent = tarefa.nome;

    const descricao = document.createElement('p');
    descricao.classList.add('tarefa-descricao');
    descricao.textContent = tarefa.descricao;

    const data = document.createElement('p');
    data.classList.add('tarefa-data');
    data.textContent = `Data de entrega: ${tarefa.dataConclusao}`;

    item.append(titulo, descricao, data);
    listaTarefas.appendChild(item);
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const dataEntrega = document.getElementById("dataEntrega").value;

    const tarefa = novaTarefa(
        Date.now(),
        nome,
        descricao,
        dataEntrega
    );

    tarefas.push(tarefa);

    exibirTarefa(tarefa);

    formulario.reset();
});

botaoApagar.addEventListener("click", () => {
    limparTarefas(tarefas);
    listaTarefas.replaceChildren();
});









