import Aluno from "pages/LandingPages/Aluno";
import "./Main.css";
import { ProductGallery } from "components/ProductGallery";

const Main = () => {
  return (
    <div className="main-container">
      <Aluno />
      <div className="gallery-container">
        <ProductGallery />
      </div>
    </div>
  );
};

export default Main;
