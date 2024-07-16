"use client";

import { useRecoilState } from "recoil";
import {
  CartState,
  CurrentItemState,
  OfferState2,
  ProductsState,
  ViewItemState,
} from "./atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Groq from "groq-sdk";

interface ItemView_Props {}

const ItemView_ = () => {
  const [products_, setProducts_] = useRecoilState(ProductsState);
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [offer_, setOffer_] = useRecoilState(OfferState2);
  const [size_, setSize_] = useState(0);

  const [price_, setPrice_] = useState(0);

  const [newDesc_, setNewDesc_] = useState("");
  const [bucket_, setBucket_] = useState("2L");

  const init = () => offer_ && setPrice_(offer_.price[2]);

  const groq = new Groq({
    apiKey: "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", // This is the default and can be omitted
    dangerouslyAllowBrowser: true,
  });

  const handleSubmit = async (text: string) => {
    try {
      if (!text) {
        throw new Error("Text is required"); // Handle case where text is empty or null
      }

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `write captivating copy about this: ${text}. make it 50 characters minimum but keep it under 50 characters.`,
          },
        ],
        model: "llama3-8b-8192",
      });

      console.log(chatCompletion.choices[0].message.content);
      const response = chatCompletion.choices[0].message.content;
      // @ts-ignore
      setNewDesc_(response);
    } catch (error) {
      console.error(error);
      // @ts-ignore
      console.log(error.message);
    }
  };

  useEffect(() => {
    init();
    if (offer_ && viewItem_) {
      // handleSubmit(offer_ && offer_.desc);
    }
  }, [viewItem_]);
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-center items-center bg-white/70 backdrop-blur-md fixed top-0 left-0 transition-all ${
        viewItem_
          ? "opacity-100 pointer-events-auto duration-200"
          : "opacity-0 pointer-events-none duration-500"
      }`}
    >
      <div
        className={`w-[1200px] h-screen flex flex-row justify-center py-8 items-center relative ${
          offer_ ? "opacity-100 duration-[1000ms]" : "duration-75 opacity-100"
        } transition-all`}
      >
        <div
          className={`h-full flex flex-col justify-center items-start min-w-4`}
        >
          <img
            className={`w-[750px] h-[500px] object-cover rounded-sm relative`}
            src={`${offer_ ? offer_.display : ""}`}
          />
          <p
            className={`text-[60px] font-black text-black/30 relative leading-[1] tracking-tight`}
          >
            {offer_ && offer_ ? offer_.title : ""} <br />
            <span
              className={`text-black/80 text-[90px] font-black tracking-tighter ${
                offer_ && offer_.type != "Bulk" ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className={`text-red-600/80 _Bungee font-medium`}>
                {bucket_}
              </span>
              BUCKET
            </span>
          </p>
        </div>
        <div
          className={`h-[500px] flex flex-col justify-center items-center min-w-[200px] mb-[151px]`}
        >
          <div
            className={`w-[350px] h-[80px] flex flex-col justify-center items-center p-4`}
          >
            {offer_ && offer_.desc}
          </div>
          {offer_ && offer_.type == "Cake" && <CakeItem_ offer_={offer_} />}
          {offer_ && offer_.type == "Bulk" && <BulkItem_ offer_={offer_} />}
          {offer_ && offer_.type == "Single" && <SingleItem_ offer_={offer_} />}
        </div>
      </div>
    </div>
  );
};

export default ItemView_;

// // // // // // // // Extra Comps // // // // // // // //

// // // // // // // // // // // // // //
// // // // // // // // // // // // // //

interface CakeItem_Props {
  offer_: any;
}

const CakeItem_ = ({ offer_ }: CakeItem_Props) => {
  const [selectedSize_, setSelectedSize_] = useState("");
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [cart_, setCart_] = useRecoilState(CartState);
  const [products_, setProducts_] = useRecoilState(ProductsState);
  const [topper_, setTopper_] = useState(false);
  const [selectedFlavour_, setSelectedFlavour_] = useState("");
  const [bucket_, setBucket_] = useState("2L");
  const [quantity_, setQuantity_] = useState(1);
  const [menu_, setMenu_] = useState("");

  const inputFile = useRef<HTMLInputElement>(null);

  const transformList = (obj: Object) =>
    Object.entries(obj).map(([name, value]) => ({ name, value }));

  return (
    <div
      className={`w-[350px] min-h-2 flex flex-col justify-center items-center relative`}
    >
      <div
        className={`backdrop-blur-md w-full h-full flex flex-col justify-center items-center transition-all opacity-100`}
      >
        {offer_ && (
          <div
            className={`w-[255px] transition-all duration-75 hover:duration-500 border-solid rounded-[3px] mb-0 flex flex-col justify-center items-center opacity-80 overflow-hidden relative`}
          >
            {[
              {
                name: "Select Size",
                func: () => {
                  setMenu_("Size");
                },
              },
              {
                name: "Select Flavour",
                func: () => {
                  setMenu_("Flavour");
                },
              },
              {
                name: "Topper",
                func: () => {
                  setMenu_("");
                  setTopper_(!topper_);
                  if (!topper_) {
                    inputFile.current && inputFile.current.click();
                  }
                },
              },
            ].map((obj_, index_) => {
              return (
                <div
                  className={`min-w-[40%] min-h-2 py-1 my-1 flex flex-row justify-center items-start bg-white/90 hover:bg-red-600/80 hover:text-white/80 text-black/80 transition-all hover:duration-100 backdrop-blur-md rounded-md ${
                    menu_
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100 pointer-events-auto"
                  } cursor-pointer`}
                  key={index_}
                  onClick={obj_.func}
                >
                  <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    // onChange={onSelectFile}
                    accept="image/png, image/jpeg, image/webp"
                    style={{ display: "none" }}
                  />
                  <div className="w-full min-h-2 flex flex-col justify-center items-center">
                    <div className="w-full flex flex-row justify-center items-center">
                      {obj_.name == "Select Size" && (
                        <p className="ml-1 scale-[0.8]">
                          {selectedSize_ && obj_.name == "Select Size"
                            ? selectedSize_ == "lg"
                              ? "Size: Large"
                              : selectedSize_ == "md"
                              ? "Size: Medium"
                              : "Size: Small"
                            : obj_.name}
                        </p>
                      )}
                      {obj_.name == "Select Flavour" && (
                        <p className="ml-1 scale-[0.8]">
                          {selectedFlavour_ && obj_.name == "Select Flavour"
                            ? selectedFlavour_
                            : obj_.name}
                        </p>
                      )}
                      {obj_.name == "Topper" && (
                        <p className="ml-1 scale-[0.8]">
                          {topper_ && obj_.name == "Topper"
                            ? "Topper Selected"
                            : obj_.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`min-w-2 h-full flex flex-col justify-center items-center pr-3`}
                  >
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={`text-[10px] mt-2`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div
          className={`absolute top-0 left-0 w-full h-full ${
            menu_ == "Size"
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } flex flex-col justify-center items-center`}
        >
          {offer_ &&
            menu_ == "Size" &&
            transformList(offer_.price).map((obj_, index_) => {
              return (
                <div
                  className="min-w-[40%] min-h-2 py-1 my-1 flex flex-row justify-center items-start bg-white/90 hover:bg-red-600/80 hover:text-white/80 text-black/80 transition-all hover:duration-100 backdrop-blur-md rounded-md cursor-pointer"
                  key={index_}
                  onClick={() => {
                    setSelectedSize_(obj_.name);
                    setMenu_("");
                  }}
                >
                  <div className="w-full min-h-2 flex flex-col justify-center items-center">
                    <div className="w-full flex flex-row justify-center items-center">
                      <p className="ml-1 scale-[0.8]">
                        {obj_.name == "lg"
                          ? "Large"
                          : obj_.name == "md"
                          ? "Medium"
                          : "Small"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`min-w-[50px] h-full flex flex-col justify-center items-end pr-1`}
                  >
                    <p className="ml-1 scale-[0.8]">R {obj_.value}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div
          className={`absolute top-0 left-0 w-full h-full ${
            menu_ == "Flavour"
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } flex flex-col justify-center items-center`}
        >
          {offer_ &&
            menu_ == "Flavour" &&
            offer_.flavours.map((obj_: any, index_: any) => {
              return (
                <div
                  className="min-w-[40%] min-h-2 py-1 my-1 flex flex-row justify-center items-start bg-white/90 hover:bg-red-600/80 hover:text-white/80 text-black/80 transition-all hover:duration-100 backdrop-blur-md rounded-md cursor-pointer"
                  key={index_}
                  onClick={() => {
                    setSelectedFlavour_(obj_);
                    setMenu_("");
                  }}
                >
                  <div className="w-full min-h-2 flex flex-col justify-center items-center">
                    <div className="w-full flex flex-row justify-center items-center">
                      <p className="ml-1 scale-[0.8]">{obj_}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div
        className={`w-[550px] h-[60px] flex flex-row justify-center items-center scale-[.9] pointer-events-none mb-0`}
      >
        <p className={`font-black text-black/50 text-[60px]`}>
          <span className={`text-red-600/80 _Bungee font-medium`}>R</span>
          {selectedSize_ && topper_
            ? offer_.price[selectedSize_] + 136
            : selectedSize_
            ? offer_.price[selectedSize_]
            : 0}
        </p>
      </div>
      <div
        className={`w-[255px] h-[50px] border-[1px] bg-red-600 border-red-600/30 transition-all duration-75 hover:duration-500 border-solid rounded-[3px] m-1 relative top-4 cursor-pointer flex flex-col justify-center items-center ${
          offer_ && offer_.type == "Single" && "mt-10"
        }`}
        onClick={() => {
          setProducts_([
            {
              name: offer_.title,
              quantity: quantity_,
              size: selectedSize_,
              flavour: selectedFlavour_,
              topper: topper_,
              price:
                selectedSize_ && topper_
                  ? offer_.price[selectedSize_] + 136
                  : offer_.price[selectedSize_],
              subtotal:
                selectedSize_ && topper_
                  ? offer_.price[selectedSize_] + 136
                  : offer_.price[selectedSize_],
            },
            ...products_,
          ]);

          setQuantity_(1);

          setViewItem_(false);
          setCart_(true);
        }}
      >
        <p className={`font-black text-white`}>ADD TO CART</p>
      </div>
      <div
        className={`w-[255px] h-[50px] border-[1px] border-black/50 hover:bg-black hover:text-white text-black/80 transition-all duration-75 hover:duration-500 border-solid rounded-[3px] m-1 relative top-4 cursor-pointer flex flex-col justify-center items-center scale-[0.8]`}
        onClick={() => {
          setQuantity_(1);
          setViewItem_(false);
          setCart_(false);
        }}
      >
        <p className={`font-black`}>Back</p>
      </div>
    </div>
  );
};

// // // // // // // // // // // // // //
// // // // // // // // // // // // // //

interface BulkItem_Props {
  offer_: any;
}

const BulkItem_ = ({ offer_ }: BulkItem_Props) => {
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [cart_, setCart_] = useRecoilState(CartState);
  const [products_, setProducts_] = useRecoilState(ProductsState);
  const [quantity_, setQuantity_] = useState(0);
  const [bucket_, setBucket_] = useState("2L");
  const [price_, setPrice_] = useState(0);
  const [menu_, setMenu_] = useState("");

  return (
    <div
      className={`w-[350px] min-h-2 flex flex-col justify-center items-center relative`}
    >
      <div
        className={`backdrop-blur-md w-full h-full flex flex-col justify-center items-center transition-all opacity-100`}
      >
        <div
          // className={` cursor-pointer  ${
          //   offer_ && offer_.type == "Bulk" ? "flex" : "hidden"
          // }`}
          className={`w-[255px] h-[50px] mx-[1px] cursor-pointer flex flex-row justify-center items-center bg-white/90 hover:bg-red-600/80 hover:text-white/80 text-black/80 transition-all hover:duration-75 backdrop-blur-md rounded-[3px] m-1 mb-[-40px] ${
            offer_ && offer_.type == "Bulk" ? "flex" : "hidden"
          }`}
        >
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={`font-medium text-black/50 w-[50%] text-right pr-2`}
            placeholder={"1"}
            value={quantity_}
            onChange={(e) => {
              if (e.target.value === "") {
                setQuantity_(0);
              } else {
                setQuantity_(parseFloat(e.target.value));
              }
            }}
          />

          <p className={`font-medium text-black/50 w-[50%]`}>
            {quantity_ > 1 ? "units" : "unit"}
          </p>
        </div>

        <div
          className={`w-[255px] h-[50px] transition-all duration-75 hover:duration-500 border-solid rounded-[3px] m-1 cursor-pointer flex-row justify-center items-center mt-12 ${
            offer_ && offer_.type == "Bulk" ? "flex" : "hidden"
          }`}
        >
          {offer_ &&
            Object.keys(offer_.price)
              .map((key) => ({
                size: key == "65" ? "6.5" : key,
                value: offer_.price[key],
              }))
              .map((obj_, index) => {
                return (
                  <div
                    className={`w-[50px] h-[50px] mx-[1px] cursor-pointer flex flex-col justify-center items-center bg-white/90 hover:bg-red-600/80 hover:text-white/80 text-black/80 transition-all hover:duration-75 backdrop-blur-md rounded-[3px]`}
                    key={index}
                    onClick={() => {
                      setBucket_(obj_.size + "L");
                      setPrice_(obj_.value);
                    }}
                  >
                    <p className={`font-medium scale-[0.8]`}>{obj_.size}L</p>
                  </div>
                );
              })}
        </div>
      </div>
      <div
        className={`w-[550px] h-[60px] flex flex-row justify-center items-center scale-[.9] pointer-events-none mb-0`}
      >
        <p className={`font-black text-black/50 text-[60px]`}>
          <span className={`text-red-600/80 _Bungee font-medium`}>R</span>
          {quantity_ * price_}
        </p>
      </div>
      <div
        className={`w-[255px] h-[50px] border-[1px] bg-red-600 border-red-600/30 transition-all duration-75 hover:duration-500 border-solid rounded-[3px] m-1 relative top-4 cursor-pointer flex flex-col justify-center items-center ${
          offer_ && offer_.type == "Single" && "mt-10"
        }`}
        onClick={() => {
          setProducts_([
            {
              name: offer_.title,
              quantity: quantity_,
              size: bucket_,
              price: price_,
              subtotal: quantity_ * price_,
            },
            ...products_,
          ]);

          setQuantity_(0);

          setViewItem_(false);
          setCart_(true);
        }}
      >
        <p className={`font-black text-white`}>ADD TO CART</p>
      </div>
      <div
        className={`w-[255px] h-[50px] border-[1px] border-black/50 hover:bg-black hover:text-white text-black/80 transition-all duration-75 hover:duration-500 border-solid rounded-[3px] m-1 relative top-4 cursor-pointer flex flex-col justify-center items-center scale-[0.8]`}
        onClick={() => {
          setQuantity_(1);
          setViewItem_(false);
          setCart_(false);
        }}
      >
        <p className={`font-black`}>Back</p>
      </div>
    </div>
  );
};

// // // // // // // // // // // // // //
// // // // // // // // // // // // // //

interface SingleItem_Props {
  offer_: any;
}

const SingleItem_ = ({ offer_ }: SingleItem_Props) => {
  const [viewItem_, setViewItem_] = useRecoilState(ViewItemState);
  const [cart_, setCart_] = useRecoilState(CartState);
  const [products_, setProducts_] = useRecoilState(ProductsState);
  const [quantity_, setQuantity_] = useState(1);

  return (
    <div
      className={`w-[350px] min-h-2 flex flex-col justify-center items-center relative`}
    >
      <div
        className={`w-full h-full flex flex-col justify-center items-center transition-all opacity-100`}
      >
        <div
          // className={` cursor-pointer  ${
          //   offer_ && offer_.type == "Bulk" ? "flex" : "hidden"
          // }`}
          className={`w-[255px] h-[50px] mx-[1px] cursor-pointer flex flex-row justify-center items-center bg-white/90 hover:bg-red-600/80 hover:text-white/80 text-black/80 transition-all hover:duration-75 rounded-[3px] m-1 mb-[-20px]`}
        >
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={`font-medium text-black/50 w-[50%] text-right pr-2`}
            placeholder={"1"}
            value={quantity_}
            onChange={(e) => {
              if (e.target.value === "") {
                setQuantity_(0);
              } else {
                setQuantity_(parseFloat(e.target.value));
              }
            }}
          />

          <p className={`font-medium text-black/50 w-[50%]`}>
            {quantity_ > 1 ? "units" : "unit"}
          </p>
        </div>
      </div>
      <div
        className={`w-[550px] h-[60px] flex flex-row justify-center items-center scale-[.9] pointer-events-none mb-[-40px]`}
      >
        <p className={`font-black text-black/50 text-[60px]`}>
          <span className={`text-red-600/80 _Bungee font-medium`}>R</span>
          {quantity_ * offer_.price}
        </p>
      </div>
      <div
        className={`w-[255px] h-[50px] border-[1px] bg-red-600 border-red-600/30 transition-all duration-75 hover:duration-500 border-solid rounded-[3px] m-1 relative top-4 cursor-pointer flex flex-col justify-center items-center ${
          offer_ && offer_.type == "Single" && "mt-10"
        }`}
        onClick={() => {
          setProducts_([
            {
              name: offer_.title,
              quantity: quantity_,
              size: null,
              price: offer_.price,
              subtotal: quantity_ * offer_.price,
            },
            ...products_,
          ]);

          setQuantity_(1);

          setViewItem_(false);
          setCart_(true);
        }}
      >
        <p className={`font-black text-white`}>ADD TO CART</p>
      </div>
      <div
        className={`w-[255px] h-[50px] border-[1px] border-black/50 hover:bg-black hover:text-white text-black/80 transition-all duration-75 hover:duration-500 border-solid rounded-[3px] m-1 relative top-4 cursor-pointer flex flex-col justify-center items-center scale-[0.8]`}
        onClick={() => {
          setQuantity_(1);
          setViewItem_(false);
          setCart_(false);
        }}
      >
        <p className={`font-black`}>Back</p>
      </div>
    </div>
  );
};
