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
      className={`w-full h-full flex flex-col justify-end items-center bg-black/50 backdrop-blur-md fixed top-0 py-1 z-[6] ${lock_ ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className={`min-h-2 p-2 w-full grid grid-cols-3 gap-2 justify-center items-center scale-[95%] py-2 transition-all duration-200 ${lock_ ? 'mb-0 opacity-100' : 'mb-20 opacity-0'} rounded-[12px] shadow-md bg-white/80 backdrop-blur-md md:hidden transition-all`}
        onClick={() => {
          console.log(categories_)
        }}
      >
        {categories_.slice(0, 4).map((obj_: any, index: any) => {
          return (
            <div
              className={`min-w-[80px] h-[20px] border-solid border-[1px] border-black/50 hover:border-red-600 flex flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer text-black/65 hover:text-white/80 hover:bg-red-600 ${
                collection_ == obj_ && "bg-black text-white/80 border-black"
              } transition-all duration-500 hover:duration-200`}
              key={index}
              onClick={() => {
                setPill_(!pill_);
                setCollection_(obj_ == collection_ ? "" : obj_)
                setLock_(false)
              }}
            >
              <p className={`text-[12px] text-center min-w-[80px]`}>{obj_}</p>
            </div>
          );
        })}
        <div
              className={`min-w-[80px] h-[20px] border-solid border-[1px] border-red-600 flex flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer text-white/80 bg-red-600 transition-all duration-500 hover:duration-200`}
              onClick={() => {
                setLock_(false)
              }}
            >
              <FontAwesomeIcon icon={faAngleLeft} className={`text-[12px] font-medium mr-1`}/> 
              <p className={`text-[12px] font-medium`}>back</p>
            </div>
      </div>
    </div>
  );
};

export default MobileCard_;
