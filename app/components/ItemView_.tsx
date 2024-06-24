'use client'

import { useRecoilState } from "recoil";
import { ViewItemState } from "./atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ItemView_Props {}

const ItemView_ = () => {
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState)
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-center items-center bg-white/70 backdrop-blur-md fixed top-0 left-0 transition-all ${
        viewItem_ ? "opacity-100 pointer-events-auto duration-200" : "opacity-0 pointer-events-none duration-500"
        }`}
    >
      <div className={`w-[1200px] min-h-screen flex flex-col justify-center`}>
        <div className={`w-[1200px] h-[800px] flex flex-col justify-center`}>
          <div
            className={`w-full h-[500px] flex flex-row justify-between items-center`}
          >
            <div
              className={`w-[60%] h-full bg-red-800 rounded-[2px] overflow-hidden relative`}
            >
              <img
                className={`w-full h-full object-cover`}
                src={`https://firebasestorage.googleapis.com/v0/b/xoli-bakes.appspot.com/o/WhatsApp%20Image%202024-03-23%20at%2015.30.25(4).jpeg?alt=media&token=33f18597-0a1b-402b-b98d-bce1cb6a10a7`}
              />
            </div>
            <div className={`w-[39%] h-full rounded-[2px]`}>
              <div
                className={`w-full h-[18.5%] flex flex-col justify-center items-start pl-10`}
              >
                <p className={`text-[25px] font-black`}>Coconut Tarts</p>
                <p className={`text-[45px] font-black relative bottom-4`}>
                  10L{` `}
                  <span className={``}>BUCKET</span>
                </p>
              </div>
              <div
                className={`w-full h-[60%] flex flex-col justify-center items-start pl-10 pr-6 pb-4`}
              >
                <p className={`text-[18px] font-medium text-justify`}>
                  Aliquip aliqua exercitation culpa officia. Ad aliqua
                  adipisicing adipisicing exercitation aliquip esse in
                  reprehenderit eiusmod laborum exercitation nisi. Mollit
                  aliquip ex dolore ex sit do id commodo proident ex. Pariatur
                  reprehenderit enim aute eiusmod. Enim ad fugiat qui laboris
                  ipsum ullamco. Aute duis Lorem quis ea ea consequat cupidatat
                  enim sunt aute in tempor sunt aliqua. Consequat cillum culpa
                  est ad veniam deserunt adipisicing cupidatat ea dolore
                  reprehenderit.
                </p>
              </div>
              <div
                className={`w-full h-[20%] flex flex-col justify-start items-start`}
              >
                <div
                  className={`w-full h-[50px] flex flex-row justify-center items-center`}
                >
                  {["2L", "5L", "6.5L", "10L", "20L"].map((obj_, index) => {
                    return (
                      <div
                        key={index}
                        className={`h-[50px] w-[50px] bg-black/20 hover:bg-black/40 transition-all duration-200 rounded-[2px] flex flex-col justify-center items-center mx-1 cursor-pointer`}
                      >
                        <p className={`pointer-events-none`}>{obj_}</p>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={`w-full h-[50px] flex flex-row justify-center items-center`}
                >
                    <div
                        className={`h-[50px] w-[60%] mt-4 bg-black/20 hover:bg-black/40 transition-all duration-200 rounded-[2px] flex flex-col justify-center items-center mx-1 cursor-pointer`}
                      >
                    1 Unit
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`min-w-2 min-h-2 absolute top-4 right-6 cursor-pointer`} onClick={() => {
        setViewItem_(false)
      }}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  );
};

export default ItemView_;
