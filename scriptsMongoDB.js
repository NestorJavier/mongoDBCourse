//Muestra el nombre de la bse de datos actual
de.getName();

//Crea o cambia a otra base de datos
// ------use cursoMongoDB

//Muestra las colecciones de la base de datos
// ------show collections

//Mongo db es lazy por default, quiere decir que la base de datos o colección no se 
//Crean hasta que contienen información


//Insertar registro en colección actual
var user = {
    name: 'Eduardo',
    last_name: 'García',
    age: 26, email: 'eduardo@codigofacilito.com'
}

db.users.insert(user)
//Una vez que se ejecuta el comando de arriba genera un resultado
WriteResult({ "nInserted": 1 })
//Indica que la iserción fue exitosa


//para ver los documentos de una colección
db.users.find()
//{ "_id" : ObjectId("5ed1b3d7f522544b7f6764c5"), "name" : "Eduardo", "last_name" : "García", "age" : 26, "email" : "eduardo@codigofacilito.com" }

//InsertOne
var user2 = {
    name: 'Fernando',
    last_name: 'García',
    age: 24,
    email: 'fernando@codigofacilito.com'
}

db.users.insertOne(user2)

//InsertMany, inserta mas de un documento
var user3 = {
    name: 'Uriel',
    last_name: 'Camacho',
    age: 27,
    email: 'uriel@codigofacilito.com'
}
var user4 = {
    name: 'Marines',
    last_name: 'Méndez',
    age: 25,
    email: 'marines@codigofacilito.com'
}

db.users.insertMany([user3, user4])

db.users.find(
    { age: 25 }//criterios -> where
).pretty()

db.users.find(
    { age: 25 },//criterios -> where
    { name: true, email: true, _id: false }//Select
).pretty()

//todos los atributosexcepto el que esta indicado con false
db.users.find(
    { age: 25 },
    { age: false, }
).pretty()

//Trae información de la consulta
db.users.find().explain()
db.users.find().explain('executionstats')

//Diferente, $ne->notequals
//Todos los usuarios que su edad sea diferente de 25
db.users.find(
    {
        age: {
            $ne: 25
        }
    },
).pretty()

//Diferente, $eq->equals
//Todos los usuarios que su edad sea diferente de 25
db.users.find(
    {
        age: {
            $eq: 25
        }
    },
).pretty()
//En este caso esta consulta hace basicamente lo mismo que esta
db.users.find(
    { age: 25 },
).pretty()


/////////////Trae la primera ocurrencia de la consulta
db.users.findOne(
    {
        age: {
            $ne: 25
        }
    },
)

//Obtener todos los usuarios cuya edad sea mayor a 20
db.users.find(
    {
        age: {
            $gt: 20 // edad > 20
        }
    }
)

//Obtener todos los usuarios cuya edad sea >= 20
db.users.find(
    {
        age: {
            $gte: 26
        }
    }
)

//<= 26

db.users.find(
    {
        age: {
            $lte: 26
        }
    }
)

db.users.find(
    {
        age: {
            $lt: 26 //<
        }
    }
)

//  $eq     ==
//  $gt     >
//  $gte    >=
//  $lt     <
//  $lte    <=
//  $ne     !=

//Operadores logicos
//Obtener usuarios cuya edad sea mayor a 20 y menor que 26
//AND
db.users.find(
    {
        $and: [
            {
                age: { $gt: 20 }
            },
            {
                age: { $lt: 26 }
            }
        ]
    }
).pretty()

//Obtener usuarios cuya nombre sea eduardo o uriel
//AND
db.users.find(
    {
        $or: [
            {
                name: 'Eduardo'
            },
            {
                name: 'Uriel'
            }
        ]
    }
).pretty()

//Obtener usuarios cuyo nombre sea eduardo o uriel o edad sea mayor a 20 y menor a 25
//combinacion de operadores

db.users.find(
    {
        $or: [
            {
                name: { $eq: 'Eduardo' }
            },
            {
                name: { $eq: 'Uriel' }
            },
            {
                $and: [
                    { age: { $gt: 20 } },
                    { age: { $lt: 26 } }
                ]
            }
        ]
    }
).pretty()

db.books.insertMany(
    [
        { title: 'Don Quijote de la Mancha', sales: 500 },
        { title: 'Historia de dos ciudades', sales: 200 },
        { title: 'El señor de los anillos', sales: 150 },
        { title: 'El principito', sales: 140 },
        { title: 'El hobbit', sales: 100 },
        { title: 'Alicia en el país de las maravillas', sales: 100 },
        { title: 'El código Da Vinci', sales: 80 },
        { title: 'El alquimista', sales: 65 },
    ]
)

//like -> usando expreciones regulares
//Buscar sobre un texto
//Obtener libros que empiecen con 'El'
//Obtener libros que finalice con 's'
//Obtener libros que posean en su titulo la palabra 'la'

//where title like 'El%'
db.books.find(
    {
        title: /^El/
    }
).pretty()
//where title like '%s'
db.books.find(
    {
        title: /s$/
    }
).pretty()
//where title like '%la%'
db.books.find(
    {
        title: /la/
    }
).pretty()

//

//Obtener usuarios cuyo nombre sea eduardo o uriel o marines los cuales se indican en un arreglo
db.users.find(
    {
        name: {
            $in: ['Eduardo', 'Uriel', 'Marines']
        }
    }
).pretty()

//El operador contrario del anterior

db.users.find(
    {
        name: {
            $nin: ['Eduardo', 'Uriel', 'Marines']
        }
    }
).pretty()

//
var user5 = {
    name: 'Rafel',
    email: 'rafa@codigofacilito.com',
    support: true,
    createdAt: new Date(),
}

db.users.insertOne(user5)

//obtener usuarios que posean apellido
db.users.find(
    {
        last_name: {
            $exists: true
        }
    }
).pretty()

//obtener usuarios que no posean apellido
db.users.find(
    {
        last_name: {
            $exists: false
        }
    }
).pretty()

//Obtener todos los usuarios cuyo atributo createdAt sea tipo Date
db.users.find({
    createdAt: {
        $type: 'date'
    }
}).pretty()
//Esta consulta hace lo mismo que la anterior

db.users.find({
    $and: [
        { createdAt: { $exists: true } },
        { createdAt: { $type: 'date' } }
    ]
}).pretty()

//Actuaaliza un documento
var rafael = db.users.findOne({ name: 'Rafel' })
rafael.support = true;
db.users.save(rafael)

//updateOne y updateMany
db.users.updateMany(
    {
        support: {
            $exists: false
        }
    },
    {
        $set: {
            support: false
        }
    }
)
//Actualiza el valor de un atributo
db.users.updateOne(
    {
        name: 'Fernando'
    },
    {
        $set: {
            support: true
        }
    }
)

//$unset elimina atributos de un documento
db.users.updateOne(
    {
        createdAt: { $exists: true }
    },
    {
        $unset:{createdAt:true}
    }
)
//Incrementa o disminuye un valor numerico
db.users.updateOne(
    {
        name:'Rafael'
    },
    {
        $inc:{
            age:1//-1, -100 tambien es valido 
        }
    }
)

//upsert -> update 
//En el caso de upsert se usa para un valor el cual no estamos seguros si existe o no
db.users.updateOne(
    {
        name:'Luis'
    },
    {
        $set:{
            edad:28
        }
    },
    {
        upsert:true//upsert indica que si el documento no existe entonces debe ser creado con los valores qque se indicaron
    }
)


//Eliminar documento
db.users.remove(
    {
        name:'Luis'
    }
)
//Elimina todos los datos de la coleccion
db.users.remove({});

//dropDatabase Elimina base de datos
db.dropDatabase()
//drop Elimina documento
db.books.drop()

//Inserta varios registros con un ciclo for
for (let i = 0; i < 100; i++) {
    db.demo.insert(
        {name: 'user'+i}
    )
}

//El metodo find devuelve un cursor que tiene una capacidad maxima de 20 elementos
//pretty()
//count() regresa el numero de regsitros  de una consulta
db.users.find(
    {
        email: /codigofacilito.com$/
    }
).count()

//Limit() obtener los primeros dos usuarios de users
db.users.find().limit(2)
//skip omite el numero de registros que se le indican
db.users.find().skip(2).limit(1)

//sort() obtener el nombre de todos los usuarios ordenados alfabeticamente
db.usuarios.find(
    {},//Sin parametros para que nos regrese todos los nombres
    {
        _id:false, nombre:true
    }
).sort(
    {
        nombre: 1//le indicamos que vamos a ordenar por nombre de forma acendete
    }//Se usa -1 para ordenar decendente
)

//findAndModify
//Retorna el valor del documento antes de la actualización
db.usuarios.findAndModify(
    {
        query:{
            nombre: 'Alex Cruz'
        },
        update:{
            $inc:{
                estado:-1
            }
        }
    }
)