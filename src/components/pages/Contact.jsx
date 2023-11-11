import React from 'react'

export default function Contact() {
  return (
   <section>
    <div className="px-4 mx-auto max-w-screen-md">
      <h2 className="heading text-center">Contact Us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text_para">
        Got a technical issue? want to  send feef back a bout beta
      </p>
      <form action="#" className='space-y-8'>
        <div>
          <label htmlFor="email" className='form_label'>
            your email
          </label>
          <input 
          type="email"
          id="email"
          placeholder='example@gmail.com'
          className='form_input mt-1'/>
        </div>
        <div>
          <label htmlFor="subject" className='form_label'>
            subject
          </label>
          <input 
          type="text"
          id="subject"
          placeholder='Write what you want'
          className='form_input mt-1'/>
        </div>
        <div  className='sm:col-span-2'>
          <label htmlFor="message" className='form_label'>
          Your message
          </label>
          <textarea
          rows='6'
          type="text"
          id="message"
          placeholder='leave a comment'
          className='form_inpput mt-1'/>
        </div>
        <button type="submit" className='btn rounded sm:w-fit'>Submit</button>
      </form>
    </div>
   </section>
  )
}
