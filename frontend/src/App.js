// React
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import Footer from './components/Footer';
import Header from './components/Header';

// Components
import HomeScreen from './components/HomeScreen';
import JobScreen from './components/JobScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route path='/jobs/:id' element={<JobScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
