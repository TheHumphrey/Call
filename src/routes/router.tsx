import { Route, BrowserRouter, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter