// React bootstrap
import { Container } from 'react-bootstrap';
// Components
import Footer from './components/Footer';
import Header from './components/Header';

// Components
import HomeScreen from './components/HomeScreen';
const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
