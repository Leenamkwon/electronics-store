import React, { useContext, useMemo } from 'react';
import { ProductContext } from '../../context/products';

const Filters = () => {
  const {
    filters: { search, category, shipping, price },
    updateFilters,
    sorted,
  } = useContext(ProductContext);

  const categoryArr = useMemo(() => {
    const uniqCategory = [
      'all',
      ...new Set(sorted.flat().map((item) => item.category)),
    ];

    return uniqCategory.map((item) => {
      return (
        <option value={item} key={item}>
          {item}
        </option>
      );
    });
  }, [sorted]);

  return (
    <section className='filters-section'>
      <h6 className='section-title'>필터링</h6>
      <form className='filters-form'>
        <div>
          {/* search input */}
          <div className='form-group'>
            <label htmlFor='search'>검색</label>
            <input
              type='text'
              id='search'
              name='search'
              value={search}
              onChange={updateFilters}
              className='form-control'
            />
          </div>
          {/* select category */}
          <div className='form-group'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              className='form-control'
              value={category}
              onChange={updateFilters}
            >
              {categoryArr}
            </select>
          </div>
          {/* free shipping */}
          <div className='form-group'>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping}
              onChange={updateFilters}
            />
            <label htmlFor='shipping'>무료 배송</label>
          </div>
        </div>
        <div className='price-group'>
          <p>가격 별</p>
          <label>
            <input
              type='radio'
              name='price'
              value='all'
              checked={price === 'all'}
              onChange={updateFilters}
            />
            all
          </label>
          <label>
            <input
              type='radio'
              name='price'
              value='0'
              checked={price === 0}
              onChange={updateFilters}
            />
            0 ~ $300
          </label>
          <label>
            <input
              type='radio'
              name='price'
              value='300'
              checked={price === 300}
              onChange={updateFilters}
            />
            $300 ~ $650
          </label>
          <label>
            <input
              type='radio'
              name='price'
              value='650'
              checked={price === 650}
              onChange={updateFilters}
            />
            $650 이상 ~
          </label>
        </div>
        <h6>total : {sorted.flat().length}</h6>
      </form>
    </section>
  );
};

export default Filters;
