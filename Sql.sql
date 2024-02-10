use marketing;

INSERT INTO profiles (profiles_id, profiles_name, profiles_description)
VALUES (1,'Admin','Admin p');

INSERT INTO profiles (profiles_id, profiles_name, profiles_description)
VALUES (2,'Cajero','Cajero p');

INSERT INTO employees (employees_dni, employees_name, employees_last_name, employees_mail, employees_telephone, employees_direction, employees_password, profiles_id)
VALUES ('12345678', 'Edu', 'Apellido', 'correo@ejemplo.com', '123456789', 'Dirección', '1234', 1);

INSERT INTO employees (employees_dni, employees_name, employees_last_name, employees_mail, employees_telephone, employees_direction, employees_password, profiles_id)
VALUES ('12345679', 'Edu', 'Apellido', 'correo@ejemplo.com', '123456789', 'Dirección', '1234', 2);

select * from employees;
SELECT * FROM profiles;