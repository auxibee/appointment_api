-- Up Migration

CREATE TABLE "users"(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" VARCHAR(70) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "updated_at" timestamp NOT NULL DEFAULT NOW(),
    "role"  VARCHAR(15) check("role" IN ('admin', 'user')) DEFAULT 'user'
     
);

CREATE TABLE "appointment_days"(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "day" timestamp NOT NULL,
    "slots" INT DEFAULT 100,
    "status" VARCHAR(15) check("status" IN ('open', 'closed')) DEFAULT 'open'
    
);

CREATE TABLE "appointment"(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "appointment_day_id" UUID,
    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "updated_at" timestamp NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_user_id
        FOREIGN KEY("user_id") 
        REFERENCES users("id")
        ON DELETE CASCADE,

    CONSTRAINT fk_appointment_day_id
        FOREIGN KEY("appointment_day_id")
        REFERENCES appointment_days("id")
        ON DELETE CASCADE
);

CREATE TABLE appointment_detail(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID ,
    first_name VARCHAR(255),
    last_name VARCHAR(255) ,
    status VARCHAR(15) check("status" IN ('pending', 'cancelled', 'done')) DEFAULT 'pending',
    CONSTRAINT fk_appointment_id
        FOREIGN KEY(appointment_id)
        REFERENCES appointment("id")
        ON DELETE CASCADE
);

-- Down Migration
DROP TABLE users;
DROP TABLE appointment_days;
DROP TABLE appointment;
DROP TABLE appointment_detail;

