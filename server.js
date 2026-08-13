const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('frontend'));

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});