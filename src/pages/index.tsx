import Seo from '@/components/seo';
import ProductCard from '@/components/ui-kits/product-card/product-card';
import { HOST } from '@/services/utils/config';
import axios from 'axios';
import { NextPage } from 'next';
import React from 'react';

const Home: NextPage = ({ products }: any) => {
  return (
    <div>
      <Seo title="Home -" description="Home page" />
      <div className='container my-2'>
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className={`py-3 text-danger`}>
              <h2>Popular Products</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {products?.map((d: any, i: number) =>
            <div className='col-md-6 col-lg-4 col-xl-3 mb-3' key={`${i}-${d?.id}`}>
              <ProductCard id={d?.id} featuredImage={d?.featuredImage} brand={d?.brand} price={d?.price} subcategory={d?.subcategory} category={d?.category} />
            </div>
          )}
        </div>
      </div>
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

export default Home;