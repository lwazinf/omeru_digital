import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { CategoryState, CollectionState, PillState, TagState } from "./atoms/atoms";
import { useState } from "react";

interface Pills_Props {}

const Pills_ = () => {
  const [pill_, setPill_] = useRecoilState(PillState);
  const [lock_, setLock_] = useState(false)
  const [categories_, setCategories_] = useRecoilState(CategoryState);
  const [collection_, setCollection_] = useRecoilState(CollectionState);
  return (
    <div
      className={`w-full min-h-[50px] flex md2:flex-row flex-col justify-between mt-2 items-center`}
    >
      <div className={`flex flex-row w-full pb-2`}>
        <div
          className={`w-full h-full flex flex-row md2:justify-end justify-center items-center relative`}
        >
          {categories_.slice(0, 4).map((obj_: any, index: any) => {
            return (
              <div
                className={`min-w-[80px] h-[20px] border-solid border-[1px] border-black/50 hover:border-red-600 flex flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer text-black/65 hover:text-white/80 hover:bg-red-600 ${
                  collection_ == obj_ && "bg-black text-white/80 border-black"
                } transition-all duration-500 hover:duration-200 ${lock_ ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
                key={index}
                onClick={() => {
                  setPill_(!pill_);
                  setCollection_(obj_ == collection_ ? "" : obj_);
                }}
              >
                <p className={`text-[12px] text-center min-w-[80px]`}>{obj_}</p>
              </div>
            );
          })}
          <div className={`w-[450px] min-h-2 mr-20 rounded-md bg-white/60 backdrop-blur-md p-2 z-[4] grid grid-cols-3 gap-4 top-0 justify-center items-center absolute transition-all duration-500 hover:duration-200 ${lock_ ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {categories_.map((obj_: any, index: any) => {
            return (
              <div
                className={`min-w-[80px] h-[20px] border-solid border-[1px] border-black/50 hover:border-red-600 flex flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer text-black/65 hover:text-white/80 hover:bg-red-600 ${
                  collection_ == obj_ && "bg-black text-white/80 border-black"
                } transition-all duration-500 hover:duration-200`}
                key={index}
                onClick={() => {
                  setPill_(!pill_);
                  setCollection_(obj_ == collection_ ? "" : obj_);
                }}
              >
                <p className={`text-[12px] text-center min-w-[80px]`}>{obj_}</p>
              </div>
            );
          })}
          </div>
          <div
                className={`min-w-[20px] h-[20px] border-solid border-[1px] border-black/50 hover:border-red-600 flex flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer hover:text-white/80 hover:bg-red-600 transition-all duration-500 hover:duration-200 bg-black text-white/80 border-black`}
                onClick={() => {
                  setLock_(!lock_)
                }}
              >
                <p className={`text-[12px] text-center min-w-[20px]`}>...</p>
              </div>
        </div>
        {/* <FontAwesomeIcon
          icon={faAngleRight}
          className={`mx-3 md2:mr-6 text-[16px] cursor-pointer hover:text-black/80 text-black/50`}
        /> */}
      </div>
    </div>
  );
};

export default Pills_;
