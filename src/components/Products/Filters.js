import React, { useContext } from 'react';
import { ProductContext } from '../../context/products';

const Filters = () => {
  const {
    filters: { search, category, shipping, price },
    updateFilters,
    sorted,
  } = useContext(ProductContext);

  return (
    <section className='filters-section'>
      <h5 className='section-title'>필터링</h5>
      <form className='filters-form'>
        <div>
          {/* search input */}
          <div className='form-group'>
            <label htmlFor='search'>검색</label>
            <input type='text' id='search' name='search' />
          </div>
        </div>
        <div></div>
        <h6>total : {sorted.flat().length}</h6>
      </form>
    </section>
  );
};

export default Filters;
