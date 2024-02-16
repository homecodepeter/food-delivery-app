import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '@/state/menuList/menuSlice';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/libs/firebase'; 
import { reset } from '@/state/menuList/menuSlice';

const Cart = ({ setCartOpen, setOrderSuccessful }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.orders);
  const [dish, setDish] = useState('Dine In');
  const [name, setName] = useState("")
  const [table, setTable] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState("")
  const [note, setNote] = useState("")
  const [total, setTotal] = useState("");
  console.log(cartItems)

  const SingleTotalPrice = (item) => {
    const itemTotal = item.prices * item.quantity;
    const extrasTotal = item.extras
        ? item.extras.reduce(
            (extraTotal, extra) => extraTotal + extra.prices[0] * item.optionQuantities[extra._id],
            0
          )
        : 0;
    
    return itemTotal + extrasTotal
  }


  const Table = [
    'Table Number:', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.prices * item.quantity;
  
      // Add the total for extras
      const extrasTotal = item.extras
        ? item.extras.reduce(
            (extraTotal, extra) => extraTotal + extra.prices[0] * item.optionQuantities[extra._id],
            0
          )
        : 0;

      return total + itemTotal + extrasTotal;
    }, 0);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setTable(value);
    setTotal(getTotalAmount())
  };

  const handleDish = (event) => {
    const value = event.target.value;
    setDish(value);
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  // Your Cart component

  const Order = async () => {
    if (!table) {
      alert("Table Number Is Very Important For Us To Server You Order!");
      return;
    }
    try {
      const orderData = {
        items: cartItems.map(item => ({
          title: item.title,
          prices: item.prices,
          quantity: item.quantity,
          extras: item.extras,
          optionQuantities: item.optionQuantities,
          // Add other properties you want to include in the order item
        })),
        table,
        dish,
        name, // Add other customer details here
        phoneNumber,
        note,
        total,
      };
  
      const docRef = await addDoc(collection(db, "orders"), orderData);
      dispatch(reset());
      console.log("Document written with ID: ", docRef.id);
      setOrderSuccessful(true);
      setCartOpen(false)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  

  return (
    <>
    {cartItems.length !== 0 ? (
    <div className="container mx-auto p-4">
      <div className="flex mb-4 items-center h-[40px] justify-between">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <span onClick={() => setCartOpen(false)} className="text-[24px] font-medium cursor-pointer">
          X
        </span>
      </div>
      {cartItems.map((item) => (
        <div key={item._id} className="flex relative justify-between border-b border-gray-300 py-2">
          <div className="flex">
            <img src={item.dish} alt={item.name} className="w-12 h-12 object-cover mr-4" />
            <div>
              <p className="text-lg font-bold">
                {item.title} 
                <span className='mr-1 ml-2 font-extrabold text-transparent text-[14px] bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>X</span> 
                {item.quantity}</p>
              {/* <p className="text-gray-600">Ksh.{item.prices} x {item.quantity}</p> */}
              <p className="font-semibold text-blue-900/75">Ksh.{item.prices * item.quantity}</p>
              {item.extras?.map(extra => (
              <div key={extra._id} className=''>
              <p className="text-[13px]">{extra.text}</p>
              <p className="text-gray-600">
                {extra.title}
                 <span className='mr-1 ml-2 font-extrabold text-transparent text-[14px] bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>X</span> 
                 {item.optionQuantities[extra._id]}
                 </p>
               <div>
                <p className='font-semibold text-blue-900/75'>Ksh.{extra.prices[0] * item.optionQuantities[extra._id]}</p>
                </div>
            </div>
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <div>
            {/* <button onClick={() => handleIncrement(item._id)} className="text-green-500 text-[26px] mr-2">
              +
            </button> */}
            <button onClick={() => handleRemove(item._id)} 
            className="text-red-500  absolute top-0 font-bold right-2 text-[20px] mr-2">
              x
            </button>
              </div>
            <p className="text-green-700 mt-3 font-semibold">Ksh.{SingleTotalPrice(item)}</p>
          </div>
        </div>
      ))}
      <div className="mt-4 flex">
        <div className="mr-4">
          <select
            id="tables"
            onChange={handleSelectChange}
            className="bg-green-700 text-white font-bold outline-none p-2"
          >
            {Table.map((tNumber) => (
              <option key={tNumber} value={tNumber}>
                {tNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <select id="dish" onChange={handleDish} className="bg-blue-500 text-white font-bold outline-none p-2">
            <option value="Dine In">Dine In</option>
            <option value="Take Away">Take Away</option>
          </select>
        </div>     
      </div>

      {dish === "Take Away" && (
        <div className='mt-4'>
          <h2 className='font-bold mb-3 text-red-700'>Fill all required fields</h2>
          <input type='text'
          onChange={e => setName(e.target.value)}
          value={name}
           className='w-[100%] h-[40px] pl-2 mb-2 rounded outline-none border' placeholder='Name' />
          <input type='number'
          onChange={e => setPhoneNumber(e.target.value)}
          value={phoneNumber}
           className='w-[100%] h-[40px] pl-2 mb-2 rounded outline-none border' placeholder='Your Phone Number'/>
          <input type='text'
          onChange={e => setNote(e.target.value)}
          value={note}
           className='w-[100%] h-[60px] pl-2 mb-2 rounded outline-none border' placeholder='Add Note 🙏...'/>
          </div>
      )}

      <div className="mt-4">
        <p className="text-lg font-bold">Total Amount: Ksh.{getTotalAmount()}</p>
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={() => Order()}
        className="text-lg bg-black p-2 rounded-md text-white font-bold">Order Now!</button>
      </div>
    </div>
    ): (
      <div className="text-center">
     <div className="flex mb-4 p-4 items-center h-[40px] justify-between">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <span onClick={() => setCartOpen(false)} className="text-[24px] font-medium cursor-pointer">
          X
        </span>
      </div>
      <div className='mt-8'>
      <p className="font-semibold text-yellow-700 mb-2 text-[22px]">Your cart is currently empty.</p>
      <p className="text-gray-600 text-[24px]">
        Why not explore our delicious menu and add something delightful to your cart?
      </p>
      </div>
    </div>
    )}
    </>
  );
};

export default Cart;

