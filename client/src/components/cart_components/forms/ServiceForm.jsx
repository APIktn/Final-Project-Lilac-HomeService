import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { TextField } from "@mui/material";

function ServiceForm() {
  return (
    <div className="background w-full min-h-full ">
      <div className="container w-full h-auto bg-white border-solid border-[1px] border-[#CCD0D7] rounded-[8px] flex flex-col p-4 md:p-6 md:gap-5">
        <p className="font-[500] text-[18px] md:text-[20px] md:font-[400] text-[#646C80]">
          กรอกข้อมูลบริการ
        </p>
        <form className="form-container flex flex-col py-2 gap-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="date-and-time-picker-container flex flex-col gap-6 md:flex-row">
              <div className="date-picker-container flex flex-col gap-1 md:basis-1/2">
                <label className="text-[16px] font-[500]">
                  วันที่สะดวกใช้บริการ
                </label>
                <DesktopDatePicker
                  label="กรุณาเลือกวันที่"
                  slots={{
                    openPickerIcon: EventOutlinedIcon,
                  }}
                  slotProps={{
                    textField: {
                      sx: {
                        "& .MuiInputBase-root": {
                          fontSize: "16px",
                          fontFamily: "Prompt",
                          fontWeight: 400,
                          height: 44,
                          border: "1px solid #CCD0D7",
                          borderRadius: "10px",
                          alignItems: "center",
                        },
                        "& .MuiInputBase-root:focus": {
                          fontSize: "16px",
                          fontFamily: "Prompt",
                          fontWeight: 500,
                          height: 44,
                          border: "1px solid #CCD0D7",
                          borderRadius: "10px",
                          alignItems: "center",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "16px",
                          fontWeight: 400,
                          fontFamily: "Prompt",
                          color: "#646C80",
                          marginTop: "-5px",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "20px",
                          fontWeight: 100,
                          color: "#AAAAAA",
                          marginRight: 0.5,
                        },
                      },
                    },
                    day: {
                      sx: {
                        fontFamily: "Prompt",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "#323640",
                        "&.MuiPickersDay-today": {
                          borderColor: "#336DF2",
                          backgroundColor: "#FFFFFF",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#336DF2",
                        },
                        "&.MuiPickersDay-root:focus": {
                          backgroundColor: "#336DF2",
                          fontFamily: "Prompt",
                          fontWeight: 400,
                          fontSize: "14px",
                          color: "#FFFFFF",
                        },
                        "&.MuiPickersDay-root:hover": {
                          backgroundColor: "#EFEFF2",
                        },
                      },
                    },
                    calendarHeader: {
                      sx: {
                        "& .MuiPickersCalendarHeader-label": {
                          fontFamily: "Prompt",
                          fontWeight: 400,
                          fontSize: "14px",
                          color: "#4B5160",
                        },
                        "& .MuiPickersCalendarHeader-switchViewIcon": {
                          fontSize: "20px",
                          fontWeight: 100,
                          color: "#AAAAAA",
                          marginRight: 0.5,
                        },
                        "& .MuiPickersArrowSwitcher-root": {
                          fontSize: "20px",
                          fontWeight: 100,
                          color: "#9AA1B0",
                          border: "2px",
                        },
                      },
                    },
                    weekDayLabel: {
                      sx: {
                        "& .MuiDayCalendar-weekDayLabel": {
                          fontFamily: "Prompt !important",
                          fontWeight: 400,
                          fontSize: "12px !important",
                          color: "#80899C !important",
                        },
                      },
                    },
                  }}
                />
              </div>

              <div className="time-picker-container flex flex-col gap-1 md:basis-1/2">
                <label className="text-[16px] font-[500]">
                  เวลาที่สะดวกใช้บริการ
                </label>
                <DesktopTimePicker
                  label="กรุณาเลือกเวลา"
                  localeText={{
                    okButtonLabel: "ยืนยัน",
                  }}
                  ampm={false}
                  slotProps={{
                    textField: {
                      sx: {
                        "& .MuiInputBase-root": {
                          fontSize: "16px",
                          fontFamily: "Prompt",
                          fontWeight: 400,
                          height: 44,
                          border: "1px solid #CCD0D7",
                          borderRadius: "10px",
                          alignItems: "center",
                        },
                        "& .MuiInputBase-root:focus": {
                          fontSize: "16px",
                          fontFamily: "Prompt",
                          fontWeight: 500,
                          height: 44,
                          border: "1px solid #CCD0D7",
                          borderRadius: "10px",
                          alignItems: "center",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "16px",
                          fontWeight: 400,
                          fontFamily: "Prompt",
                          color: "#646C80",
                          marginTop: "-5px",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "20px",
                          fontWeight: 100,
                          color: "#AAAAAA",
                          marginRight: 0.5,
                        },
                      },
                    },
                    actionBar: {
                      sx: {
                        "& .MuiButtonBase-root": {
                          fontSize: "16px",
                          fontFamily: "Prompt",
                          fontWeight: 600,
                          color: "#336DF2",
                          textDecoration: "underline",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </LocalizationProvider>

          <div className="address-subdistrict-container flex flex-col gap-6 md:flex-row">
            <div className="address-container flex flex-col gap-1 md:basis-1/2">
              <label className="text-[16px] font-[500]">ที่อยู่</label>
              <TextField
                fullWidth
                label="กรุณากรอกที่อยู่"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 500,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                    labelhidden: true,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    fontWeight: 100,
                    color: "#AAAAAA",
                    marginRight: 0.5,
                  },
                }}
              />
            </div>

            <div className="subdistrict-container flex flex-col gap-1 md:basis-1/2">
              <label className="text-[16px] font-[500]">แขวง / ตำบล</label>
              <TextField
                fullWidth
                select
                label="เลือกแขวง / ตำบล"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 500,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                    labelhidden: true,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    fontWeight: 100,
                    color: "#AAAAAA",
                    marginRight: 0.5,
                  },
                }}
              />
            </div>
          </div>

          <div className="district-province-container flex flex-col gap-6 md:flex-row">
            <div className="district-container flex flex-col gap-1 md:basis-1/2">
              <label className="text-[16px] font-[500]">เขต / อำเภอ</label>
              <TextField
                fullWidth
                select
                label="เลือกเขต / อำเภอ"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 500,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                    labelhidden: true,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    fontWeight: 100,
                    color: "#AAAAAA",
                    marginRight: 0.5,
                  },
                }}
              />
            </div>

            <div className="province-container flex flex-col gap-1 md:basis-1/2">
              <label className="text-[16px] font-[500]">จังหวัด</label>
              <TextField
                fullWidth
                select
                label="เลือกจังหวัด"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 500,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                    labelhidden: true,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    fontWeight: 100,
                    color: "#AAAAAA",
                    marginRight: 0.5,
                  },
                }}
              />
            </div>
          </div>

          <div className="district-province-container flex flex-col gap-6 md:flex-row">
            <div className="district-container flex flex-col gap-1 md:w-full">
              <label className="text-[16px] font-[500]">
                ระบุข้อมูลเพิ่มเติม
              </label>
              <TextField
                fullWidth
                label="กรุณาระบุข้อมูลเพิ่มเติม"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    height: 120,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 500,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                    labelhidden: true,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    fontWeight: 100,
                    color: "#AAAAAA",
                    marginRight: 0.5,
                  },
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceForm;
