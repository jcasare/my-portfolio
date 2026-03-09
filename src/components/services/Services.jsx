import React, { useState, useEffect, useCallback } from "react";
import "./services.css";
import {
  HiOutlineArrowSmRight,
  HiOutlineCheckCircle,
  HiX,
} from "react-icons/hi";
import { HiOutlineCodeBracket, HiOutlineCloud, HiOutlineRocketLaunch } from "react-icons/hi2";

const servicesData = [
  {
    icon: HiOutlineCodeBracket,
    title: "Full Stack",
    subtitle: "Development",
    modalTitle: "Full Stack Development",
    modalDescription:
      "End-to-end web application development with modern frameworks, scalable architectures, and pixel-perfect interfaces.",
    services: [
      "React, Next.js & TypeScript front-end development",
      "Node.js, Python & REST/GraphQL API design",
      "Database architecture & optimization (SQL, NoSQL)",
      "Responsive UI/UX with modern design systems",
      "Performance optimization & code quality",
    ],
  },
  {
    icon: HiOutlineCloud,
    title: "Cloud &",
    subtitle: "DevOps",
    modalTitle: "Cloud & DevOps Engineering",
    modalDescription:
      "Scalable cloud infrastructure, automated pipelines, and reliable deployments that keep your applications running smoothly.",
    services: [
      "AWS & GCP cloud architecture & migration",
      "CI/CD pipeline automation (GitHub Actions, Jenkins)",
      "Docker containerization & Kubernetes orchestration",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Monitoring, logging & incident response",
    ],
  },
  {
    icon: HiOutlineRocketLaunch,
    title: "Technical",
    subtitle: "Leadership",
    modalTitle: "Technical Leadership",
    modalDescription:
      "Driving projects from concept to delivery with clear communication, agile practices, and a focus on shipping quality software.",
    services: [
      "Project scoping, planning & sprint management",
      "Technical architecture & design reviews",
      "Cross-functional team coordination",
      "Stakeholder communication & roadmap alignment",
      "Mentoring developers & establishing best practices",
    ],
  },
];

const Services = () => {
  const [activeModal, setActiveModal] = useState(0);

  const openModal = (index) => {
    setActiveModal(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = useCallback(() => {
    setActiveModal(0);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (activeModal) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeModal, closeModal]);

  return (
    <section className="services section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What I bring to the table</span>

      <div className="services__container container grid">
        {servicesData.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div className="services__content" key={index}>
              <div className="services__header">
                <div className="services__icon-wrapper">
                  <IconComponent className="services__icon" />
                </div>
                <h3 className="services__title">
                  {service.title}
                  <br />
                  {service.subtitle}
                </h3>
              </div>
              <span
                className="services__button"
                onClick={() => openModal(index + 1)}
              >
                Learn more
                <HiOutlineArrowSmRight className="services__button-icon" />
              </span>
            </div>
          );
        })}
      </div>

      {/* Modals rendered outside cards, at root level */}
      {servicesData.map((service, index) => (
        <div
          key={index}
          className={`services__modal ${
            activeModal === index + 1 ? "active-modal" : ""
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="services__modal-content">
            <button
              onClick={closeModal}
              className="services__modal-close"
              aria-label="Close modal"
            >
              <HiX />
            </button>

            <div className="services__modal-badge">
              {React.createElement(service.icon, {
                className: "services__modal-badge-icon",
              })}
            </div>

            <h3 className="services__modal-title">{service.modalTitle}</h3>
            <p className="services__modal-description">
              {service.modalDescription}
            </p>

            <ul className="services__modal-services">
              {service.services.map((item, i) => (
                <li className="services__modal-service" key={i}>
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
