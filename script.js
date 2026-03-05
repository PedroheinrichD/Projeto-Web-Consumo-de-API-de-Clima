// API https://api.openweathermap.org/data/2.5/weather?q=Sao%20Paulo&appid=SUA_CHAVE_AQUI&units=metric&lang=pt
// 404 error
// 200 correct
const API_KEY = "c723e2faa02cbb4980a1dac865f49cd0";
document.querySelector('.busca').addEventListener('click', async(event) => {
    event.preventDefault()

    const searchInput = document.querySelector('#searchInput').value
    
    if(searchInput !== ''){
        showWarning('Carregando...')
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(searchInput)}&appid=c723e2faa02cbb4980a1dac865f49cd0&units=metric&lang=pt`
        let results = await fetch(url)
        let json = await results.json()
        console.log(json);
        
        
    if(json.cod === 200){
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windspeed: json.wind.speed,
            windAngle: json.wind.deg,
        })
    }else{
        showWarning('Não encontramos esta localização')
    }
    }


})

function showInfo(json){
    showWarning('')
    document.querySelector('.resultado').style.display = 'block'
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`

    
    document.querySelector('.ventoInfo').innerHTML = `${json.windspeed} <span>km/h</span>`
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-180}deg)`
    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}.png`)



}


function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}