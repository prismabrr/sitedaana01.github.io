// const chk = document.getElementById('chk')

// chk.addEventListener('change', ()=>{
//     document.body.classList.toggle('dark')
// })
const chk = document.getElementById('chk');
const texts = document.querySelectorAll('.text');

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    texts.forEach(text => {
        if (document.body.classList.contains('dark')) {
            text.style.color = 'black'; // Se o modo escuro estiver ativado, altera a cor do texto para branco
        } else {
            text.style.color = 'white'; // Se o modo escuro estiver desativado, volta para a cor padrão do texto
        }
    });
});
