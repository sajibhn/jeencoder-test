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
} from 'reactstrap';
import one from '../../../assets/images/pro3/1.jpg';
import user from '../../../assets/images/user.png';
import MDEditor from '@uiw/react-md-editor';

const Add_product = () => {
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [productImages, setProductImages] = useState([]);
  const [dummyimgs, setDummyimgs] = useState([{ img: user }]);

  const onChange = (e) => {
    setValue(e);
  };

  const IncrementItem = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1);
    } else {
      return null;
    }
  };
  const DecreaseItem = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      return null;
    }
  };
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

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
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleValidSubmit = () => {};
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
                            <select className="form-control digits" id="type">
                              <option>electronics</option>
                              <option>furniture</option>
                              <option>jewellery</option>
                              <option>fashion</option>
                              <option>beauty</option>
                              <option>tools</option>
                              <option>shoes</option>
                              <option>bags</option>
                              <option>kids</option>
                              <option>eyeware</option>
                              <option>light</option>
                              <option>all</option>
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
                            >
                              <option>Electronics</option>
                              <option>Clothing</option>
                              <option>Home</option>
                              <option>Beauty</option>
                              <option>Books</option>
                            </select>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0" for="new">
                            New :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select className="form-control digits" id="new">
                              <option>False</option>
                              <option>True</option>
                            </select>
                          </div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0" for="sale">
                            Sale :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <select className="form-control digits" id="sale">
                              <option>False</option>
                              <option>True</option>
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
                                  name="rating-user-id"
                                  id="rating-user-id"
                                  type="text"
                                  placeholder="user id"
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
                                  name="reviews-user-id"
                                  id="reviews-user-id"
                                  type="text"
                                  placeholder="user id"
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
                                  required
                                />
                              </div>
                              <div className="col-xl-12 mt-3">
                                <Input
                                  className="form-control mb-0"
                                  name="date"
                                  id="date"
                                  type="date"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row ">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Variants :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <div className="row">
                              <div className="col-xl-6 col-sm-6 mb-3">
                                <Input
                                  className="form-control"
                                  name="color-name"
                                  id="color-name"
                                  type="text"
                                  placeholder="color name"
                                  required
                                />
                              </div>
                              <div className="col-xl-6 col-sm-6 mb-3">
                                <Input
                                  className="form-control mb-0"
                                  name="color-code"
                                  id="color-code"
                                  type="number"
                                  placeholder="color code"
                                  required
                                />
                              </div>

                              <div className="col-xl-6 col-sm-6 mb-3">
                                <Input
                                  className="form-control"
                                  name="size"
                                  id="size"
                                  type="number"
                                  placeholder="size"
                                  required
                                />
                              </div>
                              <div className="col-xl-6 col-sm-6 mb-3">
                                <Input
                                  className="form-control mb-0"
                                  name="stock"
                                  id="stock"
                                  type="number"
                                  placeholder="stock"
                                  required
                                />
                              </div>
                              <div className="col-xl-12 col-sm-12 mb-3">
                                <Input
                                  className="form-control mb-0"
                                  name="sku"
                                  id="sku"
                                  type="text"
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
                            <MDEditor value={value} onChange={onChange} />
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
