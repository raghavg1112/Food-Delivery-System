import React from 'react'

export default function card({ C_name, name, img, description, options }) {
    let opt=Object.keys(options)
    return (
        <>
            <div className="card m-3" style={{ width: "18rem" }}>
                <img src={img} className="d-block w-100" alt="..." style={{height:"220px",objectFit:"fill"}} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <div className='container  w-100'>
                        <select className='bg-success rounded m-2' style={{cursor:"pointer"}} >
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (<option>
                                        {i + 1}
                                    </option>)
                                })
                            }
                        </select>
                        <select className='bg-success rounded m-2' style={{cursor:"pointer"}}>
                            {
                                opt.map((values) => {
                                    return (
                                        <option>{values}</option>
                                    )
                                })
                            }
                        </select>
                        <div className='d-inline m-2 '>
                            Total Price
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
