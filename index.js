import express from "express"
const app = express()
import mysql from "mysql"
import cors from "cors";
import {PORT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT} from "./config.js"

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});

app.post("/create", (req, res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const años = req.body.años;

    db.query('INSERT INTO empleados( nombre, edad, pais, cargo, años) VALUES(?,?,?,?,?)', [nombre, edad, pais, cargo,años],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});
app.get("/empleados", (req, res)=>{
    

    db.query('SELECT * FROM empleados',
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});
app.put("/update", (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const años = req.body.años;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, años=? WHERE id=?', [nombre, edad, pais, cargo,años,id],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;
    
    db.query('DELETE FROM empleados WHERE id=?', id,
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.listen(PORT, ()=>{
    console.log("corriendo en el puerto", PORT)
})