use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Serialize, FromRow, Debug, Clone)]
pub struct Students {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub patronymic: String,
    pub age: Option<i32>,
    pub grade: Option<i32>,
    pub phone_number: String,
    pub rating: i32,
}

#[derive(Serialize, FromRow, Debug, Clone)]
pub struct Students1 {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub patronymic: String,
    pub age: Option<i32>,
    pub grade: Option<i32>,
    pub phone_number: String,
    pub rating: i32,
}

#[derive(Deserialize)]
pub struct CreateStudentBody {
    pub first_name: String,
    pub last_name: String,
    pub patronymic: String,
    pub age: Option<i32>,
    pub grade: Option<i32>,
    pub phone_number: String,
}
#[derive(Deserialize)]
pub struct UpdateStudentBody {
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub patronymic: Option<String>,
    pub age: Option<i32>,
    pub grade: Option<i32>,
    pub phone_number: Option<String>,
    pub rating: Option<i32>,
}

#[derive(Deserialize)]
pub struct IncrementStudentRatingBody {
    pub rating: i32,
}

#[derive(Serialize, FromRow)]
pub struct StudentRating {
    pub rating: i32,
}

#[derive(Serialize, FromRow)]
pub struct Courses {
    pub id: i32,
    pub name: String,
}

#[derive(Deserialize)]
pub struct CreateCourseBody {
    pub name: String,
}

#[derive(Serialize, FromRow)]
pub struct Groups {
    pub id: i32,
    pub name: String,
    pub grade: Option<i32>,
    pub course_id: i32,
}
#[derive(Serialize, FromRow)]
pub struct GroupsWithStudents {
    pub id: i32,
    pub name: String,
    pub grade: Option<i32>,
    pub course_id: i32,
    pub student_id: i32,
}
#[derive(Serialize)]
pub struct GroupWithStudentIds {
    pub id: i32,
    pub name: String,
    pub grade: Option<i32>,
    pub course_id: i32,
    pub student_ids: Vec<i32>,
}

#[derive(Serialize, FromRow)]
pub struct StudentIDs{
    pub id: i32,
    pub student_id: i32
}

#[derive(Deserialize)]
pub struct CreateGroupBody {
    pub name: String,
    pub grade: Option<i32>,
    pub course_id: i32,
}

#[derive(Serialize, FromRow)]
pub struct StudentGroups {
    pub student_id: i32,
    pub group_id: i32,
}

#[derive(Deserialize)]
pub struct CreateStudentGroupBody {
    pub student_id: i32,
    pub group_id: i32,
}
