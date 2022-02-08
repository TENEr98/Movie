import React, { useEffect, useState, memo } from 'react'
import { Icon, IconButton, Loader } from 'rsuite'
import { MovieAPI } from '../api'
import { notify } from '../utils/Notification'

import './MovieDetails.scss'

const MoveDetails = () => {
  const [info, setInfo] = useState({
    title: '',
    posterImg: '',
    desc: '',
    releaseYear: '',
    country: '',
    genre: '',
    rate: '',
    actors: [],
    directors: [],
    snapshots: []
  })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    ;(async () => {
      try {
        const response = await MovieAPI.getDetailInfo(
          window.location.pathname.replace(/\D/, '')
        )
        setLoading(false)
        if (response.status !== 200) throw new Error()
        const {
          data: {
            data: { movie }
          }
        } = response
        const actors = movie?.actors.map((el) => ({
          name: el.name
        }))
        const directors = movie?.directors.map((el) => ({
          name: el.name
        }))
        const snapshots = movie?.files?.snapshots.map((el) => ({
          photo: el.snapshot_url
        }))
        setInfo((prev) => ({
          ...prev,
          title: movie?.title.trim(),
          posterImg: movie?.files?.poster_url,
          desc: movie?.description,
          releaseYear: movie?.year,
          country: movie?.countries_str,
          genre: movie?.genres_str,
          rate: movie?.rates?.imdb,
          actors,
          directors,
          snapshots
        }))
      } catch (error) {
        notify(error?.message, '', 'error')
      }
    })()
  }, [])

  return !loading ? (
    <div className="Wrapper">
      <div className="Back_To_List">
        <IconButton
          icon={<Icon icon="long-arrow-left" size="2x" />}
          onClick={() => window.history.back()}
        >
          Назад
        </IconButton>
      </div>
      <div className="Main_Details">
        <div className="Main_Poster">
          <div className="Title_Wrapper">
            <h1 className="Main_Title">{info.title}</h1>
          </div>
          <div className="Poster_Wrapper">
            <div className="Aspect_Poster">
              <img src={info.posterImg} alt={info.title} className="Poster" />
            </div>
          </div>
        </div>
        <div className="Main_Info">
          <div className="Desc_Block">
            <span className="Desc_Title">Описание</span>
            <span className="Desc_Info">{info.desc}</span>
          </div>
          <div className="Main_Details">
            <span className="Details">Детали</span>
            <div className="Detail_Item">
              <span className="Item_Title">Год производства:</span>
              <span className="Item_Info">{info.releaseYear}</span>
            </div>
            <div className="Detail_Item">
              <span className="Item_Title">Страна:</span>
              <span className="Item_Info">{info.country}</span>
            </div>
            <div className="Detail_Item">
              <span className="Item_Title">Жанр:</span>
              <span className="Item_Info">{info.genre}</span>
            </div>
            <div className="Detail_Item">
              <span className="Item_Title">Рейтинг:</span>
              <span className="Item_Info">{info.rate}</span>
            </div>
            <div className="Detail_Item_Img">
              <span className="Item_Title">Режиссер:</span>
              <div className="Item_List_Directors">
                {info.directors.map((el, idx) => (
                  <span key={idx}>{el.name}</span>
                ))}
              </div>
            </div>
            <div className="Detail_Item_Img">
              <span className="Item_Title">Актеры:</span>
              <div className="Item_List_Actors">
                {info.actors.map((el, idx) => (
                  <span key={idx}>{el.name}</span>
                ))}
              </div>
            </div>
            <div className="Main_Snapshots">
              <span className="Desc_Title">Изображения</span>
              <div className="Snapshots_Wrapper">
                {info.snapshots.map((el, idx) => (
                  <div key={idx}>
                    <img src={el.photo} alt="snapshot" className="Snapshot" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="Spinner">
      <Loader size="lg" content="Загрузка" />
    </div>
  )
}

export default memo(MoveDetails)
