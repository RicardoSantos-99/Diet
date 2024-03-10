import React from 'react'
import ReactDOM from 'react-dom/client'
import MainMenu from './components/MainMenu/MainMenu.component'
import CalorieCalculation from  './components/CalorieCalculation/CalorieCalculation.component'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainMenu />
    <CalorieCalculation />
  </React.StrictMode>,
)
