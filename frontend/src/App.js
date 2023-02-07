import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// compoents
import Header from './components/Header';
import Footer from './components/Footer';

// Screens
import HomeScreen from './screens/HomeScreen';
import JobScreen from './screens/JobScreen';
import LoginScreen2 from './screens/LoginScreen2';
import RegisterScreen2 from './screens/RegisterScreen2';
import ProfileScreen from './screens/ProfileScreen';
import AdminEditScreen from './screens/AdminEditScreen';
import EmployeerList from './screens/EmployeerList';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen2 />} />
            <Route path='/register' element={<RegisterScreen2 />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/jobs/:id' element={<JobScreen />} />
            <Route path='/admin/editList' element={<AdminEditScreen />} />
            <Route path='/employeer/jobList' element={<EmployeerList />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
