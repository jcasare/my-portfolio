import Image from 'next/image';
import { HiOutlineArrowSmRight } from 'react-icons/hi';

const ProjectItems = ({ item }) => {
  return (
    <div className="project__card" key={item.id}>
      <div className="project__img-wrap">
        <Image
          className="project__img"
          src={item.image}
          alt={item.title}
          width={500}
          height={300}
        />
        <div className="project__overlay"></div>
      </div>
      <div className="project__info">
        <h3 className="project__title">{item.title}</h3>
        <a href={item.link} className="project__button" target="_blank" rel="noopener noreferrer">
          View <HiOutlineArrowSmRight className="project__button-icon" />
        </a>
      </div>
    </div>
  );
};

export default ProjectItems;
