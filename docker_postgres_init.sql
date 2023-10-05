CREATE TABLE IF NOT EXISTS battery (
	id BIGSERIAL,
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
	Cell14 REAL,
	Cell15 REAL,
	Cell16 REAL,
	Cell17 REAL,
	Cell18 REAL,
	Cell19 REAL,
	Cell20 REAL,
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
	temp5 REAL,
	C_FET CHAR(3),
	D_FET CHAR(3),
	ProtectStatus INTEGER,
	BalanceStatus INTEGER

);

CREATE TABLE IF NOT EXISTS batteryowner (
	id INTEGER,
	name text

);

copy public.battery (id,date,time,voltage,current,cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8,cell9,cell10,cell11,cell12,cell13,avg_cell,max_cell,min_cell,soc,remaincap,fcc,cycle,temp1,temp2,temp3,temp4,c_fet,d_fet,protectstatus,balancestatus)  
FROM '/data4.csv' CSV HEADER;