import React, { useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
import "./styles.scss";
import ImageOne from "../../images/image1.jpg";
import ImageTwo from "../../images/image2.jpg";
import ImageThree from "../../images/image3.jpg";
import ImageFour from "../../images/image4.jpg";
import ImageFive from "../../images/image5.jpg";

const portfolioData = [
  {
    id: 1,
    name: "Portfolio",
    image: ImageOne,
    link: "https://my-portfolio-react-liart-delta.vercel.app/",
  },
  {
    id: 2,
    name: "Notes App",
    link: "",
    image: ImageTwo,
  },
  {
    id: 3,
    name: "Supplier Design",
    image: ImageThree,
    link: "",
  },
  {
    id: 4,
    name: "Todo App",
    image: ImageFour,
    link: "https://to-do-typescript-six.vercel.app/",
  },
  {
    id: 5,
    name: "Shopping cart design",
    image: ImageFive,
    link: "",
  },
];

const filterData = [
  {
    filterId: 1,
    label: "All",
  },
  {
    filterId: 2,
    label: "Development",
  },
  {
    filterId: 3,
    label: "Design",
  },
];

const Portfolio = () => {
  const [filteredValue, setFilteredValue] = useState(1);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

  function handleFilter(currentId, link) {
    setFilteredValue(currentId);
    setSelectedLink(link);
  }

  function handleHover(index) {
    setHoveredValue(index);
  }

  return (
    <section id="portfolio" className="portfolio">
      <PageHeaderContent
        headerText="My Portfolio"
        icon={<BsInfoCircleFill size={40} />}
      />
      <div className="portfolio__content">
        <ul className="portfolio__content__filter">
          {filterData.map((item) => (
            <li
              className={item.filterId === filteredValue ? "active" : ""}
              onClick={() => handleFilter(item.filterId)}
              key={item.filterId}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div className="portfolio__content__cards">
          {portfolioData
            .filter((item) => filteredValue === 1 || item.id === filteredValue)
            .map((item, index) => (
              <div
                className="portfolio__content__cards__item"
                key={`cardItem${item.name.trim()}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
                onClick={() => {
                  if (item.link) {
                    window.open(item.link, "_blank");
                  }
                }}
              >
                <div className="portfolio__content__cards__item__img-wrapper">
                  <a>
                    <img alt="dummy data" src={item.image} />
                  </a>
                </div>
                <div className="overlay">
                  {index === hoveredValue && (
                    <div>
                      <p>{item.name}</p>
                      {item.link && <button>Visit</button>}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
