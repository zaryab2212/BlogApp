const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dvv4ffhvi",
  api_key: "467479789366527",
  api_secret: "omveynTqndXu9lAWONOuSfthJU8",
});

exports.ImgUploder = async (file) => {
  console.log(file);
  const result = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      resource_type: "auto", // Let Cloudinary determine the resource type
    }
  );
  return result;
};
