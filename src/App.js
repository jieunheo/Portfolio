import { Route, Routes, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';

import NewStar from './components/outstar/NewStar';
import Header from './components/UI/Header';
import OutstarFriend from './components/outstar/OutstarFriend';
import Login from './components/auth/Login';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, [userId]);

  return (
    <div className="App">
      <BrowserRouter>
        {userId && <Header userId={userId} setUserId={setUserId} />}
        <main>
          {userId
            ? (
              <Routes>
                <Route path='/' element={<OutstarFriend userId={userId}/>} />
                <Route path='/new-star' element={<NewStar userId={userId} />} />
                <Route path='/*' element={<Navigate to='/' />} />
              </Routes>
            ) : (
              <Routes>
                <Route path='/auth' element={<Login userId={userId} setUserId={setUserId} />} />
                <Route path='/*' element={<Navigate to='/auth' />} />
              </Routes>
            )}
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
