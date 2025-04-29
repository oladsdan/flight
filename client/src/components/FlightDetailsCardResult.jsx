/* eslint-disable react/prop-types */

import { TicketsPlane, ArrowRight } from 'lucide-react';
import { IoIosAirplane } from "react-icons/io";
import { formatTravelTime } from './FlightFilterPanel';
import { useNavigate } from 'react-router-dom';


const FlightDetailsCardResult = ({item}) => {

    //navigate to the booking page
     const navigate = useNavigate();

     const handlebooking = () => {
        navigate("/flight-search/booking",);
    };


        const date = new Date(item?.legs[0].departure);
        const formattedDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric" });

        const formattedDepertureTime = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });

        const arrivalDate = new Date(item?.legs[0].arrival);
        const formattedArrivalTime = arrivalDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });

        const returnDepatureDate = new Date(item?.legs[1].departure);
        const formattedReturnDepatureTime = returnDepatureDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        });

        const returnArrivalDate = new Date(item?.legs[1].arrival);
        const formattedReturnArrivalTime = returnArrivalDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        });

        const ran = (Math.random() * (1.2 - 0.9) + 0.9).toFixed(2);
        const flexiblePrice = item?.price?.raw * ran;
        const formattedFlexiblePrice = flexiblePrice.toLocaleString("en-NG", {
          style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0
        });
       
    1

  return (
    <div>
            <div className="p-10">
                <div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg">
                    <div className="flex flex-row items-center flex-nowrap bg-gray-100 p-2">
                        <IoIosAirplane />
                        <h1 className="ml-2 uppercase font-bold text-gray-500">departure</h1>
                        <p className="ml-2 font-normal text-gray-500">{formattedDate}</p>
                    </div>
                    <div className="mt-2 flex justify-start bg-white p-2">
                        <div className="flex mx-2 ml-6 h8 px-2 flex-row items-center rounded-full bg-gray-100 p-1">
                         <IoIosAirplane />
                        <p className="font-normal text-sm ml-1 text-gray-500">Economy</p>
                        </div>
                    </div>
                   


                    {/* using grid layout */}

                    <div className="mt-2 grid auto-rows-min sm:grid-cols-4 gap-2 mx-6 ">
                        <div className="flex flex-row place-items-center p-2">
                                <img alt="Airline Logo" className="w-10 h-10" src={item?.legs[0]?.carriers?.marketing[0]?.logoUrl} />
                            
                                <div className="flex flex-col ml-2">
                                    <p className="text-xs text-gray-500 font-bold">{item?.legs[0]?.carriers.marketing[0]?.name}</p>
                                    <p className="text-xs text-gray-500">QR1456</p>
                                    <div className="text-xs text-gray-500">2*23kg</div>
                                </div>
                        </div>

                        <div className="flex flex-col p-2">
                            <p className="font-bold">{formattedDepertureTime}</p>
                            <p className="text-gray-500"><span className="font-bold">{item?.legs[0]?.origin?.displayCode}</span> {item?.legs[0]?.origin?.name}</p>
                            <p className="text-gray-500">{item?.legs[0]?.origin?.city}</p>
                        </div>


                        {/* the stops */}
                        <div className="flex flex-col py-6 items-center">
                            <p className="text-xs text-foreground/70">{formatTravelTime(item.legs[0]?.durationInMinutes)}</p>
                            <div className="flex items-center w-20 md:w-32">
                                <div className="h-[2px] flex-grow bg-gray-300"></div>
                                <ArrowRight className="h-4 w-4 text-gray-400 mx-1" />
                                <div className="h-[2px] flex-grow bg-gray-300"></div>
                            </div>
                            <div className="flex items-center text-xs text-foreground/70 mt-1">
                                {item.legs[0].stopCount === 0 ? (
                                <span>Direct</span>
                                ) : (
                                <span>{item.legs[0].stopCount} stop{item.legs[0].stopCount > 1 ? 's' : ''}</span>
                                )}
                            </div>
                        </div>
        


                        <div className="flex flex-col flex-wrap p-2">
                            <p className="font-bold">{formattedArrivalTime}</p>
                            <p className="text-gray-500"><span className="font-bold">{item?.legs[0]?.destination?.displayCode}</span> {item?.legs[0]?.destination?.name}</p>
                            <p className="text-gray-500">{item?.legs[0]?.destination?.city}</p>
                        </div>

                        {/* return Leg */}
                        
                        {item?.legs[1] && (

                            <>
                                <div className="flex flex-row place-items-center p-2">
                                        <img alt="Airline Logo" className="w-10 h-10" src={item?.legs[1]?.carriers?.marketing[0]?.logoUrl} />
                                    
                                    <div className="flex flex-col ml-2">
                                        <p className="text-xs text-gray-500 font-bold">{item?.legs[1]?.carriers.marketing[0]?.name}</p>
                                        <p className="text-xs text-gray-500">QR1456</p>
                                        <div className="text-xs text-gray-500">2*23kg</div>
                                    </div>
                                </div>

                                <div className="flex flex-col p-2">
                                    <p className="font-bold">{formattedReturnDepatureTime}</p>
                                    <p className="text-gray-500"><span className="font-bold">{item?.legs[1]?.origin?.displayCode}</span> {item?.legs[1]?.origin?.name}</p>
                                    <p className="text-gray-500">{item?.legs[0]?.origin?.city}</p>
                                </div>


                                <div className="flex flex-col py-6 items-center">
                                    <p className="text-xs text-foreground/70">{formatTravelTime(item.legs[1]?.durationInMinutes)}</p>
                                    <div className="flex items-center w-20 md:w-32">
                                        <div className="h-[2px] flex-grow bg-gray-300"></div>
                                        <ArrowRight className="h-4 w-4 text-gray-400 mx-1" />
                                        <div className="h-[2px] flex-grow bg-gray-300"></div>
                                    </div>
                                    <div className="flex items-center text-xs text-foreground/70 mt-1">
                                        {item.legs[0].stopCount === 0 ? (
                                        <span>Direct</span>
                                        ) : (
                                        <span>{item.legs[1].stopCount} stop{item.legs[1].stopCount > 1 ? 's' : ''}</span>
                                        )}
                                    </div>
                                </div>
                                
                                

                                
                                <div className="flex flex-col flex-wrap p-2">
                                    <p className="font-bold">{formattedReturnArrivalTime}</p>
                                    <p className="text-gray-500"><span className="font-bold">{item?.legs[1]?.destination?.displayCode}</span> {item?.legs[1]?.destination?.name}</p>
                                    <p className="text-gray-500">{item?.legs[0]?.destination?.city}</p>
                                </div>
                            </>

                        )}


                    </div>


                   
                    {/* ticket price */}

                    <div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
                        <div className="flex mx-6 py-4 flex-row flex-wrap">
                        <TicketsPlane />
                        <div className="text-sm mx-2 flex flex-col">
                            <p className="">Standard Ticket</p>
                            <p className="font-bold">{item?.price?.formatted}</p>
                            <p className="text-xs text-gray-500">Price per adult</p>
                        </div>
                        <button className="w-32 h-11 rounded flex border-solid border bg-white mx-2 justify-center place-items-center"><div className="">Book</div></button>
                        </div>
                        <div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
                            <TicketsPlane />
                        <div className="text-sm mx-2 flex flex-col">
                            <p>Flexible Ticket</p>
                            <p className="font-bold">{formattedFlexiblePrice}</p>
                            <p className="text-xs text-gray-500">Price per adult</p>
                        </div>
                        <button onClick={handlebooking} className="w-32 h-11 rounded flex border-solid border text-white bg-green-800 mx-2 justify-center place-items-center"><div className="">Book</div></button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
           
    

  )
}

export default FlightDetailsCardResult