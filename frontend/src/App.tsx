import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import Contents from './pages/Contents';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AddQuiz from './pages/Quizzes/AddQuiz';
import QuizzesTeacher from './pages/Quizzes/QuizzesTeacher';
import Users from './pages/Users';
import { AuthRoute, PrivateRoute } from './Route';
import authService from './services/AuthService';
import EditQuiz from "./pages/Quizzes/EditQuiz";
import Signup from "./pages/Signup";
import FillQuiz from './pages/FillQuiz';
import CardContents from './pages/CardContents';

export default function App() {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  const authenticate = async () => {
    try {
      const authResponse = await authService.refresh();
      setAuthenticatedUser(authResponse.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (!authenticatedUser) {
      authenticate();
    } else {
      setIsLoaded(true);
    }
  }, []);

  return isLoaded ? (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/fill-quiz/:id" component={FillQuiz} />
        <PrivateRoute exact path="/users" component={Users} roles={['admin']} />
        <PrivateRoute exact path="/courses" component={Courses} />
        <PrivateRoute exact path="/card/contents" component={CardContents} />
        <PrivateRoute exact path="/courses/:id" component={Contents} />
        <PrivateRoute
          exact
          path="/QuizzesTeacher"
          component={QuizzesTeacher}
          roles={['admin']}
        />
        <PrivateRoute
          exact
          path="/add-quiz"
          component={AddQuiz}
          roles={['admin']}
        />
        <PrivateRoute
            exact
            path="/edit-quiz/:id"
            component={EditQuiz}
            roles={['admin']}
            />

        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  ) : null;
}
