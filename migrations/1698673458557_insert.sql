-- Up Migration
INSERT INTO "users" (email, password)
    VALUES 
    ('amaakosua@gmail.com', '123456'),
    ('stonebwoy@gmail.com', '123456');

INSERT INTO "appointment_days" (day)
    VALUES 
    ('2023-10-15'),
    ('2023-10-16');

INSERT INTO "appointment" ("user_id", "appointment_day_id")
    SELECT "users"."id", "appointment_days"."id" FROM "users", "appointment_days" 
	
	WHERE "users"."email" = 'stonebwoy@gmail.com'  and "day" = '2023-10-16';

INSERT INTO "appointment" ("user_id", "appointment_day_id")
    SELECT "users"."id", "appointment_days"."id" FROM "users", "appointment_days" 
	
	WHERE "users"."email" = 'amaakosua@gmail.com'  and "day" = '2023-10-15';

INSERT INTO "appointment_detail" ("appointment_id", "first_name", "last_name")
    SELECT "appointment"."id", 'kofi' as "first_name", 'Acheampong' as "last_name" FROM "appointment";

INSERT INTO "appointment_detail" ("appointment_id", "first_name", "last_name")
    SELECT "appointment"."id", 'Yaw' as "first_name", 'Twumasi' as "last_name" FROM "appointment" LIMIT 1 OFFSET 1;
    


-- Down Migration