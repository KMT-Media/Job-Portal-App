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
// import EmployerCreateJobScren from './screens/EmployerCreateJobScreen';
import NotFound from './screens/NotFound';
import JobEditScreen from './screens/JobEditScreen';
import EmployeeFormScreen from './screens/EmployeeFormScreen';
import ApprovalScreen from './screens/ApprovalScreen';
import AdminApproveCv from './screens/AdminApproveCv';
import EmployeeProfile from './screens/EmployeeProfile';
import EmployeeProfileEdit from './screens/EmployeeProfileEdit';
import EmployerView from './screens/EmployerView';

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
            <Route path='/employer/jobList/:id' element={<EmployeerList />} />
            <Route path='/employer/job/:id/edit' element={<JobEditScreen />} />
            {/* <Route
              path='/employer/createJob'
              element={<EmployerCreateJobScren />}
            /> */}
            <Route path='/employeeForm' element={<EmployeeFormScreen />} />
            <Route path='/employeeProfile' element={<EmployeeProfile />} />
            <Route path='/employee/:id/edit' element={<EmployeeProfileEdit />} />
            <Route path='/admin/approvals' element={<ApprovalScreen />} />
            <Route path='/notfound' element={<NotFound />} />
            <Route path='/admin/cv/:id/edit' element={<AdminApproveCv />} />
            <Route path='/employer/:id/view' element={<EmployerView />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
