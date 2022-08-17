import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import AllPets from './components/AllPets';
import PetCreate from "./components/PetCreate";
import PetDetails from './components/PetDetails';
import PetUpdate from './components/PetUpdate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AllPets/>} path="/" />
          <Route element={<PetCreate/>} path="/new" />
          <Route element={<PetDetails/>} path="/:id" />
          <Route element={<PetUpdate/>} path="/:id/edit" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
