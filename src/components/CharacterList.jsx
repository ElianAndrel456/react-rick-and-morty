import React, { useState, useEffect } from 'react'
import Character from './Character'

function NavPage({ page, setpage }) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <p>Page: {page}</p>
      <button
        onClick={() => setpage(page + 1)}
        className="btn btn-primary btn-sm"
      >
        Page {page + 1}
      </button>
    </header>
  )
}

const CharacterList = () => {
  const [characters, setCharacters] = useState([])
  const [page, setpage] = useState(1)
  const [loading, setloading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://rickandmortyapi.com/api/character?page=' + page
      )
      const data = await response.json()
      setloading(false)
      setCharacters(data.results)
    }
    fetchData()
  }, [page])

  return (
    <div className="container">
      <NavPage page={page} setpage={setpage} />
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4" key={character.id}>
              <Character character={character} />
            </div>
          ))}
        </div>
      )}
      <NavPage page={page} setpage={setpage} />
    </div>
  )
}

export default CharacterList
