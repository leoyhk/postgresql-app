import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const sql = "SELECT * FROM users";
        const result = await conn.query(sql);
        res.status(200).json(result.rows);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "An error occurred while fetching users" });
      }
      break;

    case "POST":
      const { username, email } = body;
      console.log(username, email);
      if (!username || !email) {
        return res
          .status(502)
          .json({ message: "Invalid username or Invalid email" });
      }
      try {
        const sql = "INSERT INTO users (username, email) VALUES ($1, $2)";
        const result = await conn.query(sql, [username, email]);
        res.status(200).json(result.rows);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "An error occurred while creating users" });
      }
      break;
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
