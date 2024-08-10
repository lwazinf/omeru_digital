import { useRecoilState } from "recoil";
import {
  CartState,
  ProductsState,
  UserState,
  PaidState,
  SideBarState,
} from "./atoms/atoms";
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
  const [hover_, setHover_] = useState(false);

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
      className={`md:w-[350px] w-full min-h-screen md:bg-white/60 md:backdrop-blur-lg ${
        cart_
          ? "opacity-100 mr-[0px] duration-500 pointer-events-auto md:right-0"
          : "opacity-0 mr-[80px] duration-[400ms] pointer-events-none md:right-[-100%]"
      } transition-all flex-col items-center justify-end pb-3 md:pb-8 fixed top-0 md:shadow-lg flex`}
    >
      <div className={`md:w-[350px] w-full min-h-screen absolute top-0 left-0`}>
        <img
          //   src={`/assets/images/bg.png`}
          className={`flex-col items-center justify-center w-full min-h-screen pointer-events-none md:flex hidden`}
          style={{
            backgroundImage: `url(${"/assets/images/bg.png"})`,
            backgroundRepeat: "repeat",
            backgroundSize: "80%",
            opacity: "0.05",
          }}
        />
      </div>

      <img
        src={`https://images.pexels.com/photos/978267/pexels-photo-978267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
        className={`flex-col items-center justify-center w-full h-full object-cover absolute top-0 pointer-events-none mr-[160px]`}
      />
      <div
        className={`flex-col items-center justify-center w-full h-full absolute top-0 right-0 pointer-events-none bottom_fade`}
      />
      <div
        className={`flex-col items-center justify-center w-full h-full absolute top-0 right-0 pointer-events-none top_fade mr-[80px]`}
      />
      <div
        className={`flex-col items-center justify-center w-[80px] h-full bg-white/40 backdrop-blur-sm absolute top-0 right-0 pointer-events-none`}
      />

      <div
        className={`h-[350px] w-full overflow-y-scroll flex flex-col justify-end items-center relative pr-[80px]`}
      >
        <div
          className={`min-h-[600px] w-full flex flex-col justify-end items-center`}
        >
          {/* @ts-ignore */}
          {products_.map((obj_, index) => {
            return (
              <div
                className={`border-1 border-black justify-end items-center z-[2]
              
              min-w-[80px] min-h-[20px] border-solid hover:text-white/80 hover:bg-red-600 transition-all duration-500 hover:duration-200 p-2 px-8 backdrop-blur-md rounded-[6px] flex flex-col font-medium cursor-pointer bg-white/50 text-black
                
                `}
                onMouseEnter={() => {
                  setHover_(true);
                }}
                onMouseLeave={() => {
                  setHover_(false);
                }}
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
                  className={`w-[270px] flex flex-col justify-center items-center font-medium`}
                >
                  {/* <span className={`text-[15px] font-medium`}>NAME</span> */}
                  <div className={`flex flex-row justify-center items-center`}>
                    <div
                      className={`flex flex-row justify-start items-center w-[135px]`}
                    >
                      <span className={`font-medium text-[13px]`}>
                        {obj_.name}
                      </span>
                    </div>
                    <div
                      className={`flex flex-row justify-end items-center w-[135px]`}
                    >
                      <span className={`font-medium italic text-[13px]`}>
                        {obj_.quantity} units x R{obj_.price}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex flex-row justify-end items-center transition-all duration-200 ${
                      hover_ ? "text-white" : "text-red-600/80"
                    } w-full`}
                  >
                    <p className={`font-medium italic text-[13px]`}>
                      <span
                        className={`font-medium italic text-white/80 ${hover_ ? 'text-white/50' : 'text-black/50'} text-[13px] mr-1`}
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
        </div>
      </div>
      <div
        className={`w-[275px] h-[50px] m-1 relative top-2 flex flex-col justify-center items-center pr-[80px]`}
      >
        <div
          className={`font-black text-red-600 w-[100%] text-[25px] text-end`}
        >
          <span className={`text-[15px] font-black text-white/50`}>Total:</span>{" "}
          R{total_()}
        </div>
      </div>
      <div
        className={`w-[275px] h-[50px] m-1 relative flex flex-col justify-center items-center pr-[80px]`}
      >
        <div
          className={`text-white border-[1px] border-white/50 border-solid
            w-[350px] h-[50px] bg-red-600/80 backdrop-blur-md transition-all duration-75 hover:duration-500 cursor-pointer min-w-2 min-h-2 px-2 py-1 hover:bg-white/10 rounded-[6px] flex flex-col justify-center items-center text-[14px] font-bold text-white/70 scale-[.95]`}
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
            setPaid_(true);
            setCart_(false);
            setSideBar_(true);
          }}
        >
          Checkout
        </div>
      </div>
      {/* <div className={`w-full h-[150px]`}>

      </div> */}
      <div
        className={`md:flex flex-row items-center justify-center mb-8 mt-4 hidden`}
      >
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
        className={`min-h-[1vh] min-w-2 m-4 flex-col items-center justify-center md:flex hidden`}
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
