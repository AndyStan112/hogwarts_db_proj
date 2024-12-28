import React from "react";

const page = () => {
  return (
    <div>
      <section className="py-12 bg-gray-800 text-white text-center">
        <h1 className="text-4xl font-bold mt-12">Contact Us</h1>
      </section>

      <section className="py-12 px-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2264.7000968073567!2d-1.708495323508388!3d55.41558277296122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e00e0ed23bc0d%3A0x8783a98b290f641!2sCastelul%20Alnwick!5e0!3m2!1sro!2sro!4v1726884250275!5m2!1sro!2sro"
          width="100%"
          height="450"
          className="rounded-lg shadow-lg border-0 mb-6"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className="py-12 px-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-start space-x-4 mb-6">
              <i className="fa fa-home text-2xl text-yellow-600"></i>
              <div>
                <h5 className="text-lg font-semibold">Castle Alnwick</h5>
                <p className="text-gray-600">Alnwick NE66 1NQ, UK</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 mb-6">
              <i className="fa fa-envelope-o text-2xl text-yellow-600"></i>
              <div>
                <h5 className="text-lg font-semibold">
                  mmcgonagall@hogwarts.edu.ac.uk
                </h5>
                <p className="text-gray-600">E-mail us your query</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default page;
