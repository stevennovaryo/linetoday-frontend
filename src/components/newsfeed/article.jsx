import React from 'react'
import { Card } from 'react-bootstrap'
import BookmarkButton from '../bookmarks/bookmarkButton'
import './style.scss'

export default function Article({articleData, setArticlesGroup}) {
  let imageStyle = {
    backgroundImage: `url(https://obs.line-scdn.net/${articleData.thumbnail.hash}/w644)`,
  }

  function handleClick() {
    window.open(articleData.url.url, "_blank")
  }


  return (
    <Card className='article-card m-2' border='light'>
      <div onClick={handleClick} className='article-overlay' /> 
      <BookmarkButton article={articleData} setArticlesGroup={setArticlesGroup} />
      <div style={imageStyle} className='thumbnail' /> 
      <Card.Body>{articleData.title}</Card.Body>
    </Card>
  )
}