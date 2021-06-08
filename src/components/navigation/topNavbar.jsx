import React from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import { useLocation, Link } from 'react-router-dom'
import { useLineToday } from '../../context/lineToday'
import { specialSectionsMap } from './specialSections'
import './style.scss'

export default function TopNavbar() {
  const { allSectionData } = useLineToday()
  
  const location = useLocation()
  const currentSectionName = location.pathname === '/' ? 'top' : location.pathname.slice(1)
  // TODO
  // Tambah dropdown untuk selection > 7
  // Tambah fitur putihkan button jika berada di laman tsb
  console.log(currentSectionName)


  function getNavButton(sectionData) {
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

  function createDropDown() {
    return (
      <NavDropdown title='Berita Lainnya' id='collasible-nav-dropdown' className='nav-dropdown'>
        { allSectionData.slice(7, -1).map((sectionData) => getNavButton(sectionData)) }
      </NavDropdown>
    )
  }

  const allSectionButton = allSectionData.slice(0, 7).map((sectionData) => getNavButton(sectionData))

  const specialSectionsButton = specialSectionsMap.map((sectionData) => getNavButton(sectionData))

  const sectionNavigation = (
    <Navbar.Collapse id='responsive-navbar-nav'>
      <Nav className='me-auto'>
        { allSectionButton }
        { allSectionData.length > 6 && createDropDown() }
      </Nav>
      <Nav>
        { specialSectionsButton }
      </Nav>
    </Navbar.Collapse>
  )


  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' sticky='top'>
      <Container>
        <Navbar.Brand className='nav-brand'>LINE TODAY</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        { sectionNavigation }
      </Container>
    </Navbar>
  )
}
