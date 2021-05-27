const express = require('express');

const app = express();

// Allow static paths in client folder
app.use(express.static(__dirname));

const PORT = process.env.PORT || 4321;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
