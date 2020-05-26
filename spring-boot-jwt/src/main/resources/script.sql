create table users (id  serial not null, age int4, first_name varchar(255), last_name varchar(255), password varchar(255), salary int8, username varchar(255), primary key (id))

INSERT INTO Users (first_name, last_name, username, password, salary, age) VALUES ('Antonio','Cecere', 'antonio','$2a$10$SCL43tzIVPTfEtlqwF9SSuH8tMf1/2VCLAB24BaismiLTo0WL2LwS', 3456, 43);
