import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='px-20 py-8 bg-gradient-to-b  from-black via-black to-black w-full min-h-[40vh]'>
    <div className=' flex justify-between items-start flex-wrap '>
      <div className='w-2/6 '>
      <div className='w-[30%] mb-4'>
        <img className='w-full h-full' src="/assets/logo.png" alt="Logo" />
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum porro asperiores nam recusandae quasi saepe aliquid, consectetur cupiditate mollitia ratione ipsam id esse libero inventore voluptas vitae hic quas eveniet deserunt ipsa ducimus sequi consequuntur molestias
      </div>
      <div>
        <h1 className='font-semibold text-[#49A0CB] text-xl'>Links</h1>
        <ul className='mt-2 leading-[1.6]'>
          <li><Link to={"#"}>Home</Link></li>
          <li><Link to={"#"}>Find a job</Link></li>
          <li><Link to={"#"}>Post a job</Link></li>
          <li><Link to={"#"}>Blog</Link></li>
          <li><Link to={"#"}>Content</Link></li>
        </ul>
      </div>
      <div>
        <h1 className='font-semibold text-[#49A0CB] text-xl'>About</h1>
        <ul className='mt-2 leading-[1.6]'>
          <li><Link to={"#"}>Partners</Link></li>
          <li><Link to={"#"}>Careers</Link></li>
          <li><Link to={"#"}>Press</Link></li>
          <li><Link to={"#"}>Community</Link></li>
        </ul>
      </div>
      <div>
        <h1 className='font-semibold text-[#49A0CB] text-xl'>Support</h1>
        <ul className='mt-2 leading-[1.6]'>
          <li><Link to={"#"}>Customer Service</Link></li>
          <li><Link to={"#"}>Terms and Condition</Link></li>
          <li><Link to={"#"}>Security</Link></li>
          <li><Link to={"#"}>Our Team</Link></li>
        </ul>
      </div>
      <div>
        <h1 className='font-semibold text-[#49A0CB] text-xl'>Contact</h1>
        <ul className='mt-2 leading-[1.6]'>
          <li><Link to={"#"}>+91 8938070768</Link></li>
          <li><Link to={"#"}>recruitx12@gmail.com</Link></li>
        </ul>
      </div>
    </div>
    <p className='absolute text-sm bottom-2 left-[6%]'>&copy;2025 RecruitX. All rights reserved.</p>
    </div>
  )
}

export default Footer