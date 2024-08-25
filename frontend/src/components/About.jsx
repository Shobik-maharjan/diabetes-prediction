import React from "react";

const About = () => {
  return (
    <div className="py-10 h-[calc(100%-40%)]">
      <div className="container flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2 bg-white/80 p-4 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold pb-5">About Us</h1>
          <p className="text-lg mb-4">
            Welcome to our Diabetes Prediction platform! We're dedicated to
            empowering individuals with tools and knowledge to manage and
            understand their health better.
          </p>
          <p className="text-lg mb-4">
            Our team of healthcare professionals and data scientists work
            tirelessly to develop accurate and user-friendly diabetes prediction
            models. By leveraging the latest in technology and medical research,
            we strive to provide you with reliable insights into your health.
          </p>
          <p className="text-lg mb-4">
            Whether you're at risk of diabetes, managing the condition, or
            simply curious about your health, our platform is here to support
            you. Our mission is to offer accessible, science-backed predictions
            and resources to help you make informed decisions about your health
            and well-being.
          </p>
          <p className="text-lg">
            Thank you for choosing our platform as your trusted resource for
            diabetes prediction and management.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-world-diabetes-day-background_23-2149099905.jpg?t=st=1724014707~exp=1724018307~hmac=b5a0741389b57b538e8803981d99472c59426d75a706b2e9ae5e78e4d37c080b"
            alt=""
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
