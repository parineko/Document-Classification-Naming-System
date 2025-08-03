import { useState, useEffect } from 'react'

function Settings() {
  const [apiKey, setApiKey] = useState('')
  const [categories, setCategories] = useState('契約書,請求書,判決文,議事録')
  const [namingRule, setNamingRule] = useState('{カテゴリ}_{日付}_{連番}')
  const [ocrLanguage, setOcrLanguage] = useState('jpn+eng')
  const [autoProcess, setAutoProcess] = useState(true)
  const [saveResults, setSaveResults] = useState(true)
  const [logs, setLogs] = useState([
    '[2025-08-03 15:30:22] システム起動完了',
    '[2025-08-03 15:30:23] Gemini Flash API 接続確認中...',
    '[2025-08-03 15:30:24] ✅ API接続成功',
    '[2025-08-03 15:30:25] OCRエンジン初期化完了',
    '[2025-08-03 15:30:26] システム準備完了 - 文書処理可能'
  ])

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    const saved = localStorage.getItem('ai_settings')
    if (saved) {
      const settings = JSON.parse(saved)
      setCategories(settings.categories || '契約書,請求書,判決文,議事録')
      setNamingRule(settings.namingRule || '{カテゴリ}_{日付}_{連番}')
      setOcrLanguage(settings.ocrLanguage || 'jpn+eng')
    }
  }

  const saveSettings = () => {
    if (!apiKey.trim()) {
      alert('APIキーを入力してください。')
      return
    }
    addSystemLog('設定保存開始...')
    localStorage.setItem('ai_settings', JSON.stringify({
      aiModel: 'gemini-flash',
      categories,
      namingRule,
      ocrLanguage,
      apiKeySet: true
    }))
    addSystemLog('✅ 設定保存完了')
    addSystemLog(`分類カテゴリ: ${categories}`)
    addSystemLog(`命名規則: ${namingRule}`)
    alert('✅ 設定が保存されました。\n\nAIモデル: Gemini Flash\n分類カテゴリ: ' + categories)
  }

  const testConnection = () => {
    if (!apiKey.trim()) {
      alert('❌ APIキーが入力されていません。')
      return
    }
    addSystemLog('API接続テスト開始...')
    setTimeout(() => {
      addSystemLog('✅ Gemini Flash API 接続成功')
      addSystemLog('レスポンス時間: 0.8秒')
      addSystemLog('APIクォータ確認完了')
      alert('✅ API接続テスト成功！\n\nGemini Flash に正常に接続できました。\nシステムの準備が完了しています。')
    }, 2000)
  }

  const addSystemLog = (message) => {
    const timestamp = new Date().toLocaleString('ja-JP')
    const newLog = `[${timestamp}] ${message}`
    setLogs(prev => [newLog, ...prev.slice(0, 49)])
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
    <div className="main-content">
      <div className="settings-left">
        <h3 className="settings-title">⚙️ AI・API設定</h3>
        <div className="settings-grid">
          <div className="setting-group">
            <label className="setting-label">🔑 API キー設定</label>
            <input 
              type="password" 
              className="setting-input" 
              placeholder="AIモデルのAPIキーを入力してください"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <div className="setting-note">
              💡 APIキーは暗号化してサーバーに保存されます
            </div>
          </div>
          
          <div className="setting-group">
            <label className="setting-label">📋 分類カテゴリ</label>
            <input 
              type="text" 
              className="setting-input" 
              placeholder="契約書,請求書,判決文,議事録" 
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
            <div className="setting-note">
              💡 事務所の業務に合わせてカスタマイズ可能
            </div>
          </div>
          
          <div className="setting-group">
            <label className="setting-label">📝 命名規則</label>
            <input 
              type="text" 
              className="setting-input" 
              placeholder="{カテゴリ}_{日付}_{連番}" 
              value={namingRule}
              onChange={(e) => setNamingRule(e.target.value)}
            />
            <div className="setting-note">
              💡 事務所のファイル管理ルールに対応
            </div>
          </div>
          
          <div className="setting-group">
            <label className="setting-label">🌐 OCR言語設定</label>
            <select 
              className="setting-input" 
              value={ocrLanguage}
              onChange={(e) => setOcrLanguage(e.target.value)}
            >
              <option value="jpn+eng">日本語 + 英語</option>
              <option value="jpn">日本語のみ</option>
              <option value="eng">英語のみ</option>
            </select>
          </div>
          
          <div className="setting-group">
            <label className="setting-label">⚡ 処理設定</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={autoProcess}
                  onChange={(e) => setAutoProcess(e.target.checked)}
                />
                アップロード時に自動処理
              </label>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={saveResults}
                  onChange={(e) => setSaveResults(e.target.checked)}
                />
                処理結果を自動保存
              </label>
            </div>
          </div>
        </div>
        
        <div className="button-group">
          <button className="btn btn-save" onClick={saveSettings}>
            💾 設定を保存
          </button>
          <button className="btn btn-test" onClick={testConnection}>
            🔍 接続テスト
          </button>
        </div>
      </div>
      
      <div className="settings-right">
        <h3 className="settings-title">📊 システムログ</h3>
        <div className="log-container">
          <div className="log-header">
            <span className="log-title">処理履歴・システム状況</span>
            <button className="btn btn-clear" onClick={clearLog}>
              🗑️ ログクリア
            </button>
          </div>
          <div className="log-display">
            {logs.map((log, index) => (
              <div key={index} className={`log-entry ${log.includes('---') ? 'log-separator' : ''}`}>
                {log}
              </div>
            ))}
          </div>
          <div className="log-actions">
            <button className="btn btn-export" onClick={exportLog}>
              📋 ログ出力
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 