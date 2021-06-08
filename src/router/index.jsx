import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useLineToday } from '../context/lineToday'
import Newsfeed from '../components/newsfeed/newsfeed'
import TopNavbar from '../components/navigation/topNavbar'
import Bookmarks from '../components/bookmarks'
import PopupContainer from '../components/popupMessage'

export default function Routes() {
  const { allSectionData} = useLineToday()


  const routesMap = allSectionData.map((sectionData) => {
    let pathName = sectionData.name.toLowerCase()
    if (pathName === 'top') pathName = '(|top)/' 

    return {
      path: `/${pathName}`,
      exact: true,
      render: ((props) => <Newsfeed sectionData={sectionData} {...props} /> )
    }
  })


  return (
    <Router>
      <TopNavbar />
        <PopupContainer />
      <Switch>
        {routesMap.map((route, idx) => (
          <Route {...route} key={idx} />
          ))}
        <Route path='/bookmark' component={Bookmarks} />
        <Redirect to='/' />
      </Switch>
    </Router>
  )
}