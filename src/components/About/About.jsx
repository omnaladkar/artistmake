import React from 'react'
import { Link } from 'react-router-dom'
import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'

export default function 
() {
  return (
<section>
    <div className="container">
        <div className="flex justify-between gap">
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                <img src={aboutImg} alt=""/>
                <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                    <img src={aboutCardImg} alt="" />
                </div>
            </div>
            <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                <h2 className="heading"></h2>
                <p className="text_para">For 30 year in row new adnd world had recongnise teas</p>
                <p className="text_para mt-[30px]">our best is something we strive for each day</p>
                <Link to='/'>
                    <button className='btn'>learn more</button>
                </Link>
            </div>
        </div>
    </div>
</section>
  )
}
