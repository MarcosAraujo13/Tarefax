import { novaTarefa } from "./funcoes.js";
const tarefas = [
    {
        nome: "Estudar JavaScript",
        descricao: "Revisar conceitos de funções, objetos e arrays.",
        concluida: false,
        dataConclusao: "2024-06-30"
    },
    
];

tarefas.push(novaTarefa(3, "Ler documentação", "Ler a documentação oficial do JavaScript.", "2024-07-10"));

for (let i = 0; i < tarefas.length; i++) {
    const tarefa = tarefas[i];
    console.log(`Tarefa ${i + 1}:`);
    console.log(`Nome: ${tarefa.nome}`);
    console.log(`Descrição: ${tarefa.descricao}`);
    console.log(`Concluída: ${tarefa.concluida}`);
    console.log(`Data de Conclusão: ${tarefa.dataConclusao}`);
    console.log("------------------------");
}
