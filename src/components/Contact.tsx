import React from "react";

const Contact: React.FC = () => (
  <section className="w-full h-screen flex flex-col items-center justify-center bg-base-100 overflow-x-hidden">
    {/* TODO: Add contact form, social links, and career highlights */}
    <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
    <form className="w-full max-w-md flex flex-col gap-4">
      <input
        className="input input-bordered"
        type="text"
        placeholder="Your Name"
        required
      />
      <input
        className="input input-bordered"
        type="email"
        placeholder="Your Email"
        required
      />
      <textarea
        className="textarea textarea-bordered"
        placeholder="Your Message"
        required
      />
      <button className="btn btn-primary btn-block" type="submit">
        Send
      </button>
    </form>
    <div className="mt-8 flex gap-4">
      {/* Example social links */}
      <a className="btn btn-ghost" href="#">
        LinkedIn
      </a>
      <a className="btn btn-ghost" href="#">
        GitHub
      </a>
    </div>
  </section>
);

export default Contact;
