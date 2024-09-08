CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC') NOT NULL
);

CREATE TABLE asset (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type TEXT,
    serial TEXT,
    is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC') NOT NULL
);

INSERT INTO serial (name) 
SELECT 'Serial ' || i AS name
FROM generate_series(1, 100) AS s(i);

CREATE TABLE asset_groups (
    asset_id INT NOT NULL REFERENCES asset(id),
    group_id INT NOT NULL REFERENCES groups(id),
    PRIMARY KEY (asset_id, group_id)
);

INSERT INTO asset (name, location_id, type, serial)
SELECT
    'Asset ' || i AS name,
    (SELECT id FROM location ORDER BY RANDOM() LIMIT 1) AS location_id,
    (SELECT name FROM type ORDER BY RANDOM() LIMIT 1) AS type,
    (SELECT name FROM serial ORDER BY RANDOM() LIMIT 1) AS serial
FROM generate_series(7000000, 10000000) AS s(i);