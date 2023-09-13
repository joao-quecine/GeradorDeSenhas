//script do form-range
const range = document.querySelector('.form-range');
const rangeBar = document.querySelector('#range-progress-bar');

document.querySelector('.form-range').addEventListener('input', function() {
    document.getElementById('numeroRange').innerHTML = this.value;

    //aplicando cor a esquerda do indicador do range
    const percent = (range.value - range.min) / (range.max - range.min) * 95; //95, pois entre o range e as laterais da div pai, há um espaço
    rangeBar.style.width = percent + '%';

    calcularForca()
});


//script calcular a força da senha
let pontosDeForca=0
function calcularForca(){
    let checkedTrue=0
    let Checked= document.querySelectorAll('#PasswordConfig input[type="checkbox"]').forEach(function(i){if(i.checked){checkedTrue+=1}})
    let pontosChecked= checkedTrue*1.25 //no maximo 5

    let pontosRange=0  //no maximo 5
    if(range.value==24){
        pontosRange=5
    }
    else if(range.value>=20){
        pontosRange=4
    }
    else if(range.value>=15){
        pontosRange=3
    }
    else if(range.value>=10){
        pontosRange=2
    }
    else{
        pontosRange=1.25
    }

    pontosDeForca=pontosChecked+pontosRange //pode ser no maximo 10
    aplicarEstiloForca()
}

//script atualizar pontos de força ao alterar o valor do formulario de configuração
document.querySelectorAll('#PasswordConfig input[type="checkbox"]').forEach(function(i){
    i.addEventListener('change', function(){
        calcularForca()
        verificarCheckbox()
    })
})

//script aplicar estilos á barra de nível a depender dos pontos de força
let nivelDificuldadeText= document.querySelector('.nivelDificuldade')

function aplicarEstiloForca(){
    let areaBarrasDeNivel= document.getElementById('areaBarrasDeNivel')
    if (pontosDeForca<=2.5){
        areaBarrasDeNivel.setAttribute('nivel','1')
        nivelDificuldadeText.textContent='Very weak'
    }
    else if(pontosDeForca<=5){
        areaBarrasDeNivel.setAttribute('nivel','2')
        nivelDificuldadeText.textContent='weak'
    }
    else if(pontosDeForca<=7.5){
        areaBarrasDeNivel.setAttribute('nivel','3')
        nivelDificuldadeText.textContent='Strong'
    }
    else{
        areaBarrasDeNivel.setAttribute('nivel','4')
        nivelDificuldadeText.textContent='Very Strong'
    }
}

//script que verifica se pelo menos um checkbox esta checado
let btn= document.getElementById('btnCriar')
btn.onclick=gerarSenha
function verificarCheckbox(){
    let checkbox= document.querySelectorAll('#PasswordConfig input[type="checkbox"]')
    let checkboxChecked=0
    checkbox.forEach(function(i){
        if(i.checked){
            checkboxChecked++
        }
    })
    if(checkboxChecked==0){
        btn.setAttribute('disabled','true')
    }
    else{
        btn.removeAttribute('disabled')
    }
}


//script gerar a senha de acordo com as configuraçoes selecionadas
function gerarSenha(){
    let letrasMinusculas = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let letrasMaiusculas = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let simbolos = ["!","#","$","%","&","*","+",",",".","/",":",";","=","?","@",];

    let upper= document.getElementById('Uppercase')
    let lower=document.getElementById("Lowercase")
    let number=document.getElementById("Numbers")
    let symbol=document.getElementById("Symbols");
    let preSenha=[]

    //gera uma lista com os caracteres que vao ser usados para criar a senha
    let i=0
    while(i<range.value){

        if (upper.checked){
            let index=Math.floor(Math.random()*letrasMaiusculas.length)
            if (i<range.value){
                preSenha.push(letrasMaiusculas[index])
                ++i
            }
        }

        if (lower.checked ){
            let index= Math.floor((Math.random() * letrasMinusculas.length))
            if (i<range.value){
                preSenha.push(letrasMinusculas[index]);
                ++i
            }
        }
    
        if (number.checked ) {
            let index= Math.floor ((Math.random () *numeros.length));
            if (i<range.value){
                preSenha.push(numeros [index] );
                ++i
            }  
        };

        if (symbol.checked){
            let index=Math.floor(((Math.random())*(simbolos . length)));
            if (i<range.value){
                preSenha.push(simbolos[index]);
                ++i
            }
        };
    }
    embaralharSenha(preSenha)
}

//script embaralhar senha. pega um elemento de um indice alatorio, apaga ele e o recoloca em uma posiçao aleatoria
function embaralharSenha(preSenha){
    for(let i=0; i<100;i++){
        let listaLenght= preSenha.length
        let indexdel= Math.floor(Math.random()*listaLenght)
        let indexins= Math.floor(Math.random()*listaLenght)
        let valorDoIndex= preSenha[indexdel]

        preSenha.splice(indexdel, 1)
        preSenha.splice(indexins,0, valorDoIndex)
    }
}