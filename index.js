
const wrapper = document.querySelector('.wrapper')
//console.log(wrapper)
const inputPart = wrapper.querySelector('.input-part')
//console.log (inputPart)
const infoTxt = inputPart.querySelector('.info-txt')
//console.log(infoTxt)
const inputField = inputPart.querySelector('input')
//console.log(inputField)
const locationBtn = document.querySelector('button')
const wIcon = document.querySelector('.weather-part img')
arrowBack = wrapper.querySelector ('header i')
let api;

locationBtn.addEventListener ('click', ()=>{
  if(navigator.geolocation){ //if brouser supports geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else{
    alert ('your browser not support geolocation api')
  } 
});

function onSuccess(position){
  const {latitude, longitude } = position.coords;//getting latitude longitude of the user device  from coords obj
 api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=98e1c1ec2602bffed744a1a397f33797`
fetchData()
}

function onError(error){
  infoTxt.innerHTML = error.message;
  infoTxt.classList.add('error')
}

inputField.addEventListener ('keyup', event =>{
  //if user pressed btn and input valueis not emty
  if(event.key === 'Enter'&& inputField.value !== ''){
    //console.log('hello')
    requestApi(inputField.value);
    event.target.value = ''
  }
})

function requestApi(city){
  //console.log(city)
   api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=98e1c1ec2602bffed744a1a397f33797`;
 fetchData()
  
  };

  function fetchData(){
    infoTxt.innerHTML = 'Getting weather details...'
 infoTxt.classList.add('pending')
 
  //getting appi response and returning it with parsing into js object
 //then the function calling weatherDetails function with passing api result as an argument
  fetch(api)
  .then(resp => resp.json())
  .then(result => weatherDetails(result))
  }

  function weatherDetails (info){
    infoTxt.classList.replace('pending', 'error')
    if(info.cod == 404){
      infoTxt.innerHTML = `${inputField.value} is not a city valid name`
 
    } else {
      //let us get required property value from  the info object
     const city = info.city.name;
      const country = info.city.country;
      const {description, id} = info.list[0].weather[0];
      const {feels_like, humidity,temp} = info.list[0].main;

      if (id === 800) {
        wIcon.src = 'img/sun.png';

      } else if (id>=200 && id<= 232){
        wIcon.src = 'img/raining.png'

      }else if (id>=600 && id<= 622){
        wIcon.src = 'img/snow.png'

      }else if (id>=701 && id<= 781){
        wIcon.src = 'img/light.png'
      }else if (id>=801 && id<= 804){
        wIcon.src = 'img/cloudy.png'
      }else if (id>=301 && id< 321 || id >=500 && id <=531){
        wIcon.src = 'img/raining_sun.png'
      }



      // let us pass these values to a particular html element
      wrapper.querySelector('.temp .numb').innerHTML =Math.floor(temp);
      wrapper.querySelector('.weather').innerHTML= description;
      wrapper.querySelector('.location span').innerHTML = `${city}, ${country}`;
      wrapper.querySelector('.temp .numb-2').innerHTML = Math.floor(feels_like) ;
      wrapper.querySelector('.humidity span').innerHTML = humidity;
      
      infoTxt.classList.remove('pending', 'error')
      wrapper.classList.add('active')
      console.log(info)
    }
  }

  arrowBack.addEventListener('click', ()=>{
    wrapper.classList.remove('active')
  })