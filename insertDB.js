const sqlite3 = require('sqlite3').verbose();
const fsp = require('fs').promises; // Node.js file system module with promises


const db = new sqlite3.Database('./restaurants.sqlite');

try {
    stmt = db.prepare(`INSERT INTO RESTAURANTS (rname, imagelink) VALUES (?, ?)`);
    stmt.run('TrincoBay', 'TrincoBayLink');

    // RESTAURANT HAS 2 MENUS
    stmt = db.prepare(`INSERT INTO MENU (title, restaurant_id ) VALUES (?,?) `);
    stmt.run('TrincoBay Evening Menu', 1);
    stmt = db.prepare(`INSERT INTO MENU2 (title, restaurant_id ) VALUES (?,?) `);
    stmt.run('TrincoBay Lunch Menu', 1);

    // EACH MENU HAS AN ITEM
    stmt = db.prepare(`INSERT INTO MENU_ITEMS (name, price, menu_id) VALUES (?,?,?) `);
    stmt.run('Gobi Manchurian', 6.00, 1);
    stmt = db.prepare(`INSERT INTO MENU_ITEMS (name, price, menu_id) VALUES (?,?,?) `);
    stmt.run('Aubergine Prattel', 7.50, 1);
    stmt = db.prepare(`INSERT INTO MENU_ITEMS (name, price, menu_id) VALUES (?,?,?) `);
    stmt.run('Paneer Biryani', 7.50, 2);

    stmt = db.prepare(`INSERT INTO MENU_ITEMS (name, price, menu_id) VALUES (?,?,?) `);
    stmt.run('Chilli Chicken Bites', 7.50, 2);

    console.log("this worked");

}

finally {
    // release resources 
    stmt.finalize();


    // Different ways to select , join and count
    //  SELECT RESTAURANT.name, MENU.title, MENU_ITEMS.name FROM MENU join MENU_ITEMS on MENU.id = MENU_ITEMS.menu_id join RESTAURANT on RESTAURANT.id=MENU.restaurant_id
    // SELECT RESTAURANTS.name, MENU.title, FROM RESTAURANTS JOIN MENU on RESTAURANTS.id=MENU.restaurant_id
    // select RESTAURANT.name, count(DISTINCT MENU.title) from RESTAURANT join MENU on RESTAURANT.id=MENU.restaurant_id group by RESTAURANT.name;

    db.each("SELECT * FROM MENU",
        function (err, rows) {

            if (err) {
                console.log(err);
            }
            console.log(rows);
        }
    );
    db.close();// release resources 
}
