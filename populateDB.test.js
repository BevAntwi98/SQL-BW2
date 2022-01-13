const sqlite3 = require('sqlite3').verbose();
const loadAndPopulate = require('./populateDB');


describe('Restaurant Data Test Suite', () => {
    const db = new sqlite3.Database('./restaurants.sqlite');

    beforeEach(async () => {
        // loads the database
        //db.run('CREATE TABLE IF NOT EXISTS restaurants(restaurant_id INTEGER PRIMARY KEY AUTOINCREMENT, rname TEXT);')
        await loadAndPopulate();
    });
   
    //test to ensure count is 8
    test('restaurants are loaded into the database', done => {


        db.get("SELECT * from restaurants where restaurant_id=1 ",
            function (err, data) {
                try {
                    expect(data.rname).toBe('Bayroot');
                } catch {
                    //console.log(rows);
                    done(err);
                }
            })


    });
    test('restaurants are loaded into the database with a count', done => {


        db.get("SELECT count(*) FROM restaurants ",
            function (err, data) {
                try {
                    expect(data['count(*)']).toBe(8);
                } catch {
                    //console.log(rows);
                    done(err);
                }
            })

    });
    
    // timeout issue

    // test('restaurants are loaded into the database with wrong id', done => {

    //     db.get("SELECT * from restaurants where restaurant_id=2 ",
    //         function (err, data) {
    //             try {
    //                 expect(data.rname).not.toBe('Bayroot');
    //             } catch {
    //                 //console.log(rows);
    //                 done(err);
    //             }
    //         })
    // });

    // test('restaurants are loaded into the database', done => {

    //     try {
    //         db.get(""SELECT count(*) FROM restaurants"",
    //             function (err, data) {
    //                 try {
    //                     // expect(data['count(*)']).toBe(8);
    //                     //console.log(data);
    //                     expect(data[0].rname).toBe('Bayroot');
    //                     done();
    //                 }
    //                 catch {
    //                     done(err);
    //                 }
    //             }
    //         );
    //     } finally {
    //         db.close();
    //         done();
    //     }
    // });
  
});