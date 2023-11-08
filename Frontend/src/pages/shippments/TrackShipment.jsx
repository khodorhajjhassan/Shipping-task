import { useState } from "react";
import { trackShipment } from "../../Query";
import logo from '../../assets/pixel-logo.png';



const TrackShipment = () => {
  const [track, setTrack] = useState();
  const [waybill, setWaybill] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const getTrack = async () => {
      try {
        const res = await trackShipment(waybill);

            setTrack(res.data.data);

      } catch (err) {
        setTrack(null);
      }
    };
    getTrack();
  };


  return (
    <div className="w-full md:h-screen h-full bg-primary-500 m-auto py-40">
      <div className='absolute top-1 left-1 md:w-40 w-24 '>
        <a href="/login">
          <img src={logo} alt="" />
          </a>
          </div>
          <div className="bg-white  md:w-6/12 w-10/12 m-auto p-4 flex md:flex-row flex-col  gap-4 items-center rounded-xl shadow-xl">
            <h1 className=" font-bold text-md text-md md:w-3/12 w-full text-center ">
              Enter Waybill number:
            </h1>
            <div className="flex gap-4 w-9/12">
            <input
              className="border-2 rounded p-1 my-2 w-9/12 "
              type="text"
              onChange={(e) => setWaybill(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className=" bg-secondary-500  text-white font-bold  rounded w-3/12"
            >
              Search
            </button>
            </div>
          </div>

        <div className=" p-2 ">
          {track ? (
            <div className="bg-white w-4/5 m-auto rounded-xl shadow-xl">
              <div>
                <div
                  className="w-full md:flex block p-4 justify-between items-center"
                  key={track.waybill}
                >
                  <div className="">
                    <p className="font-bold ">
                      ORDER #<b className="text-blue-400">{track.waybill}</b>
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">
                      Status :
                      <b className="text-blue-400">{track.status}</b>
                    </p>
                  </div>
                </div>

                <div
                  className="
                                px-12 py-20 flex flex-col items-center  justify-center
                                sm:flex-row
                                "
                >
                  <div className="relative">
                    <div
                      className="
                                c1 shadow-md w-16 h-16 bg-green-400 rounded-full
                                flex justify-center items-center
                                "
                    >
                      <img className="w-10 h-10  " src="/dollar.svg" alt="" />
                    </div>
                    <p className="absolute md:top-20 top-5  ml-20 sm:ml-auto font-bold ">
                      Payment
                    </p>
                  </div>
                  <div
                    className={`
            l1 w-2 h-10 ${
              track.status === "in_progress" ||
              track.status === "shipped" ||
              track.status === "delivered"
                ? "bg-green-400"
                : "bg-gray-400"
            } shadow-md
            sm:w-20 sm:h-2
            `}
                  ></div>
                  <div className="relative">
                    <div
                      className={`c2 shadow-md w-16 h-16 ${
                        track.status === "in_progress" ||
                        track.status === "shipped" ||
                        track.status === "delivered"
                          ? "bg-green-400"
                          : "bg-gray-400"
                      }  rounded-full flex justify-center items-center `}
                    >
                      <img className="w-10 h-10  " src="/box.svg" alt="" />
                    </div>
                    <p className="absolute md:top-20 top-5  ml-20 sm:ml-auto font-bold ">
                      Package
                    </p>
                  </div>
                  <div
                    className={`l2 w-2 h-10 ${
                      track.status === "shipped" ||
                      track.status === "delivered"
                        ? "bg-green-400"
                        : "bg-gray-400"
                    } shadow-md
            sm:w-20 sm:h-2`}
                  ></div>
                  <div className="relative">
                    <div
                      className={`c1 shadow-md w-14 h-14 ${
                        track.status === "shipped" ||
                        track.status === "delivered"
                          ? "bg-green-400"
                          : "bg-gray-400"
                      } rounded-full flex justify-center items-center `}
                    >
                      <img className="w-10 h-10  " src="/delivery.svg" alt="" />
                    </div>
                    <p className="absolute md:top-20 top-5  ml-20 sm:ml-auto font-bold ">
                      Delivery
                    </p>
                  </div>
                  <div
                    className={`l3  w-2 h-10 ${
                      track.status === "delivered"
                        ? "bg-green-400"
                        : "bg-gray-400"
                    } shadow-md
            sm:w-20 sm:h-2`}
                  ></div>
                  <div className="relative">
                    <div
                      className={`c1 shadow-md w-14 h-14  ${
                        track.status === "delivered"
                          ? "bg-green-400"
                          : "bg-gray-400"
                      } rounded-full flex justify-center items-center `}
                    >
                      <img className="w-10 h-10  " src="/arrived.svg" alt="" />
                    </div>
                    <p className="absolute md:top-20 top-5  ml-20 sm:ml-auto font-bold  ">
                      Arrival
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          ) : (
            <p className="flex bg-white p-4 w-2/5 m-auto rounded font-didact-gothic justify-center text-2xl items-center font-bold text-red-500 mt-4">
              Order not found
            </p>
          )}
        </div>
      </div>
  );
};

export default TrackShipment;
