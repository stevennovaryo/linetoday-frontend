import { Button } from 'react-bootstrap'
import React, { useState, useEffect, useCallback } from 'react'
import './style.scss'
import { Bookmark } from 'react-bootstrap-icons'
import { useLineToday } from '../../context/lineToday'

export default function BookmarkButton({article, setArticlesGroup}) {
  function getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarkedArticles')).sections[0].articles
  }

  function storeBookmarks(allArticles) {
    let bookmarkSection = JSON.parse(localStorage.getItem('bookmarkedArticles'))
    bookmarkSection.sections[0].articles = allArticles
    setArticlesGroup(bookmarkSection)
    localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkSection))
  }

  const isArticleBookmarked = useCallback(() => {
    return getBookmarks().some((element) => (element.id === article.id))
  }, [article.id])

  const [isAddButton, setIsAddButton] = useState(!isArticleBookmarked())
  const { addMessage } = useLineToday()
  
  function handleAddBookmark() {
    const allArticles = getBookmarks()
  
    if (!isArticleBookmarked()) {
      allArticles.push(article)
    }
    storeBookmarks(allArticles)
    setIsAddButton(false)

    addMessage('Bookmark', 'Artikel berhasil di bookmark')
  }

  function handleDeleteBookmark() {
    let allArticles = getBookmarks()
    let temp = []
    
    for (const element of allArticles) {
      if (element.id !== article.id) {
        temp.push(element)
      }
    }
    allArticles = temp
    
    storeBookmarks(allArticles)
    setIsAddButton(!isArticleBookmarked())

    addMessage('Bookmark', 'Bookmark berhasil dihapus')
  }

  useEffect(() => {
    setIsAddButton(!isArticleBookmarked())
  }, [isArticleBookmarked])

  return (
    <Button 
      variant={isAddButton ? 'light' : 'success'} 
      onClick={isAddButton ? handleAddBookmark : handleDeleteBookmark} 
      className="bookmark-button"
    >
      <Bookmark />
    </Button>
  )
}
