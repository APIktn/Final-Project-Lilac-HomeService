import { validateRegister, validateLogin } from "./validators";

export const checkRegisterErrors = (formData) => {
  const errors = validateRegister(formData);
  return errors;
};

export const checkLoginErrors = (formData) => {
  const errors = validateLogin(formData);
  return errors;
};

const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z'-]+$/;
  return nameRegex.test(name);
};

export const updateErrors = (field, value, errors) => {
  let newErrors = { ...errors };

  switch (field) {
    case "firstname":
      if (!value) {
        newErrors.firstname = "กรุณากรอกชื่อ";
      } else if (!isValidName(value)) {
        newErrors.firstname =
          "ชื่อไม่ถูกต้อง ต้องประกอบด้วยตัวอักษรภาษาอังกฤษเท่านั้น";
      } else {
        delete newErrors.firstname;
      }
      break;
    case "lastname":
      if (!value) {
        newErrors.lastname = "กรุณากรอกนามสกุล";
      } else if (!isValidName(value)) {
        newErrors.lastname =
          "นามสกุลไม่ถูกต้อง ต้องประกอบด้วยตัวอักษรภาษาอังกฤษเท่านั้น";
      } else {
        delete newErrors.lastname;
      }
      break;
    case "tel":
      if (!value) {
        newErrors.tel_num = "กรุณากรอกหมายเลขโทรศัพท์";
      } else if (!/^[0-9]{10}$/.test(value)) {
        newErrors.tel_num = "กรุณากรอกหมายเลขโทรศัพท์ (10 หลัก)";
      } else {
        delete newErrors.tel_num;
      }
      break;
    case "email":
      if (!value) {
        newErrors.email = "กรุณากรอกอีเมล";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
      } else {
        delete newErrors.email;
      }
      break;
    case "password":
      if (!value) {
        newErrors.password = "กรุณากรอกรหัสผ่าน";
      } else if (value.length < 12) {
        newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 12 ตัวอักษร";
      } else {
        delete newErrors.password;
      }
      break;
    case "isChecked":
      if (!value) {
        newErrors.isChecked = "กรุณายอมรับข้อตกลงและเงื่อนไข";
      } else {
        delete newErrors.isChecked;
      }
      break;
    default:
      break;
  }

  return newErrors;
};

export const checkUpdatePasswordErrors = (formData) => {
  const errors = {};

  if (!formData.currentPassword) {
    errors.currentPassword = "กรุณากรอกรหัสผ่านปัจจุบัน";
  }

  if (!formData.newPassword) {
    errors.newPassword = "กรุณากรอกรหัสผ่านใหม่";
  } else if (formData.newPassword.length < 12) {
    errors.newPassword = "รหัสผ่านใหม่ต้องมีอย่างน้อย 12 ตัวอักษร";
  }

  if (formData.newPassword !== formData.confirmPassword) {
    errors.confirmPassword = "รหัสผ่านใหม่ไม่ตรงกัน";
  }

  return errors;
};
