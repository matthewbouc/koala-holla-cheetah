const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const Pool = pg.Pool;
const config = {
    database: 'koala',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new Pool(config);

// For testing and debugging only...
pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', () => {
    console.log('Error with PostgreSQL pool', error);
});

// GET route to send back all koalas in database
router.get('/koala', (req,res) =>{
    let koalaList ='SELECT * FROM koala;';
    pool.query(koalaList)
    .then((result) =>{
        res.send(result.rows);
    }) .catch ((err) =>{
        console.log(`Error getting data ${koalaList}`, err);
        res.sendStatus(500);
    })
});

// POST route to add a koala to database
router.post('/koala', (req, res) => {
	const newKoala = req.body;
	const koalaList = `
	SELECT * FROM "koala";
	`;
	pool.query(koalaList, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes ])
		.then(dbResponse => {
			res.sendStatus(201);
		})
		.catch(err => {
			console.log('Error making query', err);
			res.sendStatus(500);
		});
});

// PUT

router.put('/koala/:id', (req, res) => {
    // get id from url (which is from html)
    const koalaId = req.params.id;
    
    //let transfer = req.body.readyForTransfer
    
    let putQuery = `UPDATE koala SET "readyForTransfer"=true WHERE id=$1;`;

    pool.query(putQuery, [koalaId])
    .then(dbResponse => {
        console.log('Updated Koala with PUT', dbResponse);
        res.sendStatus(202);
    })
    .catch(err => {
        console.log('There was an error updating transfer', error);
        res.sendStatus(500);
    })
});

//Access granted on github -- might have to accept it

//don't forget to bring ice cream

// DELETE
router.delete('/:id', (req,res) => {
    const koalaId = req.params.id;
    console.log(`Koala id is...${koalaId}`);
    const queryText = `
    DELETE FROM "koala" WHERE id = $1;
  `;

  pool.query(queryText, [koalaId])
    .then(dbResponse => {
      console.log(`Did we delete just one row? ${dbResponse.rowCount === 1}`);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Could not delete koala with id ${koalaId}.`, error);
      res.sendStatus(500);
    });
});





module.exports = koalaRouter;