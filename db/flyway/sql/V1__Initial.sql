CREATE SEQUENCE price_id_seq START 1;

CREATE TABLE price (
    id integer default nextval('price_id_seq') NOT NULL,
	symbol char(8) not null,
	bid numeric(12, 24) not null,
	ask numeric(12, 24) not null,
    mid numeric(12, 24) not null,
	date timestamp not null
);

CREATE INDEX ON price (symbol);
CREATE INDEX ON price (date);