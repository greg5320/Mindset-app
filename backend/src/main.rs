use actix_web_httpauth::middleware::HttpAuthentication;
use actix_web_httpauth::extractors::basic::BasicAuth;
use actix_web::dev::ServiceRequest;
use actix_web::{ web,error::ErrorUnauthorized};
use actix_web::{web::Data, App, HttpServer};
use dotenvy::dotenv;
use services::{
    change_student_data, create_course, create_group, create_student,
    create_student_group, delete_student, get_course, get_courses, get_group, get_groups,
    get_student, get_student_group, get_students, hello, increment_student_rating,
};
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
use std::env;

mod models;
mod services;

pub struct AppState {
    pub db: Pool<Postgres>,
}

async fn basic_validator(
    req: ServiceRequest,
    credentials: BasicAuth,
) -> Result<ServiceRequest, (actix_web::Error, ServiceRequest)> {
    let expected_user = env::var("ADMIN_USER").unwrap_or_default();
    let expected_pass = env::var("ADMIN_PASS").unwrap_or_default();
    let user = credentials.user_id();
    let pass = credentials.password().unwrap_or("");
    if user == expected_user && pass == expected_pass {
        Ok(req)
    } else {
        Err((ErrorUnauthorized("Unauthorized"), req))
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env::var("ADMIN_USER").expect("ADMIN_USER must be set");
    env::var("ADMIN_PASS").expect("ADMIN_PASS must be set");
    let db_url: String = env::var("DATABASE_URL").expect("DATABASE_URL MUST BE SET");
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Error when connecting to pool");
    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(AppState { db: pool.clone() }))
            .service(hello)
            .service(create_student)
            .service(
                web::scope("")
                    .wrap(HttpAuthentication::basic(basic_validator))
                    .service(get_students)
                    .service(delete_student)
                    .service(increment_student_rating)
                    .service(get_student)
                    .service(change_student_data)
                    .service(get_courses)
                    .service(get_course)
                    .service(create_course)
                    .service(get_groups)
                    .service(get_group)
                    .service(create_group)
                    .service(get_student_group)
                    .service(create_student_group)
            )
    })
    .bind(("0.0.0.0", 8000))?
    .workers(2)
    .run()
    .await
}
