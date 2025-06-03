// server.js
// const express = require('express');
// const path = require('path');
// const app = express();

// const PORT = process.env.PORT || 3000;
// const DIST_FOLDER = path.join(__dirname, 'dist/pk-investing-ui');

// app.use(express.static(DIST_FOLDER));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(DIST_FOLDER, 'index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`App is running on port ${PORT}`);
// });


const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('.dist/pk-investing-ui'));

app.get('/*',(req,res)=>
    res.sendFile('index.html',{root:'dist/pk-investing-ui/'}),
);

app.listen(process.env.PORT || 8000)