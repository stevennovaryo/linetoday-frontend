import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import './style.scss'
import { Bookmark } from 'react-bootstrap-icons';

export default function BookmarkButton({article, setArticlesGroup}) {
  function getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarkedArticles'));
  }

  const comparator = (element) => (element.id === article.id)
  function isArticleBookmarked() {
    return getBookmarks().sections[0].articles.some(comparator)
  }

  const [isAddButton, setIsAddButton] = useState(!isArticleBookmarked());
 
  
  function handleAddBookmark() {
    const allSectionData = getBookmarks();
  
    if (!isArticleBookmarked()) {
      allSectionData.sections[0].articles.push(article)
    }
  
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
  
    localStorage.setItem('bookmarkedArticles', JSON.stringify(allSectionData))
    setArticlesGroup(allSectionData)
    setIsAddButton(!isArticleBookmarked())
  }

  useEffect(() => {
    setIsAddButton(!isArticleBookmarked())
  })

  return (
    <Button variant={isAddButton ? 'light' : 'success'} onClick={isAddButton ? handleAddBookmark : handleDeleteBookmark} className="bookmark-button">
      <Bookmark />
    </Button>
  )
}
