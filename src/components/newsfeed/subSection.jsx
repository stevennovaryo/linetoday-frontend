import React, { useState, useReducer } from 'react'
import { Card } from 'react-bootstrap'
import Article from './article'
import './style.scss'

export default function SubSection({subSectionData}) {
  function changeArticleGroup(state, action) {
    if (subSectionData.title !== action.title) {
      return state;
    }else {
      return action.sections;
    }
  }
  

  const [articlesGroup, setArticlesGroup] = useReducer(changeArticleGroup, subSectionData.sections)
  const [sectionTitle, ] = useState(subSectionData.title)

  function isArticlevalid(article) {
    return article.status === "AVAILABLE" && article.title && article.thumbnail && article.url
  }

  function findValidArticles() {
    let validArticles = []
    
    for (const group of articlesGroup) {
      for (const article of group.articles) {
        if (isArticlevalid(article)) {
          validArticles.push(article)
        }
      }
    }
    return validArticles
  }

  
  
  function renderSection() {
    let allValidArticles = findValidArticles()
    
    if (allValidArticles.length > 0) {
      const articles = allValidArticles.map((articleData, idx) => {
        return <Article articleData={articleData} setArticlesGroup={setArticlesGroup} key={idx} />
      })     
      
      return <Card.Body className='section-grid'>{articles}</Card.Body>
    
    }else if (subSectionData.renderWithoutArticles) {
      return <span className='section-no-article'>{subSectionData.renderWithoutArticles.message}</span>
    }
    return null
  }

  const renderedSection = renderSection()

  // console.log(subSectionData)

  if (renderedSection) {
    return (
      <Card className="p-1 my-3" border="light">
        <Card.Title className="section-title">
          { sectionTitle ? sectionTitle : "BERITA PILIHAN UNTUKMU" }
        </Card.Title>

        <hr className="section-title-separator" />
        
        { renderedSection }
      </Card>
    )
  }

  return (
    <></>
  )
}
