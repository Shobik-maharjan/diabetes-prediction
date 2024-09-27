import React from "react";

const HealthTips = () => {
  const tips = [
    {
      image: "./src/assets/images/corona.jpg",
      title: "COVID-19 Treatments: What You Need to Know",
      link: "https://www.verywellhealth.com/covid-19-treatments-in-the-pipeline-4801910",
    },
    {
      image: "./src/assets/images/acne.jpeg",
      title: "Acne is a common skin problem that develops",
      link: "https://www.verywellhealth.com/acne-overview-4581760",
    },
    {
      image: "./src/assets/images/vitamins.jpg",
      title: "What Vitamins Can Help With Inflammation?",
      link: "https://www.verywellhealth.com/the-best-vitamin-for-fighting-inflammation-4176859",
    },
    {
      image: "./src/assets/images/flu.jpg",
      title: "What to Know About Telehealth for the Flu",
      link: "https://www.verywellhealth.com/telehealth-for-the-flu-5116351",
    },
    {
      image: "./src/assets/images/redeye.jpg",
      title: "What Does Pink Eye Look Like?",
      link: "https://www.verywellhealth.com/pictures-of-pink-eye-conjunctivitis-5116243",
    },
    {
      image: "./src/assets/images/intbled.jpg",
      title: "Symptoms of Internal Bleeding",
      link: "https://www.verywellhealth.com/internal-bleeding-signs-symptoms-complications-4172951",
    },
  ];

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        SOME TIPS TO MAINTAIN HEALTHY LIFE
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={tip.image}
                alt={tip.title}
              />
              <div className="p-4">
                <p className="text-lg font-semibold mb-4">{tip.title}</p>
                <div className="flex justify-between items-center">
                  <a
                    href={tip.link}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Know More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
