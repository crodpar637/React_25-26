import { Outlet } from "react-router";
import Menu from "../components/Menu";


function Home() {
  return (
    <>
      <Menu />
      <Outlet/>
      <h3>Esto es el footer</h3>
    </>
  );
}

export default Home;
