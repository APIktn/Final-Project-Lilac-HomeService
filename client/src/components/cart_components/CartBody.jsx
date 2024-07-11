import MuiBreadcrumb from "./MuiBreadcrumbs";
import FirstStep from "./stepper/FirstStep";
import ServiceDetail from "./forms/ServiceDetail";
import ServiceImage from "./ServiceImage";
import OrderSummary from "./OrderSummary";

function CartBody() {
  return (
    <div className="background w-full h-full border-solid border-black border-[2px] relative z-10 overflow-hidden py-14 gap-7 md:py-20 md:mb-[92px]">
      <ServiceImage />
      <div className="container h-auto mx-auto relative z-10 flex flex-col px-4 gap-4 md:px-20 md:gap-8">
        <MuiBreadcrumb />
        <FirstStep />
      </div>
      <div className="container h-auto mx-auto border-solid border-purple-500 border-[2px] relative z-10 flex flex-col pt-4 md:pt-7 gap-4 md:px-20 md:gap-8 md:flex-row">
        <div className="px-4 md:px-0 md:basis-2/3">
          <ServiceDetail />
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}

export default CartBody;
