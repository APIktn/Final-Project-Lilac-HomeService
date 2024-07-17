import React, { useContext } from "react";
import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { styled } from "@mui/system";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import PropTypes from "prop-types";
import { CartContext } from "../../../pages/CartPage";

export const steps = ["รายการ", "กรอกข้อมูลบริการ", "ชำระเงิน"];

const ConnectorStyle = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    [theme.breakpoints.down("md")]: {
      top: 12,
    },
    [theme.breakpoints.up("md")]: {
      top: 17,
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#4C7FF4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#4C7FF4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#CCD0D7",
    borderWidth: 1.75,
  },
}));

const IconStyleRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#fff",
  zIndex: 1,
  fontSize: 19,
  color: "#CCD0D7",
  width: 32,
  height: 32,
  display: "flex",
  border: `2px solid #CCD0D7`,
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(-1),
  [theme.breakpoints.up("md")]: {
    width: 40,
    height: 40,
    fontSize: 24,
    marginBottom: theme.spacing(0),
  },
  ...(ownerState.active && {
    backgroundColor: "#fff",
    border: `2px solid #4C7FF4`,
    color: "#4C7FF4",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#4C7FF4",
    border: `2px solid #4C7FF4`,
    color: "#fff",
  }),
}));

const CustomStepLabel = styled(StepLabel)(({ ownerState }) => ({
  "& .MuiStepLabel-label": {
    color:
      ownerState.active || ownerState.completed
        ? "#4C7FF4 !important"
        : "#CCD0D7 !important",
    fontFamily: "Prompt",
  },
}));

function StepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ArticleOutlinedIcon />,
    2: <ModeEditOutlineOutlinedIcon />,
    3: <CreditScoreOutlinedIcon />,
  };

  return (
    <IconStyleRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </IconStyleRoot>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

export default function HorizontalStepper() {
  const { activeStep } = useContext(CartContext);

  return (
    <div className="stepper-container bg-[#FFFFFF] w-full h-[89px] md:h-[129px] rounded-[10px] border-solid border-[1px] border-[#CCD0D7]">
      <div className="h-full flex flex-col  pt-5 pb-5 mx-[-20px] md:pt-9">
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ConnectorStyle />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <CustomStepLabel
                StepIconComponent={StepIcon}
                ownerState={{
                  active: activeStep === index,
                  completed: activeStep > index,
                }}
              >
                {label}
              </CustomStepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
