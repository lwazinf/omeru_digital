"use client";

import { useRecoilState } from "recoil";
import {
  BucketState,
  CartState,
  CurrentItemState,
  OfferState2,
  ProductsState,
  ViewItemState,
} from "../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Groq from "groq-sdk";
import Search_ from "../Search_";

interface ItemViewMobile_Props {}

const ItemViewMobile_ = () => {
  const [cart_, setCart_] = useRecoilState(CartState);
  const [products_, setProducts_] = useRecoilState(ProductsState);
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [offer_, setOffer_] = useRecoilState(OfferState2);
  const [size_, setSize_] = useState(0);
  const [unitPrompt_, setUnitPrompt_] = useState(false);

  const [price_, setPrice_] = useState(0);
  const [units_, setUnits_] = useState(1);

  const [newDesc_, setNewDesc_] = useState("");
  const [bucket_, setBucket_] = useRecoilState(BucketState);

  const init = () => offer_ && setPrice_(offer_.price[2]);

  const groq = new Groq({
    apiKey: "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", // This is the default and can be omitted
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    init();
    if (offer_ && viewItem_) {
      // handleSubmit(offer_ && offer_.desc);
    }
  }, [viewItem_]);
  return (
    <div
      className={`w-full min-h-screen flex-col justify-center items-center bg-white/70 backdrop-blur-md fixed top-0 left-0 transition-all ${
        viewItem_
          ? "opacity-100 pointer-events-auto duration-200"
          : "opacity-0 pointer-events-none duration-500"
      } md:hidden flex`}
    >
      <img
        className={`w-full min-h-screen object-cover relative`}
        src={`${offer_ ? offer_.display : ""}`}
      />
      <div
        className={`w-full h-screen absolute top-0 left-0 flex-row justify-center items-center transition-all p-4 top_fade `}
      >
        <div
          className={`w-full h-screen absolute top-0 left-0 flex-row justify-center items-center transition-all p-4 bottom_fade `}
        />
        <div
          className={`w-[140px] min-h-2 flex flex-row justify-center items-center`}
        >
          <div className={`w-[25px] h-[25px] bg-white rounded-[50%] mr-1 mt-2`}></div>
          <div
            className={`min-w-2 min-h-2 px-2 py-1 bg-white/10 mt-2 backdrop-blur-md rounded-[6px] mx-1 flex flex-col justify-center items-center text-[11px] font-bold text-white/70`}
          >
            Lwazi Ndlovu
          </div>
        </div>
        <div
          className={`w-[100px] h-[35px] rounded-[20px] mx-1 absolute top-0 right-0 m-4 flex-row justify-center items-center text-[13px] text-white`}
        >
          <div
            className={`w-full h-full flex flex-row justify-center items-center cursor-pointer`}
            onClick={() => {
              setViewItem_(false);
            }}
          >
            <div
            className={`min-w-2 min-h-2 px-2 py-0 bg-white/10 mt-2 backdrop-blur-md rounded-[6px] mx-1 flex flex-row justify-center items-center text-[11px] font-medium text-white/70`}
          >
            <FontAwesomeIcon icon={faAngleLeft} className={``} />
            <p
              className={`text-white text-[11px] ml-2 mt-[2.5px] font-medium mb-1`}
            >
              Back
            </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full min-h-2 absolute bottom-0 left-0 flex-col justify-center items-center transition-all`}
      >
        <div
          className={`w-full min-h-2 absolute bottom-0 left-0 flex-col justify-center items-center transition-all px-4`}
        >
          
          <div className={`text-white text-[25px] font-black mb-1 max-w-[180px] text-center px-2 py-1 bg-red-200/15 backdrop-blur-lg rounded-[6px]`}>
            {offer_ && offer_.title}
          </div>
          <p className={`text-white text-[18px] font-bold mb-1`}>
            <span
              className={`text-[10px] px-2 bg-red-600 animate-pulse hover:bg-red-600/60 transition-all duration-200 relative bottom-1 cursor-pointer rounded text-white`}
              onClick={() => {
                setUnitPrompt_(true);
              }}
            >
              x{units_}
            </span>{" "}
            {bucket_} {units_ > 1 ? "Buckets" : "Bucket"} for{" "}
            <span className={``}>
              R
              {offer_ && units_ * offer_.price[bucket_.replace("L", "").replace(".", "")]}
            </span>
          </p>
          <p className={`text-white/70 text-[13px] font-normal mb-3`}>
            {/* Deserunt sint labore culpa ut ea ex consequat est sint voluptate
            irure excepteur Lorem. Minim aliquip in deserunt consectetur aliquip
            qui excepteur ut cillum amet. Proident deserunt sint et culpa
            eiusmod sit do. */}
            {offer_ && offer_.desc}
          </p>
          <div
            className={`font-black w-full scale-[.8] mx-auto h-[50px] mb-2 transition-all duration-75 hover:duration-500 flex flex-row justify-center items-center`}
            onClick={() => {
              // setViewItem_(false);
            }}
          >
            {["2l", "5l", "6.5l", "10l", "20l"].map((obj_, index_) => {
              return (
                <div
                  className={`min-h-2 w-[100px] py-1 backdrop-blur-md rounded-[6px] mx-[4px] flex flex-col justify-center items-center font-medium cursor-pointer ${offer_ && price_ == offer_.price[obj_.replace("l", "").replace(".", "")] ? 'bg-red-600/80 text-black animate-pulse' : 'bg-white/30 text-white'}
                    
                     transition-all duration-75 hover:duration-500 hover:bg-white/10 text-white/70`}
                  key={index_}
                  onClick={() => {
                    setPrice_(
                      offer_.price[obj_.replace("l", "").replace(".", "")]
                    );
                    setBucket_(obj_.toUpperCase());
                  }}
                >
                  {obj_}
                </div>
              );
            })}
          </div>
          <div
            className={`w-[376px] h-[50px] mx-auto sm_2:m-0 mb-4 border-[1px] bg-red-600/80 backdrop-blur-md transition-all duration-75 hover:duration-500 cursor-pointer min-w-2 min-h-2 px-2 py-1 hover:bg-white/10 rounded-[6px] flex flex-col justify-center items-center text-[11px] font-bold text-white/70`}
            onClick={() => {
              setProducts_([
                {
                  name: offer_.title,
                  quantity: units_,
                  size: bucket_,
                  price:
                  offer_.price[bucket_.replace("L", "").replace(".", "")],
                  subtotal:
                  units_ * offer_.price[bucket_.replace("L", "").replace(".", "")],
                },
                ...products_,
              ]);
    
              setUnits_(1);
    
              setViewItem_(false);
              setCart_(true);
            }}
          >
            Add To Cart
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col justify-center items-center w-full min-h-screen absolute top-0 left-0 bg-white/50 backdrop-blur-md transition-all ${
          unitPrompt_
            ? "opacity-100 pointer-events-auto duration-75"
            : "opacity-0 pointer-events-none duration-200"
        }`}
      >
        <p
          className={`w-full h-[40px] text-center text-[20px] text-black font-black`}
        >
          {/* Currently set to {units_} {units_ > 1 ? "Buckets" : "Bucket"} */}
        </p>
        <textarea
          className={`w-full h-[40px] text-center text-[20px] text-black`}
          placeholder={`How many uinits would you like?`}
          onChange={(e) => {
            setUnits_(parseFloat(e.target.value) || 0)
          }}
        />
        <div
            className={`font-black text-white/80 w-[90%] mx-auto h-[50px] absolute bottom-4 border-[1px] bg-red-600/80 hover:bg-blue-200/80 backdrop-blur-md border-red-600/30 hover:border-white/50 transition-all duration-75 hover:duration-500 border-solid rounded-[3px] flex flex-row cursor-pointer justify-center items-center`}
            onClick={() => {
              setUnitPrompt_(false);
            }}
          >
            Apply
          </div>
      </div>
    </div>
  );
};

export default ItemViewMobile_;

// // // // // // // // Extra Comps // // // // // // // //
