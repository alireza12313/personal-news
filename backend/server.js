 const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const subscribersFile = path.join(__dirname, "subscribers.json");

app.get("/", function (req, res) {
    res.send("Backend سایت نبض فعال است!");
});

app.post("/newsletter", function (req, res) {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({
            message: "ایمیل وارد نشده است."
        });
    }

    let subscribers = [];

    if (fs.existsSync(subscribersFile)) {
        const fileData = fs.readFileSync(subscribersFile, "utf8");

        if (fileData.trim()) {
            subscribers = JSON.parse(fileData);
        }
    }

    subscribers.push({
        email: email,
        date: new Date().toISOString()
    });

    fs.writeFileSync(
        subscribersFile,
        JSON.stringify(subscribers, null, 2)
    );

    console.log("New newsletter subscriber:", email);

    res.json({
        message: "عضویت با موفقیت انجام شد!"
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});