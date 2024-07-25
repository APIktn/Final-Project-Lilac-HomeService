import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

function ServiceImage() {
  const { services } = useContext(CartContext);
  const imageSrc = services[0] ? services[0].image : null;

  return (
    imageSrc && (
      <div className="absolute w-full z-0 top-0 left-0">
        <div className="image-container w-full h-[168px] relative z-0 md:h-[240px]">
          <div className="blend-color w-full h-full bg-[#163C93] opacity-40 absolute z-0"></div>
          <img
            className="service-image w-full h-full object-cover"
            src={imageSrc}
            alt="AC-Cleaning-Picture"
          />
        </div>
      </div>
    )
  );
}

export default ServiceImage;
