import React, { useState, useEffect } from "react";
import { db, storage } from "Firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import "./AddProducts.css";

export const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [productVideo, setProductVideo] = useState(null);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); // Active tab: "list" or "add"
  const openEditTab = (product) => {
    setSelectedProduct(product);
    setProductName(product.productName);
    setProductPrice(product.productPrice);

    // Verifica se o produto possui uma imagem ou um vídeo
    if (product.productImg) {
      setProductImg({ name: product.productImg }); // Define a imagem
      setProductVideo(null); // Reseta o vídeo
    } else if (product.productVideo) {
      setProductVideo({ name: product.productVideo }); // Define o vídeo
      setProductImg(null); // Reseta a imagem
    } else {
      setProductImg(null); // Reseta a imagem
      setProductVideo(null); // Reseta o vídeo
    }

    setActiveTab("add"); // Mudando para a aba "Adicionar Produto"
  };

  const types = ["image/png", "image/jpeg", "video/mp4", "video/mpeg"];

  useEffect(() => {
    const fetchProducts = async () => {
      const productsSnapshot = await getDocs(collection(db, "Products"));
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const productFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image" && types.includes(file.type)) {
        setProductImg(file);
        setProductVideo(null);
        setError("");
      } else if (fileType === "video" && file.type.includes("video")) {
        setProductVideo(file);
        setProductImg(null);
        setError("");
      } else {
        setError("Por favor, selecione um tipo de arquivo válido (imagem ou vídeo)");
      }
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if ((!productImg && !productVideo) || (productImg && productVideo)) {
      setError("Por favor, selecione apenas uma imagem ou um vídeo para o produto");
      return;
    }

    try {
      let url = "";
      if (productImg) {
        const imgRef = ref(storage, `product-images/${productImg.name}`);
        await uploadBytes(imgRef, productImg);
        url = await getDownloadURL(imgRef);
      } else if (productVideo) {
        const videoRef = ref(storage, `product-videos/${productVideo.name}`);
        await uploadBytes(videoRef, productVideo);
        url = await getDownloadURL(videoRef);
      }

      await addDoc(collection(db, "Products"), {
        productName: productName,
        productPrice: productPrice,
        productImg: productImg ? url : null,
        productVideo: productVideo ? url : null,
      });

      // Atualize o estado 'products' com a nova lista de produtos
      const productsSnapshot = await getDocs(collection(db, "Products"));
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);

      setProductName("");
      setProductPrice("");
      setProductImg(null);
      setProductVideo(null);
      setError("");
      document.getElementById("file").value = "";
      alert("Curso Adicionado com Sucesso!");
    } catch (err) {
      setError(err.message);
    }
  };

  const updateProduct = async (productId) => {
    try {
      let updatedFields = {
        productName: productName,
        productPrice: Number(productPrice),
      };

      // Verifica se há uma imagem ou vídeo associado ao produto selecionado
      if (selectedProduct.productImg) {
        updatedFields = {
          ...updatedFields,
          productImg: selectedProduct.productImg,
        };
      }

      if (selectedProduct.productVideo) {
        updatedFields = {
          ...updatedFields,
          productVideo: selectedProduct.productVideo,
        };
      }

      await updateDoc(doc(db, "Products", productId), updatedFields);
      alert("Produto atualizado com sucesso!");
      setSelectedProduct(null);
    } catch (err) {
      alert("Erro ao atualizar o produto:", err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "Products", productId));
      alert("Produto excluído com sucesso!");
      setSelectedProduct(null);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (err) {
      alert("Erro ao excluir o produto:", err);
    }
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setProductName(product.productName);
    setProductPrice(product.productPrice);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <div className="tabs">
        <button className={activeTab === "list" ? "active" : ""} onClick={() => switchTab("list")}>
          Listar Produtos
        </button>
        <button className={activeTab === "add" ? "active" : ""} onClick={() => switchTab("add")}>
          Adicionar Produto
        </button>
      </div>
      {activeTab === "list" ? (
        <div className="product-list">
          <h2>Lista de Produtos</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <span onClick={() => selectProduct(product)}>{product.productName}</span>
                <button onClick={() => deleteProduct(product.id)}>Excluir</button>
                <button onClick={() => openEditTab(product)}>Editar</button> {/* Modificado aqui */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="form-container">
          <h2 className="form-heading">
            {selectedProduct ? "Atualizar Produto" : "Adicionar Produto"}
          </h2>
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={selectedProduct ? updateProduct : addProduct}
          >
            <div className="form-group">
              <label htmlFor="product-name">Nome do Curso</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product-price">Descrição do Curso</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product-file">Vídeo do Curso</label>
              <br />
              <input
                type="file"
                className="form-control"
                id="file"
                required
                onChange={productFileHandler}
              />
            </div>
            <button type="submit" className="btn btn-success btn-md mybtn">
              {selectedProduct ? "Atualizar" : "Adicionar"}
            </button>
            {error && <span className="error-msg">{error}</span>}
          </form>
          {selectedProduct && (
            <button className="btn btn-danger" onClick={deleteProduct}>
              Excluir Produto
            </button>
          )}
        </div>
      )}
    </div>
  );
};
