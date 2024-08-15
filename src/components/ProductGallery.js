import React, { useState, useEffect } from "react";
import { db, storage } from "Firebase.js"; // Corrigido o caminho do Firebase.js
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import "./ProductGallery.css"; // Importar o arquivo de estilos CSS
import ReactPaginate from "react-paginate";

export const ProductGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, "Products");
        const q = searchTerm
          ? query(productsCollection, where("productName", "==", searchTerm))
          : productsCollection;
        const productsSnapshot = await getDocs(q);
        const productsList = [];
        for (const doc of productsSnapshot.docs) {
          const productData = doc.data();
          const imageUrl = await getImageUrl(productData.productImg);
          const videoUrl = await getVideoUrl(productData.productVideo);
          productsList.push({ ...productData, imageUrl, videoUrl });
        }
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  const getImageUrl = async (imagePath) => {
    if (!imagePath) return null;
    const imageRef = ref(storage, imagePath);
    return await getDownloadURL(imageRef);
  };

  const getVideoUrl = async (videoPath) => {
    if (!videoPath) return null;
    const videoRef = ref(storage, videoPath);
    return await getDownloadURL(videoRef);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const offset = currentPage * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);
  const paginatedProducts = products.slice(offset, offset + productsPerPage);

  return (
    <div className="container">
      <h2 className="gallery-heading">Nossos Cursos</h2>
      <div className="search-bar">
        <input
          className="pesquisa"
          type="text"
          placeholder="Pesquisar por Nome do Produto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="gallery">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          paginatedProducts.map((product, index) => (
            <div key={index} className="gallery-item" onClick={() => handleProductClick(product)}>
              {product.imageUrl && (
                <img src={product.imageUrl} alt={`Produto ${index}`} className="gallery-image" />
              )}
              {product.videoUrl && (
                <video controls className="gallery-video">
                  <source src={product.videoUrl} type="video/mp4" />
                  Seu navegador não suporta vídeos em HTML5.
                </video>
              )}
              <div className="gallery-details">
                <h3>Curso: {product.productName}</h3>
              </div>
            </div>
          ))
        )}
      </div>
      {selectedProduct && (
        <div className="zoomed-product">
          <div className="zoomed-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h1 className="nome">{selectedProduct.productName}</h1>
            {selectedProduct.videoUrl && (
              <div className="video-container">
                <video controls className="gallery-video">
                  <source src={selectedProduct.videoUrl} type="video/mp4" />
                  Seu navegador não suporta vídeos em HTML5.
                </video>
                <p className="price">
                  <h1 className="desc">Descrição:</h1> {selectedProduct.productPrice}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <br />
      {products.length > productsPerPage && (
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};
