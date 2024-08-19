import { useState } from 'react'
import Header from './componentes/header'
import Clima from './componentes/Clima'
import Weather from './componentes/CardClima'


function App() {

  return (
    <div className="app">

      
      <Clima/>
      <Weather/>
    </div>
 
  )
}

export default App

