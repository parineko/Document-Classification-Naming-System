import { useState } from 'react'

function SystemLog() {
  const [logs, setLogs] = useState([
    '[2025-08-03 15:30:22] システム起動完了',
    '[2025-08-03 15:30:23] Gemini Flash API 接続確認中...',
    '[2025-08-03 15:30:24] ✅ API接続成功',
    '[2025-08-03 15:30:25] OCRエンジン初期化完了',
    '[2025-08-03 15:30:26] システム準備完了 - 文書処理可能'
  ])

  const addSystemLog = (message) => {
    const timestamp = new Date().toLocaleString('ja-JP')
    const newLog = `[${timestamp}] ${message}`
    setLogs(prev => [newLog, ...prev.slice(0, 49)]) // 最新50件まで保持
  }

  const clearLog = () => {
    setLogs(['--- ログをクリアしました ---'])
    addSystemLog('ログクリア実行')
  }

  const exportLog = () => {
    addSystemLog('ログエクスポート実行')
    alert('📋 ログをエクスポートしました。\n\n実装時には、テキストファイルとしてダウンロード可能です。\n\nログ行数: ' + logs.length + '行')
  }

  return (
    <div className="system-log">
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>📊 システムログ</h3>
        <div style={{ background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>処理履歴・システム状況</span>
            <button 
              className="btn" 
              onClick={clearLog} 
              style={{ background: 'linear-gradient(135deg, #95a5a6, #7f8c8d)', fontSize: '12px', padding: '5px 15px' }}
            >
              🗑️ ログクリア
            </button>
          </div>
          <div style={{ background: '#2c3e50', color: '#00ff00', fontFamily: "'Courier New', monospace", fontSize: '13px', padding: '15px', borderRadius: '5px', height: '200px', overflowY: 'auto' }}>
            {logs.map((log, index) => (
              <div key={index} style={{ color: log.includes('---') ? '#888' : '#00ff00' }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          className="btn" 
          onClick={exportLog} 
          style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)' }}
        >
          📋 ログ出力
        </button>
      </div>
    </div>
  )
}

export default SystemLog 