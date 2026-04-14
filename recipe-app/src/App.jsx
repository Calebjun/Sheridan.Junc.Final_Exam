import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://api.npoint.io/6c48278e70bb1329ec40'

function App() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setRecipes(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="container">
        <h1>Recipe Collection</h1>
        <p className="status-msg">Loading recipes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <h1>Recipe Collection</h1>
        <p className="status-msg error">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Recipe Collection</h1>
      <p className="subtitle">
        Showing <strong>{recipes.length}</strong> dishes from around the world
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Dish Name</th>
              <th>Cuisine</th>
              <th>Rating</th>
              <th>Servings</th>
              <th>Featured</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((r) => (
              <tr key={r.id}>
                <td className="mono">{r.id}</td>
                <td className="dish-name">{r.dishName}</td>
                <td>
                  <span className="badge cuisine">{r.cuisineType}</span>
                </td>
                <td>
                  <span className={`badge rating ${r.rating >= 70 ? 'high' : r.rating >= 40 ? 'mid' : 'low'}`}>
                    {r.rating}
                  </span>
                </td>
                <td className="center">{r.servings}</td>
                <td className="center">{r.featured ? 'Yes' : 'No'}</td>
                <td className="center">
                  <span className={`dot ${r.available ? 'green' : 'red'}`}></span>
                  {r.available ? ' Yes' : ' No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
