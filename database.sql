CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT,
  "hashedpassword" TEXT,
  "admin" BOOLEAN
);

CREATE TABLE "contact_info" (
  "user_id" INT PRIMARY KEY REFERENCES "users",
  "buisiness_name" TEXT,
  "industry_id" INT REFERENCES "industry",
  "phone_number" TEXT
);

CREATE TABLE "industry" (
  "id" SERIAL PRIMARY KEY,
  "industry" TEXT,
  "margin" DECIMAL(4,2)
);

CREATE TABLE "region" (
  "id" SERIAL PRIMARY KEY,
  "region" TEXT
);

CREATE TABLE "revenue_cost" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "users",
  "r_c" TEXT,
  "value" INT,
  "category" TEXT
);

CREATE TABLE "calculators" (
  "id" SERIAL PRIMARY KEY,
  "calculator" TEXT,
  "start_id" INT REFERENCES "question_calculator"
);

CREATE TABLE "inputs" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "users",
  "question_id" INT REFERENCES "questions",
  "value" INT
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question" TEXT,
  "response_type" TEXT,
  "help_TEXT" TEXT,
  "sub_questions" BOOLEAN,
  "split" BOOLEAN
);

CREATE TABLE "split" (
  "id" INT,
  "calculator_id" INT REFERENCES "calculators",
  "question_id" INT REFERENCES "questions",
  "split_text" TEXT,
  "next_id" INT
)

CREATE TABLE "sub_questions" (
  "id" SERIAL PRIMARY KEY,
  "question_id" INT REFERENCES "questions",
  "order" INT,
  "question" TEXT,
  "response_type" TEXT,
  "help_text" TEXT
);

CREATE TABLE "question_calculator" (
  "id" SERIAL PRIMARY KEY,
  "calculator_id" INT REFERENCES "calculators",
  "question_id" INT REFERENCES "questions",
  "next_id" int
);

INSERT INTO "questions" ("question", "response_type", "help_text", "sub_questiosn", "split")
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