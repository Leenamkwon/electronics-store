import React, { useContext } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { CartContext } from '../../context/cart';

export default function CartItem({ id, image, price, amount, title }) {
  const { removeItem, increaseAmount, decreaseAmount } = useContext(
    CartContext
  );

  console.log(amount);
  // cart context
  return (
    <article className='cart-item'>
      <img src={image} alt={title} />
      <div>
        <h4>{title}</h4>
        <h5>${price}</h5>
        <button
          type='button'
          className='cart-btn remove-btn'
          onClick={() => removeItem(id)}
        >
          지우기
        </button>
      </div>
      <div>
        <button
          type='button'
          className='cart-btn amount-btn'
          onClick={() => increaseAmount(id)}
        >
          <FaAngleUp />
        </button>
        <p className='item-amount'>{amount}</p>
        {amount > 1 && (
          <button
            type='button'
            className='cart-btn amount-btn'
            onClick={() => decreaseAmount(id, amount)}
          >
            <FaAngleDown />
          </button>
        )}
      </div>
    </article>
  );
}
