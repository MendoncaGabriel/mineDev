function obterDataFormatada() {
    // Array com os nomes dos dias da semana
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    // Array com os nomes abreviados dos meses
    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    // Obter a data atual
    const dataAtual = new Date();

    // Obter o dia da semana e formatar
    const diaSemana = diasDaSemana[dataAtual.getDay()];

    // Obter o dia do mês, mês e ano
    const dia = dataAtual.getDate();
    const mesAbreviado = meses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();

    // Formatando a saída
    const dataFormatada = `${diaSemana}, ${dia} ${mesAbreviado} ${ano}`;

    return dataFormatada;
}

module.exports = obterDataFormatada
