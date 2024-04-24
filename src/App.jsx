import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <div className="px-5">
        <Outlet />
      </div>
    </>
  );
}

export default App;
