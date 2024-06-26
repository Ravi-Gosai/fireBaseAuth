import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { useContext } from 'react';
import AuthContext from './components/store/auth-context';

function App() {

  const authCtx = useContext(AuthContext)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
       {!authCtx.isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile/>}
          {!authCtx.isLoggedIn && <Redirect to='/auth'/>}
          
        </Route>
        <Route path='*'>
          <Redirect to='/'></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
