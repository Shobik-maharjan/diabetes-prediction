import React from "react";

const Contact = () => {
  return (
    <>
      <div className="py-36 text-center">
        <h2 className="text-4xl font-bold mb-8">Contact Page</h2>

        <iframe
          className="w-full h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14127.644417729527!2d85.29896509999999!3d27.720030849999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18edc3c097f7%3A0x257203ef3defa67c!2sChamati%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1703287599547!5m2!1sen!2snp"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="max-w-xl mx-auto mt-12">
          <form
            action="https://formspree.io/f/mdoqnjwa"
            method="post"
            className="space-y-6"
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              autoComplete="off"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              required
              autoComplete="off"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />

            <textarea
              name="Message"
              placeholder="Enter your message"
              cols="30"
              rows="6"
              required
              autoComplete="off"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
