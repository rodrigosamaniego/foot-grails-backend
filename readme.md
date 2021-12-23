Models
Shirt: modelo de playera para base de datos.
User: modelo de usuario para base de datos.

Controllers

shirtController
create: crea nuevas playeras con .post
readAll: lee todas las playeras creadas con .get
readOne: lee una playera creada con .get
edit: edita una playera con .put
delete: borra una playera con .delete

userController
create: crea usuario con .post
login: loggea usuario con .post
verifyToken: verifica usuario con .get

index.js

Importaciones
Middlewares
Rutas
Conexión al servidor