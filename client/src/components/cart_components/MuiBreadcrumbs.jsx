import Breadcrumbs from "@mui/material/Breadcrumbs";

function MuiBreadcrumbs() {
  const breadcrumbs = [
    <a className="font-prompt text-[14px] font-[400] md:text-[16px] md:font-[500] text-center text-gray-700">
      บริการของเรา
    </a>,
    <a className="font-prompt text-[20px] font-[500] md:text-[32px] text-center text-blue-600">
      ล้างแอร์
    </a>,
  ];

  return (
    <div className="breadcrumb-container w-[206px] h-[46px] px-4 py-1 md:w-[300px] md:h-[68px] bg-white border-solid border-[1px] border-[#CCD0D7] rounded-[8px] md:gap-[12px] md:py-[4px] md:px-[32px]">
      <Breadcrumbs separator="›" aria-label="breadcrumb" variant="subtitle1">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
}

export default MuiBreadcrumbs;
