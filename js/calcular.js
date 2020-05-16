const $campoEntrada = document.querySelector('.valor__campo');
const $botaoAcionador = document.querySelector('.valor__botao');
const $resultado = document.querySelector('.resultado');
const $botaoOk = document.querySelector('.instrucoes__info__ok');
const $instrucoes = document.querySelector('.instrucoes');
const $animacao = document.querySelector('.animacao');

// eventHandler para "pegar" os dados e exibir o calculo através da função
$botaoAcionador.addEventListener('click', () =>{
    let valorCapturado = $campoEntrada.value;
    if($campoEntrada.value){
        $resultado.innerHTML = '';
        $animacao.style.display = "block";
        calcularCedulas(valorCapturado);
    }
    
});

//eventHandler para impedir a entrada de caracteres não numéricos
$campoEntrada.addEventListener('input', () =>{
    let valorCapturado = parseInt($campoEntrada.value);
    if(!valorCapturado){
        $campoEntrada.value = '';
    }
});

//eventHandler para quando houver um carregamento de página o input seja limpo
window.addEventListener('beforeunload', () =>{
    $campoEntrada.value = '';
});

//eventHandler para quando houver um carregamento de página o input seja limpo
$botaoOk.addEventListener('click', () => {
    $instrucoes.classList.add('instrucoes--off');
})

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

function exibirResultado(lugar, coisa){
    lugar.innerHTML = coisa
};

function calcularCedulas(valor){
    
    const notas = [100, 50, 20, 10, 5, 2, 1];
    let valores = [];
    for (let cedula of notas) {
        let qtd;
        qtd = Math.floor(valor / cedula);
        if(qtd != 0){
            valor %= cedula;
            let resultadoCalculo = `${qtd} nota(s) de R$ ${cedula},00`;
            valores.push(resultadoCalculo);
            animateCSS('.animacao', 'flash', () => {
                exibirResultado($resultado, valores.join("<br>"));
                $animacao.style.display = "none";
            });
        }
    }

};

