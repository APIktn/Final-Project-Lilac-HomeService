import Breadcrumbs from "@mui/material/Breadcrumbs";

function MuiBreadcrumbs({ dataFromState }) {
  if (!dataFromState || !dataFromState[0] || !dataFromState[0].service_list) {
    return <div></div>;
  }

  const breadcrumbs = [
    <a
      className="font-prompt text-[14px] font-[400] md:text-[16px] md:font-[500] text-center text-gray-700"
      href="/servicelist"
    >
      บริการของเรา
    </a>,
    <p className="font-prompt text-[20px] font-[500] md:text-[32px] text-center text-blue-600">
      {dataFromState[0].service_name}
    </p>,
  ];

  return (
    <div className="breadcrumb-container w-auto h-[46px] px-4 py-1 md:h-[68px] bg-white border-solid border-[1px] border-[#CCD0D7] rounded-[8px] md:gap-[12px] md:py-[4px] md:px-[32px] mr-auto">
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        variant="subtitle1"
        sx={{
          color: "#B3B8C4",
          fontSize: "16px",
          fontFamily: "Prompt",
          fontWeight: 500,
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
}

export default MuiBreadcrumbs;
