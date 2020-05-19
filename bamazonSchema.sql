CREATE DATABASE bamazonCREATE DATABASE bamazon

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR (50),
	department_name VARCHAR (50),
	price DECIMAL (18, 2), 
	stock_quantity INT
)

INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES 
	("Gibson Les Paul Standard '60s Electric Guitar", "Electric Guitars", 2499.00, 15),
	("Fender American Professional Stratocaster Maple Fingerboard Electric Guitar", "Electric Guitars", 1449.99, 20),
	("Taylor 314ce V-Class Grand Auditorium Acoustic-Electric Guitar", "Acoustic-Electric Guitars", 1999.00, 25),
	("Takamine Pro Series 7 NEX Cutaway Acoustic-Electric Guitar", "Acoustic-Electric Guitars", 3199.99, 23),
	("Fender Special Edition Deluxe PJ Bass", "Electric Bass", 899.99, 40),
	("Ibanez SR300E 4-String Electric Bass", "Electric Bass", 349.99, 15),
	("DW Collector's Series Satin Specialty 5-Piece Shell Pack", "Acoustic Drums", 5146.70, 10),
	("Yamaha Stage Custom Birch 5-Piece Shell Pack", "Acoustic Drums", 679.99, 3),
	("Roland RD-2000 Digital Stage Piano", "Keyboards", 2599.99, 11),
	("Yamaha Montage 8 Flagship Synthesizer", "Keyboards", 3999.99, 16)