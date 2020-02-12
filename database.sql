--#region Create Tables
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT,
  "hashedpassword" TEXT,
  "admin" BOOLEAN DEFAULT false,
  "super_admin" BOOLEAN DEFAULT false
);

CREATE TABLE "industry" (
  "id" SERIAL PRIMARY KEY,
  "industry" TEXT,
  "gross_margin" DECIMAL(4,2),
  "op_margin" DECIMAL(4,2),
  --  service (true), or product (false)
  "service" BOOLEAN,
  "enabled" BOOLEAN DEFAULT true
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
  "header" TEXT,
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
  "user_id" INT,
  "question_id" INT,
  PRIMARY KEY ("user_id", "question_id")
);
--#endregion

--#region Insert into questions
INSERT INTO "questions" ("question", "response_type", "help_text", "sub_questions", "split", "checkboxes","header")
VALUES (
  'Is this for a single sale or total product sales?',
  'radio',
  'Single sales are for when you are only considering a single transaction where total product sales considers multiple transactions',
  NULL,
  TRUE,
  FALSE,
  'Single or Total Sales'
),
(
  'What is your revenue?',
  'number',
  'Revenue is that amount of money you charge for a product or service',
  NULL,
  FALSE,
  FALSE,
  'Revenue'
),
(
  'What are your direct costs?',
  'number',
  'Direct costs are costs that are specific to a sale such as labor costs and material costs',
  NULL,
  FALSE,
  FALSE,
  'Direct Costs'
),
(
  'What are your indirect costs?',
  'number',
  'Indirect costs are costs that apply to all sales or services such as gas or rent',
  NULL,
  FALSE,
  FALSE,
  'Indirect Costs'
),
(
  'What is the total number of sales for this product?',
  'number',
  'How much of this product or service do you sell?',
  NULL,
  FALSE,
  FALSE,
  'Number of Sales'
),
(
  'What do you plan on pricing this for?',
  'number',
  'Consider your costs and the value you bring with this product',
  NULL,
  FALSE,
  FALSE,
  'Product/Service Price'
),
(
  'Would you like to input your direct costs as a total or walkthrough the categories?',
  'radio',
  'A total will just be one input field where the walkthrough will bring you through possible direct cost categories',
  NULL,
  TRUE,
  FALSE,
  'Direct Costs Walkthrough'
),
(
  'What is the rate per hour of this labor?',
  'number',
  'Consider just one labor rate for this field',
  3,
  FALSE,
  FALSE,
  'Labor Rate'
),
(
  'How many hours of labor are done at this rate?',
  'number',
  'Consider just one labor rate for this field',
  3,
  FALSE,
  FALSE,
  'Labor Hours'
),
(
  'What are your parts or raw material costs?',
  'number',
  'These are things that go into the making of the product or delivering of the service',
  3,
  FALSE,
  FALSE,
  'Parts/Raw Materials'
),
(
  'What are some other direct costs you have?',
  'number',
  'Other costs may be things like rental space that is unique to each transaction',
  3,
  FALSE,
  FALSE,
  'Other Direct Costs'
),
(
  'What are your salary costs?',
  'number',
  'Remember to include yourself if you pay yourself a salary',
  4,
  FALSE,
  FALSE,
  'Salary'
),
(
  'What are your employee benefit costs?',
  'number',
  'Benefits include things like health, dental, disability, life, etc',
  4,
  FALSE,
  FALSE,
  'Benefits'
),
(
  'What is your rent or morgage payment?',
  'number',
  'Remember to include escrow payments and insurance',
  4,
  FALSE,
  FALSE,
  'Rent/business'
),
(
  'How much do you spend on supplies?',
  'number',
  'These are supplies such as office supplies',
  4,
  FALSE,
  FALSE,
  'Supplies'
),
(
  'How much do you spend on travel?',
  'number',
  'This includes travel by land, sea, and air',
  4,
  FALSE,
  FALSE,
  'Travel'
),
(
  'How much do you spend on business meetings?',
  'number',
  'This does not include travel but would include lunch costs',
  4,
  FALSE,
  FALSE,
  'Meetings'
),
(
  'How much do you spend on your vehicles?',
  'number',
  'This includes any loan payments, gas, insurance, and periferals like a phone charger',
  4,
  FALSE,
  FALSE,
  'Vehicle'
),
(
  'How much do you spend on subscriptions?',
  'number',
  'This includes subscriptions like Office 365, adobe, and other regular payments',
  4,
  FALSE,
  FALSE,
  'Subsciptions'
),
(
  'How much do you spend on dues and fees?',
  'number',
  'I am not sure what to include here. Any ideas?',
  4,
  FALSE,
  FALSE,
  'Dues and Fees'
),
(
  'How much do you spend on outside services?',
  'number',
  'I am not sure what to include here. Any ideas?',
  4,
  FALSE,
  FALSE,
  'Outside Services'
),
(
  'What other expenses do you have across your business?',
  'number',
  'I am not sure what to include here. Any ideas?',
  4,
  FALSE,
  FALSE,
  'Other Indirect Expenses'
),
(
  'Would you like to input your indirect costs as a total or walkthrough the categories?',
  'radio',
  'A total will just be one input field where the walkthrough will bring you through possible indirect cost categories',
  NULL,
  TRUE,
  FALSE,
  'Indirect Costs Walkthrough'
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
(1,5,2),
(2,1,14),
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
(1,11,28),
(2,8,21),
(2,9,22),
(2,10,23),
(2,11,29),
(3,8,25),
(3,9,26),
(3,10,27),
(3,11,30),
(1,23,4),
(2,23,8),
(3,23,11),
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
(1,22,null),
(2,12,43),
(2,13,44),
(2,14,45),
(2,15,46),
(2,16,47),
(2,17,48),
(2,18,49),
(2,19,50),
(2,20,51),
(2,21,52),
(2,22,null),
(3,12,54),
(3,13,55),
(3,14,56),
(3,15,57),
(3,16,58),
(3,17,59),
(3,18,60),
(3,19,61),
(3,20,62),
(3,21,63),
(3,22,12),
(2,5,14);
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
(1,23,'Single',4),
(1,23,'Walkthrough',31),
(2,23,'Single',8),
(2,23,'Walkthrough',42),
(3,23,'Single',11),
(3,23,'Walkthrough',53),
(2,1,'Single Product',14),
(2,1,'Total Product',64);
--#endregion

-- industry data 
INSERT INTO industry ("industry", "gross_margin", "op_margin", "service") 
VALUES ('Professional Services - Businesses',0.4,0.12,true),
('Professional Services - Consumer',0.31,0.08,true),
('Transportation / Trucking',0.25,0.05,true),
('Financial Services',0.7,0.18,true),
('Insurance',0.3,0.12,true),
('Construction / Building Materials',0.23,0.09,false),
('Pharma Medical Device',0.7,0.18,false),
('Healthcare Services',0.2,0.06,true),
('Consumer Products',0.5,0.1,false),
('Restaurant / Retail',0.25,0.07,true),
('Manufacturing',0.4,0.13,false),
('All Other',0.35,0.08,null);

-- Dummy super admin
INSERT INTO "users" ("email", "hashedpassword", "admin", "super_admin")
VALUES ('test@test.co', '$2b$10$pEJTYdGwMrHr7gfJkG5GMuL2JJLYU1xV.6RGiFr/jEiO.gSwZHYB6',true, true);

INSERT INTO "contact_info" ("user_id", "name", "business_name", "industry_id", "phone_number")
VALUES (1,'test', 'test co', 1, '1234567890');

INSERT INTO "user_checks" SELECT 1, * FROM generate_series(1, (SELECT COUNT(*) FROM questions));

INSERT INTO "disclaimer" ("disclaimer")
VALUES ('Illume Decision Hub (IDH) is not a replacement for legal advice, nor are the results to be interpreted as absolute fact. The purpose of IDH is to get small business owners thinking about their financials by providing a general, estimated, big-picture look into basic financial areas. Illume Pricing and its employees will not be held liable for any damages, injuries, losses, expenses, or other ramifications while using this product.');
