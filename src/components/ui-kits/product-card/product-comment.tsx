import React from 'react';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

const vs = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    comment: Yup.string().required('Comment is required!'),
    email: Yup.string().email('Invalid email').required('Email is required!'),

});

const ProductComment = ({ handleSubmit }: any) => {

    return (
        <div>
            <h3 className='text-center'>Give Us A Feedback!</h3>
            <Formik
                initialValues={{ name: '', email: '', comment: '' }}
                validationSchema={vs}
                onSubmit={(values: any) => {
                    handleSubmit(values);
                }}
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-md-12 mb-3">
                                <Form.Group controlId="formComment">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter comment"
                                        name="comment"
                                        value={values.comment}
                                        onChange={handleChange}
                                        isInvalid={!!errors.comment}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.comment}
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
    );
};

export default ProductComment;