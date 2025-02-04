import { Container,  } from 'react-bootstrap'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <>
      <Header />
      <ToastContainer />
      {/*
      Outlet yerine Homescreen yazmisdik Outlet indi homescreen evez edir
      main.js de onagore outlet bunu evez etdi
      */}
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  )
}

export default App
