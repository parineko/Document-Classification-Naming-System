import { useState } from 'react'
import Header from './components/Header'
import DocumentProcessor from './components/DocumentProcessor'
import Settings from './components/Settings'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('processing')

  return (
    <div className="container">
      <Header />
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'processing' ? 'active' : ''}`}
          onClick={() => setActiveTab('processing')}
        >
          <span style={{ fontSize: '18px' }}>📄</span>
          <span>文書処理</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <span style={{ fontSize: '18px' }}>⚙️</span>
          <span>システム設定</span>
        </button>
      </div>
      
      <div className={`tab-content ${activeTab === 'processing' ? 'active' : ''}`}>
        {activeTab === 'processing' && <DocumentProcessor />}
      </div>
      
      <div className={`tab-content ${activeTab === 'settings' ? 'active' : ''}`}>
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  )
}

export default App
