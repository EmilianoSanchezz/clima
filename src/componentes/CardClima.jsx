import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Argentina'); // Ciudad inicial
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [inputCity, setInputCity] = useState(''); // Estado para almacenar la entrada del usuario

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '7d241f9117004ee1806cec5d72d72d42';

        if (!apiKey) {
          throw new Error('Clave API no encontrada');
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
        );

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(`Error fetching weather data: ${err.message}`);
      }
    };

    fetchWeather();
  }, [city]); // Se actualiza cada vez que 'city' cambie

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    setInputCity(event.target.value); // Actualiza el valor del input
  };

  const handleCitySubmit = () => {
    setCity(inputCity); // Actualiza la ciudad con el valor ingresado por el usuario
    setShowModal(false); // Cierra el modal
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className='flotante'>
        <button className='btnAgregar' onClick={handleOpenModal}>+</button>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Friend Clima</h2>
              <p>Elegi tu ciudad</p>
              <input 
                type="text" 
                value={inputCity} // Asignamos el valor del estado inputCity
                onChange={handleInputChange} // Actualiza el valor del input
                placeholder='Ciudad o Codigo Postal' 
              />
              
              <button onClick={handleCitySubmit}>Listo</button> {/* Al hacer clic, se actualiza la ciudad */}
            </div>
          </div>
        )}
      </div>

      {weatherData ? (
        <div className='tarjetaClima'>
          <h2 className='h2Clima'>Clima en {city}</h2>
          <div className="imgClima">
            <img 
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
              alt="Weather Icon" 
            />
          </div>
          <div className="datos">
            <div className="grupo">
              <p>Temperatura</p>
              <span>{weatherData.main.temp}°C</span>
            </div>
            <div className="grupo">
              <p>Humedad</p>
              <span>{weatherData.main.humidity}%</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='tarjetaClima'>
          <p className='loading'>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
