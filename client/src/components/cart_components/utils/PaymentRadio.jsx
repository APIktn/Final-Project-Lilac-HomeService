function PaymentRadio(props) {
  return (
    <div className="input-container relative basis-1/2 group">
      <input
        className="absolute w-full h-full m-0 cursor-pointer z-20 opacity-0"
        id={props.id}
        type="radio"
        name="payment-method"
        checked={props.checked}
        onChange={props.onChange}
      />
      <div
        className={
          props.checked
            ? "radio-tile h-[95px] bg-[#E7EEFF] border-solid border-[1px] border-[#336DF2] rounded-[5px] flex flex-col items-center justify-center gap-1"
            : "radio-tile h-[95px] border-solid border-[1px] border-[#CCD0D7] rounded-[5px] group-hover:border-[#336DF2] flex flex-col items-center justify-center gap-1"
        }
      >
        {props.icon}
        <label
          className={
            props.checked
              ? "font-[500] text-[16px] text-[#336DF2]"
              : "font-[500] text-[16px] text-[#4B5160] group-hover:text-[#336DF2]"
          }
        >
          {props.label}
        </label>
      </div>
    </div>
  );
}

export default PaymentRadio;
