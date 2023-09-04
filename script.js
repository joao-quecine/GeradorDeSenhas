//script do form-range
const range = document.querySelector('.form-range');
const rangeBar = document.querySelector('#range-progress-bar');

document.querySelector('.form-range').addEventListener('input', function() {
    document.getElementById('numeroRange').innerHTML = this.value;

    //aplicando cor a esquerda do indicador do range
    const percent = (range.value - range.min) / (range.max - range.min) * 95; //95, pois entre o range e as laterais da div pai, há um espaço
    rangeBar.style.width = percent + '%';
});


//script calcular a força da senha