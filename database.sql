--#region Create Tables
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT UNIQUE,
    "hashedpassword" TEXT,
    "admin" BOOLEAN DEFAULT false,
    "super_admin" BOOLEAN DEFAULT false
  );

CREATE TABLE "industry" (
    "id" SERIAL PRIMARY KEY,
    "industry" TEXT,
    "gross_margin" DECIMAL(4,2),
    "op_margin" DECIMAL(4,2),
    -- service (true), or product (false)
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

-- question 2 is for when you want two questions to display on the stepper at a time
-- but the default is null
CREATE TABLE "questions" (
    "id" SERIAL PRIMARY KEY,
    "header" TEXT,
    "question" TEXT,
    "response_type" TEXT,
    "help_text" TEXT,
    "sub_questions" INT,
    "split" BOOLEAN,
    "checkboxes" BOOLEAN,
    "question2" TEXT DEFAULT NULL,
    "response_type2" TEXT DEFAULT NULL,
    "help_text2" TEXT DEFAULT NULL
  );

CREATE TABLE "split" (
    "id" SERIAL PRIMARY KEY,
    "calculator_id" INT,
    "question_id" INT,
    "split_text" TEXT,
    "next_id" INT
  );

-- This nightmare allows for this app to scale. next_id references the next row 
-- in this table to display after this row.  If that value is NULL, the path is
-- finished.
CREATE TABLE "question_calculator" (
    "id" SERIAL PRIMARY KEY,
    "calculator_id" INT,
    "question_id" INT,
    "next_id" int
  );

CREATE TABLE "user_checks" (
    "user_id" INT,
    "question_id" INT,
    PRIMARY KEY ("user_id", "question_id")
  );

CREATE TABLE "toggle_calculator" (
    "user_id" INT,
    "calculator_id" INT,
    PRIMARY KEY ("user_id", "calculator_id")
  );

CREATE TABLE "disclaimer" (
  	"id" SERIAL PRIMARY KEY,
  	"disclaimer" TEXT
  );
--#endregion

--#region Insert into questions
INSERT INTO "questions" ("question", "response_type", "help_text", "sub_questions", "split", "checkboxes", "header", "question2", "response_type2", "help_text2")
VALUES (
    'Is this for a single sale or for total product sales?',
    'radio',
    'Single sales are for when you are only considering a single transaction; total product sales consider multiple transactions',
    NULL,
    TRUE,
    FALSE,
    'Single or Total Sales',
    NULL,
    NULL,
    NULL
  ),
(
    'What is your revenue?',
    'number',
    'Revenue is the amount of money you charge for a product or service',
    NULL,
    FALSE,
    FALSE,
    'Revenue',
    NULL,
    NULL,
    NULL
  ),
(
    'What are your direct costs?',
    'number',
    'Direct costs are specific to a sale, such as labor costs and material costs',
    NULL,
    FALSE,
    FALSE,
    'Direct Costs',
    NULL,
    NULL,
    NULL
  ),
(
    'What are your indirect costs?',
    'number',
    'Indirect costs apply to all sales or services, such as gas or rent',
    NULL,
    FALSE,
    FALSE,
    'Indirect Costs',
    NULL,
    NULL,
    NULL
  ),
(
    'What are the total number of sales for this product?',
    'number',
    'How much of this product or service do you sell?',
    NULL,
    FALSE,
    FALSE,
    'Number of Sales',
    NULL,
    NULL,
    NULL
  ),
(
    'What do you plan on pricing this for?',
    'number',
    'Consider your costs and the value you bring with this product',
    NULL,
    FALSE,
    FALSE,
    'Product/Service Price',
    NULL,
    NULL,
    NULL
  ),
(
    'Would you like to input your direct costs as a total or walkthrough the categories?',
    'radio',
    'A total will just be one input field; the walkthrough will bring you through common direct cost categories',
    NULL,
    TRUE,
    FALSE,
    'Direct Costs Walkthrough',
    NULL,
    NULL,
    NULL
  ),
(
    'What is the per-hour labor rate for this product?',
    'number',
    'Consider just one labor rate for this field',
    3,
    FALSE,
    FALSE,
    'Labor',
    'How many hours of labor are done at this rate for this product?',
    'number',
    'Consider just one labor rate for this field'
  ),
(
    'What are your parts/raw material costs?',
    'number',
    'These are things that go into the making of the product or the delivery of the service',
    3,
    FALSE,
    FALSE,
    'Parts/Raw Materials',
    NULL,
    NULL,
    NULL
  ),
(
  'What other administrative expenses do you have across your business?',
  'number',
  'Other costs that relate directly to this product or service',
  4,
  FALSE,
  FALSE,
  'Other Administrative Expenses',
  NULL,
  NULL,
  NULL
),
(
  'What are your rent, lease, business mortgage, and utility payments?',
  'number',
  'Remember to include escrow payments here',
  4,
  FALSE,
  FALSE,
  'Office - Mortgage, Lease, Rent, and Utilities',
  NULL,
  NULL,
  NULL
),
(
  'What are your sales costs or commissions?',
  'number',
  'How much does it cost to make a sale, or what do you pay on commission when a sale is made?',
  4,
  FALSE,
  FALSE,
  'Sales Costs or Commissions',
  NULL,
  NULL,
  NULL
),
(
  'What are your office staff salary costs?',
  'number',
  'Remember to include yourself if you pay yourself a salary',
  4,
  FALSE,
  FALSE,
  'Office Staff Salaries',
  NULL,
  NULL,
  NULL
),
(
  'What are your employee benefits costs?',
  'number',
  'Benefits include things like health, dental, disability, life, etc',
  4,
  FALSE,
  FALSE,
  'Employee Benefits Costs',
  NULL,
  NULL,
  NULL
),
(
  'How much do you spend on marketing, advertising, and other promotional material?',
  'number',
  'This includes both physical and digital materials',
  4,
  FALSE,
  FALSE,
  'Marketing, Advertising, Promotion',
  NULL,
  NULL,
  NULL
),
(
  'How much do you spend on your network, telecomunications, and other communication platforms?',
  'number',
  'Internet, phone, vpn, and other types of communication costs would fall under this category',
  4,
  FALSE,
  FALSE,
  'Network, Telecom, and Communication',
  NULL,
  NULL,
  NULL
),
(
  'How much do you spend on computer equipment?',
  'number',
  'This includes things such as mice, keyboards, headsets, computers, servers, and other computer equipment',
  4,
  FALSE,
  FALSE,
  'Computer Equipment',
  NULL,
  NULL,
  NULL
),
(
  'How much do you spend on travel?',
  'number',
  'This includes meals and entertainment while on business',
  4,
  FALSE,
  FALSE,
  'Travel, Business Meals, Entertainment',
  NULL,
  NULL,
  NULL
),
(
  'How much do you spend subscriptions, dues, and fees?',
  'number',
  'This includes subscriptions like Office 365, adobe, and other regular payments',
  4,
  FALSE,
  FALSE,
  'Dues, Fees, Subscriptions',
  NULL,
  NULL,
  NULL
),
(
  'How much do you spend on education and trainings?',
  'number',
  'Consider both one-off events and continual education/trainings',
  4,
  FALSE,
  FALSE,
  'Education & Training',
  NULL,
  NULL,
  NULL
),
(
  'How much are you insurance costs?',
  'number',
  'Depending on your business, you may have multiple types of insurance. Add them together here',
  4,
  FALSE,
  FALSE,
  'Insurance',
  NULL,
  NULL,
  NULL
),
(
  'Would you like to input your indirect costs as a total or walkthrough the categories?',
  'radio',
  'A total will just be one input field; the walkthrough will bring you through common indirect cost categories',
  NULL,
  TRUE,
  FALSE,
  'Indirect Costs Walkthrough',
  NULL,
  NULL,
  NULL
),
(
  'How much do you spend on delivery or freight?',
  'number',
  'Enter delivery fees here',
  4,
  FALSE,
  FALSE,
  'Delivery & Freight',
  NULL,
  NULL,
  NULL
),
(
  'What other office expenses do you have?',
  'number',
  'Other recurring costs that you may have',
  4,
  FALSE,
  FALSE,
  'Other Office Expenses',
  NULL,
  NULL,
  NULL
);
--#endregion

--#region Set up relations
ALTER TABLE "contact_info" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "contact_info" ADD FOREIGN KEY ("industry_id") REFERENCES "industry" ("id");
ALTER TABLE "revenue_cost" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "split" ADD FOREIGN KEY ("calculator_id") REFERENCES "calculators" ("id");
ALTER TABLE "split" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "question_calculator" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "question_calculator" ADD FOREIGN KEY ("calculator_id") REFERENCES "calculators" ("id");
ALTER TABLE "user_checks" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "user_checks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
--#endregion

INSERT INTO "calculators" ("calculator", "start_id") 
VALUES ('Define Your Profit Lever', 1),
('Break Even Pricing', 6),
('Price Setting', 62);

--#region Set up Paths
INSERT INTO "question_calculator" ("calculator_id", "question_id", "next_id")
VALUES (1,1,2),
(1,2,13),
(1,3,25),
(1,4,NULL),
(1,5,2),
(2,1,14),
(2,3,26),
(2,4,NULL),
(3,5,15),
(3,3,27),
(3,4,12),
(3,6,NULL),
(1,7,3),
(2,7,7),
(3,7,10),
(1,8,17),
(1,9,25),
(1,10,null),
(2,8,20),
(2,9,26),
(2,10,null),
(3,8,23),
(3,9,27),
(3,10,12),
(1,22,4),
(2,22,8),
(3,22,11),
(1,11,29),
(1,12,30),
(1,13,31),
(1,14,32),
(1,15,33),
(1,16,34),
(1,17,35),
(1,18,36),
(1,19,37),
(1,20,38),
(1,21,63),
(2,11,40),
(2,12,41),
(2,13,42),
(2,14,43),
(2,15,44),
(2,16,45),
(2,17,46),
(2,18,47),
(2,19,48),
(2,20,49),
(2,21,65),
(3,11,51),
(3,12,52),
(3,13,53),
(3,14,54),
(3,15,55),
(3,16,56),
(3,17,57),
(3,18,58),
(3,19,59),
(3,20,60),
(3,21,67),
(2,5,14),
(3,1,15),
(1,23,64),
(1,24,18),
(2,23,66),
(2,24,21),
(3,23,68),
(3,24,24);
--#endregion

--#region Set up Splits
INSERT INTO "split" ("calculator_id", "question_id","split_text","next_id")
VALUES(1,1,'Single Product',2),
(1,1,'Total Product',5),
(1,7,'Single',3),
(1,7,'Walkthrough',16),
(2,7,'Single',7),
(2,7,'Walkthrough',19),
(3,7,'Single',10),
(3,7,'Walkthrough',22),
(1,22,'Single',4),
(1,22,'Walkthrough',28),
(2,22,'Single',8),
(2,22,'Walkthrough',39),
(3,22,'Single',11),
(3,22,'Walkthrough',50),
(2,1,'Single Product',14),
(2,1,'Total Product',61),
(3,1,'Single Product',15),
(3,1,'Total Product',9);
--#endregion

--#region Set Disclaimer
INSERT INTO "disclaimer" ("disclaimer")
VALUES ('Illume Decision Hub (IDH) is not a replacement for legal advice, nor are the results to be interpreted as absolute fact. The purpose of IDH is to get small business owners thinking about their financials by providing a general, estimated, big-picture look into basic financial areas. Illume Pricing and its employees will not be held liable for any damages, injuries, losses, expenses, or other ramifications while using this product.');
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

INSERT INTO "users" ("email", "hashedpassword", "admin", "super_admin")
VALUES ('test@test.com', '$2b$10$pEJTYdGwMrHr7gfJkG5GMuL2JJLYU1xV.6RGiFr/jEiO.gSwZHYB6',true, true);

INSERT INTO "contact_info" ("user_id", "name", "business_name", "industry_id", "phone_number")
VALUES (1,'test', 'test co', 1, '1234567890');

INSERT INTO "user_checks" SELECT 1, * FROM generate_series(1, (SELECT COUNT(*) FROM questions));