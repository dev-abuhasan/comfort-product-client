import React from 'react';
import Seo from '@/components/seo';
import { useRouter } from 'next/router';
import axios from 'axios';
import { HOST } from '@/services/utils/config';
import { Tabs, Tab } from 'react-bootstrap';
import ProductComment from '@/components/ui-kits/product-card/product-comment';
import { toast } from 'react-hot-toast';

interface Product {
    id: number;
    brand: string;
    category: string;
    subcategory: string,
    comments: any[];
    description: string;
    featuredImage: string;
    images: any[];
    price: number;
}

const ProductDetails = () => {
    const [product, setProduct] = React.useState<Product | null>(null);
    const router = useRouter();
    const { id } = router.query;

    React.useEffect(() => {
        const fetchPosts = async () => {
            if (id) {
                try {
                    const res = await axios.get(`${HOST}/product/${id}`);
                    const data = await res.data;
                    setProduct(data);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchPosts();
    }, [id]);
    const handleSubmit = async (e: any) => {
        const pd = { ...e, productId: Number(id) }
        if (pd) {
            try {
                const response = await axios.post(`${HOST}/comment`, pd);
                if (response?.data) {
                    toast.success("Feedback Submitted!");
                    const updatedComments = [...(product?.comments || []), pd];
                    setProduct({ ...(product as Product), comments: updatedComments });
                }
            } catch (error) {
                toast.error("Something went wrong!")
                console.error('Error:', error);
            }
        }
    }
    return (
        <div className='container'>
            <Seo title={`Product -${id} - ${product?.brand} -`} description="Product Details" />
            <div className='row my-3 pt-3'>
                <div className='col-md-5'>
                    <div className='border rounded overflow-hidden'>
                        <img className="w-100" src={product?.featuredImage && product?.featuredImage !== 'string' ? product?.featuredImage : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} alt="" />
                    </div>
                    <div className='pt-2 rounded row'>
                        <div className='col-md-6'>
                            <div style={{ height: '150px' }} className="rounded overflow-hidden">
                                <img className='w-100' src={product?.images[0] && product?.images[0] !== 'string' ? product?.images[0] : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} alt="" />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div style={{ height: '150px' }} className="rounded overflow-hidden">
                                <img className='w-100' src={product?.images[1] && product?.images[1] !== 'string' ? product?.images[1] : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-7'>
                    <div className={`cp`}>
                        <span className='text-danger bg-light px-1 mx-1 border rounded small'>{product?.category}</span>
                        <span className='text-danger bg-light px-1 mx-1 border rounded small'>{product?.subcategory}</span>
                    </div>
                    <h3 className='m-0 pt-3 text-danger'>Price: ${product?.price}</h3>
                    <h1 className='display-4 text-primary mt-3'>{product?.brand}</h1>
                    <p className='fst-italic'>{product?.description}</p>
                    <br /><br />
                    <div>
                        <Tabs
                            defaultActiveKey="profile"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="home" title="Give Feedback!">
                                <ProductComment handleSubmit={(e: any) => handleSubmit(e)} />
                            </Tab>
                            <Tab eventKey="profile" title={`Reviews (${product?.comments?.length})`}>
                                {product?.comments?.map((d: any, i: number) =>
                                    <div key={i} className="bg-light p-3 mb-2 rounded">
                                        <h5 className='text-primary fw-light m-0'>{d?.email}</h5>
                                        <h3 className='text-capitalize'>{d?.name}</h3>
                                        <p className='m-0 fst-italic'>{d?.comment}</p>
                                    </div>
                                )}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;