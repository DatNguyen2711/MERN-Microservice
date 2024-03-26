import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useState, useEffect } from "react";
interface Product {
  image: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

function ProductInfo() {
const [inputValue, setInputValue] = useState<Product | null>(null);
  const productID = localStorage.getItem("productID");
  const apiUrl = process.env.API_URL_PRODUCT;
  const apiUrlCart = process.env.API_URL_CART;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/products/${productID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setInputValue(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmithandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Add to cart");
      fetch(`${apiUrlCart}/cart/${productID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Added to cart");
            alert("Added to cart");
          } else {
            console.log("Failed to add to cart");
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Fragment>
      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile ">
                    <div className="row">
                      <div className="col-lg-4">
                        <img
                          src={(inputValue && inputValue.image) || ""}
                          alt=""
                        />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <h4>{inputValue?.name}</h4>{" "}
                          {/* Sử dụng optional chaining */}
                          <p>{inputValue?.description}</p>{" "}
                          {/* Sử dụng optional chaining */}
                          <div className="main-button">
                            <button
                              className="searchButton"
                              type="button"
                              onClick={onSubmithandler}
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Game Category <span>{inputValue?.category}</span>{" "}
                            {/* Sử dụng optional chaining */}
                          </li>
                          <li>
                            Price <span>{inputValue?.price}</span>{" "}
                            {/* Sử dụng optional chaining */}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductInfo;
