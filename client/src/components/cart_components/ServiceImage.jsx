function ServiceImage() {
  return (
    <div className="absolute w-full z-0 top-0 left-0">
      <div className="image-container w-full h-[168px] relative z-0 md:h-[240px]">
        <div className="blend-color w-full h-full bg-[#163C93] opacity-40 absolute z-0"></div>
        <img
          className="service-image w-full h-full object-cover"
          src="https://www.figma.com/file/0N9QuVAydHaNFReRpdWmME/image/0f615676862aef146f752c8fc736725679ace39d"
          alt="AC-Cleaning-Picture"
        />
      </div>
    </div>
  );
}

export default ServiceImage;
