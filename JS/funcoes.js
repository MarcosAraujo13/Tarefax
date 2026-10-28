export const novaTarefa = (id, nome, descricao, dataConclusao) => {
    return {
        id: id, 
        nome: nome,
        descricao: descricao,
        concluida: false,
        dataConclusao: dataConclusao
    };
}   

