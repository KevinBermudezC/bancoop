create function insert_usuario(
    p.cuenta tab_usuario.cuenta%type,
    p.tipo tab_usuario.tipo%type,
    p.clave tab_usuario.clave%type,
    p.dinero tab_usuario.dinero%type,
    p.nombre tab_usuario.nombre%type,
    p.apellido tab_usuario.apellido%type
)
returns int
as
$$
begin
    insert into tab_usuario (cuenta, tipo, clave, nombre, apellido) values (p.cuenta, p.tipo, p.clave, p.nombre, p.apellido);
end;
IF FOUND THEN
            RAISE NOTICE 'Usuario insertado exitosamente: % por usuario ID: %', p.nombre, p.apellido;
            RETURN 'Usuario insertado correctamente';
        ELSE
            RAISE NOTICE 'Error: No se pudo insertar el usuario';
            RETURN 'Error al insertar el usuario';
        END IF;
$$
language plpgsql;
