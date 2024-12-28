import { useDispatch, useSelector } from "react-redux";
import NavbarMenu from "./NavbarMenu";
import { RootState } from '../redux/store/store';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/slice/CartSlice';

function Cart() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleToIncreate = (product: Product) => {
    dispatch(increaseQuantity(product));
  }

  const handleToDecreate = (product: Product) => {
    dispatch(decreaseQuantity(product));
  }

  const handleRemoveAll = () => {
    dispatch(clearCart());
  }

  const handleRemoveItem = (product: Product) => {
    dispatch(removeFromCart(product.productName));
  }

  return (
    <>
      <NavbarMenu />
      <div className="container">
        <h3 className="text-center my-4">Cart</h3>

        {cart.length > 0 && (
          <div className="d-flex justify-content-end w-100 mb-3">
            <button className="btn btn-danger btn-sm" onClick={handleRemoveAll}>Delete All</button>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="row">
            <div className="col-6 my-4 mx-auto">
              {cart.map((item) => {
                return (
                  <div className="card my-4" key={item.productName}>
                    <div className="d-flex justify-content-end w-100">
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item)}>Delete Item</button>
                    </div>
                    <img className="card-img-top p-4" src="src/assets/react.svg" alt="" height={150} />
                    <div className="card-body text-center">
                      <h5 className="card-title my-4">{item.productName}</h5>
                      <p>Quantity: {item.quantity} items</p>
                      <div className="row">
                        <div className="col-6">
                          <button className="btn btn-danger btn-sm" onClick={() => handleToDecreate(item)} disabled={item.quantity === 1}>Decrease</button>
                        </div>
                        <div className="col-6">
                          <button className="btn btn-success btn-sm" onClick={() => handleToIncreate(item)}>Increase</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;

interface Product {
  productName: string;
  type: string;
  price: number;
  quantity: number;
}
