export const transformToUppercase = (code) => {
  // Remove any non-alphanumeric characters
  const cleanCode = code.replace(/[^a-zA-Z0-9]/g, "");
  return cleanCode.toUpperCase();
};

// Function to validate promotion code format
export const validatePromotionCode = (code) => {
  // Regular expression to allow only alphanumeric characters
  const codeRegex = /^[a-zA-Z0-9]+$/;

  // Check if the code matches the regex pattern
  if (!codeRegex.test(code)) {
    return false;
  }

  // Check if the code contains any digits
  const digits = code.replace(/[^0-9]/g, "");

  // If there are digits, ensure they are at most two digits long or exactly 100
  if (digits) {
    if (digits.length > 2 || (digits.length === 3 && digits !== "100")) {
      return false;
    }
  }

  return true;
};
