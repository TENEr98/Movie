import React, { useEffect, useState } from 'react'
import { Loader, Pagination } from 'rsuite'
import { MovieAPI } from '../api'
import { notify } from '../utils/Notification'
import MoveItem from './MovieItem'

import './MovieList.scss'

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [maxPageSize, setMaxPageSize] = useState(0)

  useEffect(() => {
    ;(async () => {
      await updateMainList(page)
    })()
    return () => {
      setMovies([])
      setMaxPageSize(0)
    }
  }, [page])

  const updateMainList = async (page = 0) => {
    try {
      const response = await MovieAPI.getMainList(page)
      if (response.status === 200) {
        setMovies(response?.data?.data?.movies)
        setMaxPageSize(
          Math.round(
            response?.data?.data?.total_items /
              response?.data?.data?.items_per_page
          )
        )
      } else {
        throw new Error()
      }
    } catch (error) {
      notify(error?.message, '', 'error')
    }
  }
  const selectPage = (selectedPage) => setPage(selectedPage)

  return movies.length > 0 ? (
    <div className="Wrapper">
      <div className="Main_Container">
        <h1 className="Title">Фильмы</h1>
        <div className="Movies_List">
          {movies.map((el, idx) => (
            <MoveItem info={el} key={idx} />
          ))}
        </div>
      </div>
      <div className="Pagination_Container">
        <Pagination
          prev
          last
          next
          first
          ellipsis
          boundaryLinks
          pages={maxPageSize}
          maxButtons={5}
          activePage={page}
          onSelect={selectPage}
        />
      </div>
    </div>
  ) : (
    <div className="Spinner">
      <Loader size="lg" content="Загрузка" />
    </div>
  )
}

export default MovieList
