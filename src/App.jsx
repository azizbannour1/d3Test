import './App.css'
import RadarChart from './component/RadarChart'

function App() {
  const data = [10, 20, 30, 40, 50];

  return (
    <>
      <RadarChart data={data} />
    </>
  )
}

export default App
