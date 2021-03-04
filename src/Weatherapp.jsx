import React, { useEffect, useState } from "react";
import Loading from "./Loading ";


function Weatherapp() {

    const [loading, setLoading] = useState(true);
    // const [widthCount, setWidthCount] = useState(window.screen.width);

    // const actuallWidth = () => {
    //     setWidthCount(window.innerWidth);
    // }
    // useEffect(() => {
    //     window.addEventListener("resize", actuallWidth);
        
    //     return () => {
    //         window.removeEventListener("resize", actuallWidth);
    //     }
    // })

    const [city, setcity] = useState(null) ;
    const [cntry, setCntry] = useState();
    const [weather, setWeather] = useState();
    const [search, setSearch] = useState("Kolkata");

    useEffect(() => {
        const fetchApi = async () => {
            try{
                const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=1f2ebd7a0a6aa3453c26fedcfe124a6b`
                setLoading(false);
                const resp = await fetch(url);
                const resJson = await resp.json();
                const arrData = [resJson];

                console.log(arrData);
                
                



                setcity(arrData[0].main);
                setCntry(arrData[0].sys.country);
                setWeather(arrData[0].weather[0].main)

            }catch(error) {

            }
            

        }

        fetchApi();
    }, [search])


    if(loading) {
        return <Loading/>
    }
    return (
        <>
            <div id="weatherapp">
                <div className="box">
                    <div className="wave -one"></div>
                    <div className="wave -two"></div>
                    <div className="wave -three"></div>

                    <div className="inputdata">
                        <input type="search"
                        onChange={(event) => {setSearch(event.target.value)}}/>
                    </div>

                    {!city ? (
                        <p className="errmsg">No Data Found</p>
                    ): (

                            <div className="info">
                                <div className="location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <h1>
                                        {search}, {cntry}
                                    </h1>
                                </div>
                                
                                <div className="weather">
                                    <h2>{weather}</h2>
                                </div>
                                <div className="temp">
                                    <h2>{city.temp}°C</h2>
                                    <p>Min: {city.temp_min}°C | Max: {city.temp_max}°C</p>
                                </div>
                                
                            </div>
                        )}
                </div>
            </div>
        </>
    )
}

export default Weatherapp;
