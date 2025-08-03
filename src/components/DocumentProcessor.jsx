import { useState, useRef } from 'react'

function DocumentProcessor() {
  const [files, setFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFiles, setProcessedFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('')
  const fileInputRef = useRef(null)

  const handleFiles = (fileList) => {
    const filesArray = Array.from(fileList)
    if (filesArray.length === 0) return
    
    setFiles(filesArray)
    processFiles(filesArray)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const dt = e.dataTransfer
    const files = dt.files
    handleFiles(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const simulateProcessing = async (file, index) => {
    const categories = ['契約書', '請求書', '判決文', '議事録', '報告書', '証明書']
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const confidence = Math.floor(Math.random() * 20) + 80
    
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '')
    
    const processedFile = {
      originalName: file.name,
      category: randomCategory,
      suggestedName: `${randomCategory}_${today}_${String(index + 1).padStart(3, '0')}.${file.name.split('.').pop()}`,
      confidence: confidence,
      size: file.size
    }
    
    return processedFile
  }

  const processFiles = async (filesArray) => {
    setIsProcessing(true)
    setProgress(0)
    setStatusText('AI が文書内容を分析中...')
    setProcessedFiles([])
    
    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i]
      const progressValue = ((i + 1) / filesArray.length) * 100
      
      setProgress(progressValue)
      setStatusText(`処理中: ${file.name} (${i + 1}/${filesArray.length})`)
      
      const processedFile = await simulateProcessing(file, i)
      setProcessedFiles(prev => [...prev, processedFile])
      
      await new Promise(resolve => setTimeout(resolve, 1500))
    }
    
    setIsProcessing(false)
    setStatusText('✅ 処理完了！適切な分類とファイル名を提案しました。')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const downloadAll = () => {
    alert('実装時には、提案されたファイル名で一括ダウンロードまたは一括リネームが可能です。\n\n処理済みファイル: ' + processedFiles.length + '件')
  }

  return (
    <div className="main-content">
      <div>
        <div 
          className={`upload-section ${isProcessing ? 'dragover' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">📁</div>
          <div className="upload-text">ファイルをドラッグ&ドロップ</div>
          <div className="upload-subtext">PDF、画像ファイル（JPG、PNG）、テキストファイルに対応</div>
          <input 
            ref={fileInputRef}
            type="file" 
            className="file-input" 
            multiple 
            accept=".pdf,.jpg,.jpeg,.png,.txt"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button className="btn">
            📂 ファイルを選択
          </button>
          {isProcessing && (
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          )}
          <div className="status-text">{statusText}</div>
        </div>
      </div>
      
      <div>
        <h3 className="settings-title">🎯 分類結果</h3>
        <div>
          {processedFiles.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', padding: '40px' }}>
              ファイルをアップロードすると、<br />
              AI が内容を分析して分類・命名結果を<br />
              ここに表示します
            </div>
          ) : (
            processedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-name">📄 {file.suggestedName}</div>
                <div>
                  <span className="file-category">{file.category}</span>
                  <span className="file-confidence">分析信頼度: {file.confidence}%</span>
                </div>
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                  元ファイル: {file.originalName} ({formatFileSize(file.size)})
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentProcessor 