import Counter from "../utils/Counter";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

function ServiceDetail({ dataFromState, getSummaryOrder, deleteSummaryOrder }) {
  if (!dataFromState || !dataFromState[0] || !dataFromState[0].service_list) {
    return <div>No data available</div>;
  }

  return (
    <div className="background w-full min-h-full ">
      <div className="container w-full h-auto bg-white borer-solid border-[1px] border-[#CCD0D7] rounded-[8px] flex flex-col p-4 md:p-6 md:gap-5">
        <p className="font-[500] text-[18px] md:text-[20px] md:font-[400] text-[#646C80]">
          เลือกรายการบริการ{dataFromState[0].service_name}
        </p>
        <div className="list-container flex flex-col py-2">
          {dataFromState[0].service_list.map((item, index) => (
            <div
              className={
                !(index === dataFromState[0].service_list.length - 1)
                  ? `list-detail-container border-solid border-b-[1px] border-gray-300 py-4 md:py-6 flex flex-row justify-between`
                  : `list-detail-container py-4 md:py-6 flex flex-row justify-between`
              }
              key={index}
            >
              <div className="detail flex flex-col gap-1 ">
                <p className="text-[16px] md:text-[18px] font-[500]">
                  {item.service_lists}
                </p>
                <div className="flex items-center gap-1">
                  <LocalOfferOutlinedIcon
                    sx={{ color: "#646C80", fontSize: 16 }}
                  />
                  <p className="text-[#646C80] text-[12px] md:text-[14px] font-[400]">
                    {item.price}.00 ฿ / {item.units}
                  </p>
                </div>
              </div>
              <div className="pl-2 flex items-start justify-end">
                <Counter
                  key={`counter-${index}`}
                  dataFromState={dataFromState[0]}
                  getSummaryOrder={getSummaryOrder}
                  dataIndex={index}
                  deleteSummaryOrder={deleteSummaryOrder}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
