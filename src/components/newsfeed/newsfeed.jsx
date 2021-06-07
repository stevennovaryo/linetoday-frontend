import React from 'react'
import SubSection from './subSection'

export default function Newsfeed({sectionData}) {

  const allSubSection = sectionData.templates.map((subSectionData) => {
    return <SubSection subSectionData={subSectionData} key={subSectionData.id}/>
  })

  return (
    <div>
      { allSubSection }
    </div>
  )
}