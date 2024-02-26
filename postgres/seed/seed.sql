BEGIN TRANSACTION;

INSERT into users (name, email, joined) values ("Jessie", "jessie@gmail.com", "2024-01-01")
INSERT into login(name, email, joined) values ("$2b$10$kvYeogQ3geVD3uKXX2dscOALoG3VKDc0aZ4/P.nc2AdnmtJw/DfeG", "jessie@gmail.com")

COMMIT;