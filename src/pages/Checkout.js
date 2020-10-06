import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';

// react-stripe-element
import submitOrder from '../strapi/submitOrder';

export default function Checkout(props) {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);
  const history = useHistory();

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    e.preventDefault();
  }

  if (cart.length < 1) return <EmptyCart />;

  return (
    <section className='section form'>
      <h2 className='section-title'>checkout</h2>
      <form className='checkout-form'>
        <h3>
          총 주문 가격 : <span>${total}</span>
        </h3>
        {/* single input */}
        <div className='form-control'>
          <label htmlFor='name'>이름</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* card element */}
        <div className='stripe-input'>
          <label htmlFor='card-element'>신용카드</label>
          <p className='stripe-info'>
            예) 신용 카드 번호 : <span>4242 4242 4242 4242</span>
            <br />
            5자리의 zip 코드 입력
            <br />
            3자리의 CVC 번호 입력
          </p>
        </div>
        {/* stripe element */}
        {/* stripe errors */}
        {error && <p className='form-empty'>{error}</p>}
        {isEmpty ? (
          <p className='form-empty'>please fill out name field</p>
        ) : (
          <button
            type='submit'
            onClick={handleSubmit}
            className='btn btn-primary btn-block'
          >
            주문하기
          </button>
        )}
      </form>
    </section>
  );
}
