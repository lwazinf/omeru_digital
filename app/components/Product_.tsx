"use client";

import {
  faAdd,
  faChevronLeft,
  faRepeat,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  OfferState,
  CategoryState,
  ViewItemState,
  CurrentItemState,
  OfferState2,
  CartState,
  SideBarState,
  AdminState,
} from "./atoms/atoms";
import {
  AddProduct_,
  DeleteProduct_,
  getProducts_,
  uploadFileAndGetDownloadLink,
} from "./utils/utils";
import { v4 } from "uuid";

interface Product_Props {
  data_: any;
}

export const Product_ = ({ data_ }: Product_Props) => {
  const [card_, setCard_] = useState(false);
  const [offers_, setOffers_] = useRecoilState(OfferState);
  const [admin_, setAdmin_] = useRecoilState(AdminState);
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [offer_, setOffer_] = useRecoilState(OfferState2);
  const [currentItem_, setCurrentItem_] = useRecoilState(CurrentItemState);
  const [categories_, setCategories_] = useRecoilState(CategoryState);
  const [cart_, setCart_] = useRecoilState(CartState);
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);

  const initProducts_ = async () => {
    const data_ = await getProducts_("products");
    setOffers_(data_);
  };

  useEffect(() => {
    const uniqueCategories = [
      // @ts-ignore
      ...new Set(offers_.map((offer) => offer.category)),
    ];
    setCategories_(uniqueCategories);
  }, [offers_]);

  return (
    <div
      className={`w-[300px] h-[350px] transition-all hover:duration-200 duration-500 flex flex-col justify-center items-center rounded-[4px] relative overflow-hidden`}
      onMouseEnter={() => setCard_(true)}
      onMouseLeave={() => setCard_(false)}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center text-white ${
          card_ ? "pb-[0px] duration-500" : "pb-[5px] duration-75"
        } transition-all`}
      >
        <div
          className={`w-full h-[50px] flex flex-col justify-center items-center relative bottom-[25px]`}
        >
          <div
            className={`w-full h-[80px] px-4 flex flex-col justify-center items-center`}
          >
            <div
              className={`w-full h-[40px] hover:bg-red-600 border-red-600 border-solid border-[1px] hover:animate-pulse hover:text-white/80 text-red-600/80 rounded-[3px] relative flex flex-col justify-center items-center scale-[0.9] cursor-pointer ${
                card_ ? "z-2 duration-500" : "z-0 duration-75"
              } transition-all`}
              onClick={() => {
                setOffer_(data_);
                setViewItem_(true);
                setCart_(false)
                setSideBar_(false)
              }}
            >
              <p className={`text-[15px] font-black`}>View this item</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-[300px] h-full transition-all duration-200 flex flex-col justify-center items-center rounded-[4px] my-2 scale-[1.1] pointer-events-none`}
      >
        <div
          className={`relative overflow-hidden w-[300px] h-full flex flex-col justify-center items-center rounded-[4px]`}
        >
          <img
            className={`w-full h-full object-cover relative rounded-[4px] ${
              card_ ? "bottom-[100px]" : "bottom-[0px]"
            } transition-all duration-200`}
            src={data_.display}
          />
          <div
            className={`absolute top-4 left-0 w-full min-h-[40px] pt-4 flex flex-col justify-end items-end pr-6`}
          >
            <p
              className={`bg-white/20 backdrop-blur-sm px-2 rounded text-[18px] text-white/90 font-black`}
            >
              {data_.title}
            </p>
            <p
              className={`bg-white/20 backdrop-blur-sm px-2 mt-1 rounded text-[12px] text-white/90 font-black`}
            >
              From <span className={`text-red-600`}>R{typeof data_.price == 'number' ? data_.price : data_.price['2']}</span>
            </p>
            <div
              className={`w-[90%] h-[90px] flex flex-col justify-end items-center mt-[20%]`}
            >
              <p
                className={`bg-white/20 backdrop-blur-sm px-2 py-2 rounded text-[12px] text-white/90 font-medium transition-all ${
                  card_ ? "opacity-100 duration-1000" : "opacity-0 duration-200"
                }`}
              >
                {data_.desc}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full h-full flex flex-col justify-end items-center absolute pl-6 pr-8 pb-2 pointer-events-none ${
            card_
              ? "bottom-[100px] opacity-100 duration-200"
              : "bottom-[0px] opacity-0 duration-200"
          } transition-all`}
        >
          <div
            className={`rotate-180 _shade w-full h-full absolute top-0 ${
              card_ ? "bottom-[100px] opacity-100" : "bottom-[0px] opacity-0"
            } transition-all duration-200`}
          />
          <div
            className={`w-full h-full flex flex-col justify-end items-center absolute top-0 left-0 pb-2 px-8`}
          ></div>
        </div>
      </div>
      {admin_ && <div
        className={`w-6 h-6 flex flex-col justify-center items-center absolute top-8 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-[50%] left-6 cursor-pointer text-[12px] text-red-600/60 hover:text-red-600 transition-all duration-200`}
        onClick={async () => {
          await DeleteProduct_(data_, () => {
            console.log("Document deleted.");
          }).then(() => {
            console.log("Reinitializing Products..");
            initProducts_();
          });
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>}
    </div>
  );
};

interface Cake_Props {
  data_: any;
}

export const Cake_ = ({ data_ }: Cake_Props) => {
  const [card_, setCard_] = useState(false);
  const [admin_, setAdmin_] = useRecoilState(AdminState);
  const [offers_, setOffers_] = useRecoilState(OfferState);
  const [offer_, setOffer_] = useRecoilState(OfferState2);
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [currentItem_, setCurrentItem_] = useRecoilState(CurrentItemState);
  const [categories_, setCategories_] = useRecoilState(CategoryState);
  const [cart_, setCart_] = useRecoilState(CartState);
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);

  const initProducts_ = async () => {
    const data_ = await getProducts_("products");
    setOffers_(data_);
  };

  useEffect(() => {
    const uniqueCategories = [
      // @ts-ignore
      ...new Set(offers_.map((offer) => offer.category)),
    ];
    setCategories_(uniqueCategories);
  }, [offers_]);

  return (
    <div
      className={`w-[300px] h-[350px] transition-all hover:duration-200 duration-500 flex flex-col justify-center items-center rounded-[4px] relative overflow-hidden`}
      onMouseEnter={() => setCard_(true)}
      onMouseLeave={() => setCard_(false)}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center text-white ${
          card_ ? "pb-[0px] duration-500" : "pb-[5px] duration-75"
        } transition-all`}
      >
        <div
          className={`w-full h-[50px] flex flex-col justify-center items-center relative bottom-[25px]`}
        >
          <div
            className={`w-full h-[80px] px-4 flex flex-col justify-center items-center`}
          >
            <div
              className={`w-full h-[40px] hover:bg-red-600 border-red-600 border-solid border-[1px] hover:animate-pulse hover:text-white/80 text-red-600/80 rounded-[3px] relative flex flex-col justify-center items-center scale-[0.9] cursor-pointer ${
                card_ ? "z-2 duration-500" : "z-0 duration-75"
              } transition-all`}
              onClick={() => {
                setOffer_(data_);
                setViewItem_(true);
                setCart_(false)
                setSideBar_(false)
              }}
            >
              <p className={`text-[15px] font-black`}>View this item</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-[300px] h-full transition-all duration-200 flex flex-col justify-center items-center rounded-[4px] my-2 scale-[1.1] pointer-events-none`}
      >
        <div
          className={`relative overflow-hidden w-[300px] h-full flex flex-col justify-center items-center rounded-[4px]`}
        >
          <img
            className={`w-full h-full object-cover relative rounded-[4px] ${
              card_ ? "bottom-[100px]" : "bottom-[0px]"
            } transition-all duration-200`}
            src={data_.display}
          />
          <div
            className={`absolute top-4 left-0 w-full min-h-[40px] pt-4 flex flex-col justify-end items-end pr-6`}
          >
            <p
              className={`bg-white/20 backdrop-blur-sm px-2 rounded text-[18px] text-white/90 font-black`}
            >
              {data_.title}
            </p>
            <p
              className={`bg-white/20 backdrop-blur-sm px-2 mt-1 rounded text-[12px] text-white/90 font-black`}
            >
              From <span className={`text-red-600`}>R{data_.price.sm}</span>
            </p>
            <div
              className={`w-[90%] h-[90px] flex flex-col justify-end items-center mt-[20%]`}
            >
              <p
                className={`bg-white/20 backdrop-blur-sm px-2 py-2 rounded text-[12px] text-white/90 font-medium transition-all ${
                  card_ ? "opacity-100 duration-1000" : "opacity-0 duration-200"
                }`}
              >
                {data_.desc}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full h-full flex flex-col justify-end items-center absolute pl-6 pr-8 pb-2 pointer-events-none ${
            card_
              ? "bottom-[100px] opacity-100 duration-200"
              : "bottom-[0px] opacity-0 duration-200"
          } transition-all`}
        >
          <div
            className={`rotate-180 _shade w-full h-full absolute top-0 ${
              card_ ? "bottom-[100px] opacity-100" : "bottom-[0px] opacity-0"
            } transition-all duration-200`}
          />
          <div
            className={`w-full h-full flex flex-col justify-end items-center absolute top-0 left-0 pb-2 px-8`}
          ></div>
        </div>
      </div>
      {admin_ && <div
        className={`w-6 h-6 flex flex-col justify-center items-center absolute top-8 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-[50%] left-6 cursor-pointer text-[12px] text-red-600/60 hover:text-red-600 transition-all duration-200`}
        onClick={async () => {
          await DeleteProduct_(data_, () => {
            console.log("Reinitializing Products..");
            initProducts_();
            console.log("Document deleted.");
          });
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>}
    </div>
  );
};


