use std::collections::HashMap;

use actix_web::web::{Json, Path};
use actix_web::{delete, post, put};
use actix_web::{get, web::Data, HttpResponse, Responder};
use crate::models::{
    Courses, CreateCourseBody, CreateGroupBody, CreateStudentBody,
     CreateStudentGroupBody, GroupWithStudentIds, Groups, GroupsWithStudents,
      IncrementStudentRatingBody, StudentGroups, StudentRating, Students, UpdateStudentBody, Students1
};
use crate::AppState;
#[get("/api/hello")]
pub async fn hello() -> impl Responder {
    HttpResponse::Ok().json(format!("Hello to you!"))
}

#[get("api/students")]
pub async fn get_students(state: Data<AppState>) -> impl Responder {
    match sqlx::query_as::<_, Students>(
        "SELECT id, first_name, last_name, patronymic, age, grade, phone_number, rating
      FROM students",
    )
    .fetch_all(&state.db)
    .await
    {
        Ok(students) => HttpResponse::Ok().json(students),
        Err(error) => {
            HttpResponse::InternalServerError().json(format!("{:?} Failed to get students", error))
        }
    }
}

#[get("/api/students/{id}")]
pub async fn get_student(state: Data<AppState>, path: Path<i32>) -> impl Responder {
    let id = path.into_inner();
    match sqlx::query_as::<_, Students>(
        "SELECT id, first_name, last_name, patronymic, age, grade, phone_number, rating
        from students WHERE id = $1",
    )
    .bind(id)
    .fetch_one(&state.db)
    .await
    {
        Ok(student) => HttpResponse::Ok().json(student),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[post("/api/students")]
pub async fn create_student(
    state: Data<AppState>,
    body: Json<CreateStudentBody>,
) -> impl Responder {
    let student = body.into_inner();
    match sqlx::query_as::<_, Students1>(
        "INSERT INTO students (first_name, last_name, patronymic, age, grade, phone_number, rating)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id, first_name, last_name, patronymic, age, grade, phone_number, rating",
    )
    .bind(student.first_name)
    .bind(student.last_name)
    .bind(student.patronymic)
    .bind(student.age)
    .bind(student.grade)
    .bind(student.phone_number)
    .bind(student.rating)
    .fetch_one(&state.db)
    .await
    {
        Ok(student) => HttpResponse::Ok().json(student),
        Err(error) => HttpResponse::InternalServerError()
            .json(format!("{:?} Error when creating a student", error)),
    }
}

#[put("/api/students/{id}")]
pub async fn change_student_data(
    state: Data<AppState>,
    path: Path<i32>,
    body: Json<UpdateStudentBody>,
) -> impl Responder {
    let id = path.into_inner();
    let student = body.into_inner();
    let previous_student = match sqlx::query_as::<_, Students>(
        "SELECT id, first_name, last_name, patronymic, age, grade, phone_number, rating
             FROM students WHERE id = $1",
    )
    .bind(id)
    .fetch_one(&state.db)
    .await
    {
        Ok(student) => student,
        Err(err) => {
            return HttpResponse::InternalServerError()
                .json(format!("Ошибка при поиске студента: {:?}", err))
        }
    };

    let new_first_name = student.first_name.unwrap_or(previous_student.first_name);
    let new_last_name = student.last_name.unwrap_or(previous_student.last_name);
    let new_patronymic = student.patronymic.unwrap_or(previous_student.patronymic);
    let new_age = student.age.or(previous_student.age);
    let new_grade = student.grade.or(previous_student.grade);
    let new_phone_number = student
        .phone_number
        .unwrap_or(previous_student.phone_number);
    let new_rating = student.rating.unwrap_or(previous_student.rating);

    match sqlx::query_as::<_, Students>(
        "UPDATE students SET first_name = $1, last_name = $2, patronymic = $3,
            age = $4, grade = $5, phone_number = $6, rating = $7 WHERE id = $8
            RETURNING id, first_name, last_name, patronymic, age, grade, phone_number, rating",
    )
    .bind(new_first_name)
    .bind(new_last_name)
    .bind(new_patronymic)
    .bind(new_age)
    .bind(new_grade)
    .bind(new_phone_number)
    .bind(new_rating)
    .bind(id)
    .fetch_one(&state.db)
    .await
    {
        Ok(student) => HttpResponse::Ok().json(student),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[delete("api/students/{id}")]
pub async fn delete_student(state: Data<AppState>, path: Path<i32>) -> impl Responder {
    let id = path.into_inner();
    match sqlx::query_as::<_, Students>(
        "DELETE FROM students WHERE id = $1
         RETURNING id, first_name, last_name, patronymic, age, grade, phone_number, rating",
    )
    .bind(id)
    .fetch_one(&state.db)
    .await
    {
        Ok(student) => HttpResponse::Ok().json(student),
        Err(error) => HttpResponse::InternalServerError().json(format!("{:?}", error)),
    }
}

#[put("api/students/{id}/rating")]
pub async fn increment_student_rating(
    state: Data<AppState>,
    path: Path<i32>,
    body: Json<IncrementStudentRatingBody>,
) -> impl Responder {
    let id = path.into_inner();
    let student = body.into_inner();
    let previous_rating =
        sqlx::query_as::<_, StudentRating>("SELECT rating from students WHERE id = $1")
            .bind(id)
            .fetch_one(&state.db)
            .await;
    let new_rating = student.rating + previous_rating.unwrap().rating;
    match sqlx::query_as::<_, Students>(
        "UPDATE students SET rating = $1 WHERE id = $2
        RETURNING id, first_name, last_name, patronymic, age, grade, phone_number, rating",
    )
    .bind(new_rating)
    .bind(id)
    .fetch_one(&state.db)
    .await
    {
        Ok(student) => HttpResponse::Ok().json(student),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[get("/api/courses")]
pub async fn get_courses(state: Data<AppState>) -> impl Responder {
    match sqlx::query_as::<_, Courses>("SELECT id, name FROM courses")
        .fetch_all(&state.db)
        .await
    {
        Ok(courses) => HttpResponse::Ok().json(courses),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[get("/api/courses/{id}")]
pub async fn get_course(state: Data<AppState>, path: Path<i32>) -> impl Responder {
    let id = path.into_inner();
    match sqlx::query_as::<_, Courses>("SELECT id, name FROM courses WHERE id = $1")
        .bind(id)
        .fetch_one(&state.db)
        .await
    {
        Ok(course) => HttpResponse::Ok().json(course),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[get("/api/groups")]
pub async fn get_groups(state: Data<AppState>) -> impl Responder {
    let group_info_result = sqlx::query_as::<_, GroupsWithStudents>(
        "SELECT id, name, grade, course_id, student_groups.student_id FROM groups
         JOIN student_groups ON id = student_groups.group_id",
    )
    .fetch_all(&state.db)
    .await;
    match group_info_result {
        Ok(students) => {
            let mut grouped_data: HashMap<i32, GroupWithStudentIds> = HashMap::new();
            for student in students {
                if let Some(group) = grouped_data.get_mut(&student.id) {
                    group.student_ids.push(student.student_id);
                } else {
                    grouped_data.insert(
                        student.id,
                        GroupWithStudentIds {
                            id: student.id,
                            name: student.name,
                            grade: student.grade,
                            course_id: student.course_id,
                            student_ids: vec![student.student_id],
                        },
                    );
                }
            }
            
            let result: Vec<GroupWithStudentIds> = grouped_data.into_values().collect();
            HttpResponse::Ok().json(result)
        },
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[get("/api/groups/{id}")]
pub async fn get_group(state: Data<AppState>, path: Path<i32>) -> impl Responder {
    let id = path.into_inner();
    match sqlx::query_as::<_, GroupsWithStudents>(
        "SELECT id, name, grade, course_id, student_groups.student_id FROM groups
        JOIN student_groups ON id = student_groups.group_id WHERE id = $1",
    )
    .bind(id)
    .fetch_one(&state.db)
    .await
    {
        Ok(group) => HttpResponse::Ok().json(group),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[post("/api/courses")]
pub async fn create_course(state: Data<AppState>, body: Json<CreateCourseBody>) -> impl Responder {
    let course = body.into_inner();
    match sqlx::query_as::<_, Courses>("INSERT INTO courses (name) values ($1) RETURNING id, name")
        .bind(course.name)
        .fetch_one(&state.db)
        .await
    {
        Ok(course) => HttpResponse::Ok().json(course),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[post("/api/groups")]
pub async fn create_group(state: Data<AppState>, body: Json<CreateGroupBody>) -> impl Responder {
    let group = body.into_inner();
    match sqlx::query_as::<_, Groups>(
        "INSERT INTO groups (name, grade, course_id) values ($1, $2, $3)
         RETURNING id, name, grade, course_id",
    )
    .bind(group.name)
    .bind(group.grade.unwrap_or(0))
    .bind(group.course_id)
    .fetch_one(&state.db)
    .await
    {
        Ok(group) => HttpResponse::Ok().json(group),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[get("/api/student_groups")]
pub async fn get_student_group(state: Data<AppState>) -> impl Responder {
    match sqlx::query_as::<_, StudentGroups>("SELECT student_id, group_id FROM student_groups")
        .fetch_all(&state.db)
        .await
    {
        Ok(student_group) => HttpResponse::Ok().json(student_group),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}

#[post("/api/student_groups")]
pub async fn create_student_group(
    state: Data<AppState>,
    body: Json<CreateStudentGroupBody>,
) -> impl Responder {
    let student_group = body.into_inner();
    match sqlx::query_as::<_, StudentGroups>(
        "INSERT INTO student_groups (student_id, group_id) VALUES ($1, $2)
         RETURNING student_id, group_id",
    )
    .bind(student_group.student_id)
    .bind(student_group.group_id)
    .fetch_one(&state.db)
    .await
    {
        Ok(student_group) => HttpResponse::Ok().json(student_group),
        Err(err) => HttpResponse::InternalServerError().json(format!("{:?}", err)),
    }
}