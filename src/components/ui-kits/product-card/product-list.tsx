import Link from 'next/link';
import React from 'react';
import style from './product-card.module.scss';

interface Props {
    id: number;
    featuredImage?: string;
    brand?: string;
    price?: number;
    subcategory?: string;
    category?: string;
    handleDel?: any;
    handleEdit?: any;
}
const ProductList: React.FC<Props> = ({ id, featuredImage, brand, price, category, subcategory, handleDel, handleEdit }) => {
    return (
        <section className={`${style.section_products} h-100`}>
            <div className="border d-flex flex-column justify-content-between h-100 p-2 mb-3 rounded">
                <div id={`${style.product_1}`} className={`${style.single_product}`}>
                    <div className={`${style.img_parent} rounded`}>
                        <img className='w-100 ' src={featuredImage && featuredImage !== 'string' ? featuredImage : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} alt="" />
                    </div>
                    <div className={`${style.overlay} mt-2`}>
                        <h4 className={`bg-light ${style.product_price}`}>${price}</h4>
                        <h4 onClick={() => handleEdit(id)} className={`bg-primary text-light cp ${style.product_edit}`}>Edit</h4>

                        <div className={`${style.category}`}>
                            <span className='text-danger bg-light px-1 mx-1 border rounded small'>{category}</span>
                            <span className='text-danger bg-light px-1 mx-1 border rounded small'>{subcategory}</span>
                        </div>
                        <h5 className={`px-1 pt-2 ${style.product_title}`}>{brand}</h5>

                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <Link href={`/product-details/${id}`} legacyBehavior>
                        <a className='btn bg-light my-1 text-primary border-primary'>Details</a>
                    </Link>
                    <button className='btn my-1 text-light bg-danger border-danger' onClick={() => handleDel(id)}>Delete </button>
                </div>
            </div>
        </section>
    );
};

export default ProductList;