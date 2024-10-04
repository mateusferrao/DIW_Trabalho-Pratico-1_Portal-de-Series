let i = 1;
function cliqueFavoritar(){
    let botao = document.getElementById('botaoFavoritar');
    if(i%2!=0){
        botao.classList.remove('btn-outline-danger');
        botao.classList.add('btn-danger')
        i++;
    }else{
        botao.classList.add('btn-outline-danger')
        botao.classList.remove('btn-danger');
        i++;
    }
    
}