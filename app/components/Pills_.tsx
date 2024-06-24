import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { CategoryState, CollectionState, PillState, TagState } from "./atoms/atoms";

interface Pills_Props {}

const Pills_ = () => {
  const [pill_, setPill_] = useRecoilState(PillState);
  const [categories_, setCategories_] = useRecoilState(CategoryState);
  const [collection_, setCollection_] = useRecoilState(CollectionState);
  return (
    <div
      className={`w-full min-h-[50px] flex md2:flex-row flex-col justify-between mt-2 items-center`}
    >
      {/* <div
        className={`w-full ml-0 md2:ml-4 md2:text-left md:text-[35px] text-[20px] text-center font-black`}
      >
        RE-L8: {collection_ ? collection_ : "Full Offering"}
      </div> */}
      <div className={`flex flex-row z-[2] w-full pb-2`}>
        <div
          className={`w-full h-full flex flex-row md2:justify-end justify-center items-center`}
        >
          {categories_.map((obj_: any, index: any) => {
            return (
              <div
                className={`min-w-[80px] h-[20px] border-solid border-[1px] border-black/50 hover:border-orange-600 flex flex-row justify-center items-center rounded-[15px] mx-1 px-4 cursor-pointer text-black/65 hover:text-white/80 hover:bg-orange-600 ${
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
        {/* <FontAwesomeIcon
          icon={faAngleRight}
          className={`mx-3 md2:mr-6 text-[16px] cursor-pointer hover:text-black/80 text-black/50`}
        /> */}
      </div>
    </div>
  );
};

export default Pills_;
