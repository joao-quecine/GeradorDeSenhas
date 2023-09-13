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
        pontosRange=1
    }

    pontosDeForca=pontosChecked+pontosRange //pode ser no maximo 10
    console.log(pontosDeForca, pontosChecked)
}

//script atualizar pontos de força ao alterar o valor do formulario de configuração
document.querySelectorAll('#PasswordConfig input[type="checkbox"]').forEach(function(i){
    i.addEventListener('change', function(){
        calcularForca()
    })
})