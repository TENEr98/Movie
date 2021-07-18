import React from 'react'

const MoveItem = ({ info }) => {
  return (
    <div
      className="Movie_Item"
      onClick={() => (window.location.href = `/${info.id}`)}
    >
      <div className="Movie_Wrapper">
        <img
          src={info?.files?.poster_url}
          alt={info?.title}
          className="Movie_Poster"
        />
      </div>
      <span className="Movie_Title">{info?.title}</span>
    </div>
  )
}

export default MoveItem
