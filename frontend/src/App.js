import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// compoents
import Header from './components/Header';
import Footer from './components/Footer';

// Screens
import HomeScreen from './screens/HomeScreen';
import JobScreen from './screens/JobScreen';
// import LoginScreen from './screens/LoginScreen';
import LoginScreen2 from './screens/LoginScreen2';
// import RegisterScreen from './screens/RegisterScreen';
import RegisterScreen2 from './screens/RegisterScreen2';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            {/* <Route path='/login' element={<LoginScreen />} /> */}
            <Route path='/login' element={<LoginScreen2 />} />
            <Route path='/register' element={<RegisterScreen2 />} />
            <Route path='/jobs/:id' element={<JobScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
