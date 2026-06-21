import { RouterProvider } from 'react-router'
import router from './app.routes.jsx'
import './App.css'

const App = () => {
  return (
    <div className="app-shell">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
