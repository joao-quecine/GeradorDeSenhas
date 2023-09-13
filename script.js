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
    console.log(pontosDeForca, pontosChecked)
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