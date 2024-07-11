import Navbar_user from "../components/Navbar_user";
import BottomNavigator from "../components/cart_components/BottomNavigator";
import CartBody from "../components/cart_components/CartBody";

function CartPage_1() {
  return (
    <div className="background bg-[#F3F4F6] max-w-screen min-h-screen p-0 m-0 relative">
      <Navbar_user />
      <CartBody />
      <BottomNavigator />
    </div>
  );
}

export default CartPage_1;
