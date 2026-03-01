import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useEffect } from 'react';

const PrivateRoute = ({children}) => {
    const { currentUser, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(()=> {
      if(!loading && !currentUser){
      navigate('/', {replace: true});
   }
   },[currentUser, loading, navigate]);
  if (loading) {
    return <div>Loading...</div>; 
  }
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  if (loading) return <div> Loading...</div>;

  return currentUser ? children : null;

};

export default PrivateRoute;