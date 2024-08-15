import { AddProducts } from "components/AddProducts";
import "./Admin.css";
import Aluno from "pages/LandingPages/Aluno";

const Admin = () => {
  return (
    <div className="main-container">
      <Aluno />
      <div className="gallery-container">
        <AddProducts />
      </div>
    </div>
  );
};

export default Admin;
