CREATE TABLE employees (
    nik VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    job_role VARCHAR(50),
    is_active BOOLEAN
);

CREATE TABLE presences (
    id SERIAL PRIMARY KEY,
    nik VARCHAR(20),
    nama VARCHAR(100) NOT NULL,
    presence_type INT,
    check_in TIMESTAMP NOT NULL,
    check_out TIMESTAMP NOT NULL,
    pict VARCHAR(255) NOT NULL,
    coordinate GEOMETRY(Point, 4326) NOT NULL,
    FOREIGN KEY (nik) REFERENCES employees(nik),
    FOREIGN KEY (presence_type) REFERENCES presence_types(id)
);

CREATE TABLE presence_types (
    id SERIAL PRIMARY KEY,
    presence_type VARCHAR(30) NOT NULL
);