/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import HOC from "../layout/HOC";
import { Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";

const Product = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState("");
  const [categoryData, setCatedogryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:1112/api/product"
      );
      setData(data.data);
      setDataCount(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:1112/api/category"
      );
      setCatedogryData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:1112/api/subcategory/"
      );
      setSubCategoryData(data.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    if (modalShow === true) {
      fetchCategory();
      fetchSubCategory();
    }
  }, [modalShow]);

  function MyVerticallyCenteredModal(props) {
    const [Image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [features, setFeatures] = useState("");
    const [amount, setAmoutn] = useState("");
    const [category, setCategory] = useState("");
    const [subCat, setSubCat] = useState("");
    const [stock, setStock] = useState("");
    const [commision, setCommision] = useState("");
    const [commisionSir, setCommisionSir] = useState("");

    const commissionFull = commisionSir + commision;

    const postHandler = async (e) => {
      e.preventDefault();
      let fd = new FormData();
      Array.from(Image).forEach((img) => {
        fd.append("myField", img);
      });
      fd.append("productName", title);
      fd.append("descrption", desc);
      fd.append("features", features);
      fd.append("price", amount);
      fd.append("category_id", category);
      fd.append("subCategory", subCat);
      fd.append("stock", stock);

      try {
        const { data } = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:1112/api/product",
          fd
        );
        console.log(data);
        toast.success("Product Added");
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();

      const fd = new FormData();
      fd.append("commision", commissionFull);

      try {
        const { data } = await axios.put(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:1112/api/product/${id}`,
          fd
        );
        console.log(data);
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            {edit ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Commission</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    onChange={(e) => setCommision(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setCommisionSir(e.target.value)}
                  >
                    <option>Commission in</option>
                    <option value="Falt% ">Falt%</option>
                    <option value="Rupees ">Rupees ₹</option>
                  </Form.Select>
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setImage(e.target.files)}
                    multiple
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Features</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setFeatures(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    onChange={(e) => setAmoutn(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select Category</option>
                    {categoryData?.map((i, index) => (
                      <option value={i._id} key={index}>
                        {i.category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setSubCat(e.target.value)}
                  >
                    <option>Select Sub-Category</option>
                    {subCategoryData?.map((i, index) => (
                      <option value={i._id} key={index}>
                        {i.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            )}

            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:1112/api/product/${id}`
      );
      console.log(data);
      toast.success("Product Deleted");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const statusHandler = async (id) => {
    try {
      const { data } = await axios.post(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:1112/api/product/status/${id}`
      );
      console.log(data);
      alert("Status Changed");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Products (Total : {dataCount})
          </span>
          <Button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            variant="outline-success"
          >
            Add Product
          </Button>
        </div>

        <div style={{ maxWidth: "900px" , overflow : 'scroll' , maxHeight : '500px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Sno. </th>
                <th> Image </th>
                <th> Title</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Stock</th>
                <th>Features</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Seller</th>
                <th>Commission</th>
                <th>Color and Image</th>
                <th>Size and Image</th>
                <th>Approve/Disapprove</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{index + 1} </td>
                  <td>
                    <Carousel
                      showStatus={false}
                      showThumbs={false}
                      showIndicators={false}
                      dynamicHeight={false}
                      stopOnHover={true}
                      swipeable={true}
                      emulateTouch={true}
                      interval={1000}
                      infiniteLoop={true}
                      autoPlay={true}
                      className="Car"
                    >
                      {i.productImg?.map((img) => (
                        <img
                          src={img.url}
                          key={img._id}
                          alt={i.productName}
                          className="carouselImages"
                        />
                      ))}
                    </Carousel>
                  </td>
                  <td>{i.productName}</td>
                  <td>{i.descrption}</td>
                  <td>₹{i.price}</td>
                  <td> {i.stock} </td>
                  <td>
                    <ul>
                      {i.features?.map((i, index) => (
                        <li key={index}> {i} </li>
                      ))}
                    </ul>
                  </td>
                  <td>{i.category_id?.category}</td>
                  <td>{i.subCategory?.title}</td>
                  <td> {i.sellerId?.name} </td>
                  <td>
                    {" "}
                    {i?.commision ? i.commision : i.category_id?.commision}{" "}
                  </td>

                  <td>
                    <Carousel
                      showStatus={false}
                      showThumbs={false}
                      showIndicators={false}
                      dynamicHeight={false}
                      stopOnHover={true}
                      swipeable={true}
                      emulateTouch={true}
                      interval={1000}
                      infiniteLoop={true}
                      autoPlay={true}
                      className="Car"
                    >
                      <div>
                        <img
                          src="https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lvse-inside-out-t-shirt-ready-to-wear--HIY47WJYN686_PM2_Front%20view.jpg"
                          alt="img"
                          className="ColorImage"
                        />
                        <p>Blue</p>
                      </div>
                      <div>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJuAAZuOuxHgRwSClRMfgfZqSEOgFhe8z4w&usqp=CAU"
                          alt="img"
                          className="ColorImage"
                        />
                        <p>Black</p>
                      </div>
                    </Carousel>
                  </td>
                  <td>
                    <Carousel
                      showStatus={false}
                      showThumbs={false}
                      showIndicators={false}
                      dynamicHeight={false}
                      stopOnHover={true}
                      swipeable={true}
                      emulateTouch={true}
                      interval={2000}
                      infiniteLoop={true}
                      autoPlay={true}
                      className="Car"
                    >
                      <div>
                        <img
                          src="https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lvse-inside-out-t-shirt-ready-to-wear--HIY47WJYN686_PM2_Front%20view.jpg"
                          alt="img"
                          className="ColorImage"
                        />
                        <p>L</p>
                      </div>
                      <div>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJuAAZuOuxHgRwSClRMfgfZqSEOgFhe8z4w&usqp=CAU"
                          alt="img"
                          className="ColorImage"
                        />
                        <p>XLL</p>
                      </div>
                    </Carousel>
                  </td>

                  <td>
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        statusHandler(i._id);
                      }}
                    >
                      {i.status === "true" ? "DisApprove" : "Approve"}
                    </Button>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteHandler(i._id)}
                      ></i>

                      <i
                        className="fa-solid fa-edit"
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          setEdit(true);
                          setId(i._id);
                          setModalShow(true);
                        }}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Product);
