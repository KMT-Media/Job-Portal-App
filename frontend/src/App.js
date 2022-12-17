// React bootstrap
import { Container } from 'react-bootstrap';
// Components
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Hello From App</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
