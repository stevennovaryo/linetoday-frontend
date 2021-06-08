import { Button } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react'
import './style.scss'
import { Bookmark } from 'react-bootstrap-icons';
import { useLineToday } from '../../context/lineToday';

export default function BookmarkButton({article, setArticlesGroup}) {
  function getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarkedArticles'));
  }

  const isArticleBookmarked = useCallback(() => {
    return getBookmarks().sections[0].articles.some((element) => (element.id === article.id))
  }, [article.id])

  const [isAddButton, setIsAddButton] = useState(!isArticleBookmarked());
  const { addMessage } = useLineToday()
  
  function handleAddBookmark() {
    const allSectionData = getBookmarks();
  
    if (!isArticleBookmarked()) {
      allSectionData.sections[0].articles.push(article)
    }
    addMessage('Bookmark', 'Artikel berhasil di bookmark')
    localStorage.setItem('bookmarkedArticles', JSON.stringify(allSectionData))
    setIsAddButton(false)
  }

  function handleDeleteBookmark() {
    let allSectionData = getBookmarks();
    let temp = []
    
    for (const element of allSectionData.sections[0].articles) {
      if (element.id !== article.id) {
        temp.push(element)
      }
    }
    allSectionData.sections[0].articles = temp
    addMessage('Bookmark', 'Bookmark berhasil dihapus')
  
    localStorage.setItem('bookmarkedArticles', JSON.stringify(allSectionData))
    setArticlesGroup(allSectionData)
    setIsAddButton(!isArticleBookmarked())
  }

  useEffect(() => {
    setIsAddButton(!isArticleBookmarked())
  }, [isArticleBookmarked])

  return (
    <Button variant={isAddButton ? 'light' : 'success'} onClick={isAddButton ? handleAddBookmark : handleDeleteBookmark} className="bookmark-button">
      <Bookmark />
    </Button>
  )
}
