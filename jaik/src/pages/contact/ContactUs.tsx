import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import ContactForm from "./ContactForm";

const ContactUs: React.FC = () => {
  return (
    <>
      {/* Breadcrumb Section */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/banner/contact.avif"
          alt="breadcrumb"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contact Us Section */}
      <section
        id="schedule-your-meeting"
        className="py-12 px-4 sm:px-6 lg:px-12 overflow-hidden"
      >
        <div className="mb-8 text-start">
          <h2 className="text-2xl font-bold text-red-600 relative inline-block pl-10 before:content-[''] before:absolute before:top-1 before:left-0 before:w-5 before:h-5 before:bg-red-600 before:rounded-full after:content-[''] after:absolute after:top-1 after:left-2.5 after:w-5 after:h-5 after:border-2 after:border-white after:rounded-full">
            Schedule Your Meeting
          </h2>
          <p className="text-[15px] text-white max-w-3xl mt-2 font-medium">
            Book a consultation with our team and share your requirements. We
            will confirm your preferred meeting slot.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="contactLeft">
              <ContactForm />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="contactRight flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-red-600 py-3 px-4">
                <div className="rounded-full w-8 h-8 flex justify-center items-center text-white bg-neutral-950">
                  <FaMapMarkerAlt size={16} />
                </div>
                <p className="text-white">Noida - A 82, Sector 63, Noida, UP</p>
              </div>
              <div className="flex items-center gap-3 bg-red-600 py-3 px-4">
                <div className="rounded-full w-8 h-8 flex justify-center items-center text-white bg-neutral-950">
                  <FaEnvelope size={16} />
                </div>
                <a href="#" className="text-white">
                  
                </a>
              </div>
              <div className="flex items-center gap-3 bg-red-600 py-3 px-4">
                <div className="rounded-full w-8 h-8 flex justify-center items-center text-white bg-neutral-950">
                  <FaPhone size={16} />
                </div>
                <a href="#" className="text-white">
                  +91-8874882735
                </a>
              </div>
              <div className="flex items-center gap-3 bg-red-600 py-3 px-4">
                <div className="rounded-full w-8 h-8 flex justify-center items-center text-white bg-neutral-950">
                  <FaPhone size={16} />
                </div>
                <a href="#" className="text-white">
                  +91-9711487316
                </a>
              </div>
              <div className="flex items-center gap-3 bg-red-600 py-3 px-4">
                <div className="rounded-full w-8 h-8 flex justify-center items-center text-white bg-neutral-950">
                  <FaPhone size={16} />
                </div>
                <a href="#" className="text-white">
                  +91-120-4200970
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d53847.80248475084!2d77.33872244173637!3d28.620883471509963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390cef6105705e55%3A0xe206b5e4f7fd200c!2sJaikvik%20Technology%20India%20Pvt.%20Ltd.%20A-82%2C%20Sector%2063%20Rd%20A%20Block%2C%20Sector%2063%20Noida%2C%20Uttar%20Pradesh%20201301!3m2!1d28.6208897!2d77.3799222!5e1!3m2!1sen!2sin!4v1735297470645!5m2!1sen!2sin"
          allowFullScreen
          className="w-full h-[300px]"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default ContactUs;
