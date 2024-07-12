import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Logo_ = () => {
    return (
      <div
        // style={{ y }}
        className={`flex flex-col justify-center items-center w-full h-[50px] text-[30px] pointer-events-none scale-[.3] mt-9`}
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
            className={`relative w-full h-8 grid grid-cols-4 px-[80px] gap-6 duration-[1000ms] justify-items-center items-center transition-all`}
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
                  className={`transition-all text-[20px] cursor-pointer hover:text-[#ec1d2a] hover:duration-[75ms] duration-[1000ms] text-black/80`}
                  onClick={() => {
                    // go to twitter page
                  }}
                />
              );
            })}
          </div>
     );
  }
   