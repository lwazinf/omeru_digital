import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Logo_ = () => {
  return (
    <div
      // style={{ y }}
      className={`flex flex-col justify-center items-center w-full h-[50px] text-[30px] pointer-events-none md:scale-[.3] scale-[.2] mt-9`}
    >
      <p
        className={`text-[220px] _rancho font-black relative right-[230px] top-[150px] text-red-600 z-[1]`}
      >
        X
      </p>
      <p
        className={`text-[250px] relative text-black/90 bottom-[180px] left-14 font-black tracking-[-10px] scale-[0.8]`}
      >
        Bakes
      </p>
      <span className={`absolute z-[1] scale-[0.5]`}>
        <div
          className={`bg-white/50 backdrop-blur-sm relative min-w-[250px] h-[100px] left-[500px] top-[50px] rounded-[8px] rounded-tl-[8px] flex flex-col justify-center items-start pl-2`}
        >
          <p className={`text-[80px] text-red-600  font-black tracking-[-2px]`}>
            <span className={`text-[60px]`}>&</span> Eats
          </p>
        </div>
      </span>
    </div>
  );
};

export const Social_ = () => {
  return (
    <div
      className={`relative w-full h-8 grid md:grid-cols-4 grid-cols-1 md:px-[80px] gap-6 duration-[1000ms] justify-items-center items-center transition-all`}
    >
      {[
        { icon: faTwitter },
        { icon: faFacebook },
        { icon: faInstagram },
        { icon: faLinkedin },
      ].map((obj_, index) => {
        return (
          <FontAwesomeIcon
            key={index}
            icon={obj_.icon}
            className={`transition-all md:text-[20px] text-[25px] cursor-pointer hover:text-[#ec1d2a] hover:duration-[75ms] duration-[1000ms] text-black/80`}
            onClick={() => {
              // go to twitter page
            }}
          />
        );
      })}
    </div>
  );
};

export const Social2_ = () => {
  return (
    <div
      className={`relative w-full h- flex flex-col px-[80px] duration-[1000ms] justify-items-center items-center transition-all`}
    >
      <p
        className={`absolute flex md:hidden top-[-90px] text-[15px] animate-pulse pointer-events-none w-[150px] -rotate-90 opacity-60`}
      >
        <span className={`mx-2 opacity-100 text-red-800`}>
          <FontAwesomeIcon icon={faArrowLeft} />{" "}
        </span>
        Our Socials
      </p>
      {[
        { icon: faTwitter },
        { icon: faFacebook },
        { icon: faInstagram },
        { icon: faLinkedin },
      ].map((obj_, index) => {
        return (
          <FontAwesomeIcon
            key={index}
            icon={obj_.icon}
            className={`transition-all md:text-[20px] text-[18px] cursor-pointer my-2 md:my-1 hover:text-[#ec1d2a] hover:duration-[75ms] duration-[1000ms] md:text-black/70`}
            onClick={() => {
              // go to twitter page
            }}
          />
        );
      })}
    </div>
  );
};
