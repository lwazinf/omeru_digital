import { useRecoilState } from "recoil";
import { CartState, ProductsState, UserState, PaidState, SideBarState } from "./atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { signIn_, updateCart_ } from "./utils/utils";
import { useRouter } from "next/navigation";

interface Model_Props {}

const Model_ = () => {
  const [products_, setProducts_] = useRecoilState(ProductsState);
  const [user_, setUser_] = useRecoilState(UserState);
  const [cart_, setCart_] = useRecoilState(CartState);
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
  const [paid_, setPaid_] = useRecoilState(PaidState);

  const router = useRouter();

  const total_ = () => {
    let x = 0;
    // @ts-ignore
    products_.forEach((product) => {
      x = x + product.subtotal;
    });
    return x;
  };

  const handleClick = async () => {
    console.log(total_());
    // if (data_.redirectUrl) {
    //   window.open(data_.redirectUrl, "_blank");
    // }
  };

  return (
    <div
      className={`md:w-[350px] w-full min-h-screen bg-white/60 backdrop-blur-lg ${
        cart_
          ? "opacity-100 duration-200 right-0"
          : "opacity-100 duration-500 right-[-100%]"
      } transition-all flex-col items-center justify-center pb-8 fixed top-0 shadow-lg flex`}
    >
      <div className={`md:w-[350px] w-full min-h-screen absolute top-0 left-0`}>
        <img
          //   src={`/assets/images/bg.png`}
          className={`flex-col flex items-center justify-center w-full min-h-screen pointer-events-none`}
          style={{
            backgroundImage: `url(${"/assets/images/bg.png"})`,
            backgroundRepeat: "repeat",
            backgroundSize: "80%",
            opacity: "0.05",
          }}
        />
      </div>
      {/* @ts-ignore */}
      {products_.map((obj_, index) => {
        return (
          <div
            className={`w-[300px] min-h-[50px] transition-all duration-75 hover:duration-500 border-solid border-1 border-black rounded-[3px] mt-1 cursor-pointer flex flex-col justify-end items-center bg-white/100 hover:bg-white/80 py-4 shadow-md z-[2]`}
            key={index}
            onClick={() => {
              // @ts-ignore
              const newSet = products_.filter((obj__, index) => {
                return obj__ != obj_;
              });
              setProducts_(newSet);
              if (newSet.length == 0) {
                setCart_(false);
              }
            }}
          >
            <div
              className={`w-[270px] flex flex-col justify-center items-center text-black/80 font-medium`}
            >
              {/* <span className={`text-[15px] font-medium`}>NAME</span> */}
              <div className={`flex flex-row justify-center items-center`}>
                <div
                  className={`flex flex-row justify-start items-center w-[135px]`}
                >
                  <span className={`font-medium text-[13px]`}>{obj_.name}</span>
                </div>
                <div
                  className={`flex flex-row justify-end items-center w-[135px]`}
                >
                  <span className={`font-medium italic text-[13px]`}>
                    {obj_.quantity} units x R{obj_.price}
                  </span>
                </div>
              </div>

              <div className={`flex flex-row justify-end items-center w-full`}>
                <p className={`font-medium italic text-red-700/80 text-[13px]`}>
                  <span
                    className={`font-medium italic text-black/50 text-[13px] mr-1`}
                  >
                    total:
                  </span>
                  R{obj_.subtotal}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div
        className={`w-[275px] h-[50px] m-1 relative top-4 flex flex-col justify-center items-center`}
      >
        <div
          className={`font-black text-red-600 w-[100%] text-[25px] text-end`}
        >
          <span className={`text-[15px] font-black text-black/50`}>Total:</span>{" "}
          R{total_()}
        </div>
      </div>
      <div
        className={`w-[275px] h-[50px] m-1 relative flex flex-col justify-center items-center`}
      >
        <div
          className={`font-black text-white w-[100%] h-full border-[1px] bg-red-600 border-red-600/30 transition-all duration-75 hover:duration-500 border-solid rounded-[3px] flex flex-row cursor-pointer justify-center items-center`}
          onClick={() => {
            // if (user_) {
            //   handleClick();
            //   const uid_ = v4();
            //   const timestamp_ = serverTimestamp();
            //   const data_ = {
            //     receipt: {
            //       time: timestamp_,
            //       id: uid_,
            //       paid: true,
            //       fulfilled: false,
            //       total: total_(),
            //       user: user_ && user_.uid,
            //       name: user_ && user_.displayName,
            //       products: products_,
            //     },
            //   };
            //   // updateCart_(data_, data_.receipt.user, () => {
            //   //   console.log("Data Sent");
            //   // });
            //   console.log(data_);
            // } else {
            //   signIn_().then((user_) => {
            //     setUser_(user_);
            //   });
            // }
            setPaid_(true)
            setCart_(false)
            setSideBar_(true)
          }}
        >
          Proceed to payment
        </div>
      </div>
      <div className={`md:flex flex-row items-center justify-center mb-8 mt-4 hidden`}>
        {[
          { icon: faTwitter },
          { icon: faFacebook },
          { icon: faInstagram },
          { icon: faLinkedin },
        ].map((obj_, index) => {
          return (
            <FontAwesomeIcon
              key={index}
              icon={obj_.icon}
              className={`transition-all cursor-pointer hover:text-[#ec1d2a] opacity-60 hover:opacity-90 hover:duration-[75ms] duration-[1000ms] text-black text-[30px] mx-4`}
              onClick={() => {
                // go to twitter page
              }}
            />
          );
        })}
      </div>
      <div
        className={`min-h-[1vh] min-w-2 m-4 flex flex-col items-center justify-center`}
      >
        <div
          className={`flex flex-row items-center justify-center opacity-50 hover:opacity-90 cursor-pointer`}
          onClick={() => {
            setCart_(false);
          }}
        >
          <p className={`mr-2 text-[14px]`}>close</p>
          <FontAwesomeIcon icon={faTimesCircle} className={`text-[20px]`} />
        </div>
      </div>
    </div>
  );
};

export default Model_;
