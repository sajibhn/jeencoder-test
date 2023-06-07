import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  Alert,
} from 'reactstrap';
import one from '../../../assets/images/pro3/1.jpg';
import user from '../../../assets/images/user.png';
import MDEditor from '@uiw/react-md-editor';

const Add_product = () => {
  const [productImages, setProductImages] = useState([]);
  const [dummyimgs, setDummyimgs] = useState([{ img: user }]);
  const [productName, setProductName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [quantity, setQuantity] = useState();
  const [type, setType] = useState('electronics');
  const [category, setCategory] = useState('Electronics');
  const [isNew, setIsNew] = useState(false);
  const [isForSale, setIsForSale] = useState(false);
  const [ratings, setRatings] = useState({ user: '', rating: '' });
  const [reviews, setReviews] = useState({
    user: '',
    review: '',
    createdAt: new Date(),
  });

  const [variant, setVariant] = useState({
    color: {
      color_name: '',
      color_code: '',
    },
    id: '',
    image_id: '',
    size: {
      size: '',
      stock: '',
    },
    sku: '',
  });

  const [description, setDescription] = useState('');

  const [productUploaded, setProductUploaded] = useState(false);

  //	image upload
  const _handleImgChange = async (e, i) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('file', image);

    try {
      const { data } = await axios.post(
        'http://localhost:9001/api/file/upload',
        formData
      );
      const { image_id, alt, src, id } = data;
      const updatedDummyimgs = [...dummyimgs];
      updatedDummyimgs[i].img = src;
      setDummyimgs(updatedDummyimgs);
      const newImage = { image_id, alt, src, id };
      setProductImages((prevImages) => [...prevImages, newImage]);
      setVariant((prevVariant) => ({
        ...prevVariant,
        id: id,
        image_id: image_id,
      }));
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  // convert to number
  const convertToNumber = (value, fieldName) => {
    if (fieldName === 'user' || fieldName === 'date') {
      return value; // Return the value as is without converting to a number
    }
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? value : parsedValue;
  };

  // handle name
  const handleProductName = (e) => {
    setProductName(e.target.value);
  };

  // handle brand name
  const handleBrandName = (e) => {
    setBrandName(e.target.value);
  };

  // handle price
  const handlePrice = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  // handle discount
  const handleDiscount = (e) => {
    setDiscount(parseFloat(e.target.value));
  };

  // handle type
  const handleType = (e) => {
    setType(e.target.value);
  };

  // handle Quantity
  const handleQuantity = (e) => {
    setQuantity(parseFloat(e.target.value));
  };

  // handle Categoy
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  // handle is new
  const handleIsNew = (e) => {
    const selectedOption = e.target.value;
    const booleanValue = selectedOption === 'true';
    setIsNew(booleanValue);
  };

  // handle is for sale
  const handleIsForSale = (e) => {
    const selectedOption = e.target.value;
    const booleanValue = selectedOption === 'true';
    setIsForSale(booleanValue);
  };

  // handle Ratings
  const handleRatings = (e) => {
    const { name, value } = e.target;
    const newValue = convertToNumber(value, name);
    setRatings((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // handle reviews
  const handleReviews = (e) => {
    const { name, value } = e.target;
    const newValue = convertToNumber(value, name);
    setReviews((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleVariant = (e) => {
    const { name, value } = e.target;
    const newValue = convertToNumber(value);

    if (name.includes('color')) {
      setVariant((prevState) => ({
        ...prevState,
        color: {
          ...prevState.color,
          [name.split('.')[1]]: newValue,
        },
      }));
    } else if (name.includes('size')) {
      setVariant((prevState) => ({
        ...prevState,
        size: {
          ...prevState.size,
          [name.split('.')[1]]: newValue,
        },
      }));
    } else {
      setVariant((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  // handle description
  const handleDescription = (desc) => {
    setDescription(desc);
  };

  const handleValidSubmit = async (e) => {
    e.preventDefault();

    const ratingsArray = [];
    ratingsArray.push(ratings);

    const reviewsArray = [];
    reviewsArray.push(reviews);

    const variantArray = [];
    variantArray.push(variant);

    const product = {
      name: productName,
      brand: brandName,
      description: description,
      price: price,
      discount: discount,
      quantity: quantity,
      type: type,
      category: category,
      new: isNew,
      sale: isForSale,
      images: productImages,
      ratings: ratingsArray,
      reviews: reviewsArray,
      variants: variantArray,
    };

    try {
      const { data } = await axios.post(
        'http://localhost:9001/api/products',
        product
      );
      console.log(data);
      setProductUploaded(true);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <Fragment>
      <Breadcrumb title="Add Product" parent="Physical" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Add Product</h5>
              </CardHeader>
              <CardBody>
                <Row className="product-adding">
                  <Col xl="5">
                    <div className="add-product">
                      <Row>
                        <Col xl="9 xl-50" sm="6 col-9">
                          <img
                            src={productImages[0]?.src || one}
                            alt=""
                            className="img-fluid image_zoom_1 blur-up lazyloaded"
                          />
                        </Col>
                        <Col xl="3 xl-50" sm="6 col-3">
                          <ul className="file-upload-product">
                            {dummyimgs.map((res, i) => {
                              return (
                                <li key={i}>
                                  <div className="box-input-file">
                                    <Input
                                      className="upload"
                                      type="file"
                                      onChange={(e) => _handleImgChange(e, i)}
                                    />
                                    <img
                                      alt=""
                                      src={res.img}
                                      style={{ width: 50, height: 50 }}
                                    />
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xl="7">
                    <Form
                      className="needs-validation add-product-form"
                      onSubmit={handleValidSubmit}
                    >
                      <div className="form form-label-center">
                        <FormGroup className="form-group mb-3 row">
                          <Label
                            className="col-xl-3 col-sm-4 mb-0"
                            for="product_name"
                          >
                            Product Name :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_name"
                              id="product_name"
                              type="text"
                              value={productName}
                              onChange={handleProductName}
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label
                            className="col-xl-3 col-sm-4 mb-0"
                            for="brand_name"
                          >
                            Brand Name :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="brand_name"
                              id="brand_name"
                              type="text"
                              value={brandName}
                              onChange={handleBrandName}
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0" for="price">
                            Price :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control mb-0"
                              name="price"
                              id="price"
                              type="number"
                              value={price}
                              onChange={handlePrice}
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label
                            className="col-xl-3 col-sm-4 mb-0"
                            for="discount"
                          >
                            Discount :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control "
                              name="discount"
                              id="discount"
                              type="number"
                              value={discount}
                              onChange={handleDiscount}
                              required
                            />
                          </div>
                          <div className="invalid-feedback offset-sm-4 offset-xl-3">
                            Please choose Valid Code.
                          </div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label
                            className="col-xl-3 col-sm-4 mb-0"
                            for="quantity"
                          >
                            Quantity :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control "
                              name="quantity"
                              id="quantity"
                              type="number"
                              value={quantity}
                              onChange={handleQuantity}
                              required
                            />
                          </div>
                          <div className="invalid-feedback offset-sm-4 offset-xl-3">
                            Please choose Valid Code.
                          </div>
                        </FormGroup>
                      </div>
                      <div className="form">
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0" for="type">
                            Type :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select
                              className="form-control digits"
                              id="type"
                              value={type}
                              onChange={handleType}
                            >
                              <option value="electronics">electronics</option>
                              <option value="furniture">furniture</option>
                              <option value="jewellery">jewellery</option>
                              <option value="fashion">fashion</option>
                              <option value="beauty">beauty</option>
                              <option value="tools">tools</option>
                              <option value="shoes">shoes</option>
                              <option value="bags">bags</option>
                              <option value="kids">kids</option>
                              <option value="eyeware">eyeware</option>
                              <option value="light">light</option>
                              <option value="all">all</option>
                            </select>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label
                            className="col-xl-3 col-sm-4 mb-0"
                            for="category"
                          >
                            Category :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select
                              className="form-control digits"
                              id="category"
                              value={category}
                              onChange={handleCategory}
                            >
                              <option value="Electronics">Electronics</option>
                              <option value="Clothing">Clothing</option>
                              <option value="Home">Home</option>
                              <option value="Beauty">Beauty</option>
                              <option value="Books">Books</option>
                            </select>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0" for="new">
                            New :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select
                              className="form-control digits"
                              id="new"
                              value={isNew}
                              onChange={handleIsNew}
                            >
                              <option value="false">False</option>
                              <option value="true">True</option>
                            </select>
                          </div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0" for="sale">
                            Sale :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select
                              className="form-control digits"
                              id="sale"
                              value={isForSale}
                              onChange={handleIsForSale}
                            >
                              <option value="false">False</option>
                              <option value="true">True</option>
                            </select>
                          </div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label
                            className="col-xl-3 col-sm-4 mb-0"
                            for="rating-user-id"
                          >
                            Ratings :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <div className="row">
                              <div className="col-xl-6 col-sm-6">
                                <Input
                                  className="form-control"
                                  name="user"
                                  id="rating-user-id"
                                  type="text"
                                  placeholder="user id"
                                  value={ratings.user}
                                  onChange={handleRatings}
                                  required
                                />
                              </div>
                              <div className="col-xl-6 col-sm-6">
                                <Input
                                  className="form-control mb-0"
                                  name="rating"
                                  id="rating"
                                  type="number"
                                  placeholder="rating"
                                  value={ratings.rating}
                                  onChange={handleRatings}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label
                            className="col-xl-3 col-sm-4 mb-0"
                            for="reviews-user-id"
                          >
                            Reviews :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <div className="row">
                              <div className="col-xl-6 col-sm-6">
                                <Input
                                  className="form-control"
                                  name="user"
                                  id="reviews-user-id"
                                  type="text"
                                  placeholder="user id"
                                  value={reviews.user}
                                  onChange={handleReviews}
                                  required
                                />
                              </div>
                              <div className="col-xl-6 col-sm-6">
                                <Input
                                  className="form-control mb-0"
                                  name="review"
                                  id="review"
                                  type="text"
                                  placeholder="review"
                                  value={reviews.review}
                                  onChange={handleReviews}
                                  required
                                />
                              </div>
                              <div className="col-xl-12 mt-3">
                                <Input
                                  className="form-control mb-0"
                                  name="date"
                                  id="date"
                                  type="date"
                                  value={reviews.date}
                                  onChange={handleReviews}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row ">
                          <Label
                            className="col-xl-3 col-sm-4 mb-0"
                            for="color-name"
                          >
                            Variants :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <div className="row">
                              <div className="col-xl-6 col-sm-6 mb-3">
                                <Input
                                  className="form-control"
                                  name="color.color_name"
                                  type="text"
                                  value={variant.color.color_name}
                                  onChange={handleVariant}
                                  placeholder="color name"
                                  required
                                />
                              </div>
                              <div className="col-xl-6 col-sm-6 mb-3">
                                <Input
                                  className="form-control mb-0"
                                  name="color.color_code"
                                  id="color-code"
                                  type="text"
                                  placeholder="color code"
                                  value={variant.color.color_code}
                                  onChange={handleVariant}
                                  required
                                />
                              </div>

                              <div className="col-xl-6 col-sm-6 mb-3">
                                <Input
                                  className="form-control"
                                  name="size.size"
                                  id="size"
                                  type="number"
                                  placeholder="size"
                                  value={variant.size.size}
                                  onChange={handleVariant}
                                  required
                                />
                              </div>
                              <div className="col-xl-6 col-sm-6 mb-3">
                                <Input
                                  className="form-control mb-0"
                                  name="size.stock"
                                  id="stock"
                                  type="number"
                                  placeholder="stock"
                                  value={variant.size.stock}
                                  onChange={handleVariant}
                                  required
                                />
                              </div>
                              <div className="col-xl-12 col-sm-12 mb-3">
                                <Input
                                  className="form-control mb-0"
                                  type="text"
                                  name="sku"
                                  value={variant.sku}
                                  onChange={handleVariant}
                                  placeholder="sku"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4">
                            Add Description :
                          </Label>
                          <div className="col-xl-8 col-sm-7 description-sm">
                            <MDEditor
                              value={description}
                              onChange={handleDescription}
                            />
                          </div>
                        </FormGroup>
                      </div>
                      <div className="offset-xl-3 offset-sm-4">
                        <Button type="submit" color="primary">
                          Add
                        </Button>
                        <Button type="button" color="light">
                          Discard
                        </Button>
                      </div>

                      {productUploaded && (
                        <Alert color="success mt-3">
                          This is a success alert — check it out!
                        </Alert>
                      )}
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Add_product;
