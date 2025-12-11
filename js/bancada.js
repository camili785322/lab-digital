window.onload = () =>{
}

function polling(segundos){
    setTimeout(()=>{
        console.log('Buscando...')
        buscarDadosBancada()
        polling(segundos)
    }, segundos*1000)
}

function buscarDdadosBancada (){
    fetch('http://10.77.241.170:1880/smartsense/estoque')
    .then(res=>res.json())
    .then(data=>{
    console.log(data)
    })
}