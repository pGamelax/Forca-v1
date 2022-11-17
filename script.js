// Pegando os botões do documento html
var btnClear = document.getElementById("clear")
var btnEnviar = document.getElementById("enter")
var txtPerguta = document.getElementById("txtPergunta")
var htmlErros = document.getElementById("erros")
var ganhou = document.querySelector(".ganhou")
var txtVitoria = document.getElementById("textoVitoria")
var grid = document.querySelector(".grid")
var newGame = document.getElementById("newGame")

// Pegando o valor dos inputs 
var letra1 = document.getElementById('letra1');
var letra2 = document.getElementById('letra2');
var letra3 = document.getElementById('letra3');
var letra4 = document.getElementById('letra4');
var letra5 = document.getElementById('letra5');

// Lista com os valores dos input
const letras = [letra1, letra2, letra3, letra4, letra5]



// Lista com as palavras do jogo 
const palavras = [
    {
        palavra: "praia",
        pergunta: "O que é, o que é tem areia e agua, mas não é doce?",
    },
    {
        palavra: "pedro",
        pergunta: "Quem criou o jogo?"
    },
    {
        palavra: "stark",
        pergunta:"Qual o segundo nome do homem de ferro?" 
    },
    {
        palavra: "corno",
        pergunta: "o que é, o que é um animal meio humano com chifres?"
    },
    {
        palavra: "fanta",
        pergunta: "Uma garrafa pet com laranja"
    }
]

// Variavel para gerar um numero aleatorio e escolher a palavra e pergunta
var rand = Math.floor(Math.random() *(palavras.length - 0));

txtPerguta.innerText = palavras[rand].pergunta

console.log(palavras[rand])

// Função para selecionar o primeiro campo de texto ao recarregar a pagina
function goFocus(letra1){
        document.getElementById(letra1).focus();    
}

// jquery para pular para o proximo input
$(".input-text").keyup(function() {
    if (this.value.length == this.maxLength) {
        $(this).next('.input-text').focus();
    }
});


// jquery para confirmar ao pressionar enter
$(document).keypress(function(e) {
    if(e.which == 13){
        $('#enter').click();
    }
});

// Lista com as letras da palavra escolhida
const letrasEscolhidas = []

// Adicionar letras da palavra escolhida
for(i = 0; i < 5; i++){
    letrasEscolhidas.push(palavras[rand].palavra.slice(i, (i+1)))
}

// Funções para verificar as letras do input com as letras da palavra selecionada
function verificarLetras(){
    // Remover focus do input
    $(".input-text").blur()

    for(i = 0; i < 5; i++){
        if(letras[i].value == letrasEscolhidas[i]){
            letrasEscolhidas.splice(i,1,"0")   
        }
    }
    for(i = 0; i < 5; i++){
        if(letrasEscolhidas[i]== "0"){
            letras[i].classList.add("letra-certa")  
        }else if(letrasEscolhidas.includes(letras[i].value)){
            letras[i].classList.add("letra-exist")
        }else if(letras[i].value != letrasEscolhidas[i]){
            letras[i].classList.add("letra-errada") 
        }
    }

    setTimeout(function(){
        apagar()
    }, 3000)
}

// Condição de ganhar
const letrasCertas = []

function checarVitoria(){
    if(letrasCertas.length > 0){
        letrasCertas.splice(letrasCertas.indexOf(0), letrasCertas.length)
    }else{
        for (i = 0; i <5; i++){
            if(letras[i].classList.contains("letra-certa")){
                letrasCertas.push('sim')
                if(letrasCertas.length == 5 && letrasCertas[i] == "sim"){
                    ganhou.classList.remove("none")
                    grid.classList.add("none")
                    txtVitoria.innerText = `Parabéns, Você ganhou! A palavra era '${palavras[rand].palavra}'`
                }
            }
        }
    }
}


function apagar(){
    btnEnviar.disabled = false;
    for (i = 0; i <5; i++){
        letra1.focus()
        letras[i].value = ""
        letras[i].classList.remove("letra-certa")
        letras[i].classList.remove("letra-exist")
        letras[i].classList.remove("letra-errada")
        letrasCertas.splice(i)
        letrasEscolhidas.splice(i)
    }
    for(i = 0; i < 5; i++){
        letrasEscolhidas.push(palavras[rand].palavra.slice(i, (i+1)))
    }
}
// Funcao de apagar os inputs
btnClear.addEventListener('click', apagar )

// função de novo jogo
newGame.addEventListener('click', function(){
    location.reload()
})
// Função executar a verificação das letras
btnEnviar.addEventListener('click', function(){
    
    // Validação dos inputs
    var erros = []

    if(!letras[0].value || typeof letras[0].value == undefined || letras[0].value == null ){
        erros.push("Preencha todos os campos")
    }
    if(!letras[1].value || typeof letras[1].value == undefined || letras[1].value == null ){
        erros.push("Preencha todos os campos")
    }
    if(!letras[2].value || typeof letras[2].value == undefined || letras[2].value == null ){
        erros.push("Preencha todos os campos")
    }
    if(!letras[3].value || typeof letras[3].value == undefined || letras[3].value == null ){
        erros.push("Preencha todos os campos")
    }
    if(!letras[4].value || typeof letras[4].value == undefined || letras[4].value == null ){
        erros.push("Preencha todos os campos")
    }
    
    if(erros.length > 0){
        console.log("Preencha os campos")
        htmlErros.classList.add("alert")
        htmlErros.classList.add("alert-danger")
        htmlErros.innerText = erros[0]
    }else{
        htmlErros.innerText = "";
        htmlErros.classList.remove("alert")
        htmlErros.classList.remove("alert-danger")

        btnEnviar.disabled = true;
        verificarLetras();
        checarVitoria();
    }
    
})

function teclado(){
    document.querySelectorAll(".teclado button").forEach((item)=>{
        item.addEventListener('click', letrasTeclado)
    })
}

teclado()

function letrasTeclado(e){
    const index = e.target.getAttribute("data-i")
 
    for(i = 0; i <5; i++){
        if(letras[i].value == ""){
            letras[i].value = index
            $("#letra"+(i+2)).focus()
            console.log(i)
            break
        }
    }
    
}
    
