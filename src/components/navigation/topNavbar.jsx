import React from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import { useLocation, Link } from 'react-router-dom'
import { NEWSFEED } from '../../constants/display'
import { useLineToday } from '../../context/lineToday'
import { specialSectionsMap } from './specialSections'
import './style.scss'

export default function TopNavbar() {
  const { allSectionData } = useLineToday()
  
  const location = useLocation()
  const currentSectionName = location.pathname === '/' ? 'top' : location.pathname.slice(1)


  function createNavButton(sectionData) {
    let cssClass = 'nav-button'
    if (sectionData.name.toLowerCase() === currentSectionName.toLowerCase()) {
      cssClass += ' nav-button-selected'
    }

    return (
      <Link to={`/${sectionData.name.toLowerCase()}`} key={sectionData.name} className={cssClass}>
        {sectionData.name}
      </Link>
    )
  }

  function createNavButtons(multipleSectionData) {
    return multipleSectionData.map((sectionData) => createNavButton(sectionData))
  }


  function createDropDown() {
    return (
      <NavDropdown title='Berita Lainnya' id='collasible-nav-dropdown' className='nav-dropdown'>
        { createNavButtons(allSectionData.slice(NEWSFEED.NAVBAR_BUTTON_COUNT, -1)) }
      </NavDropdown>
    )
  }

  const allSectionButton = createNavButtons(allSectionData.slice(0, NEWSFEED.NAVBAR_BUTTON_COUNT))

  const specialSectionsButton = createNavButtons(specialSectionsMap)

  const sectionNavigation = (
    <Navbar.Collapse id='responsive-navbar-nav'>
      <Nav className='me-auto'>
        { allSectionButton }
        { allSectionData.length > NEWSFEED.NAVBAR_BUTTON_COUNT && createDropDown() }
      </Nav>
      <Nav>
        { specialSectionsButton }
      </Nav>
    </Navbar.Collapse>
  )


  return (
    <Navbar collapseOnSelect className='navigation-bar' expand='lg' bg='dark' variant='dark' sticky='top'>
      <Container>
        <Navbar.Brand className='nav-brand'>LINE TODAY</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        { sectionNavigation }
      </Container>
    </Navbar>
  )
}
