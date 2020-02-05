--#region Create Tables
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT,
  "hashedpassword" TEXT,
  "admin" BOOLEAN DEFAULT false
);

CREATE TABLE "industry" (
  "id" SERIAL PRIMARY KEY,
  "industry" TEXT,
  "margin" DECIMAL(4,2)
);

CREATE TABLE "contact_info" (
  "user_id" INT PRIMARY KEY,
  "name" TEXT,
  "business_name" TEXT,
  "industry_id" INT,
  "phone_number" TEXT
);

CREATE TABLE "revenue_cost" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "r_c" TEXT,
  "value" INT,
  "category" TEXT
);

CREATE TABLE "calculators" (
  "id" SERIAL PRIMARY KEY,
  "calculator" TEXT,
  "start_id" INT
);

CREATE TABLE "inputs" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "question_id" INT,
  "sub_questions_id" INT,
  "value" INT
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question" TEXT,
  "response_type" TEXT,
  "help_text" TEXT,
  "sub_questions" INT,
  "split" BOOLEAN,
  "checkboxes" BOOLEAN
);

CREATE TABLE "split" (
  "id" SERIAL PRIMARY KEY,
  "calculator_id" INT,
  "question_id" INT,
  "split_text" TEXT,
  "next_id" INT
);

CREATE TABLE "question_calculator" (
  "id" SERIAL PRIMARY KEY,
  "calculator_id" INT,
  "question_id" INT,
  "next_id" int
);

CREATE TABLE "checkboxes" (
  "id" SERIAL PRIMARY KEY,
  "question_id" INT,
  "checkbox_text" TEXT
);

CREATE TABLE "user_checks" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "question_id" INT
);
--#endregion

--#region Insert into questions
INSERT INTO "questions" ("question", "response_type", "help_text", "sub_questions", "split", "checkboxes")
VALUES (
  'Is this for a single sale or total product sales?',
  'radio',
  'Single sales are for when you are only considering a single transaction where total product sales considers multiple transactions.',
  NULL,
  TRUE,
  FALSE
),
(
  'What is your revinue?',
  'number',
  'Revinue is that amount of money you charge for a product or service',
  NULL,
  FALSE,
  FALSE
),
(
  'What are your direct costs?',
  'number',
  'Direct costs are costs that are specific to a sale such as labor costs and material costs',
  NULL,
  FALSE,
  FALSE
),
(
  'What are your indirect costs?',
  'number',
  'Indirect costs are costs that apply to all sales or services such as gas or rent',
  NULL,
  FALSE,
  FALSE
),
(
  'What is the total number of sales for this product?',
  'number',
  'How much of this product or service do you sell?',
  NULL,
  FALSE,
  FALSE
),
(
  'What do you plan on pricing this for?',
  'number',
  'Consider your costs and the value you bring with this product.',
  NULL,
  FALSE,
  FALSE
),
(
  'Would you like to input your direct costs as a total or walkthrough the categories?',
  'radio',
  'A total will just be one input field where the walkthrough will bring you through possible direct cost categories.',
  NULL,
  TRUE,
  FALSE
),
(
  'What is the rate per of this labor?',
  'number',
  'Consider just one labor rate for this field.',
  3,
  FALSE,
  FALSE
),
(
  'How many hours of labor is done at this rate?',
  'number',
  'Consider just one labor rate for this field.',
  3,
  FALSE,
  FALSE
),
(
  'What are your parts/raw material costs?',
  'number',
  'These are things that go into the making of the product or delivering of the service.',
  3,
  FALSE,
  FALSE
),
(
  'What are some other direct costs?',
  'number',
  'Other costs may be things like rental space that is unique to each transaction',
  3,
  FALSE,
  FALSE
),
(
  'What are salary costs?',
  'number',
  'Remember to include yourself if you pay yourself a salary.',
  4,
  FALSE,
  FALSE
),
(
  'What are benefit costs?',
  'number',
  'Benefits include things like health, dental, disability, life, etc.',
  4,
  FALSE,
  FALSE
),
(
  'What is your rent/buisiness morgage payment?',
  'number',
  'Remember to include escrow payments and insurance here.',
  4,
  FALSE,
  FALSE
),
(
  'How much do you spend on supplies?',
  'number',
  'These are supplies such as office supplies.',
  4,
  FALSE,
  FALSE
),
(
  'How much do you spend on travel?',
  'number',
  'This includes travel by land, sea, and air.',
  4,
  FALSE,
  FALSE
),
(
  'How much do you spend on buisiness meetings?',
  'number',
  'This does not include travel but would include lunch costs.',
  4,
  FALSE,
  FALSE
),
(
  'How much do you spend on your vehicles?',
  'number',
  'This includes any loan payments, gas, insurance, and periferals like a phone charger.',
  4,
  FALSE,
  FALSE
),
(
  'How much do you spend subscriptions?',
  'number',
  'This includes subscriptions like Office 365, adobe, and other regular payments.',
  4,
  FALSE,
  FALSE
),
(
  'How much do you spend on buisiness meetings?',
  'number',
  'This does not include travel but would include lunch costs.',
  4,
  FALSE,
  FALSE
),
(
  'How much do you spend on dues and fees?',
  'number',
  'I am not sure what to include here. Any ideas?.',
  4,
  FALSE,
  FALSE
),
(
  'How much do you spend on outside services?',
  'number',
  'I am not sure what to include here. Any ideas?.',
  4,
  FALSE,
  FALSE
),
(
  'What other expenses do you have across your business?',
  'number',
  'I am not sure what to include here. Any ideas?.',
  4,
  FALSE,
  FALSE
),
(
  'Would you like to input your indirect costs as a total or walkthrough the categories?',
  'radio',
  'A total will just be one input field where the walkthrough will bring you through possible indirect cost categories.',
  NULL,
  TRUE,
  FALSE
);
--#endregion

--#region Set up relations
ALTER TABLE "contact_info" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "contact_info" ADD FOREIGN KEY ("industry_id") REFERENCES "industry" ("id");
ALTER TABLE "revenue_cost" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "inputs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "inputs" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "split" ADD FOREIGN KEY ("calculator_id") REFERENCES "calculators" ("id");
ALTER TABLE "split" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "question_calculator" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "question_calculator" ADD FOREIGN KEY ("calculator_id") REFERENCES "calculators" ("id");
ALTER TABLE "checkboxes" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "user_checks" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "user_checks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
--#endregion

INSERT INTO "calculators" ("calculator", "start_id") 
VALUES ('Define Your Profit Lever', 1),
('Break Even Pricing', 6),
('Price Setting', 9);

--#region Set up Paths
INSERT INTO "question_calculator" ("calculator_id", "question_id", "next_id")
VALUES (1,1,2),
(1,2,13),
(1,3,28),
(1,4,NULL),
(1,5,6),
(2,2,14),
(2,3,29),
(2,4,NULL),
(3,5,15),
(3,3,30),
(3,4,12),
(3,6,NULL),
(1,7,3),
(2,7,7),
(3,7,10),
(1,8,17),
(1,9,18),
(1,10,19),
(1,11,4),
(2,8,21),
(2,9,22),
(2,10,23),
(2,11,8),
(3,8,25),
(3,9,26),
(3,10,27),
(3,11,11),
(1,24,4),
(2,24,8),
(3,24,11),
(1,12,32),
(1,13,33),
(1,14,34),
(1,15,35),
(1,16,36),
(1,17,37),
(1,18,38),
(1,19,39),
(1,20,40),
(1,21,41),
(1,22,42),
(1,23,null),
(2,12,44),
(2,13,45),
(2,14,46),
(2,15,47),
(2,16,48),
(2,17,49),
(2,18,50),
(2,19,51),
(2,20,52),
(2,21,53),
(2,22,54),
(2,23,null),
(3,12,56),
(3,13,57),
(3,14,58),
(3,15,59),
(3,16,60),
(3,17,61),
(3,18,62),
(3,19,63),
(3,20,64),
(3,21,65),
(3,22,66),
(3,23,12);
--#endregion

--#region Set up Splits
INSERT INTO "split" ("calculator_id", "question_id","split_text","next_id")
VALUES(1,1,'Single Product',2),
(1,1,'Total Product',5),
(1,7,'Single',3),
(1,7,'Walkthrough',16),
(2,7,'Single',7),
(2,7,'Walkthrough',20),
(3,7,'Single',10),
(3,7,'Walkthrough',24),
(1,24,'Single',4),
(1,24,'Walkthrough',31),
(2,24,'Single',8),
(2,24,'Walkthrough',43),
(3,24,'Single',11),
(3,24,'Walkthrough',55);
--#endregion

-- dummy industry data 
INSERT INTO industry ("industry", "margin") 
VALUES ('Attorney', 0.30), ('Cleaning', 0.20), ('Massage', 0.25);