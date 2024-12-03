import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scene3D from './Scene3D'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Đồ họa máy tính</h1>
      <h3>Bài tập 2: Ứng dụng Three.js trong mô hình 3D</h3>
      <div>
        <Scene3D />
      </div>
    </>
  )
}

export default App
