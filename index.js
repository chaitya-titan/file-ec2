const express = require("express");
const formidable = require("formidable");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.send(`
      <h2>With <code>"express"</code> npm package</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="upload" multiple="multiple" /></div>
        <input type="submit" value="Upload" />
      </form>
    `);
});

app.post("/api/upload", (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ fields, files });
  });

  form.on("fileBegin", (upload, file) => {
    const newPath = path.join(__dirname, "assets", file.originalFilename);
    console.log(newPath);
    file.filepath = newPath;

    res.status(200);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
