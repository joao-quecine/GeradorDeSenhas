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
        gerarSenha()
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
function verificarCheckbox(){
    let checkbox= document.querySelectorAll('#PasswordConfig input[type="checkbox"]')
    let checkboxChecked=0
    checkbox.forEach(function(i){
        if(i.checked){
            checkboxChecked++
        }
    })
    if(checkboxChecked==0){
        document.getElementById('btnCriar').setAttribute('disabled','true')
    }
    else{
        document.getElementById('btnCriar').removeAttribute('disabled')
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
    let senha=[]

    if (upper.checked){
        let index=Math.floor(Math.random()*letrasMaiusculas.length)
        senha.push(letrasMaiusculas[index])
    }

    if (lower.checked ){
        let index= Math.floor((Math.random() * letrasMinusculas.length))
        senha.push(letrasMinusculas[index]);
    }

    if (number.checked ) {
        let index= Math.floor ((Math.random () *numeros.length));
        senha.push(numeros [index] );
    };

    if (symbol.checked){
        let index=Math.floor(((Math.random())*(simbolos . length)));
        senha.push(simbolos[index]);
    };
    console.log(senha)
}

//script embaralhar senha
function embaralharSenha(senha){
    
}