-- create table and insert your data
CREATE TABLE IF NOT EXISTS profile (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
phone TEXT,
email TEXT,
linkedin TEXT
);

DELETE FROM profile;
INSERT INTO profile (name, phone, email, linkedin) VALUES (
'Mohamed Abdullah Al-Ghazali',
'01016293580',
'mohamed.abdallah0162@gmail.com',
'https://www.linkedin.com/in/mohamed1abdullah/'
);