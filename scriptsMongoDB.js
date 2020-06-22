//Muestra las bases de datos existentes
//-------show databases

//Muestra el nombre de la bse de datos actual
db.getName();

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

//todos los atributos excepto el que esta indicado con false
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
//gt -> greater than
db.users.find(
    {
        age: {
            $gt: 20 // edad > 20
        }
    }
)

//Obtener todos los usuarios cuya edad sea >= 26
//gt -> greater than equals
db.users.find(
    {
        age: {
            $gte: 26
        }
    }
)

//<= 26
//less than equals
db.users.find(
    {
        age: {
            $lte: 26
        }
    }
)

//menor que <
//less than
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
//donde el titulo inicie con la cadena "El"
db.books.find(
    {
        title: /^El/
    }
).pretty()
//where title like '%s'
//donde titulo termine con el caracter 's'
db.books.find(
    {
        title: /s$/
    }
).pretty()
//where title like '%la%'
//donde tutilo contenga la cadena "la"
db.books.find(
    {
        title: /la/
    }
).pretty()

//Obtener usuarios cuyo nombre sea eduardo o uriel o marines los cuales se indican en un arreglo
//Obtener documentos a partir de un arreglo de opciones, es decir que en este caso
//el campo name sea 'Eduardo' ó 'Uriel' ó 'Marines'
db.users.find(
    {
        name: {
            $in: ['Eduardo', 'Uriel', 'Marines']
        }
    }
).pretty()

//El operador contrario Not in 'nin'
//Obtener documentos a partir de un arreglo de opciones, es decir que en este caso
//el campo name sea diferente de 'Eduardo' ó 'Uriel' ó 'Marines'
db.users.find(
    {
        name: {
            $nin: ['Eduardo', 'Uriel', 'Marines']
        }
    }
).pretty()

//Consultas en función de los atributos de los documentos
var user5 = {
    name: 'Rafel',
    email: 'rafa@codigofacilito.com',
    support: true,
    createdAt: new Date(),
}

db.users.insertOne(user5)

//obtener usuarios que posean el campo "last_name"
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
//cambiamos el valor del campo support a false
rafael.support = false;
//actualizamos
db.users.save(rafael)

//updateOne y updateMany
//actualizar documentos, estableciendo support a todos los documentos que no lo tengan
//y lo inicializa en false
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
        $unset: { createdAt: true }
    }
)
//Incrementa o disminuye un valor numerico
db.users.updateOne(
    {
        name: 'Rafael'
    },
    {
        $inc: {
            age: 1//-1, -100 tambien es valido 
        }
    }
)

//upsert -> update 
//En el caso de upsert se usa para un valor el cual no estamos seguros si existe o no
db.users.updateOne(
    {
        name: 'Luis'
    },
    {
        $set: {
            edad: 28
        }
    },
    {
        upsert: true//upsert indica que si el documento no existe entonces debe ser creado con los valores qque se indicaron
    }
)


//Eliminar documento
db.users.remove(
    {
        name: 'Rafel'
    }
)
//Elimina todos los datos de la coleccion
db.users.remove({});

//dropDatabase Elimina base de datos
db.dropDatabase()
//drop Elimina documentos(Coleccion) elimina lacoleccion completa
db.books.drop()

//Inserta varios registros con un ciclo for
for (let i = 0; i < 100; i++) {
    db.demo.insert(
        { name: 'user' + i }
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
//obtiene el tercer elemento de la  colección saltandose los primeros 2
db.users.find().skip(2).limit(1)

//sort() obtener el nombre de todos los usuarios ordenados alfabeticamente
db.users.find(
    {},//Sin parametros para que nos regrese todos los nombres
    {
        _id: false, nombre: true
    }
).sort(
    {
        nombre: 1//le indicamos que vamos a ordenar por nombre de forma acendete
    }//Se usa -1 para ordenar decendente
)

//Ejemplo de la combinación de limit, skip y sort
//Obtener el tercer usuario de la lista de usuarios ordenados decendentemente
db, users.find.sort({
    name: -1
}).skip(2).limit(1);


//findAndModify
//Retorna el valor del documento antes de la actualización
db.users.findAndModify(
    {
        query: {
            email: 'marines@codigofacilito.com'
        },
        update: {
            $inc: {
                age: 1
            }
        }
    }
)

db.users.findAndModify(
    {
        query: {
            email: 'rafa@codigofacilito.com'
        },
        update: {
            name: 'Rafael'
        },
        new: true
    }
)

//Cambiar el nomre de un atributo
db.users.updateMany(
    {},//El primer parametro se queda vacio ya que nos interesa actualizar todos los registros
    {
        $rename: {
            last_name: 'lastName'
        }
    }
)

//
db.users.updateOne(
    {
        name: 'Eduardo'
    },
    {
        $set: {
            courses: ['Python', 'MongoDB', 'SQL', 'Java']
        }
    }
)

db.users.updateOne(
    {
        name: 'Rafael'
    },
    {
        $set: {
            courses: ['Git', 'Escritura', 'Redes']
        }
    }
)

//Buscar documentos cuyo atributo sea una lista,
//Para que esto funcione lalista tinene que ser identica a la 
//del documento y debe estar en el mismo orden
db.users.findOne(
    {
        courses: {
            $eq: ['Python', 'MongoDB', 'SQL', 'Java']
        }
    }
)

db.users.findOne(
    {
        courses: ['Python', 'MongoDB', 'SQL', 'Java']
    }
)

//Obtener todos los usuarios que posean un mongoDB en su lista de cursos
db.users.find(
    {
        courses: {
            $all: ['MongoDB']
        }
    }
)

//Obtener todos los usuarios que posean un MongoDB y SQL en su lista de cursos
db.users.find(
    {
        courses: {
            $all: ['SQL', 'MongoDB']//Los valores deben de ser correctos  de lo contrario no regresara nada la consulta
        }
    }
)

//Si mongo detecta que el atributo es una lista entonces realiza la busqueda delvalor dentro de la lista
//Es por ello que esta consulta funciona
db.users.find(
    {
        courses: 'MongoDB'
    }
)

//
db.users.updateOne(
    {
        name: 'Fernando'
    },
    {
        $set: {
            scores: [9, 8, 9, 5, 10]
        }
    }
)

db.users.updateOne(
    {
        name: 'Uriel'
    },
    {
        $set: {
            scores: [10, 9, 9, 8, 10]
        }
    }
)

//Obtener usuarios que tienen al menos un 10
//Obtener usuarios que tienen una calificación menor a 6
db.users.find(
    {
        scores: 10
    }
).pretty()

db.users.find(
    {
        scores: {
            $lt: 6
        }
    }
).pretty()

//Modificar longitud de listas, push, pull, pop
//Agregar 1 elemento a una lista
db.users.updateOne(
    {
        name: 'Rafael'
    },
    {
        $push: {
            courses: 'Python'
        }
    }
)

//Agregar 3 cursos $push, $each
db.users.updateOne(
    {
        name: 'Eduardo'
    },
    {
        $push: {
            courses: {
                $each: ['Django', 'Rails', 'Rust']
            }
        }
    }
)

//$position, insertarlo en una posision definida

db.users.updateOne(
    {
        name: 'Rafael'
    },
    {
        $push: {
            courses: {
                $each: ['JavaScript', 'C#', 'Python'],
                $position: 1//Se insertara en la posición definida
            }
        }
    }
)

//$sort, agrega elementos agrega elementos a una lista con un orden acendente o desendente

db.users.updateOne(
    {
        name: 'Fernando'
    },
    {
        $push: {
            scores: {
                $each: [10, 10],
                $sort: 1//El numero 1 indica que se quiere un orden acendente
            }
        }
    }
)


db.users.updateOne(
    {
        name: 'Uriel'
    },
    {
        $push: {
            scores: {
                $each: [10, 10],
                $sort: -1//El numero -1 indica que se quiere un orden decendente
            }
        }
    }
)

//Eliminar elementosd de una lista pull o pop
//PULL

db.users.updateMany(
    {
        courses: { $exists: true }
    },
    {
        $pull: {
            courses: 'Python'
        }
    }
)

//Elimina los cursos que se indican en la lista de todos los usuarios que 
//tengan un campo courses
db.users.updateMany(
    {
        courses: { $exists: true }
    },
    {
        $pull: {
            courses: {
                $in: ['Base de Datos', 'Django']
            }
        }
    }
)

//Actualizar una lista conociendo el indice del elemento a actualizar
db.users.updateMany(
    {
        scores: { $exists: true },
    },
    {
        $set: {
            'scores.0': 5//.0 indica la posición que se quiere actualizar dentro de la lista
        }
    }
)

//Cuando no conocemos el indice

db.users.updateMany(
    {
        scores: { $exists: true },
        scores: 9//Condición que dice que elemento se va a actualizar, en este caso es donde la calificación sea 9
    },
    {
        $set: {
            'scores.$': 6//El $ le dice a mongo que desconocemos que posición vamos a actualizar pero se lo haremos saber mediante la condición que se establecio en el bloque de llaves anterior
        }
    }
)

//$slice, permite conocer elementos de una lista mediante su indice o posición
//posición es        Indice es
//  1    2    3       0    1    2  
//['a', 'b', 'c']   ['a', 'b', 'c']

db.users.findOne(
    {
        name: 'Eduardo'
    },
    {
        _id: false,
        name: true,
        courses: {
            $slice: 1//puede recibir 2 tipos de valores, un numero entero o una lista
            //Es posible obtener el ultimo elemento de la lista usando -1
        }
    }
)
//Para obtener una porción de la lista
db.users.findOne(
    {
        name: 'Eduardo'
    },
    {
        _id: false,
        name: true,
        courses: {
            $slice: [0, 3]//Esta lista indica los indices desde donde hasta donde se ha de obtener la sublista
        }
    }
)

//Obtener documentos a partir del tamaño de sus listas
//Obtener usuarios con 5 cursos

db.users.find(
    {
        courses: {
            $size: 5
        }
    }
)

//$where
//Obtener usuarios que posean al menos 3 cursos

db.users.find(
    {
        $and: [
            {
                courses: { $exists: true }
            },
            {
                $where: 'this.courses.length >= 3'
            }
        ]
    }
).pretty()

//Documentos que almacenan otros documentos

db.users.updateOne(
    {
        name: 'Uriel'
    },
    {
        $set: {
            address: {
                state: 'CDMX',
                city: 'CDMX',
                postalCode: 1
            }
        }
    }
)

db.users.updateOne(
    {
        name: 'Marines'
    },
    {
        $set: {
            address: {
                state: 'CDMX',
                city: 'CDMX',
                number: 10,
                street: 'Calle número',
                postalCode: 1,
                references: ['Casa color azul', 'a un costado de una tienda'],
            }
        }
    }
)

//Obtener documentos que estan dentro de otros docuentos
//Ejercicios
//Obtener todos los usuarios que posean una dirección postal
//Obtener usuarios que posean un código postal 1 y numero igual a 10
//Obtener la primera referencia de los uauasrios con código postal y referencias
db.users.find(
    {
        address: { $exists: true }
    }
)

//Trae todos los documentos que posean address y que dentro del documento address posean un postalCode = 1
db.users.find(
    {
        'address.postalCode': 1,
    }
).pretty()

db.users.find(
    {
        $and: [
            {
                'address.postalCode': 1,
            },
            {
                'address.number': 10
            },
        ]
    }
).pretty()


db.users.find(
    {
        $and: [
            {
                address: { $exists: true }
            },
            {
                'address.references': { $exists: true },
            },
            {
                'address.number': 10
            },
        ]
    },
    {
        _id: false,
        name: true,
        'address.references': {
            $slice: 1
        }
    }
).pretty()

//Actualizar documentos enbebidos
db.users.updateOne(
    {
        name: 'Uriel'
    },
    {
        $set: {
            'address.number': 20,
            'address.references': [
                'Fuera de la casa se encuantra un parque',
                'Fuera de la casa se encuantra un árbol',
            ]
        }
    }
)

db.users.updateOne(
    {
        name: 'Marines'
    },
    {
        $push: {
            'address.references': {
                $each: [
                    'Fuera de la casa hay un rio',
                    'En la esquina hay un campo de tenis',
                ]
            }
        }
    }
)

db.users.updateOne(
    {
        name: 'Marines',
        'address.references': 'a un costado de una tienda'
    },
    {
        $set: {
            'address.references.$': 'A un costado de una tienda'
        }
    }
)

//Documentos dentro de listas
//Pirmero eliminamos el campo cursos
db.users.updateMany(
    {
        courses: { $exists: true }
    },
    {
        $unset: {
            courses: true
        }
    }
)


db.users.updateOne(
    {
        name: 'Fernando'
    },
    {
        $set: {
            courses: [
                {
                    title: 'Vue',
                    progress: 50,
                    completed: false
                },
                {
                    title: 'Docker',
                    progress: 100,
                    completed: true
                },
            ]
        }
    }
)
//$elemMatch
//Obtener usuarios que hayan completado almenos un curso
db.users.find(
    {
        courses: {
            $elemMatch: {
                completed: true
            }
        }
    }
)

//Mayor a 80%
db.users.find(
    {
        courses: {
            $elemMatch: {
                progress: { $gte: 80 }
            }
        }
    }
)

//Obtener el nombre del usuario con el titulo de cada uno de sus cursos

db.users.find(
    {
        courses: { $exists: true }
    },
    {
        _id: false,
        name: true,
        'courses.title': true
    }
).pretty()

//Actualizar documentos dentro de listas

db.users.updateOne(
    {
        name: 'Fernando'
    },
    {
        $set: {//Se actualizo el curso de vue mediante su indice
            'courses.0.progress': 100,
            'courses.0.completed': true
        }
    }
)

db.users.updateOne(
    {
        name: 'Fernando',
        'courses.title': 'Docker'
    },
    {
        $set: {//Se actualiza el curso de docker mediante su indice el cual se obtiene mediante la condicion que se establece en el primer bloque de llaves
            'courses.$.progress': 100,
            'courses.$.completed': true,
            'courses.$.tutor': {//Se agrego un campo mas al documento el cual es otro documento
                'name': 'Cody'
            },
        }
    }
)

db.users.updateOne(
    {
        name: 'Fernando',
        'courses.title': 'Docker'
    },
    {
        $set: {
            'courses.$.tutor.name': 'CódigoFacilito'
        }
    }
)

//Aggregation Framework
//aggregate pipeline, donde el resultado del proceso aterior es el input del siguiente

//Las siguientes dos consultas permiten acceder a la misma información
//la diferencia es que aggregate permite procesar dicha información antes de regresarla
//Lo que de lo contrario se tendria que realizar con javascript o el lenguaje de programación que se este usando
db.users.find(
    {
        age: { $gt: 25 }
    }
)


//Aggregate nos permite procesar la información obtenida de las consultas

db.users.aggregate(
    [//Cada elemento de este arreglo puede ser interpretado como una tarea independiente
        {//Donde primero se realiza esta consulta
            $match: {
                age: { $gt: 25 }
            }
        },
        {//Despues al resultado de la primera se aplica este filtro
            $match: {
                courses: { $exists: true }
            }
        },//Y el resultado de esta puede ser el input de una siguiente
        {
            $match: {
                lastName: 'García'
            }
        }
    ]
).pretty()
//Estas tareas mencionadas son parte del pipeline

db.users.aggregate(
    [
        {
            $match: {
                age: { $gt: 20 }
            }
        },
        {
            $match: {
                courses: { $exists: true }
            }
        },
        {
            $project: {//Poryecciones del resultado del pipeline
                _id: false,
                name: true,
                courses: true
            }
        },
        {
            $project: {
                name: true,
                firstCourses: {//Este es similar al alias (AS) de sql
                    //$slice permite trabajr sobre los elementos de una lista,
                    //En este caso le indicamos que queremos los dos primeros elementos de la lista
                    $slice: ['$courses', 2]//El signo $ indica que courses es una variable que se obtiene del resultado de la tarea anterior
                }
            }
        }
    ]
).pretty()


//$arrayElemAt

db.users.aggregate(
    [
        {
            $match: {
                age: { $gt: 20 }
            }
        },
        {
            $match: {
                courses: { $exists: true }
            }
        },
        {
            $project: {//Poryecciones del resultado del pipeline
                _id: false,
                name: true,
                courses: true
            }
        },
        {
            $project: {
                name: true,
                firstCourses: {//Este es similar al alias (AS) de sql
                    //$slice permite trabajr sobre los elementos de una lista,
                    //En este caso le indicamos que queremos los dos primeros elementos de la lista
                    $slice: ['$courses', 2]//El signo $ indica que courses es una variable que se obtiene del resultado de la tarea anterior
                }
            }
        },
        {
            $project: {
                name: true,
                course: {//Este es similar al alias (AS) de sql
                    //$arrayElementAt permite trabajr sobre los elementos de una lista,
                    //Le indicamos que queremos el primer elemento de  la lista
                    $arrayElemAt: ['$firstCourses', 0]//El signo $ indica que courses es una variable que se obtiene del resultado de la tarea anterior
                }
            }
        }
    ]
).pretty()


//$addfields agrega campos a la salida del proceso (pipeline)

db.users.aggregate(
    [
        {
            $match: {
                age: { $gt: 20 }
            }
        },
        {
            $match: {
                courses: { $exists: true }
            }
        },
        {
            $project: {
                _id: false,
                name: true,
                courses: true
            }
        },
        {
            $project: {
                name: true,
                firstCourses: {
                    $slice: ['$courses', 2]
                }
            }
        },
        {
            $project: {
                name: true,
                course: {
                    $arrayElemAt: ['$firstCourses', 0]
                }
            }
        },
        {
            $addFields: {
                currentDate: new Date()
            }
        }
    ]
).pretty()

db.users.aggregate(
    {
        $match: {
            scores: { $exists: true }
        }
    },
    {//En este caso project es como SELECT
        $project: {
            _id: false, name: true, scores: true
        }
    },
    {
        $set: {//Usamos el operador $sum para sumar el contenido de scores al cual se antepone el signo $ para indicar que es una variable que pertenece a la salida de la tarea anterior
            sum: { $sum: '$scores' }
        }
    }
).pretty()
//

db.users.aggregate(
    {
        $match: {
            scores: { $exists: true }
        }
    },
    {//En este caso project es como SELECT
        $project: {
            _id: false, name: true, scores: true
        }
    },
    {
        $set: {//Usamos el operador $sum para sumar el contenido de scores al cual se antepone el signo $ para indicar que es una variable que pertenece a la salida de la tarea anterior
            sum: { $sum: '$scores' }
        }
    },
    {
        $set: {//Obtiene el promedio
            avg: { $avg: '$scores' }
        }
    },
    {
        $match: {//Filtra los promedios amyores a 7
            avg: { $gt: 7 }
        }
    }
).pretty()

db.users.aggregate(
    [
        {
            $match: {
                $and: [
                    {
                        name: { $exists: true }
                    },
                    {
                        lastName: { $exists: true }
                    }
                ]
            }
        },
        {
            $project: {
                _id: false, name: true, lastName: true
            }
        },
        {
            $project: {
                fullName: {
                    $concat: ['$name', ' ', '$lastName']
                }
            }
        }
    ]
).pretty()

//$group
//Agrupar y contar los items conrespecto a su tipo
db.items.insertMany(
    [
        { type: 'Camera', color: 'Red', price: 120 },
        { type: 'Laptop', color: 'White', price: 400 },
        { type: 'Laptop', color: 'Black', price: 600 },
        { type: 'Camera', color: 'Silver', price: 200 },
        { type: 'Microphone', color: 'Black', price: 200 },
        { type: 'Mouse', color: 'White', price: 50 },
        { type: 'Monitor', color: 'White', price: 50 },
    ]
)

db.items.aggregate(
    [
        {
            $group: {//Se indica cual es el campo por el cual se agrpan
                _id: '$type',
                total: { $sum: 1 }//Va a sumar el numero de concurrencias por cada tipo
            }
        },
        {// HAVING
            $match: {//Que el total sea mayor a 2
                total: { $gt: 1 }
            }
        }
    ]
)

// $limit y $sort
// Obtener al usuario más jovén
db.users.aggregate(
    [
        {
            $sort: {//El 1 representa el orden acendente
                age: 1
            }
        },
        {
            $limit: 1
        },
        {
            $project: {
                _id: false, name: true, age: true
            }
        }
    ]
).pretty()
//$map
db.users.aggregate(
    [
        {
            $match: {
                scores: { $exists: true }
            }
        },
        {
            $project: {
                _id: false, name: true, scores: true
            }
        },
        {
            $project: {
                newListScores: {
                    $map: {
                        input: '$scores',
                        as: 'calificacion',
                        in: {//Se usa $$ para indicarle a mongo que la variable no es del output anterior 
                            $multiply: ['$$calificacion', 10]
                        }
                    }
                }
            }
        }
    ]
)

db.users.aggregate(
    [
        {
            $match: {
                courses: { $exists: true }
            }
        },
        {
            $project: {
                _id: false, name: true, courses: true
            }
        },
        {
            $project: {
                newList: {
                    $map: {
                        input: '$courses',
                        as: 'course',
                        in: {//Se usa $$ para indicarle a mongo que la variable no es del output anterior 
                            $multiply: ['$$course.progress', 10]
                        }
                    }
                }
            }
        }
    ]
)

//Simil del Modelo Relacional
//Relaciones
/**
 * uno a uno
 * uno a muchos
 * muchos a muchos
 */

var usuario = {
    nombre: 'Raquel',
    apellido: 'Dominguez',
    edad: 27,
    correo: 'raquel@ejemplo.com',
    direccionPotal: {
        calle: 'calle',
        ciudad: 'ciudad',
        estado: 'estado',
        codigoPostal: 1,
        numeroExt: 10
    }
}

db.users.insertOne(usuario)


//Uno a muchos con listas
var autor = {
    nombre: 'Stephen King',
    nacionalidad: 'Estadounidense',
    libros: [
        {
            titulo: 'it',
            fechaLanzamiento: '1986'
        },
        {
            titulo: 'El Resplandor',
            fechaLanzamiento: '1977'
        },
        {
            titulo: 'Misery',
            fechaLanzamiento: '1987'
        }
    ]
}

//Simil de uno a muchos con ObjectId
var autor = {
    nombre: 'Stephen King',
    nacionalidad: 'Estadounidense',
}

db.autores.insertOne(autor)
//ObjectId("5eeebfd0cda6ac676d1a6a5d")

var libro1 = {
    titulo: 'it',
    fechaLanzamiento: '1986',
    autor_id: ObjectId("5eeebfd0cda6ac676d1a6a5d")
}
var libro2 = {
    titulo: 'El Resplandor',
    fechaLanzamiento: '1977',
    autor_id: ObjectId("5eeebfd0cda6ac676d1a6a5d")
}
var libro3 = {
    titulo: 'Misery',
    fechaLanzamiento: '1987',
    autor_id: ObjectId("5eeebfd0cda6ac676d1a6a5d")
}

db.libros.insertMany([libro1, libro2, libro3])

//Indices
db.users.createIndex(
    {
        autor_id: 1
    }
)

//lookup -> join

db.autores.insertMany(
    [
        { nombre: 'J.K Rowling', nacionalidad: 'Britanica' },
        { nombre: 'George R.R. Martin', nacionalidad: 'Estadounidense' }
    ]
)

db.libros.insertMany(
    [
        {
            titulo: 'piedra filosofal',
            fechaLanzamiento: '1997',
            autor_id: ObjectId("5eeede7fcda6ac676d1a6a61"),
        },
        {
            titulo: 'prisionero de ascaban',
            fechaLanzamiento: '1999',
            autor_id: ObjectId("5eeede7fcda6ac676d1a6a61"),
        }
    ]
)

db.autores.aggregate(
    [
        {
            $lookup: {
                from: 'libros',//Documento con el que se ha de hacer el join
                localField: '_id',
                foreignField: 'autor_id',
                as: 'listadoLibros'
            }
        }
    ]
).pretty()
//autores que posean al menos un libro
db.autores.aggregate(
    [
        {
            $lookup: {
                from: 'libros',//Documento con el que se ha de hacer el join
                localField: '_id',//hace referencia ala PK
                foreignField: 'autor_id',//el campo de libros FK
                as: 'listadoLibros'//Alias ddel resultado del join
            }
        },
        {
            $match: {//Condición que indica que el resultado debe ser diferente de un arreglo vacio
                listadoLibros: {
                    $ne: []
                }
            }
        },
        {
            $project: {
                _id: false,
                nombre: true
            }
        }
    ]
).pretty()


///Generea un documento por cada elemento de la lista
//Genera $unwind

db.autores.aggregate(
    [
        {
            $lookup: {
                from: 'libros',
                localField: '_id',
                foreignField: 'autor_id',
                as: 'listadoLibros'
            }
        },
        {
            $unwind: '$listadoLibros'
        },
        {
            $project: {
                _id: false,
                nombre: true,
                libro: '$listadoLibros'
            }
        }
    ]
).pretty()


//RULES se define un SCHEMA que los documentos que se inserten
//tienen que cumlpir
//https://docs.mongodb.com/manual/reference/method/db.createCollection/
db.createCollection("contacts", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["phone"],
            properties: {
                phone: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    pattern: "@mongodb\.com$",
                    description: "must be a string and match the regular expression pattern"
                },
                status: {
                    enum: ["Unknown", "Incomplete"],
                    description: "can only be one of the enum values"
                }
            }
        }
    }
})

//Este documento si es valido para esa collección
var contacto = {
    phone:'000-00'
}

db.contacts.insertOne(contacto);

//Este documento no es valido, ya que el campo phone es requerido
var contacto = {
    numero:'000-00'
}

db.contacts.insertOne(contacto);


//Respaldar una Base de Datos
//mongodump --db <<nombreBD>> //Estos comandos no se ejecuta en el shell de mongo, se ejecuta en la terminal normal
//mongodump --collection <<nombreColeccion>> --db <<nombreBD>>

//mongorestore --db cursoMongoDB ./cursoMongoDB_dump
//                  [nombre bd]  [ruta de los archivos de respaldo]
//mongorestore --collection <<nombreColeccion>> --db <<nombreColeccion>> ./cursoMongoDB_dump/autores.bson
//                            [nombreColección]             [nombre bd]  [ruta del archivo .bson de respaldo]


/*
    Comando para crear un entorno virtual de python 3.6
    virtualenv -p /usr/bin/python3 env
    activar entorno virtual
    source env/bin/activate
    Cadena de conexión a la base de datos
    mongodb+srv://nestorjavier:<password>@cluster0-ttodu.mongodb.net/<dbname>?retryWrites=true&w=majority
    Para completar la cadena de conexión falta agregar el password, por cuestiones de seguridad es recomendable usar variables de entorno en lugar del texto plano
    para esto ultimo usamos la libreria python-decouple que se installa con el siguiente comando "pip3 install python-decouple"
    y para poder realizar la conexión usamos la libreria pymongo que se instala con el siguiente comando "pip3 install pymongo"
*/

