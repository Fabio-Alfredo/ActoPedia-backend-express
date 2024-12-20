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

## Endpoints para autenticacion /auth

### Registro de usuario

- **Method:** `POST`
- **Path:** `/register`
- **Description:** Este endpoint permite el registro de nuevos usuarios dentro de la aplicacion
- **Ejemplo de respuesta**

#### Ejemplo de Solicitud

```json
{
  "username": "fabi",
  "email": "fabi@gmail.com",
  "password": "123456"
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
