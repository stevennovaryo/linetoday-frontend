import { Container } from 'react-bootstrap'
import { LineTodayProvider } from '../context/lineToday'
import Routes from '../router'
import './style.scss'

export default function App() {
  return (
    <LineTodayProvider>
      <Container className='main-container'>
        <Routes />
      </Container>
    </LineTodayProvider>
  )
}
