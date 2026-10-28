const CHAVE_STORAGE = "tarefax:tarefas";

export const novaTarefa = (id, nome, descricao, dataConclusao) => {
    return {
        id,
        nome,
        descricao,
        concluida: false,
        dataConclusao
    };
};

export const limparTarefas = (tarefas) => {
    tarefas.length = 0;
};

// Marca a tarefa como concluída (ou volta para pendente)
export const alternarConclusao = (tarefas, id) => {
    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
    }
};

// Remove só as concluídas, mantendo o mesmo array
export const removerConcluidas = (tarefas) => {
    for (let i = tarefas.length - 1; i >= 0; i--) {
        if (tarefas[i].concluida) {
            tarefas.splice(i, 1);
        }
    }
};

// filtro: "todas" | "pendentes" | "concluidas"
export const filtrarTarefas = (tarefas, filtro) => {
    if (filtro === "pendentes") return tarefas.filter((t) => !t.concluida);
    if (filtro === "concluidas") return tarefas.filter((t) => t.concluida);
    return tarefas;
};

export const salvarTarefas = (tarefas) => {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
    } catch (erro) {
        console.error("Não foi possível salvar as tarefas:", erro);
    }
};

export const carregarTarefas = () => {
    try {
        const salvo = localStorage.getItem(CHAVE_STORAGE);
        const lista = salvo ? JSON.parse(salvo) : [];
        return Array.isArray(lista) ? lista : [];
    } catch (erro) {
        console.error("Não foi possível carregar as tarefas:", erro);
        return [];
    }
};