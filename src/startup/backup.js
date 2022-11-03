// https://github.com/trulymittal/mongodb_backup_nodejs/blob/master/app.js
// https://www.youtube.com/watch?v=JlM81PN9OP4

// const { spawn } = require("child_process");
// const path = require("path");
// const cron = require("node-cron");

// const DB_NAME = "eventDB";
// const ARCHIVE_PATH = path.join(__dirname, "public", `${DB_NAME}.gzip`);

// module.exports = function () {
//   const child = spawn("mongodump", [
//     `--db=${DB_NAME}`,
//     `--archive=${ARCHIVE_PATH}`,
//     "--gzip",
//   ]);

//   child.stdout.on("data", (data) => {
//     console.log("stdout:\n", data);
//   });
//   child.stderr.on("data", (data) => {
//     console.log("stderr:\n", Buffer.from(data).toString());
//   });
//   child.on("error", (error) => {
//     console.log("error:\n", error);
//   });
//   child.on("exit", (code, signal) => {
//     if (code) console.log("Process exit with code:", code);
//     else if (signal) console.log("Process killed with signal:", signal);
//     else console.log("Backup is successfull ✅");
//   });
// };
