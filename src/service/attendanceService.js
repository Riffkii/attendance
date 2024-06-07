import { Presence } from "../model/presence.js";
import { Client } from "minio";
import fs from "fs";
import moment from "moment-timezone";

const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "root",
  secretKey: "12345678",
});

const bucketName = "emp-pict";

const checkIn = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const fileStream = fs.createReadStream(req.file.path);
  const fileName = `${Date.now()}_${req.file.originalname}`;

  minioClient.putObject(bucketName, fileName, fileStream, async (err, etag) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send("Failed to upload file");
    }

    const url = `${minioClient.protocol}//${minioClient.host}:9000/${bucketName}/${fileName}`;

    let { nik, name, presence_type, latitude, longitude } = req.body;

    if (presence_type == 0) {
      const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const eightAM = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      eightAM.setHours(8, 0, 0, 0);

      presence_type = now < eightAM ? 1 : 4;
    }

    await Presence.create({
      nik,
      name,
      presence_type,
      check_in: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
      pict: url,
      coordinate: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    });

    res.status(201).json({ message: "File uploaded successfully" });
  });
};

const checkOut = async (req, res) => {
  const nik = req.query.nik;
  const presence = await Presence.findOne({
    where: {
      nik,
    },
  });

  if (presence) {
    presence.check_out = moment()
      .tz("Asia/Jakarta")
      .format("YYYY-MM-DD HH:mm:ss");
    await presence.save();
    res.status(200).json({ message: "success" });
  } else {
    console.log("Data Presence tidak ditemukan untuk nik:", nik);
  }
};

export { checkIn, checkOut };
