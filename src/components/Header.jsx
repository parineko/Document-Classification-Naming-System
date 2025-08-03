function Header() {
  return (
    <div className="header">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '15px', 
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '60px',
          minHeight: '60px'
        }}>
          <div style={{ fontSize: '32px' }}>📄</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '32px', lineHeight: '1.2' }}>文書分類・命名システム</h1>
          <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '5px' }}>Document Classification & Naming System</div>
        </div>
      </div>
      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.5' }}>
        AI × OCR で文書を自動分類・命名する士業事務所向けシステム
      </p>
      <div style={{ 
        background: 'linear-gradient(135deg, #3498db, #2980b9)', 
        padding: '12px 24px', 
        borderRadius: '25px', 
        display: 'inline-block',
        marginTop: '15px',
        border: '2px solid rgba(255,255,255,0.3)',
        boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
      }}>
        <span style={{ fontSize: '15px', fontWeight: '600', color: 'white' }}>💡 DEMO VERSION - 機能テスト用モックアップ</span>
      </div>
    </div>
  )
}

export default Header 