import React from "react";
import { Stepper, Step, StepLabel, StepConnector, Box } from "@mui/material";
import { styled } from "@mui/system";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { blue } from "@mui/material/colors";

const Connector = styled(StepConnector)(({ theme, lineColor }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    [theme.breakpoints.down("md")]: {
      top: 12,
    },
    [theme.breakpoints.up("md")]: {
      top: 17,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: lineColor,
    borderWidth: 1.75,
  },
}));

const CustomStepIcon = ({ icon, iconColor, borderColor }) => {
  const icons = {
    1: (
      <ArticleOutlinedIcon
        sx={{
          color: iconColor,
          fontSize: {
            xs: 19,
            md: 24,
          },
        }}
      />
    ),
    2: (
      <ModeEditOutlineOutlinedIcon
        sx={{
          color: iconColor,
          fontSize: {
            xs: 19,
            md: 24,
          },
        }}
      />
    ),
    3: (
      <CreditScoreOutlinedIcon
        sx={{
          color: iconColor,
          fontSize: {
            xs: 19,
            md: 24,
          },
        }}
      />
    ),
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: 32, md: 40 },
        height: { xs: 32, md: 40 },
        border: `2px solid ${borderColor}`,
        borderRadius: "50%",
      }}
    >
      {icons[icon]}
    </Box>
  );
};

export default function FirstStep({ activeStep }) {
  return (
    <div className="stepper-container bg-[#FFFFFF] w-full h-[89px] md:h-[129px] rounded-[10px] border-solid border-[1px] border-[#CCD0D7] ">
      <div className="h-full flex flex-col justify-between pt-5 mx-[-25px] md:pt-9">
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<Connector lineColor="#CCD0D7" />}
        >
          <Step>
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  icon={1}
                  iconColor={blue[500]}
                  borderColor={"#4C7FF4"}
                />
              )}
            >
              <p className="step-description text-[14px] md:text-[16px] font-[500] text-blue-500 mt-{10px] md:mt-0">
                รายการ
              </p>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  icon={2}
                  iconColor={"#CCD0D7"}
                  borderColor={"#CCD0D7"}
                />
              )}
            >
              <p className="step-description text-[14px] md:text-[16px] font-[500] text-[#CCD0D7] mt-{10px] md:mt-0">
                กรอกข้อมูลบริการ
              </p>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  icon={3}
                  iconColor={"#CCD0D7"}
                  borderColor={"#CCD0D7"}
                />
              )}
            >
              <p className="step-description text-[14px] md:text-[16px] font-[500] text-[#CCD0D7] mt-{10px] md:mt-0">
                ชำระเงิน
              </p>
            </StepLabel>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}
