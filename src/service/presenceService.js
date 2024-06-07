import { Presence } from "../model/presence.js";
import { PresenceType } from "../model/presenceType.js";
import { sequelize } from "../config/database.js";
import moment from "moment-timezone";

const getPresences = async (req, res) => {
  const presences = await Presence.findAll({
    attributes: {
      exclude: ["presence_type", "check_in", "check_out"],
      include: [
        [
          sequelize.literal(`"check_in" AT TIME ZONE 'Asia/Jakarta'`),
          "checkIn",
        ],
        [
          sequelize.literal(`"check_out" AT TIME ZONE 'Asia/Jakarta'`),
          "checkOut",
        ],
      ],
    },
    include: [
      {
        model: PresenceType,
        as: "PresenceType",
        attributes: ["type"],
      },
    ],
  });

  res.json(presences);
};

export { getPresences };
