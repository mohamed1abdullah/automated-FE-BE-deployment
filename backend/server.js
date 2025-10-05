const express = require('express');
const path = require('path');
const db = require('./db');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


// Serve frontend static files
app.use('/', express.static(path.join(__dirname, '..', 'frontend')));


// API: get profile
app.get('/api/profile', (req, res) => {
db.get('SELECT name, phone, email, linkedin FROM profile LIMIT 1', [], (err, row) => {
if(err){
console.error(err);
return res.status(500).json({error: 'db error'});
}
if(!row) return res.status(404).json({error: 'not found'});
res.json(row);
});
});



app.put('/api/profile', (req, res) => {
    const { name, phone, email, linkedin } = req.body;
    db.run('UPDATE profile SET name=?, phone=?, email=?, linkedin=? WHERE id=1', [name, phone, email, linkedin], (err) => {
        if(err){
            console.error(err);
            return res.status(500).json({error: 'db error'});
        }
        res.json({message: 'Profile updated successfully'});
    });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));