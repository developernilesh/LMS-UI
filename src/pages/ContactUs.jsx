import React from "react";
import ContactUsForm from "../components/Contact/ContactUsForm";
import contactData from "../data/contactData";

const ContactUs = () => {
  return (
    <div className="container mx-auto py-10 flex flex-wrap justify-center items-start gap-10 px-4">
      <div className="min-w-[344px] max-w-[400px] bg-richblack-800 px-6 py-10 space-y-6 rounded-lg">
        {contactData.map((item, index) => (
          <div className="flex gap-2">
            <img src={item.logo} alt={`item.logo`} className="w-6 h-6" />
            <div className="space-y-0.5">
              <p className="text-lg font-semibold text-richblack-5">
                {item.title}
              </p>
              <p className="text-richblack-100">{item.description}</p>
              <p className="text-richblack-100">{item.contact}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-10 border rounded-lg border-richblack-500">
        <ContactUsForm
          title="Got a Idea? We’ve got the skills. Let’s team up"
          subtitle="Tall us more about yourself and what you’re got in mind."
          alignItems="start"
        />
      </div>
    </div>
  );
};

export default ContactUs;
