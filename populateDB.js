const sqlite3 = require('sqlite3').verbose();
const fsp = require('fs').promises; // Node.js file system module with promises


const db = new sqlite3.Database('./restaurants.sqlite');

async function loadAndPopulate() {

    try {

         console.log('calling load');
        // wait for the file to be read
        const buffer = await fsp.readFile('./seed.json');
        const restaurantsArray = (JSON.parse(String(buffer)));
        // console.log(restaurants[0].menus[0].items[0]);

        db.serialize(function () { // serialize means execute one statement at a time

            // INSERT INTO RESTAURANTS
            for (let i = 0; i < restaurantsArray.length; i++) { //i=0  lists restaurants

                const currentRestuarant = restaurantsArray[i];

                let stmt;

                try {
                    stmt = db.prepare(`INSERT INTO RESTAURANTS (rname, imagelink) VALUES (?, ?)`);
                    stmt.run(currentRestuarant.name, currentRestuarant.image);
                }
                finally {

                    stmt.finalize();
                }

                // INSERT INTO MENUS
                for (let j = 0; j < currentRestuarant.menus.length; j++) { //j=0,1,2
                    const currentMenu = currentRestuarant.menus[j];

                    try {
                        stmt = db.prepare(`INSERT INTO MENU (title, restaurant_id) VALUES (?, ?)`);
                        stmt.run(currentMenu.title, i+1 );

                    }
                    finally {

                        stmt.finalize();
                    }

                    // INSERT INTO MENU_ITEMS
                    for (let k = 0; k < currentMenu.items.length; k++) {//k=0,1,2
                        const currentMenu_Items = currentMenu.items[k];  

                        try {
                            stmt = db.prepare(`INSERT INTO MENU_ITEMS (name, price, menu_id) VALUES (?, ?, ?)`);
                            stmt.run(currentMenu_Items.name, currentMenu_Items.price,i+1);
                        }
                        finally {

                            stmt.finalize();
                        }
                    }
                }
            }
        });

    } finally {
        db.close();// release resources 
    }
}

module.exports=loadAndPopulate;
loadAndPopulate();
