const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./restaurants.sqlite');

function depopulate() { //file to delete rows
    try {
        db.serialize(function () {


            try {
                let id = 2;
                db.run(`DELETE FROM MENU2 where id=? `, id, function (err) { //delete statement
                    if (err) {
                        return console.error(err.message);
                    }
                });
                console.log(`Row(s) deleted ${id}`);


            } finally {
                // release resources 
                // select the rows and print them out
               
                db.each("SELECT * FROM RESTAURANTS",
                    function (err, rows) {
                        console.log(rows);
                    }
                );
            }

        });
    } finally {
        // release resources 
        db.close();
    }
}

depopulate();