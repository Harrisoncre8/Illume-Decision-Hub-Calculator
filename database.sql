CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT,
  "hashedpassword" TEXT,
  "admin" BOOLEAN
);

CREATE TABLE "industry" (
  "id" SERIAL PRIMARY KEY,
  "industry" TEXT,
  "margin" DECIMAL(4,2)
);


CREATE TABLE "contact_info" (
  "user_id" INT PRIMARY KEY,
  "buisiness_name" TEXT,
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
  "value" INT
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question" TEXT,
  "response_type" TEXT,
  "help_text" TEXT,
  "sub_questions" BOOLEAN,
  "split" BOOLEAN
);

CREATE TABLE "split" (
  "id" INT,
  "calculator_id" INT,
  "question_id" INT,
  "split_text" TEXT,
  "next_id" INT
);

CREATE TABLE "sub_questions" (
  "id" SERIAL PRIMARY KEY,
  "question_id" INT,
  "order" INT,
  "question" TEXT,
  "response_type" TEXT,
  "help_text" TEXT
);

CREATE TABLE "question_calculator" (
  "id" SERIAL PRIMARY KEY,
  "calculator_id" INT,
  "question_id" INT,
  "next_id" int
);

INSERT INTO "questions" ("question", "response_type", "help_text", "sub_questions", "split")
VALUES (
  'Is this for a single sale or total product sales?',
  'radio',
  'Single sales are for when you are only considering a single transaction where total product sales considers multiple transactions.',
  FALSE,
  TRUE
),
(
  'What is your revinue?',
  'number',
  'Revinue is that amount of money you charge for a product or service',
  FALSE,
  FALSE
),
(
  'What are your direct costs?',
  'number',
  'Direct costs are costs that are specific to a sale such as labor costs and material costs',
  TRUE,
  FALSE
),
(
  'What are your indirect costs?',
  'number',
  'Indirect costs are costs that apply to all sales or services such as gas or rent',
  FALSE,
  FALSE
),
(
  'What is the total number of sales for this product?',
  'number',
  'How much of this product or service do you sell?',
  FALSE,
  FALSE
);

ALTER TABLE "contact_info" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "contact_info" ADD FOREIGN KEY ("industry_id") REFERENCES "industry" ("id");
ALTER TABLE "revenue_cost" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "inputs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "inputs" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "split" ADD FOREIGN KEY ("calculator_id") REFERENCES "calculators" ("id");
ALTER TABLE "split" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "sub_questions" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "question_calculator" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "question_calculator" ADD FOREIGN KEY ("calculator_id") REFERENCES "calculators" ("id");

INSERT INTO "calculators" ("calculator", "start_id") 
VALUES ('Define Your Profit Lever', 1),
('Break Even Pricing', 6),
('Price Setting', NULL);

INSERT INTO "question_calculator" ("calculator_id", "question_id", "next_id")
VALUES (1,1,2),
(1,2,3),
(1,3,4),
(1,4,NULL),
(1,5,2),
(2,2,7),
(2,3,8),
(2,4,NULL);

INSERT INTO "sub_questions" ("question_id", "order", "question", "response_type", "help_text")
VALUES (3,1,'What is the rate per of this labor?','number','Consider just one labor rate for this field.'),
(3,2,'How many hours of labor is done at this rate?','number','Consider just one labor rate for this field.'),
(3,3,'What are your raw material costs?','number','Raw material costs are things linke lumber or wool.'),
(3,4,'What are your part costs?','number','Part costs are things like hinges or templates.'),
(3,5,'What are some other direct costs?','number','Other costs may be things like rental space that is unique to each transaction');

INSERT INTO "split" ("calculator_id", "question_id","split_text","next_id")
VALUES(2,1,'Single Product',2),
(2,1,'Total Product', 5);

INSERT INTO contact_info (user_id, business_name, industry_id, phone_number, "name")
VALUES (1, 'Hennepin County', 1, '651-288-1234', 'Jack'),
(2, 'Prime Academy', 2, '651-234-9172', 'Crystal');

INSERT INTO users (email) 
VALUES ('jack@hennepin.gov'), ('crystal@primeacademy.io');

INSERT INTO industry (industry, margin)
VALUES ('commercial cleaning', .3),
('technical instruction', .4);
