// frontend/src/components/Contact.js
import React, { useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
import { Animate } from "react-simple-animate";
import axios from "axios";
import "./styles.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      console.log("Server response:", response.data); // Handle success or redirect as needed
    } catch (error) {
      console.error("Error submitting form:", error); // Handle error
    }
  };

  return (
    <section id="contact" className="contact">
      <PageHeaderContent
        headerText="My Contact"
        icon={<BsInfoCircleFill size={40} />}
      />
      <div className="contact__content">
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(-200px)",
          }}
          end={{
            transform: "translateX(0px)",
          }}
        >
          <h3 className="contact__content__header-text">Let's Talk</h3>
        </Animate>
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(200px)",
          }}
          end={{
            transform: "translateX(0px)",
          }}
        >
          <div className="contact__content__form">
            <div className="contact__content__form__controlswrapper">
              <div>
                <input
                  required
                  name="name"
                  className="inputName"
                  type={"text"}
                  value={formData.name}
                  onChange={handleChange}
                />
                <label htmlFor="name" className="nameLabel">
                  Name
                </label>
              </div>
              <div>
                <input
                  required
                  name="email"
                  className="inputEmail"
                  type={"text"}
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email" className="emailLabel">
                  Email
                </label>
              </div>
              <div>
                <textarea
                  required
                  name="description"
                  className="inputDescription"
                  type={"text"}
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                />
                <label htmlFor="description" className="descriptionLabel">
                  Description
                </label>
              </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </Animate>
      </div>
    </section>
  );
};

export default Contact;
