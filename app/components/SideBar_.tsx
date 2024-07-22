import { useRecoilState } from "recoil";
import {
  SideBarState,
  ProductsState,
  UserState,
  AdminState,
} from "./atoms/atoms";
import { Logo_, Social_ } from "./Logo_";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface SideBar_Props {}

const SideBar_ = () => {
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
  const [promote_, setPromote_] = useState(false);
  const [newPromo_, setNewPromo_] = useState(false);
  const [images_, setImages_] = useState<any>(null);
  const [admin_, setAdmin_] = useRecoilState(AdminState);

  const inputFile = useRef<HTMLInputElement>(null);
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    if (selectedFile && selectedFile.length > 0) {
      setImages_(selectedFile[0]);
    }
  };

  useEffect(() => {
    setPromote_(false);
    setNewPromo_(false)
  }, [sideBar_])

  return (
    <div
      className={`md:w-[250px] w-full min-h-screen bg-white/60 backdrop-blur-lg ${
        sideBar_
          ? "opacity-100 duration-200 left-0"
          : "opacity-100 duration-500 md:left-[-16%] left-[-100%]"
      } transition-all flex-col items-center justify-start pb-8 fixed top-0 shadow-lg hidden md:flex`}
    >
      <div className={`md:w-[250px] w-full min-h-screen absolute top-0 left-0`}>
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
      <div
        className={`md:w-[250px] w-full min-h-screen absolute top-0 left-0 flex flex-col justify-start items-center mt-4`}
      >
        <img
          className={`cursor-pointer w-[130px] mb-[-35px] transition-all duration-200 pointer-events-none`}
          src={`/assets/images/xbakeslogo.png`}
          onClick={() => {
            //   router.push("/");
          }}
        />
        <Logo_ />
        <Social_ />
        <div
          className={`flex flex-col justify-center items-center md:min-w-[300px] w-[250px] bg-red-600 relative rounded-md md:left-10 bottom-[-10px] md:h-[520px] h-[350px] shadow-xl overflow-hidden ${
            !promote_ && "cursor-pointer"
          } ${
            sideBar_
              ? "opacity-100 duration-[500ms] pointer-events-auto"
              : "opacity-100 duration-[200ms] pointer-events-none"
          }`}
          onClick={() => {
            if (!promote_) {
              setPromote_(true);
            }
          }}
        >
          <img
            className={`w-full h-full object-cover scale-[1.1] hover:scale-[1] transition-all duration-[500ms] hover:duration-[200ms]`}
            src={
              "/assets/images/cabinet.jpg"
              // featured_[feature_]
            }
          />
          {admin_ && (
            <div
              className={`w-full h-full bg-white/50 backdrop-blur-md absolute top-0 left-0 flex flex-col ${
                !newPromo_ ? 'justify-start' : 'justify-center'
                } items-center transition-all duration-75
              ${
                promote_
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {
                !newPromo_ && <div className={`w-full min-h-2 grid grid-cols-2 gap-1 gap-y-[4px] p-2 justify-start items-start overflow-scroll`}>
                  {[1, 2, 3, 4].map((obj_, index_) => {
                    return <div className={`h-[123px] w-full bg-white/70 rounded-[3px] cursor-pointer`} key={index_}/>
                  })}
                  <div className={`h-[123px] w-full bg-white/70 rounded-[3px] flex flex-col justify-center items-center invert hover:invert-0 transition-all duration-75 cursor-pointer`}
                  onClick={() => {
                    setNewPromo_(true)
                  }}>
                    <FontAwesomeIcon icon={faAdd} className={``}/>
                  </div>
                </div>
              }
              {
                newPromo_ && <div className={`w-full h-full flex flex-col justify-center items-center`}>
                  <div
                className={`bg-white/50 backdrop-blur-md w-[250px] h-[260px] rounded-md cursor-pointer relative overflow-hidden ${
                  promote_
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
                onClick={() => {
                  inputFile.current && inputFile.current.click();
                }}
              >
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={onSelectFile}
                  accept="image/png, image/jpeg, image/webp"
                  style={{ display: "none" }}
                />
                <img
                  className={`w-full h-full object-cover transition-all ${
                    images_
                      ? "opacity-100 duration-200"
                      : "opacity-0 duration-500"
                  }`}
                  src={images_ ? URL.createObjectURL(images_) : ""}
                  alt="Selected"
                />
              </div>
              <div
                className={`w-[250px] min-h-[150px] flex flex-col justify-start items-center pt-2 ${
                  promote_
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div
                  className={`bg-white/50 backdrop-blur-md w-[250px] h-[40px] rounded-md flex flex-col justify-center items-center`}
                >
                  <input
                    className={`text-[14px] font-medium text-start ${
                      promote_
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                    maxLength={25}
                    type="text"
                    placeholder="Promotional Link"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                      }
                    }}
                    onChange={(e) => {}}
                  />
                </div>
                <div
                  className={`bg-white/50 backdrop-blur-md w-[250px] min-h-[80px] mt-2 py-2 rounded-md flex flex-col justify-center items-center`}
                >
                  <textarea
                    className={`mb-[1.5px] text-[14px] font-medium text-start h-[90px]`}
                    maxLength={140}
                    placeholder={`Promotional Instruction`}
                    onChange={(e) => {}}
                  />
                </div>
              </div>
              <div
                className={`flex flex-row justify-center items-center w-full min-h-2 ${
                  promote_
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div
                  className={`flex flex-col justify-center items-center relative left-[17px] cursor-pointer hover:bg-black/80 transition-all duration-75 hover:text-white bg-white/60 text-black rounded-[4px] w-[100px] h-[50px] scale-[0.8]`}
                  onClick={() => {
                    // setPromote_(false);
                    setNewPromo_(false)
                  }}
                >
                  <FontAwesomeIcon icon={faAngleLeft} className={``} />
                </div>
                <div
                  className={`w-[255px] h-[50px] border-[1px] hover:border-white/50 border-red-600/50 bg-red-600 hover:bg-white text-white hover:text-black/80 transition-all duration-75 border-solid rounded-[4px] m-1 cursor-pointer flex flex-col justify-center items-center scale-[0.8] relative right-1`}
                  onClick={() => {}}
                >
                  <p className={`font-black`}>Promote</p>
                </div>
              </div>
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar_;
