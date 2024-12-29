# ActoPedia-API

Actopedia es una API diseñada para que los usuarios puedan expresar sus opiniones sobre películas específicas. Además, permite explorar los personajes de cada película y leer información detallada tanto sobre ellos como sobre la obra en cuestión.

La plataforma cuenta con roles diferenciados para administradores y usuarios. Los administradores tienen la capacidad de bloquear cuentas de usuarios que publiquen comentarios inapropiados, inhabilitando su acceso.

Actopedia ofrece un sistema de inicio de sesión seguro mediante JSON Web Token (JWT), lo que garantiza la protección de los datos de los usuarios. También incluye un método de recuperación de contraseñas, que envía un correo electrónico con un enlace de confirmación para restablecerlas de manera sencilla y segura.

## Instalacion

1.  Clona el repositorio

```bash
git clone fjldsfjaldsfjasdf
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

### Uso

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

## Update Password

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

## Recovery Password

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

## Update Role

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

## Update State

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

## Get Users

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
- **Roles permitidos:** El usuario debe tener el rol maximo para poder crear nuevos actores. Si el usuario no tiene el rol correcto.

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

## Get Users

- **Method:** `PATCH`
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

## Update Actors

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

## Get User By Id

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
