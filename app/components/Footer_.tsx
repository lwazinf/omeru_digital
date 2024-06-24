import {
    faFacebook,
    faInstagram,
    faTwitter,
  } from "@fortawesome/free-brands-svg-icons";
  import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
  interface Footer_Props {}
  
  const Footer_ = ({}: Footer_Props) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return (
      <div
        className={`w-full min-h-[300px] flex flex-col justify-center items-center`}
      >
        <div
          className={`bg-[#a0a0a0] w-full h-[300px] flex flex-row justify-center items-center`}
        >
          <div
            className={`md:w-[90em] w-full h-full md:p-[25px] md:px-[75px] flex flex-row justify-evenly items-start text-black/80`}
          >
            <div
              className={`w-full h-full flex flex-col justify-start items-start`}
            >
              <div className={`text-[15px] font-black`}>
                <div
                  className={`bg-black/80 min-h-[50px] px-4 mb-2 flex flex-row justify-center items-end text-[20px] font-black cursor-default rounded-b-[2px] md:backdrop-blur-none backdrop-blur-md text-orange-50 hover:text-orange-200 duration-400 transition-all`}
                >
                  xBakes
                </div>
              </div>
              <div
                className={`w-full min-h-2 flex flex-row justify-start items-center opacity-100`}
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className={`h-[20px] w-[20px] text-black/60 hover:text-red-600 transition-all duration-[400ms] cursor-pointer mx-[6px]`}
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className={`h-[20px] w-[20px] text-black/60 hover:text-red-600 transition-all duration-[400ms] cursor-pointer mx-[6px]`}
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  className={`h-[20px] w-[20px] text-black/60 hover:text-red-600 transition-all duration-[400ms] cursor-pointer mx-[6px]`}
                />
              </div>
              <p
                className={`mt-auto text-[15px] font-black text-red-600 cursor-default`}
              >
                Move faster through us.
              </p>
              <p
                className={`text-[13px] font-medium text-black/60 cursor-default`}
              >
                Move faster through us. Move faster through us.
              </p>
            </div>
            <div
              className={`md:w-full h-full flex flex-col justify-start items-start`}
            >
              <div className={`text-[15px] font-black opacity-0`}>
                <div
                  className={`bg-black/80 min-h-[50px] px-4 mb-2 flex flex-row justify-center items-end text-[20px] font-black cursor-default rounded-b-[2px] md:backdrop-blur-none backdrop-blur-md`}
                >
                  Brand
                </div>
              </div>
              {/* <Triple_
                data_={[
                  "Placeholder_Link",
                  "Placeholder_Link",
                ]}
              />
              <Triple_
                data_={[
                  "Placeholder_Link",
                  "Placeholder_Link",
                ]}
              /> */}
              <div
                className={`w-full text-right mt-auto flex flex-row justify-center items-center md:relative bottom-0`}
              >
                <p
                  className={`w-full text-[11px] font-medium text-black cursor-default italic`}
                >
                  <a href={``} target="_blank">
                    BRAND NAME
                  </a>{" "}
                  © Copyright {currentYear}
                </p>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={`h-[20px] w-[20px] hover:text-red-600 text-black transition-all duration-[400ms] cursor-pointer mx-[8px]`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer_;
  
  interface Triple_Props {
    data_: any;
  }
  
  const Triple_ = ({ data_ }: Triple_Props) => {
    return (
      <div
        className={`w-full min-h-2 flex flex-row justify-start items-center opacity-100`}
      >
        {data_.map((obj_: any, index: any) => {
          return (
            <div
              className={`w-full h-[30px] mx-1 my-1 flex flex-row justify-start items-center text-[13px] font-medium opacity-70`}
              key={index}
            >
              <p
                className={`hover:text-orange-200 transition-all duration-[400ms] cursor-pointer`}
              >
                {data_[index]}
              </p>
            </div>
          );
        })}
      </div>
    );
  };