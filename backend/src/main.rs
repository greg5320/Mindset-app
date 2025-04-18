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

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
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
            .service(get_students)
            .service(create_student)
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

    })
    .bind(("0.0.0.0", 8000))?
    .workers(2)
    .run()
    .await
}
