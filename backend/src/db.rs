use sqlx::{Pool, Row, Postgres};

pub async fn connect_to_db() -> Result<Pool<Postgres>, sqlx::Error> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    Pool::connect(&database_url).await
}

pub async fn create_template(db_pool: &Pool<Postgres>, template: Template) -> Result<i32, sqlx::Error> {
    let mut query = r#"INSERT INTO templates (id, subject, body) VALUES ($1, $2, $3) RETURNING id"#;
    let row = sqlx::query_as::<_, i32>(query, &[&template.id, &template.subject, &template.body]).fetch_one(&*db_pool).await?;
    Ok(row)
}

pub async fn db_read_template(db_pool: &Pool<Postgres>, id: i32) -> Result<Option<Template>, sqlx::Error> {
    let mut query = r#"SELECT * FROM templates WHERE id = $1"#;
    let row = sqlx::query_as::<_, Template>(query, &[id]).fetch_optional(&*db_pool).await?;
    Ok(row)
}

// Implement similar functions for update_template, delete_template, and select_templates 
// using appropriate SQL queries.

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Template {
    pub id: i32,
    pub subject: String,
    pub body: String,
}