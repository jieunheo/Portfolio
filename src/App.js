import { Route, Routes, BrowserRouter } from 'react-router-dom';

import NewStar from './components/outstar/NewStar';
import Header from './components/UI/Header';
import OutstarFriend from './components/outstar/OutstarFriend';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<OutstarFriend/>} />
            <Route path='/new-star' element={<NewStar />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
