const express = require('express');

const app = express();
const port = 5001;


app.listen(port, () => {
    console.info(`Server is listening on port ${port}`)
}).on("error", (err) => {
    console.error(`Error": ${err.message}`)
})
