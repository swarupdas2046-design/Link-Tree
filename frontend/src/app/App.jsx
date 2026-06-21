import { RouterProvider } from 'react-router'
import router from './app.routes.jsx'
import AuthProvider from '../context/AuthProvider.jsx'
import './App.css'

const App = () => {
  return (
    <div className="app-shell">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App
