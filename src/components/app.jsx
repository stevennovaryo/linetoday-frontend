import { Container } from 'react-bootstrap'
import { LineTodayProvider } from '../context/lineToday'
import Routes from '../router'
import './style.scss'

function App() {
  console.log('hello')
  return (
    <LineTodayProvider>
      <Container className='main-container'>
        <Routes />
      </Container>
    </LineTodayProvider>
  )
}

export default App