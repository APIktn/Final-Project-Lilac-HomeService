import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { TextField, MenuItem } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CartContext } from "../../../contexts/cartContext";

function ServiceForm() {
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    address,
    setAddress,
    provinces,
    setProvinces,
    amphures,
    setAmphures,
    tambons,
    setTambons,
    selected,
    setSelected,
    moreInfo,
    setMoreInfo,
    setSelectedNames,
  } = useContext(CartContext);

  useEffect(() => {
    (() => {
      fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
      )
        .then((response) => response.json())
        .then((result) => {
          setProvinces(result);
        });
    })();
  }, []);

  const theme = createTheme({
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "Prompt",
            color: "#232630",
          },
        },
      },
    },
  });

  const DropdownList = ({
    label,
    id,
    list,
    child,
    childsId = [],
    setChilds = [],
  }) => {
    const onChangeHandle = (event) => {
      setChilds.forEach((setChild) => setChild([]));
      const entries = childsId.map((child) => [child, undefined]);
      const unSelectChilds = Object.fromEntries(entries);

      const input = event.target.value;
      const dependId = input ? Number(input) : undefined;

      const selectedItem = list.find((item) => item.id === dependId);
      const selectedName = selectedItem ? selectedItem.name_th : "";

      setSelected((prev) => ({
        ...prev,
        ...unSelectChilds,
        [id]: dependId,
      }));

      setSelectedNames((prev) => ({
        ...prev,
        ...unSelectChilds,
        [id.replace("_id", "")]: selectedName,
      }));

      if (!input) return;

      if (child) {
        const parent = list.find((item) => item.id === dependId);
        const { [child]: childs } = parent;
        const [setChild] = setChilds;
        setChild(childs);
      }
    };

    return (
      <div className="dropdown-list-container flex flex-col gap-1 md:basis-1/2">
        <label
          htmlFor="selected-subdistrict"
          className="text-[16px] font-[500] flex"
        >
          {label}
          <p className="require-mark text-red-600">{"*"}</p>
        </label>
        <TextField
          select
          label={selected[id] ? "" : label}
          value={selected[id] || ""}
          onChange={onChangeHandle}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            style: {
              fontSize: "16px",
              color: "#646C80",
            },
          }}
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
        >
          <MenuItem
            value=""
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              fontFamily: "Prompt",
              color: "#646C80",
            }}
          >
            <em>{label}</em>
          </MenuItem>
          {list &&
            list.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "Prompt",
                  color: "#232630",
                }}
              >
                {item.name_th}
              </MenuItem>
            ))}
        </TextField>
      </div>
    );
  };

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
                <label
                  htmlFor="selected-date"
                  className="text-[16px] font-[500] flex"
                >
                  วันที่สะดวกใช้บริการ
                  <p className="require-mark text-red-600 text-[16px]">{"*"}</p>
                </label>
                <DesktopDatePicker
                  label={selectedDate ? "" : "กรุณาเลือกวันที่"}
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  slots={{
                    openPickerIcon: EventOutlinedIcon,
                  }}
                  slotProps={{
                    textField: {
                      id: "selected-date",
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
                        "& .MuiInputBase-root.Mui-focused": {
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
                        "& .MuiInputLabel-root.Mui-focused": {
                          display: "none",
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
                <label
                  htmlFor="selected-time"
                  className="text-[16px] font-[500] flex"
                >
                  เวลาที่สะดวกใช้บริการ
                  <p className="require-mark text-red-600 text-[16px]">{"*"}</p>
                </label>
                <ThemeProvider theme={theme}>
                  <DesktopTimePicker
                    label={selectedTime ? "" : "กรุณาเลือกเวลา"}
                    value={selectedTime}
                    onChange={(newValue) => {
                      setSelectedTime(newValue);
                    }}
                    localeText={{
                      okButtonLabel: "ยืนยัน",
                    }}
                    ampm={false}
                    slotProps={{
                      textField: {
                        id: "selected-time",
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
                      menuItem: {
                        sx: {
                          fontSize: "16px",
                          fontWeight: 400,
                          fontFamily: "Prompt",
                          color: "#646C80",
                        },
                      },
                    }}
                  />
                </ThemeProvider>
              </div>
            </div>
          </LocalizationProvider>

          <div className="address-subdistrict-container flex flex-col gap-6 md:flex-row">
            <div className="address-container flex flex-col gap-1 md:basis-1/2">
              <label htmlFor="address" className="text-[16px] font-[500] flex">
                ที่อยู่
                <p className="require-mark text-red-600 text-[16px]">{"*"}</p>
              </label>
              <TextField
                id="address"
                fullWidth
                label={address ? "" : "กรุณากรอกที่อยู่"}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
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
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                }}
              />
            </div>

            <div className="subdistrict-container flex flex-col gap-1 md:basis-1/2">
              <DropdownList
                label="จังหวัด "
                id="province_id"
                list={provinces}
                child="amphure"
                childsId={["amphure_id", "tambon_id"]}
                setChilds={[setAmphures, setTambons]}
              />
            </div>
          </div>

          <div className="district-province-container flex flex-col gap-6 md:flex-row">
            <div className="district-container flex flex-col gap-1 md:basis-1/2">
              <DropdownList
                label="เขต / อำเภอ "
                id="amphure_id"
                list={amphures}
                child="tambon"
                childsId={["tambon_id"]}
                setChilds={[setTambons]}
              />
            </div>

            <div className="province-container flex flex-col gap-1 md:basis-1/2">
              <DropdownList
                label="แขวง / ตำบล "
                id="tambon_id"
                list={tambons}
              />
            </div>
          </div>

          <div className="more-info-container flex flex-col gap-6 md:flex-row">
            <div className="more-info-sub-container flex flex-col gap-1 md:w-full">
              <label htmlFor="more-info" className="text-[16px] font-[500]">
                ระบุข้อมูลเพิ่มเติม
              </label>
              <TextField
                id="more-info"
                fullWidth
                label={moreInfo ? "" : "กรุณาระบุข้อมูลเพิ่มเติม"}
                value={moreInfo}
                onChange={(e) => {
                  setMoreInfo(e.target.value);
                }}
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
                    height: 120,
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
