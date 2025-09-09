CREATE OR REPLACE FUNCTION fun_insert_usuario(
    p_cuenta tab_usuario.cuenta%type,
    p_tipo tab_usuario.tipo%type,
    p_clave tab_usuario.clave%type,
	p_dinero tab_usuario.dinero%type,
    p_nombre tab_usuario.nombre%type,
    p_apellido tab_usuario.apellido%type
)
RETURNS int
AS $$
BEGIN
    INSERT INTO tab_usuario (cuenta, tipo, clave, dinero, nombre, apellido) values (p_cuenta, p_tipo, p_clave, p_dinero, p_nombre, p_apellido);
  IF FOUND THEN
    RAISE NOTICE 'Usuario insertado exitosamente: % %', p_nombre, p_apellido;
    RETURN 1;
  ELSE
    RAISE NOTICE 'Error: No se pudo insertar el usuario';
    RETURN 0;
  END IF;
END;
$$
language plpgsql;
