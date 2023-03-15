import React from 'react'
import Navbar from "../components/navbar"
import Carousel from "../components/carousel"
import Card from "../components/card"
import Footer from "../components/footer"
import { useEffect, useState } from 'react'
import Axios from 'axios'
export default function Home() {

    const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState('');
    const load_data = async () => {
        let arrays = await Axios.post("http://localhost:5000/display");
        console.log(arrays);
        arrays = arrays.data.data;
        //first  . data in arrays is for to fetch data values among all the things send from backend and 2nd .data is bcoz in backend we have sent a key value pair named data
        setCategory(arrays[0]);
        setItems(arrays[1]);
    }


    useEffect(() => {
        load_data();
    }, [])

    return (
        <>
            <div><Navbar category={category} /></div>
            <div>


            </div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{setSearch(e.target.value)}} />
                            
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="d-block w-100" alt="..." style={{ "filter": "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="..." style={{ "filter": "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1650977599122-d20a4b52718f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bW9tb3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="..." style={{ "filter": "brightness(30%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div>
                {
                    category.map((values) => {
                        return (
                            <div className='m-3 row'>
                                <div>
                                    <h2>{values.CategoryName}</h2>
                                    <hr />
                                </div>


                                {
                                    items.filter((item_values) => item_values.CategoryName == values.CategoryName&&item_values.name.toLowerCase().includes(search.toLowerCase())).map((item_values) => {
                                        return (
                                            <div className='col-12 col-md-6 col-lg-3'>
                                                <Card
                                                    CategoryName={item_values.CategorName}
                                                    name={item_values.name}
                                                    img={item_values.img}
                                                    description={item_values.description}
                                                    options={item_values.options[0]}
                                                />
                                            </div>
                                        )
                                    })
                                }

                            </div>)
                    })
                }
            </div>
            <div><Footer /></div>
        </>
    )
}

