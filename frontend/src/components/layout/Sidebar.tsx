import {
  BookOpen,
  Home,
  Inbox,
  LogOut,
  Menu,
  PenTool,
  Users,
} from 'react-feather';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import authService from '../../services/AuthService';
import SidebarItem from './SidebarItem';
import bg from './../../assets/bg.jpg'

interface SidebarProps {
  className: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const history = useHistory();

  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
    setAuthenticatedUser(null);
    history.push('/login');
  };

  return (
    <div className={'rounded-r-lg sidebar ' + className} style={{backgroundImage: `url(${bg})`}}>
      <Link to="/" className="no-underline text-black flex justify-center mt-5">
        {/* <h1 className="font-semibold text-center">Quizzy</h1> */}
        <img src='/logo.png' width={"50%"} />
      </Link>
      <nav className="mt-10 flex flex-col gap-3 flex-grow">
        <SidebarItem to="/">
          <Home /> Dashboard
        </SidebarItem>
        <SidebarItem to={authenticatedUser.role == "student" ? "/card/contents": "/courses"}>
          <BookOpen /> Courses
        </SidebarItem>
        {authenticatedUser.role === 'admin' ? (
          <SidebarItem to="/users">
            <Users /> Users
          </SidebarItem>
        ) : null}
        {authenticatedUser.role === 'admin' ? (
          <SidebarItem to="/QuizzesTeacher">
            <PenTool /> Quizes
          </SidebarItem>
        ) : null}
      </nav>
      <button
        className="text-red-500 rounded-md p-3 transition-colors flex gap-3 justify-center items-center font-semibold focus:outline-none"
        onClick={handleLogout}
      >
        <LogOut /> Logout
      </button>
    </div>
  );
}
