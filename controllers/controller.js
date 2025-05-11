import __dirname from "../app.js";
const index = (req,res) => {
    res.status(200);
    //does this work for all platforms?
    res.sendFile(__dirname + "/public/tracker.html");
}

export default {
    index
}