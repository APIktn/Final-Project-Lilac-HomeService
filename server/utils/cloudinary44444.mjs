import cloudinary from "cloudinary";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
  secure: true,
});

const cloudinaryUpload = async (files) => {
  const fileUrl = [];

  for (let file of files) {
    let result;
    try {
      result = await cloudinary.v2.uploader.upload(file.path, {
        folder: "HomeService",
        private: true,
      });
    } catch (error) {
      console.log("error: ", error);
    }

    fileUrl.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
    await fs.unlink(file.path);
  }

  return fileUrl;
};

export { cloudinaryUpload };
