class WeatherApp {
  constructor(input,form,card) {
    this.input = input;
    this.form = form;
    this.card = card;
    this.apiKey = "b55bd8cfe7b3bb5ba2a3b52f950b00ba";
    this.init();
  }

  init = () => {
    this.form.addEventListener('submit', async(event) => {
      event.preventDefault();
      const city = this.input.value;
      if(city)
      {
        try {
          const weatherData = await this.getWeatherData(city);
          this.displayWeatherInfo(weatherData);
        }
        catch {
          console.error("NO GOOD");
          this.displayError("Could Not Find This City");
        }
      }
      else
      {
        this.displayError("You Did not Enter a city")
      }
    })
  }

   getWeatherData  = async(city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`

    const response = await fetch(apiUrl);

    if(!response.ok)
    {
      throw new Error("Could Not Fetch Weather Data")
    }

    else 
    {
      return await response.json();
    }

  }

  displayWeatherInfo = (data) => {

    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;

    this.card.textContent = "";
    this.card.style.display = "flex";

    const cityName = document.createElement('h1');
    const temperature = document.createElement('p');
    const humidityValue = document.createElement('p');
    const descriptionValue = document.createElement('p');
    const emoji = document.createElement('p');

    cityName.classList.add('cityName');
    temperature.classList.add('temperature');
    humidityValue.classList.add('humidity');
    descriptionValue.classList.add('description');
    emoji.classList.add('emoji');


    cityName.textContent = city;
    temperature.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityValue.textContent = `humidity: ${humidity}%`;
    descriptionValue.textContent = description;
    emoji.textContent = this.getEmoji(id);
    
    this.card.appendChild(cityName);
    this.card.appendChild(temperature);
    this.card.appendChild(humidityValue);
    this.card.appendChild(descriptionValue);
    this.card.appendChild(emoji);
  
  }

  getEmoji = (weatherId) => {
    switch(true) {
      case (weatherId >= 200 && weatherId < 300):
      return "⛈️";

      case (weatherId >= 300 && weatherId < 500):
      return "🌦️";

      case (weatherId >= 500 && weatherId < 600):
      return "🌧️";

      case (weatherId >= 600 && weatherId < 700):
      return "🌨️";

      case (weatherId >= 700 && weatherId < 800):
      return "🌫️"

      case (weatherId === 800):
      return "☀️"

      case (weatherId > 800):
      return "☁️"
    }
    
  }

  displayError = (message) => {
    this.card.textContent = "";
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay')
    this.card.appendChild(errorDisplay);
    this.card.style.display = 'flex';
  }

}

const action = new WeatherApp(document.querySelector('#cityInput'), document.querySelector('#weatherForm'), document.querySelector('#card'));