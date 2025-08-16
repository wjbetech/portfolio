import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Contact: React.FC = () => (
  <motion.section
    className="w-full h-screen flex flex-col items-center justify-center bg-base-100 overflow-x-hidden max-w-[90%] mx-auto"
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}>
    {/* TODO: Add contact form, social links, and career highlights */}
    <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
    <form className="w-full max-w-md flex flex-col gap-4">
      <input className="input input-bordered w-full" type="text" placeholder="Your Name" required />
      <input className="input input-bordered w-full" type="email" placeholder="Your Email" required />
      <textarea className="textarea textarea-bordered w-full" placeholder="Your Message" required />
      <button className="btn btn-primary btn-block" type="submit">
        Send
      </button>
    </form>
    <div className="mt-8 flex gap-4">
      <a
        className="btn btn-ghost text-xl"
        href="https://www.linkedin.com/in/your-linkedin/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn">
        <FaLinkedin />
      </a>
      <a
        className="btn btn-ghost text-xl"
        href="https://github.com/your-github"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub">
        <FaGithub />
      </a>
      <a
        className="btn btn-ghost text-xl"
        href="https://instagram.com/your-instagram"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram">
        <FaInstagram />
      </a>
      <a
        className="btn btn-ghost text-xl"
        href="https://x.com/your-x"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X">
        <FaXTwitter />
      </a>
    </div>
  </motion.section>
);

export default Contact;
