CREATE TABLE IF NOT EXISTS battery (
	id INTEGER,
	date date,
	time time,
	voltage REAL,
	current REAL,
	Cell1 REAL,
	Cell2 REAL,
	Cell3 REAL,
	Cell4 REAL,
	Cell5 REAL,
	Cell6 REAL,
	Cell7 REAL,
	Cell8 REAL,
	Cell9 REAL,
	Cell10 REAL,
	Cell11 REAL,
	Cell12 REAL,
	Cell13 REAL,
	avg_cell REAL,
	max_cell REAL,
	min_cell REAL,
	SOC SMALLINT,
	remaincap INTEGER,
	fcc INTEGER,
	cycle INTEGER,
	temp1 REAL,
	temp2 REAL,
	temp3 REAL,
	temp4 REAL,
	C_FET CHAR(3),
	D_FET CHAR(3),
	ProtectStatus SMALLINT,
	BalanceStatus SMALLINT

);



