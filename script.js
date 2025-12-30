function clearAnimations() {
  document.getElementById('animationLayer').innerHTML = '';
}

function addRainDrops(count = 50) {
  const layer = document.getElementById('animationLayer');
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.animationDuration = (0.5 + Math.random()).toFixed(2) + 's';
    layer.appendChild(drop);
  }
}

function addSnowflakes(count = 30) {
  const layer = document.getElementById('animationLayer');
  for (let i = 0; i < count; i++) {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.innerText = '❄️';
    flake.style.left = Math.random() * 100 + '%';
    flake.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    flake.style.animationDuration = (3 + Math.random() * 3).toFixed(2) + 's';
    layer.appendChild(flake);
  }
}

function addSun() {
  const sun = document.createElement('div');
  sun.className = 'sun';
  document.getElementById('animationLayer').appendChild(sun);
}

function addClouds() {
  const cloud = document.createElement('div');
  cloud.className = 'cloud cloud1';
  document.getElementById('animationLayer').appendChild(cloud);
}

function addFog() {
  const fog = document.createElement('div');
  fog.className = 'fog';
  document.getElementById('animationLayer').appendChild(fog);
}

async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const apiKey = '92123ed2bc2c4e199e342755251207';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  clearAnimations();

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      document.getElementById('weather').innerHTML = `<p class='error'>${data.error.message}</p>`;
      return;
    }

    const iconUrl = `https:${data.current.condition.icon}`;
    const condition = data.current.condition.text.toLowerCase();
    const body = document.body;

    if (condition.includes('rain')) {
      body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-rain');
      addRainDrops();
    } else if (condition.includes('snow')) {
      body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-snow');
      addSnowflakes();
    } else if (condition.includes('clear') || condition.includes('sunny')) {
      body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-clear');
      addSun();
    } else if (condition.includes('cloud')) {
      body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-cloudy');
      addClouds();
    } else if (condition.includes('fog') || condition.includes('mist')) {
      body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-mist');
      addFog();
    } else {
      body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-default');
    }

    document.getElementById('weather').innerHTML = `
      <img src="${iconUrl}" alt="icon" />
      <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Precipitation:</strong> ${data.current.precip_mm} mm</p>
      <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
      <p><strong>Air Quality (PM2.5):</strong> ${data.current.air_quality.pm2_5.toFixed(2)}</p>
    `;
  } catch (err) {
    document.getElementById('weather').innerHTML = `<p class='error'>Something went wrong!</p>`;
    console.error(err);
  }
}
