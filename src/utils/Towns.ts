import axios from "axios";
import csv from "csvtojson";

export const townIdToPlayer = async (townId: string, market: string) => {
  const townCsv = await axios
    .get(`https://${market}.grepolis.com/data/towns.txt`)
    .then((response) => response.data);
  const playerCsv = await axios
    .get(`https://${market}.grepolis.com/data/players.txt`)
    .then((response) => response.data);

  const town = await csv({
    noheader: true,
    headers: [
      "id",
      "playerId",
      "name",
      "islandX",
      "islandY",
      "numberOnIsland",
      "points",
      "ocean",
    ],
    output: "json",
  })
    .fromString(townCsv)
    .then((json) => json.find((town) => town.id === townId));

  const player = await csv({
    noheader: true,
    headers: ["id", "name", "allianceId", "points", "rank", "towns"],
    output: "json",
  })
    .fromString(playerCsv)
    .then((json) => json.find((player) => player.id === town.playerId));

  return player;
};
