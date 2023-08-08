import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
    }
  };
  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleOptions = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props._id) {
        food = item;

        break;
      }
    }
    console.log(food);
    console.log(new Date());

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        console.log("goint to add");
        await dispatch({
          type: "ADD",
          id: props._id,
          name: props.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.img,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props._id,
      name: props.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // setBtnEnable(true)
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]); //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "560px" }}>
        <img
          src={props.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          {<p>{props.description}</p>}
          <div className="container w-100 p-0" style={{ height: "38px" }}>
            <select
              className="m-2 h-100 w-20 bg-success text-black rounded"
              style={{ select: "#FF0000" }}
              onClick={handleClick}
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 w-20 bg-success text-black rounded"
              style={{ select: "#FF0000" }}
              ref={priceRef}
              onClick={handleClick}
              onChange={handleOptions}
            >
              {priceOptions.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <div className=" d-inline ms-2 h-100 w-20 fs-5">
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button
            className={`btn btn-success justify-center ms-2 `}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  );
}
//
