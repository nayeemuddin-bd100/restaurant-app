"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import completeOrder from "../lib/completeOrder";
import { useCartStore } from "../utils/store";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart, resetCart } =
    useCartStore();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleClick = async () => {
    if (!session) {
      router.push("/login");
    } else {
      const data = {
        price: totalPrice,
        status: "Preparing",
        products,
      };
      await completeOrder(data);
      resetCart();
      router.push("/success");
    }
  };

  return (
    <div
      className=" flex flex-col text-red-500 lg:flex-row"
      style={{
        height: "calc(100vh - 13rem)",
      }}
    >
      {/* PRODUCTS CONTAINER */}
      <div
        className={`h-1/2 p-4 flex flex-col justify-center ${
          products.length > 0 && `overflow-scroll`
        } lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40`}
      >
        {/* SINGLE ITEM */}

        {products.map((item) => (
          <div className="flex items-center justify-between mb-4" key={item.id}>
            {item.img && (
              <Image src={item.img} alt="" width={100} height={100} />
            )}
            <div className="">
              <h1 className="uppercase text-xl font-bold">
                {item.title} x{item.quantity}
              </h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">{item.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(item)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-100 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-10 xl:px-30 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">{totalPrice}</span>
        </div>
        <button
          onClick={handleClick}
          disabled={products.length === 0}
          className={`${
            products.length === 0 ? `bg-red-300` : `bg-red-500`
          } text-white p-3 rounded-md w-1/2 self-end `}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
