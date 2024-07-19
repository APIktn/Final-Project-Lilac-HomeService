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

export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z'-]+$/;
  return nameRegex.test(name);
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
  } else if (!isValidName(firstname)) {
    errors.firstname =
      "ชื่อไม่ถูกต้อง ต้องประกอบด้วยตัวอักษรภาษาอังกฤษเท่านั้น";
  }

  if (!lastname) {
    errors.lastname = "กรุณากรอกนามสกุล";
  } else if (!isValidName(lastname)) {
    errors.lastname =
      "นามสกุลไม่ถูกต้อง ต้องประกอบด้วยตัวอักษรภาษาอังกฤษเท่านั้น";
  }

  if (!tel_num) {
    errors.tel_num = "กรุณากรอกหมายเลขโทรศัพท์";
  } else if (!isValidPhoneNumber(tel_num)) {
    errors.tel_num = "กรุณากรอกหมายเลขโทรศัพท์ (10 หลัก)";
  }

  if (!email) {
    errors.email = "กรุณากรอกอีเมล";
  } else if (!isValidEmail(email)) {
    errors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
  }

  if (!password) {
    errors.password = "กรุณากรอกรหัสผ่าน";
  } else if (!isValidPassword(password)) {
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
  } else if (!isValidEmail(email)) {
    errors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
  }

  if (!password) {
    errors.password = "กรุณากรอกรหัสผ่าน";
  }

  return errors;
};

export const checkUpdatePasswordErrors = (passwordData) => {
  const errors = {};
  const { currentPassword, newPassword, confirmPassword } = passwordData;

  if (!currentPassword) {
    errors.currentPassword = "กรุณากรอกรหัสผ่านเดิม";
  }

  if (!newPassword) {
    errors.newPassword = "กรุณากรอกรหัสผ่านใหม่";
  } else if (newPassword.length < 12) {
    errors.newPassword = "รหัสผ่านใหม่ต้องมีอย่างน้อย 12 ตัวอักษร";
  }

  if (newPassword !== confirmPassword) {
    errors.confirmPassword = "รหัสผ่านใหม่ไม่ตรงกัน";
  }

  return errors;
};
