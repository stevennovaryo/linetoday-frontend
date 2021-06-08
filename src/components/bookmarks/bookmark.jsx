import React from 'react'
import SubSection from '../newsfeed/subSection';

export default function Bookmarks() {
  function getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarkedArticles'));
  }

  return (
    <div>
      { <SubSection subSectionData={getBookmarks()} /> }
    </div>
  )
}