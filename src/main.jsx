import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// DOM読み込み時にスタイルリセット
document.addEventListener('DOMContentLoaded', () => {
  // 強制的にスタイルリセット
  document.body.style.margin = '0'
  document.body.style.padding = '0'
  document.body.style.width = '100%'
  document.body.style.boxSizing = 'border-box'
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
