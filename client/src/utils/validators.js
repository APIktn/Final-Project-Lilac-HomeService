export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (tel_num) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(tel_num);
};

export const isValidPassword = (password) => {
  return password.length >= 12;
};

export const validateRegister = ({
  firstname,
  lastname,
  email,
  password,
  tel_num,
  isChecked,
}) => {
  const errors = {};

  if (!firstname) {
    errors.firstname = "กรุณากรอกชื่อ";
  }
  if (!lastname) {
    errors.lastname = "กรุณากรอกนามสกุล";
  }
  if (!tel_num) {
    errors.tel_num = "กรุณากรอกหมายเลขโทรศัพท์";
  } else if (!isValidPhoneNumber(tel_num)) {
    errors.tel_num = "กรุณากรอกหมายเลขโทรศัพท์ (10 หลัก)";
  }
  if (!email) {
    errors.email = "กรุณากรอกอีเมล";
  }
  if (email && !isValidEmail(email)) {
    errors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
  }
  if (!password) {
    errors.password = "กรุณากรอกรหัสผ่าน";
  }
  if (password && !isValidPassword(password)) {
    errors.password = "รหัสผ่านต้องมีอย่างน้อย 12 ตัวอักษร";
  }
  if (!isChecked) {
    errors.isChecked = "กรุณายอมรับข้อตกลงและเงื่อนไข";
  }

  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = "กรุณากรอกอีเมล";
  }
  if (email && !isValidEmail(email)) {
    errors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
  }
  if (!password) {
    errors.password = "กรุณากรอกรหัสผ่าน";
  }

  return errors;
};
