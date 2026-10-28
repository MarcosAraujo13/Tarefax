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
