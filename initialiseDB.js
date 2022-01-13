const sqlite3 = require('sqlite3').verbose();


function initialise() {
    const db = new sqlite3.Database('./restaurants.sqlite'); //creates a restaurant databaseif doesnt exist/
    db.get("PRAGMA foreign_keys = ON")
    try {
        db.serialize(function () { //serialize: runs one after the other
            db.run("CREATE TABLE IF NOT EXISTS RESTAURANTS (restaurant_id INTEGER PRIMARY KEY AUTOINCREMENT, rname TEXT, imagelink TEXT)");
            db.run("CREATE TABLE IF NOT EXISTS MENU (menu_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, restaurant_id INTEGER, FOREIGN KEY(restaurant_id) REFERENCES RESTAURANTS(restaurant_id))");
            db.run("CREATE TABLE IF NOT EXISTS MENU_ITEMS (menu_items_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER, menu_id INTEGER, FOREIGN KEY(menu_id) REFERENCES MENU(menu_id))");
        });
    } finally { 
        // very important to always close database connections
        // else could lead to memory leaks
        
        db.close();
    }
}
initialise(); //call function