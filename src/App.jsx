import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/app_components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="px-5 py-5">
        <Outlet />
      </div>
    </>
  );
}

export default App;
