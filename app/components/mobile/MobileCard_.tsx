import {
  faAngleLeft,
  faBars,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import {
  CartState,
  CategoryState,
  CollectionState,
  MobileTrayState,
  PillState,
  SideBarState,
} from "../atoms/atoms";
import { Logo_, Social2_, Social_ } from "../Logo_";
import Search_ from "../Search_";

interface MobileCard_Props {}

const MobileCard_ = () => {
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
  const [lock_, setLock_] = useRecoilState(MobileTrayState);
  const [collection_, setCollection_] = useRecoilState(CollectionState);
  const [pill_, setPill_] = useRecoilState(PillState);
  const [categories_, setCategories_] = useRecoilState(CategoryState);
  const [cart_, setCart_] = useRecoilState(CartState);
  useEffect(() => {}, [sideBar_]);
  return (
    <div
      className={`w-full h-full flex-col justify-center items-center bg-white/50 backdrop-blur-md fixed top-0 py-1 z-[6] flex md:hidden ${
        lock_
          ? "opacity-100 pointer-events-auto duration-75"
          : "opacity-0 pointer-events-none duration-[400ms]"
      }`}
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
      <div className={`scale-[2] relative bottom-10 ${
          lock_
            ? "mr-1 opacity-100 duration-500"
            : "mr-[-80px] opacity-0 duration-[400ms]"
        }`}>
        <Logo_ />
      </div>
      <div
        className={`flex flex-col justify-center items-center w-[400px] relative rounded-md md:left-10 bottom-[30px] h-[650px] shadow-xl overflow-hidden transition-all scale-[0.8] ${
          lock_
            ? "mr-1 opacity-100 duration-500"
            : "mr-[-80px] opacity-0 duration-[400ms]"
        }`}
        onClick={() => {}}
      >
        <img
          className={`w-full h-full object-cover scale-[1] transition-all duration-[500ms] hover:duration-[200ms]`}
          src={
            "/assets/images/cabinet.jpg"
            // featured_[feature_]
          }
        />
      </div>
      {/* <div
        className={`w-[100px] min-h-2 flex flex-row justify-end items-end absolute left-8 scale-[1.2] opacity-70`}
      >
        <Social2_ />
      </div> */}
      <div className={`flex flex-col justify-center items-center absolute bottom-0`}>
      <div
        className={`min-h-2 p-2 w-[350px] grid grid-cols-3 gap-2 justify-center items-center scale-[95%] py-2 transition-all ${
          lock_
            ? "mr-1 opacity-100 duration-500"
            : "mr-[-80px] opacity-0 duration-[400ms]"
        } rounded-[4px] shadow-md bg-white/80 backdrop-blur-md md:hidden transition-all`}
        onClick={() => {
          console.log(categories_);
        }}
      >
        {[...categories_].map((obj_: any, index: any) => {
          return (
            <div
              className={`min-w-[80px] h-[20px] border-solid border-[1px] border-black/50 hover:border-red-600 flex flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer text-black/65 hover:text-white/80 hover:bg-red-600 ${
                collection_ == obj_ && "bg-black text-white/80 border-black"
              } transition-all duration-500 hover:duration-200`}
              key={index}
              onClick={() => {
                setPill_(!pill_);
                setCollection_(obj_ == collection_ ? "" : obj_);
                setLock_(false);
              }}
            >
              <p className={`text-[12px] text-center min-w-[80px]`}>{obj_}</p>
            </div>
          );
        })}
        <div
          className={`min-w-[80px] h-[20px] border-solid border-[1px] border-red-600 flex flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer text-white/80 bg-red-600 transition-all duration-500 hover:duration-200`}
          onClick={() => {
            setLock_(false);
          }}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={`text-[12px] font-medium mr-1`}
          />
          <p className={`text-[12px] font-medium`}>back</p>
        </div>
      </div>
      <div
        className={`relative
     min-w-2 min-h-2 flex p-1 flex-col justify-center items-center transition-all ${
       lock_
         ? "mr-1 opacity-100 duration-500"
         : "mr-[-80px] opacity-0 duration-[400ms]"
     } rounded-[5px] shadow-md bg-white/60 backdrop-blur-md md:hidden transition-all`}
      >
        <Search_ />
      </div>
    </div>
    </div>
  );
};

export default MobileCard_;
