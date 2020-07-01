const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const image = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// update UI
const updateUI = (data) => {

    // destructure properties
    const {cityDets, weather} = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    `;

    // update image and icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let imageSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    image.setAttribute('src' , imageSrc);

    // remove the display none class
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets, // equal to cityDets: cityDets
        weather
    };

};

cityForm.addEventListener('submit', e => {
    //prevent to refresh the page
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update city name
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err.message));

    // set local storage
    localStorage.setItem('location', city);
});

let cityLocation = localStorage.getItem('location');
if (cityLocation){
       // update city name
       updateCity(cityLocation)
       .then(data => updateUI(data))
       .catch(err => console.log(err.message));
}