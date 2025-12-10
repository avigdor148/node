import knex from 'knex';

const db = knex({   
    client: 'pg',
    connection: {
        host : 'localhost',
        user: 'postgres',
        password: 'Asg148',
        database: 'postgres'
    }
})



async function createTable() {

    await db.raw('CREATE TABLE IF NOT EXISTS mycompany (id SERIAL PRIMARY KEY, name TEXT NOT NULL, age INTEGER, address TEXT, salary REAL)');
        console.log("Table created successfully");
}

createTable();


////insert(post)

async function insertData() {
    await db('mycompany').insert([
        { name: 'John Doe', age: 30, address: '123 Main St', salary: 50000 },
        { name: 'Jane Smith', age: 25, address: '456 Elm St', salary: 60000 },
        { name: 'Alice Johnson', age: 28, address: '789 Oak St', salary: 70000 },
        { name: 'Bob Brown', age: 35, address: '321 Pine St', salary: 80000 },
        { name: 'Charlie White', age: 40, address: '654 Maple St', salary: 90000 }
    ]);
    console.log("Data inserted successfully");
}

insertData();

//get all data
async function getAllData() {
    const data = await db('mycompany').select('*');
    console.log("All data:", data);
}

getAllData();

//post 

async function insertPost(newemployee) {
    await db.raw(
        'INSERT INTO mycompany (name, age, address, salary) VALUES (?, ?, ?, ?)',
        [newemployee.name, newemployee.age, newemployee.address, newemployee.salary]
    );
}

const employee = {
    name: 'avigdor',
    age: 30,
    address: '123 New St',
    salary: 50000
};

insertPost(employee);

//put-patch

async function updateRow(updated_employee, id) {
    await db.raw(`UPDATE mycompany set name=?,age=?,address=?,salary=? where id=?`,
        [updated_employee.name, updated_employee.age, updated_employee.address, updated_employee.salary, id])
}

const updatedEmployee = {
    name: 'chana',
    age: 31,
    address: '123 New St',
    salary: 55000
};


updateRow(updatedEmployee, 15);

//get by id
async function getById(id) {
    await db.raw(`SELECT * FROM mycompany WHERE id = ?`, [id])
}

getById(15);

async function deletTable(){
    await db.raw('DROP TABLE IF EXISTS mycompany');
}
deletTable()