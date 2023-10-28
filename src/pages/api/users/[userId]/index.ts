import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  const { body } = req;
  switch (req.method) {
    case "GET":
      try {
        const sql = "SELECT * FROM users WHERE id = $1";
        const result = await conn.query(sql, [userId]);
        res.status(200).json(result.rows);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "An error occurred while fetching user" });
      }
      break;
    case "PATCH":
      const { username, email } = body;
      if (!username || !email) {
        res.status(502).json({ message: "Invalid username or email" });
      }
      try {
        const sql = "UPDATE users SET username = $1, email = $2 WHERE id = $3";
        const result = await conn.query(sql, [username, email, userId]);
        res.status(200).json(result.rows);
      } catch {
        res
          .status(500)
          .json({ message: "An error occurred while editing user" });
      }
      break;
    default:
      res.status(400).json({ message: "Method not supported" });
  }
}
