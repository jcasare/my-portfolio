import Image from 'next/image';
import { HiOutlineArrowSmRight } from 'react-icons/hi';

const ProjectItems = ({ item }) => {
  return (
    <div className="project__card" key={item.id}>
      <Image
        className="project__img"
        src={item.image}
        alt={item.title}
        width={500}
        height={300}
      />
      <h3 className="project__title">{item.title}</h3>
      <a href={item.link} className="project__button">
        Demo <HiOutlineArrowSmRight className="project__button-icon" />
      </a>
    </div>
  );
};

export default ProjectItems;
