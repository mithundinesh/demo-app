import fs from "fs";

export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body
        fs.writeFileSync("./data.json", JSON.stringify(data, null, 2))
        return res.status(200).json({ message: "ok" })
    }

    if (req.method === "GET") {

        const data = fs.readFileSync("./data.json", "utf8");

        return res.status(200).json(data)
    }
}