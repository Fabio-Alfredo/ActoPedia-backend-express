# ActoPedia-API

Actopedia es una API diseñada para que los usuarios puedan expresar sus opiniones sobre películas específicas. Además, permite explorar los personajes de cada película y leer información detallada tanto sobre ellos como sobre la obra en cuestión.

La plataforma cuenta con roles diferenciados para administradores y usuarios. Los administradores tienen la capacidad de bloquear cuentas de usuarios que publiquen comentarios inapropiados, inhabilitando su acceso.

Actopedia ofrece un sistema de inicio de sesión seguro mediante JSON Web Token (JWT), lo que garantiza la protección de los datos de los usuarios. También incluye un método de recuperación de contraseñas, que envía un correo electrónico con un enlace de confirmación para restablecerlas de manera sencilla y segura.

## Instalacion

1.  Clona el repositorio

```bash
git clone https://github.com/Fabio-Alfredo/ActoPedia-backend-express.git
```

2.  Ve al direcctorio del proyecto

```bash
cd  ActoPedia-backend-express
```

3. Instala las dependencias

```bash
npm install
```

## Variables de entorno

Configuración del servidor

```
PORT=your_port # Puerto donde se ejecutará la aplicación.
```

Configuración de la base de datos

```
MONGODB_URI=uri_for_connection_with_mongodb  # URI para la conexión con MongoDB.
```

Configuración de roles

```
ROLE_TWO=role     # Segundo rol asignable (e.g., "moderador").
ROLE_THREE=role   # Tercer rol asignable (e.g., "editor").
ROLES=roles       # Lista de roles disponibles en la aplicación.
DEFAULT_ROLE=role # Rol predeterminado para nuevos usuarios.
```

Seguridad

```
SALT_ROUNDS=salt_for_encrypt_pass  # Número de rondas para encriptar contraseñas.
JWT_SECRET=your_jwt_secret  # Clave secreta para firmar y verificar tokens JWT.
```

Configuración de Cloudinary

```
CLOUDINARY_CLOUD_NAME=your_cloud_name  # Nombre de la nube en Cloudinary.
CLOUDINARY_API_KEY=your_api_key        # Clave de la API de Cloudinary.
CLOUDINARY_API_SECRET=your_api_secret  # Secreto de la API de Cloudinary.
```

Tokens

```
PREFIX_TOKEN=your_token_prefix   # Prefijo para los tokens (e.g., "Bearer").
```

Configuración de la compañía

```
COMPANY_NAME=your_company_name      # Nombre de la compañía o aplicación.
COMPANY_EMAIL=your_company_email     # Correo oficial de la compañía.
COMPANY_PASSWORD_EMAIL=your_email_password  # Contraseña del correo oficial.

```

# Uso

Instrucciones para arrancar el servidor:

Para iniciar el servidor en modo desarrollo:

1.

```bash
node app.js
```

2.

```bash
node --wathc app.js
```

# Endpoints

Los principales endpoints de la API se detallan a continuación:

## Endpoints para autenticacion

## Registro de usuario

- **Method:** `POST`
- **Path:** `/auth/register`
- **Description:** Este endpoint permite el registro de nuevos usuarios dentro de la aplicacion

#### Ejemplo de Solicitud

```json
{
  "username": "user",
  "email": "user@gmail.com",
  "password": "password"
}
```

#### Ejemplo de respuestas

- **Exitoso:**

```json
{
  "message": "User created"
}
```

- **Error:**

```json
{
  "error": "Email already in use"
}
```

## Login de usuario

- **Method:** `POST`
- **Path:** `/auth/login`
- **Description:** Este endpoint permite el inicio de sesión seguro para un usuario previamente registrado, permitiendo iniciar sesión ya sea con su dirección de correo electrónico o su nombre de usuario.

#### Ejemplo de solicitud

```json
{
  "identifier": "user@gmail.com",
  "password": "password"
}
```

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjRjYjVjMzQ4MTY4MjA5NWU2YjQyNyIsInJvbGUiOlsidXNlciIsImFkbWluIiwic3lzYWRtaW4iXSwiaWF0IjoxNzM0NzE1MTQ1LCJleHAiOjE3MzQ4MDE1NDV9.3PLEp7bzPI6_udZhoCPUaMCq98AbEOEcTilXun8rbeU",
  "expires_in": 1734801545400
}
```

- **Error:**

```json
{
  "error": "Invalid credentials"
}
```

## Cambiar Contraseña

- **Method:** `PATCH`
- **Path:** `/auth/password/:userId`
- **Description:** Este endpoint permite al usuario cambiar su contraseña proporcionando su contraseña actual y estableciendo una nueva.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

### Ejemplo de solicitud

```json
{
  "password": "password",
  "newPassword": "password2"
}
```

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "message": "Updated password"
}
```

- **Error:**

```json
{
  "error": "Invalid credential user"
}
```

## Recuperar Contraseña

- **Method:** `POST`
- **Path:** `/auth/recover-password`
- **Description:** Este método permite a los usuarios recuperar su contraseña olvidada. Se envía un correo electrónico con una contraseña temporal, y posteriormente se puede utilizar el endpoint de actualización de contraseña para establecer una nueva segura.

### Ejemplo de solicitud

```json
{
  "email": "fabioalfredo47@gmail.com"
}
```

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "message": "Email sent",
  "data": "6764cb5c3481682095e6b427"
}
```

- **Error:**

```json
{
  "error": "The email address is not registered"
}
```

## Endpoints para usuarios

## Cambiar Role

- **Method:** `PATCH`
- **Path:** `/users/role/:userId`
- **Description:** Este método permite asignar roles a los usuarios, el `id` del usuario a editar debe ser enviado por params ademas si el usuario ya contiene dicho rol sera removido. Sólo puede ser accesado por usuarios con roles de mayor rango.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.
- **Roles permitidos:** El usuario debe tener el rol maximo para recuperar la contraseña. Si el usuario no tiene el rol correcto, se devolverá un error.

### Ejemplo de solicitud

```json
{
  "role": "rol1"
}
```

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "message": "Role updated successfully"
}
```

- **Error:**

```json
{
  "error": "Access denied due to lack of permissions"
}
```

## Cambiar Estado del usuario

- **Method:** `PATCH`
- **Path:** `/users/state/:userId`
- **Description:** Este metodo permite bloquear a los usuarios que realicen acciones indevidas dentor de la aplicacion, el `id` del usuario a bloquar debe ser enviado por params, puede ser accesido por roles de mayor rango.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.
- **Roles permitidos:** El usuario debe tener el rol maximo para recuperar la contraseña. Si el usuario no tiene el rol correcto, se devolverá un error.

### Ejemplo de solicitud

```json
{
  "state": "blocked"
}
```

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "message": "User blocked successfully"
}
```

- **Error:**

```json
{
  "error": "User not exists"
}
```

## Obtener los Usuarios

- **Method:** `PATCH`
- **Path:** `/users/state/:userId`
- **Description:** Este metodo permite obtener toda la informacion de todos los usuarios registrados dentro de la aplicacion.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.
- **Roles permitidos:** El usuario debe tener el rol maximo para recuperar los usuarios. Si el usuario no tiene el rol correcto, se devolverá un error.

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
    [ {
            "_id": "6764cb5c3481682095e6b427",
            "username": "user",
            "email": "user@gmail.com",
            "reviews": [],
            "role": [
                "rol1",
                "rol2",
                "rol3"
            ],
            "state": "active",
            "updateRoleBy": [
                {
                    "user": "6764cb5c3481682095e6b427",
                    "date": "2024-12-20T01:56:29.462Z",
                    "_id": "6764cecd7e750a97dd2c719f"
                },
                {
                    "user": "6764cb5c3481682095e6b427",
                    "date": "2024-12-20T01:56:36.397Z",
                    "_id": "6764ced47e750a97dd2c71a8"
                }
            ],
            "createdAt": "2024-12-20T01:41:48.051Z",
            "updatedAt": "2024-12-20T17:55:35.824Z",
            "__v": 0
        }
    ]
}
```

- **Error:**

```json
{
  "error": "Internal server error while fetching users"
}
```

## Endpoints para actores

## Crear actor

- **Method:** `POST`
- **Path:** `/actors/create`
- **Description:** Este endpoint permite la creacion de nuevos actores dentro de la aplicacion

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.
- **Roles permitidos:** El usuario debe tener el rol maximo para poder crear nuevos actores. Si el usuario no tiene el rol correcto, se devolvera un error.

#### Ejemplo de Solicitud

```json
{
  "name": "actor",
  "age": "30",
  "image": file.image,
  "biography":"biografia que tiene este actor"
}
```

#### Ejemplo de respuestas

- **Exitoso:**

```json
{
  "name": "one piece",
  "age": 30,
  "image": "https://res.cloudinary.com/dosctrwix/image/upload/v1735433510/actors/actors/1735433509846.jpg",
  "biography": "Esta es una pelicula de one piece que se pone veregona desde el inicio",
  "createFor": {
    "user": "6764cb5c3481682095e6b427",
    "date": "2024-12-29T00:51:51.025Z"
  },
  "_id": "67709d272093474048327ff6",
  "movies": [],
  "updateFor": [],
  "createdAt": "2024-12-29T00:51:51.038Z",
  "updatedAt": "2024-12-29T00:51:51.038Z",
  "__v": 0
}
```

- **Error:**

```json
{
  "error": "Actor already exists"
}
```

## Obtener los Actores

- **Method:** `GET`
- **Path:** `/users/getActors`
- **Description:** Este metodo permite obtener toda la informacion de todos los actores almacenados dentro de la aplicacion.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
   [
    {
        "createFor": {
            "user": "6764cb5c3481682095e6b427",
            "date": "2024-12-29T00:51:51.025Z"
        },
        "_id": "67709d272093474048327ff6",
        "name": "one piece",
        "age": 30,
        "image": "https://res.cloudinary.com/dosctrwix/image/upload/v1735433510/actors/actors/1735433509846.jpg",
        "biography": "Esta es una pelicula de one piece que se pone veregona desde el inicio",
        "movies": [],
        "updateFor": [],
        "createdAt": "2024-12-29T00:51:51.038Z",
        "updatedAt": "2024-12-29T00:51:51.038Z",
        "__v": 0
    }
]
}
```

- **Error:**

```json
{
  "error": "Internal server error while getting actors"
}
```

## Actualizar un Actor

- **Method:** `PUT`
- **Path:** `/actors/:actorId`
- **Description:** Este endpoint permite a los usuarios administradores el poder editar la informacion sobre algun actor dentro de la aplicacion.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

- **Roles permitidos:** El usuario debe tener el rol maximo para recuperar la contraseña. Si el usuario no tiene el rol correcto, se devolverá un error.

### Ejemplo de solicitud

```json
{
  "name": "zoro",
  "biography": "biografia editada"
}
```

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "createFor": {
    "user": "6764cb5c3481682095e6b427",
    "date": "2024-12-29T00:51:51.025Z"
  },
  "_id": "67709d272093474048327ff6",
  "name": "zoro",
  "age": 30,
  "image": "https://res.cloudinary.com/dosctrwix/image/upload/v1735433510/actors/actors/1735433509846.jpg",
  "biography": "biografia editada",
  "movies": [],
  "updateFor": [
    {
      "user": "6764cb5c3481682095e6b427",
      "date": "2024-12-29T01:02:33.082Z",
      "_id": "67709fa91b5ef52df5fc08d2"
    },
    {
      "user": "6764cb5c3481682095e6b427",
      "date": "2024-12-29T01:04:15.507Z",
      "_id": "6770a00f1b5ef52df5fc08e5"
    }
  ],
  "createdAt": "2024-12-29T00:51:51.038Z",
  "updatedAt": "2024-12-29T01:04:15.507Z",
  "__v": 0
}
```

- **Error:**

```json
{
  "error": "Actor not existing"
}
```

## Obtener un actor por id

- **Method:** `GET`
- **Path:** `/users/:userId`
- **Description:** Este metodo permite obtener toda la informacion de un actor a partir del `id` del mismo.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "createFor": {
    "user": "6764cb5c3481682095e6b427",
    "date": "2024-12-29T00:51:51.025Z"
  },
  "_id": "67709d272093474048327ff6",
  "name": "zoro",
  "age": 30,
  "image": "https://res.cloudinary.com/dosctrwix/image/upload/v1735433510/actors/actors/1735433509846.jpg",
  "biography": "biografia editada",
  "movies": [],
  "updateFor": [
    {
      "user": "6764cb5c3481682095e6b427",
      "date": "2024-12-29T01:02:33.082Z",
      "_id": "67709fa91b5ef52df5fc08d2"
    },
    {
      "user": "6764cb5c3481682095e6b427",
      "date": "2024-12-29T01:04:15.507Z",
      "_id": "6770a00f1b5ef52df5fc08e5"
    }
  ],
  "createdAt": "2024-12-29T00:51:51.038Z",
  "updatedAt": "2024-12-29T01:04:15.507Z",
  "__v": 0
}
```

- **Error:**

```json
{
  "errors": ["Actor id must be a valid mongo id"]
}
```

## Endpoints para peliculas

## Crear pelicula

- **Method:** `POST`
- **Path:** `/movies/create`
- **Description:** Este endpoint permite la creacion de nuevas peliculas dentro de la aplicacion

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.
- **Roles permitidos:** El usuario debe tener el rol maximo para poder crear nuevas peliculas. Si el usuario no tiene el rol correcto, se devolvera un error.

#### Ejemplo de Solicitud (form-data)

La solicitud debe enviarse con el tipo de contenido **multipart/form-data**.

| Campo         | Tipo   | Descripción                              |
| ------------- | ------ | ---------------------------------------- |
| `title`       | String | Titulo de la pelicula                    |
| `director`    | String | Director de dicha pelicula               |
| `description` | String | Descripcion de la pelicula               |
| `year`        | Int    | Año de creacion de la pelicula           |
| `genero`      | String | Genero que define a dicha pelicula       |
| `image`       | File   | Imagen que representa la pelicula (file) |

#### Ejemplo de respuestas

- **Exitoso:**

```json
{
  "title": "primero",
  "director": "fabio",
  "reviews": [],
  "image": "https://res.cloudinary.com/dosctrwix/image/upload/v1740675838/movies/movies/1740675837548.jpg",
  "description": "un texto",
  "year": 2002,
  "genero": "adventure",
  "createFor": {
    "user": "6764cb5c3481682095e6b427",
    "date": "2025-02-27T17:03:58.962Z"
  },
  "_id": "67c09afefe07a2ffe2194e10",
  "actors": [],
  "updateFor": [],
  "createdAt": "2025-02-27T17:03:58.977Z",
  "updatedAt": "2025-02-27T17:03:58.977Z",
  "__v": 0
}
```

- **Error:**

```json
{
  "error": "Movie already exists"
}
```

## Obtener peliculas

- **Method:** `GET`
- **Path:** `/movies/getMovies`
- **Description:** Este metodo permite obtener toda la informacion de todas las peliculas almacenadas dentro de la aplicacion.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  [
      {
          "createFor": {
              "user": "6764cb5c3481682095e6b427",
              "date": "2025-02-27T17:03:58.962Z"
          },
          "_id": "67c09afefe07a2ffe2194e10",
          "title": "primero",
          "director": "fabio",
          "reviews": [],
          "image": "https://res.cloudinary.com/dosctrwix/image/upload/v1740675838/movies/movies/1740675837548.jpg",
          "description": "un texto",
          "year": 2002,
          "genero": "adventure",
          "actors": [],
          "updateFor": [],
          "createdAt": "2025-02-27T17:03:58.977Z",
          "updatedAt": "2025-02-27T17:03:58.977Z",
          "__v": 0
      }
  ]
}
```

- **Error:**

```json
{
  "error": "Internal server error while getting movies"
}
```

## Añadir Actores en pelicula

- **Method:** `PUT`
- **Path:** `/movies/addActor/:movieId`
- **Description:** Este endpoint permite a los usuarios poder editar los personajes de una pelicula añadiendo una lista de personajes.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

- **Roles permitidos:** El usuario debe tener el rol maximo para recuperar la contraseña. Si el usuario no tiene el rol correcto, se devolverá un error.

### Ejemplo de solicitud

```json
{
  "personajes": [
    {
      "actorId": "67c09ea83a14f442864721e5",
      "personaje": "Un bandido"
    }
  ]
}
```

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "createFor": {
    "user": "6764cb5c3481682095e6b427",
    "date": "2025-02-27T17:03:58.962Z"
  },
  "_id": "67c09afefe07a2ffe2194e10",
  "title": "primero",
  "director": "fabio",
  "reviews": [],
  "image": "https://res.cloudinary.com/dosctrwix/image/upload/v1740675838/movies/movies/1740675837548.jpg",
  "description": "un texto",
  "year": 2002,
  "genero": "adventure",
  "actors": [
    {
      "actor": "67c09ea83a14f442864721e5",
      "personaje": "un dog",
      "_id": "67c09eb93a14f442864721f2"
    }
  ],
  "updateFor": [],
  "createdAt": "2025-02-27T17:03:58.977Z",
  "updatedAt": "2025-02-27T17:19:53.909Z",
  "__v": 0
}
```

- **Error:**

```json
{
  "errors": ["Each 'actorId' must be a valid Mongo ID"]
}
```

## Actualizar Pelicula

- **Method:** `PUT`
- **Path:** `/movies/:movieId`
- **Description:** Este endpoint permite a los usuarios administradores el poder editar la informacion sobre alguna pelicula dentro de la aplicacion, editara solo los campos enviados.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

- **Roles permitidos:** El usuario debe tener el rol maximo para recuperar la contraseña. Si el usuario no tiene el rol correcto, se devolverá un error.

### Ejemplo de solicitud

```json
{
  "title": "El oso"
}
```

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "createFor": {
    "user": "6764cb5c3481682095e6b427",
    "date": "2025-02-27T17:03:58.962Z"
  },
  "_id": "67c09afefe07a2ffe2194e10",
  "title": "El oso",
  "director": "fabio",
  "reviews": [],
  "image": "https://res.cloudinary.com/dosctrwix/image/upload/v1740675838/movies/movies/1740675837548.jpg",
  "description": "un texto",
  "year": 2002,
  "genero": "adventure",
  "actors": [
    {
      "actor": "67c09ea83a14f442864721e5",
      "personaje": "un dog",
      "_id": "67c09eb93a14f442864721f2"
    }
  ],
  "updateFor": [
    {
      "user": "6764cb5c3481682095e6b427",
      "date": "2025-02-27T17:28:30.808Z",
      "_id": "67c0a0be3a14f44286472203"
    }
  ],
  "createdAt": "2025-02-27T17:03:58.977Z",
  "updatedAt": "2025-02-27T17:28:30.809Z",
  "__v": 0
}
```

- **Error:**

```json
{
  "errors": ["Title must be string"]
}
```

## Obtener pelicula por id

- **Method:** `GET`
- **Path:** `/movies/:movieId`
- **Description:** Este metodo permite obtener toda la informacion de una pelicula a partir del `id` de la misma.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "createFor": {
    "user": "6764cb5c3481682095e6b427",
    "date": "2025-02-27T17:03:58.962Z"
  },
  "_id": "67c09afefe07a2ffe2194e10",
  "title": "El oso",
  "director": "fabio",
  "reviews": ["67c0a359814b0be97387ca22"],
  "image": "https://res.cloudinary.com/dosctrwix/image/upload/v1740675838/movies/movies/1740675837548.jpg",
  "description": "un texto",
  "year": 2002,
  "genero": "adventure",
  "actors": [
    {
      "actor": "67c09ea83a14f442864721e5",
      "personaje": "un dog",
      "_id": "67c09eb93a14f442864721f2"
    }
  ],
  "updateFor": [
    {
      "user": "6764cb5c3481682095e6b427",
      "date": "2025-02-27T17:28:30.808Z",
      "_id": "67c0a0be3a14f44286472203"
    },
    {
      "user": "6764cb5c3481682095e6b427",
      "date": "2025-02-27T17:30:01.879Z",
      "_id": "67c0a1193a14f44286472210"
    }
  ],
  "createdAt": "2025-02-27T17:03:58.977Z",
  "updatedAt": "2025-02-27T17:39:37.661Z",
  "__v": 0
}
```

- **Error:**

```json
{
  "error": "Token is required"
}
```

## Endpoints para Reviews

## Crear review

- **Method:** `POST`
- **Path:** `/reviews/create`
- **Description:** Este endpoint permite la creacion de nuevas reviews para una pelicula.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

#### Ejemplo de Solicitud

```json
{
  "content": "La pelicula esta chida",
  "qualification": 2,
  "movie": "67c09afefe07a2ffe2194e10"
}
```

#### Ejemplo de respuestas

- **Exitoso:**

```json
{
  "content": "La pelicula esta chida",
  "qualification": 2,
  "user": "6764cb5c3481682095e6b427",
  "movie": "67c09afefe07a2ffe2194e10",
  "_id": "67c0a359814b0be97387ca22",
  "createdAt": "2025-02-27T17:39:37.518Z",
  "updatedAt": "2025-02-27T17:39:37.518Z",
  "__v": 0
}
```

- **Error:**

```json
{
  "error": "Token is required"
}
```

## Actualizar Review

- **Method:** `PUT`
- **Path:** `/movies/:movieId`
- **Description:** Este endpoint permite a un usuario poder editar el comentarios que registro sobre una pelicula.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.

### Ejemplo de solicitud

```json
{
  "content": "aqui va otro texto veda ",
  "qualification": 2
}
```

#### Ejemplo de respuestas

- **Exitosa:**

```json
{
  "_id": "67c0a359814b0be97387ca22",
  "content": "Esta pelicula esta mas que chida le subo puntos ",
  "qualification": 5,
  "user": "6764cb5c3481682095e6b427",
  "movie": "67c09afefe07a2ffe2194e10",
  "createdAt": "2025-02-27T17:39:37.518Z",
  "updatedAt": "2025-02-27T17:47:03.910Z",
  "__v": 0
}
```

- **Error:**

```json
{
  "errors": ["qualification must be a number"]
}
```

## Eliminar Review

- **Method:** `Delete`
- **Path:** `/reviews/delete/:movieId`
- **Description:** Este endpoint permite a un usuario poder eliminar un comentario que alla generado sobre una pelicula.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de `JWT` válido para proceder.


#### Ejemplo de respuestas

- **Exitosa:**


```json
{
  "message": "Review deleted"
}
```

- **Error:**

```json
{
    "error": "Review not existing"
}
```
