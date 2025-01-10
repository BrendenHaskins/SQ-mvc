const index = (req,res) => {
    res.status(200),
    res.send("you've reached the index, with a log hopefully.");
}

export default {
    index
}