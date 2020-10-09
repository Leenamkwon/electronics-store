import React, { useContext } from 'react';
import ProductList from './ProductList';
import { ProductContext } from '../../context/products';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const pagination = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { sorted, page, changePage } = useContext(ProductContext);

  if (sorted[page]) {
    return (
      <>
        <ProductList title='원하는 제품을 구경하세요' products={sorted[page]} />
        {sorted.length > 1 && (
          <article className='pagination-buttons'>
            {/* prev */}
            <button className='prev-page-btn'>
              <FaAngleDoubleLeft onClick={() => changePage(page - 1)} />
            </button>
            {sorted.map((_, index) => (
              <button
                onClick={() => changePage(index)}
                key={index}
                className={`page-btn ${page === index && `page-btn-current`}`}
              >
                {index + 1}
              </button>
            ))}
            {/* next */}
            <button className='next-page-btn'>
              <FaAngleDoubleRight onClick={() => changePage(page + 1)} />
            </button>
          </article>
        )}
      </>
    );
  } else {
    return (
      <h3 className='search-errors'>
        unfortunately your search query did not return any products
      </h3>
    );
  }
};

export default pagination;
