import Seo from '@/components/seo';
import { NextPage } from 'next';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import axios, { formToJSON } from 'axios';
import { HOST } from '@/services/utils/config';
import { toast } from 'react-hot-toast';
import Loading from '@/components/ui-kits/loading-notify/loading';
import ProductList from '@/components/ui-kits/product-card/product-list';

const vs = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    subcategory: Yup.string().required('Subcategory is required'),
    brand: Yup.string().required('Brand is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').min(1, 'Price must be a positive number'),
});

const Dashboard: NextPage = ({ products }: any) => {
    const [featuredImage, setFeaturedImage] = React.useState(null);
    const [data, setData] = useState(products);
    const [images, setImages] = React.useState<File[]>([]);
    const [loading, setLoading] = React.useState(false);
    const initialValues = {
        brand: '',
        price: 0,
        category: '',
        subcategory: '',
        description: '',
        featuredImage: null,
        images: [],
    };

    const handleSubmit = async (e: any, { resetForm }: any) => {
        if (featuredImage) {
            setLoading(true);
            try {
                const fm = await imgUploader(featuredImage, 'featuredImage');
                if (fm) {
                    toast.success('Featured image uploaded successfully!');
                    let new1 = { ...e, featuredImage: fm };
                    if (images && images.length > 0) {
                        for (let i = 0; i < images.length; i++) {
                            const img = await imgUploader(images[i], `featuredImage`);

                            if (img) {
                                toast.success(`Image ${i + 1} uploaded successfully!`);
                                new1 = { ...new1, images: [...(new1.images || []), img] };
                            }
                        }
                    }
                    if (new1) {
                        const response = await axios.post(`${HOST}/product`, new1);
                        if (response?.data) {
                            resetForm();
                            setLoading(false);
                            toast.success("Product Create Success!");
                            setData([...data, response?.data])
                        }
                    }
                }
            } catch (error: any) {
                console.error('Error uploading file:', error.message);
                toast.error('Error uploading file!');
            }
        } else {
            toast.error("Please Select an Feature Image!")
        }
    }

    const handleDel = async (id: any) => {
        try {
            const response = await axios.delete(`${HOST}/product/${id}`);
            if (response.data) {
                toast.success('Product Delete Success!');
                const newData = data?.filter((d: any) => d.id !== id);
                setData(newData);
            }
        } catch (error) {
            console.error(error);
        }
    }
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [singleData, setSingleData] = useState<any>({});
    const [featuredImageUp, setFeaturedImageUp] = React.useState(null);
    const [imagesUp, setImagesUp] = React.useState<File[]>([]);

    const handleEdit = async (id: any) => {
        const sd = data.find((d: any) => d.id === id);
        setSingleData(sd);
        setShow(true);
    }

    const handleUpdate = async (e: any, { resetForm }: any) => {
        let updatedProduct: any = e;
        setLoading(true);
        if (featuredImageUp) {
            try {
                const fm = await imgUploader(featuredImageUp, 'featuredImage');
                if (fm) {
                    updatedProduct.featuredImage = fm;
                    toast.success('Featured image uploaded successfully!');
                }
            } catch (error: any) {
                console.error('Error uploading file:', error.message);
                toast.error('Error uploading file!');
            }
        }

        if (imagesUp && imagesUp.length > 0) {
            for (let i = 0; i < imagesUp.length; i++) {
                const img = await imgUploader(imagesUp[i], `featuredImage`);

                if (img) {
                    toast.success(`Image ${i + 1} uploaded successfully!`);
                    updatedProduct.images = [...(updatedProduct.images || []), img];
                }
            }
        }

        // Only include properties that have been changed
        const updatedFields = Object.keys(updatedProduct);
        const fieldsToUpdate: { [key: string]: any } = {};
        updatedFields.forEach((key) => {
            fieldsToUpdate[key] = updatedProduct[key];
        });

        if (Object.keys(fieldsToUpdate).length > 0) {
            try {
                const response = await axios.patch(`${HOST}/product/${singleData?.id}`, fieldsToUpdate);
                if (response?.data) {
                    resetForm();
                    setLoading(false);
                    toast.success("Product update successful!");
                    setShow(false);
                    // Update the product in the local state
                    const res = await axios.get(`${HOST}/product`);
                    const data = await res.data;
                    setData(data);
                }
            } catch (error: any) {
                console.error('Error updating product:', error.message);
                toast.error('Error updating product!');
            }
        }
        setLoading(false);
    };

    const imgUploader = async (file: any, name: any) => {
        try {
            const formData = new FormData();
            formData.append(name, file);

            const response = await axios.post(`${HOST}/upload`, formData);
            return response?.data?.url;

        } catch (error: any) {
            console.error('Error uploading file:', error.message);
        }
    };

    return (
        <div className='container'>
            {loading && <Loading />}
            <Seo title="Home -" description="Home page" />
            <div className='py-3'>
                <h3>Create Product:</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={vs}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} id="create_product">
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Brand"
                                            name="brand"
                                            value={values.brand}
                                            onChange={handleChange}
                                            isInvalid={!!errors.brand}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.brand}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <Form.Group controlId="">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter price"
                                            name="price"
                                            value={values.price}
                                            onChange={handleChange}
                                            isInvalid={!!errors.price}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.price}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <Form.Group controlId="">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter category"
                                            name="category"
                                            value={values.category}
                                            onChange={handleChange}
                                            isInvalid={!!errors.category}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.category}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <Form.Group controlId="">
                                        <Form.Label>Sub category</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter sub category"
                                            name="subcategory"
                                            value={values.subcategory}
                                            onChange={handleChange}
                                            isInvalid={!!errors.subcategory}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.subcategory}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <Form.Group controlId="">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            type="text"
                                            placeholder="Enter description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            isInvalid={!!errors.description}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <Form.Group controlId="formFeaturedImage">
                                        <Form.Label>Featured Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            name="featuredImage"
                                            onChange={(event) => {
                                                const file: any = (event.target as HTMLInputElement)?.files?.[0];
                                                setFeaturedImage(file);
                                            }}
                                            isInvalid={!!errors.featuredImage}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.featuredImage}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <Form.Label>
                                        Image Added ({images?.length})
                                        <span onClick={() => setImages([])} className='px-3 py-0 bg-danger text-light rounded ms-3'>clear</span>
                                    </Form.Label>
                                    <Form.Group controlId="formImage">
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            name="images"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const file: File | null = event.target.files?.[0] || null;
                                                if (file) {
                                                    setImages([...images, file]);
                                                }
                                            }}
                                            isInvalid={!!errors.images}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.images}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className='col-md-12'>
                                    <Button variant="primary" className='w-100 text-light fs-5' type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='py-3'>
                <h3>Product List:</h3>
                <div className="row">
                    {data?.map((d: any, i: number) =>
                        <div className='col-md-6 col-lg-4 col-xl-3 mb-3' key={`${i}-${d?.id}`}>
                            <ProductList id={d?.id} featuredImage={d?.featuredImage} brand={d?.brand} price={d?.price} subcategory={d?.subcategory} category={d?.category} handleDel={handleDel} handleEdit={handleEdit} />
                        </div>
                    )}
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Update Product - {singleData?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={singleData}
                        validationSchema={vs}
                        onSubmit={handleUpdate}
                    >
                        {({ handleSubmit, handleChange, values, errors }) => (
                            <Form noValidate onSubmit={handleSubmit} id="">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Brand</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Brand"
                                                name="brand"
                                                value={values.brand}
                                                onChange={handleChange}
                                                isInvalid={!!errors.brand}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Form.Group controlId="">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter price"
                                                name="price"
                                                value={values.price}
                                                onChange={handleChange}
                                                isInvalid={!!errors.price}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Form.Group controlId="">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter category"
                                                name="category"
                                                value={values.category}
                                                onChange={handleChange}
                                                isInvalid={!!errors.category}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Form.Group controlId="">
                                            <Form.Label>Sub category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter sub category"
                                                name="subcategory"
                                                value={values.subcategory}
                                                onChange={handleChange}
                                                isInvalid={!!errors.subcategory}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <Form.Group controlId="">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                type="text"
                                                placeholder="Enter description"
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                isInvalid={!!errors.description}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Form.Group controlId="formFeaturedImage">
                                            <Form.Label>Featured Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                name="featuredImage"
                                                onChange={(event) => {
                                                    const file: any = (event.target as HTMLInputElement)?.files?.[0];
                                                    setFeaturedImageUp(file);
                                                }}
                                                isInvalid={!!errors.featuredImage}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Form.Label>
                                            Image Added ({images?.length})
                                            <span onClick={() => setImagesUp([])} className='px-3 py-0 bg-danger text-light rounded ms-3'>clear</span>
                                        </Form.Label>
                                        <Form.Group controlId="formImage">
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                name="images"
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    const file: File | null = event.target.files?.[0] || null;
                                                    if (file) {
                                                        setImagesUp([...images, file]);
                                                    }
                                                }}
                                                isInvalid={!!errors.images}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-12'>
                                        <Button variant="primary" className='w-100 text-light fs-5' type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export async function getServerSideProps() {
    const res = await axios.get(`${HOST}/product`);
    const data = await res.data;

    return {
        props: {
            products: data,
        },
    };
}

export default Dashboard;