CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE gatitos (
    nombre TEXT NOT NULL,
    raza TEXT NOT NULL,
    fecha_nacimiento TEXT NOT NULL
);
