import React, { useState } from "react";
import "./services.css";
import {
  HiOutlineClipboardList,
  HiOutlineArrowSmRight,
  HiOutlineCheckCircle,
  HiX,
} from "react-icons/hi";

const Services = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="services section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">Create + Collaborate</span>

      <div className="services__container container grid">
        <div className="services__content">
          <div>
            <HiOutlineClipboardList className="services__icon" />
            <h3 className="services__title">
              Web + App
              <br />
              Developer
            </h3>
          </div>
          <span className="services__button" onClick={() => toggleTab(1)}>
            View More
            <HiOutlineArrowSmRight className="services__button-icon" />
          </span>
          <div
            className={
              toggleState === 1
                ? "services__modal active-modal"
                : "services__modal"
            }
          >
            <div className="services__modal-content">
              <HiX
                onClick={() => toggleTab(0)}
                className="services__modal-close"
              />
              <h3 className="services__modal-title">Full Stack Developer</h3>
              <p className="services__modal-description">
                Experienced full stack developer with over 3 years of expertise
                in web development and delivering high-quality solutions.
              </p>
              <ul className="services__modal-services grid">
                <li className="services__modal-service">
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">
                    Front-end & back-end web development
                  </p>
                </li>
                <li className="services__modal-service">
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">
                    Expertise in creative collaboration and team communication
                  </p>
                </li>
                <li className="services__modal-service">
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">
                    Provide product mockups
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="services__content">
          <div>
            <HiOutlineClipboardList className="services__icon" />
            <h3 className="services__title">
              Cloud
              <br />
              DevOps
            </h3>
          </div>
          <span className="services__button" onClick={() => toggleTab(2)}>
            View More
            <HiOutlineArrowSmRight className="services__button-icon" />
          </span>
          <div
            className={
              toggleState === 2
                ? "services__modal active-modal"
                : "services__modal"
            }
          >
            <div className="services__modal-content">
              <HiX
                onClick={() => toggleTab(0)}
                className="services__modal-close"
              />
              <h3 className="services__modal-title">Cloud DevOps Engineer</h3>
              <p className="services__modal-description">
                Skilled Cloud DevOps Engineer with experience implementing and
                optimizing cloud-based infrastructure and CI/CD pipelines.
              </p>
              <ul className="services__modal-services grid">
                <li className="services__modal-service">
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">
                    Deploying and managing cloud resources (AWS, GCP)
                  </p>
                </li>
                <li className="services__modal-service">
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">
                    Automating CI/CD pipelines for efficient software delivery
                  </p>
                </li>
                <li className="services__modal-service">
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">
                    Implementing infrastructure automation and configuration
                    management
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="services__content">
          <div>
            <HiOutlineClipboardList className="services__icon" />
            <h3 className="services__title">
              Project
              <br />
              Manager
            </h3>
          </div>
          <span className="services__button" onClick={() => toggleTab(3)}>
            View More
            <HiOutlineArrowSmRight className="services__button-icon" />
          </span>
          <div
            className={
              toggleState === 3
                ? "services__modal active-modal"
                : "services__modal"
            }
          >
            <div className="services__modal-content">
              <HiX
                onClick={() => toggleTab(0)}
                className="services__modal-close"
              />
              <h3 className="services__modal-title">Project Management</h3>
              <p className="services__modal-description">
                Seasoned Project Manager with a track record of successfully
                leading web development projects and ensuring quality
                deliverables.
              </p>
              <ul className="services__modal-services grid">
                <li className="services__modal-service">
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">
                    Planning and executing software development projects from
                    inception to delivery
                  </p>
                </li>
                <li className="services__modal-service">
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">
                    Managing project timelines, resources, and budgets
                    effectively
                  </p>
                </li>
                <li className="services__modal-service">
                  <HiOutlineCheckCircle className="services__modal-icon" />
                  <p className="services__modal-info">
                    {" "}
                    Facilitating clear communication and collaboration among
                    cross-functional teams
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
