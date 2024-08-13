use anyhow::Result;
use axum::{
    extract::State,
    extract::Query,
    http::StatusCode,
    http::Method,
    response::{IntoResponse, Response},
    routing::{get, post, put, delete},
    Json, Router,
};

use tower_http::cors::{Any, CorsLayer};
use serde_json::json;

use tokio_postgres;//::{Client, NoTls, Pool, PoolConfig};
use postgres::{ Client, NoTls };
use std::env;

/// This mod emulates the entire database.
/// No changes should be made to any code in this mod.
///
/// The database is created in the application state using your custom template struct.
// #[allow(dead_code)]
// mod db {
//     /// An error that resulted from an action on the database
//     #[derive(Debug, Clone, thiserror::Error)]
//     pub enum DatabaseError {
//         /// There was a problem writing to the database
//         #[error("There was a problem writing to the database")]
//         WriteError,
//         /// There was a problem reading from the database
//         #[error("There was a problem reading from the database")]
//         ReadError,
//     }

//     /// The result type of an action on the database
//     pub type DatabaseResult<T> = Result<T, DatabaseError>;

//     /// A database of templates.
//     ///
//     /// Provided is a constructor: `new`, CRUD operations, `count_templates`, and `select_templates`.
//     /// `select_templates` is the many version of `read_template` and you can provide a `filter` predicate which
//     /// should be treated as the equivalent of a SQL SELECT.
//     #[derive(Clone)]
//     pub struct Database<T> {
//         templates: std::sync::Arc<std::sync::RwLock<std::collections::HashMap<i32, T>>>,
//     }

//     impl<T> Database<T>
//     where
//         T: Clone,
//     {
//         /// Initialize a database
//         pub fn new() -> Self {
//             Self {
//                 templates: Default::default(),
//             }
//         }

//         /// Add a new template to the database. If there is a preexisting template with `id` then it will be overwritten.
//         ///
//         /// This will fail when the database can not be written.
//         pub fn create_template(&self, id: i32, template: T) -> DatabaseResult<()> {
//             let mut map = self
//                 .templates
//                 .write()
//                 .map_err(|_| DatabaseError::WriteError)?;
//             map.insert(id, template);
//             Ok(())
//         }

//         /// Get a template from the database.
//         ///
//         /// This will fail when the database can not be read.
//         pub fn read_template(&self, id: i32) -> DatabaseResult<Option<T>> {
//             let map = self
//                 .templates
//                 .read()
//                 .map_err(|_| DatabaseError::ReadError)?;

//             let template = map.get(&id).cloned();
//             Ok(template)
//         }

//         /// Update a template in the database. If there is no preexisting template with `id` then this action will act like `create_template`.
//         ///
//         /// This will fail when the database can not be written.
//         pub fn update_template(&self, id: i32, template: T) -> DatabaseResult<()> {
//             let mut map = self
//                 .templates
//                 .write()
//                 .map_err(|_| DatabaseError::WriteError)?;
//             if let Some(existing_template) = map.get_mut(&id) {
//                 *existing_template = template;
//             } else {
//                 map.insert(id, template);
//             }
//             Ok(())
//         }

//         /// Remove a template in the database. If there is no preexisting template with `id` then this action will do nothing.
//         ///
//         /// This will fail when the database can not be written.
//         pub fn delete_template(&self, id: i32) -> DatabaseResult<()> {
//             let mut map = self
//                 .templates
//                 .write()
//                 .map_err(|_| DatabaseError::WriteError)?;
//             map.remove(&id);
//             Ok(())
//         }

//         /// Count the templates in the database. This is used in the example handler and likely is not needed otherwise.
//         /// If you need to count a selection call `select_templates` and call `len` on the result.
//         ///
//         /// This will fail when the database can not be read.
//         pub fn count_templates(&self) -> DatabaseResult<usize> {
//             let map = self
//                 .templates
//                 .read()
//                 .map_err(|_| DatabaseError::ReadError)?;
//             let count = map.len();
//             Ok(count)
//         }

//         /// Select templates from the database that match the predicate `filter` and return them in a Vec.
//         ///
//         /// This will fail when the database can not be read.
//         pub fn select_templates<F>(&self, mut filter: F) -> DatabaseResult<Vec<T>>
//         where
//             F: FnMut(&T) -> bool,
//         {
//             let map = self
//                 .templates
//                 .read()
//                 .map_err(|_| DatabaseError::ReadError)?;
//             let mut selection = Vec::new();
//             for template in map.values() {
//                 if filter(template) {
//                     selection.push(template.clone());
//                 }
//             }
//             Ok(selection)
//         }
//     }
// }

//set_database function
async fn set_database() -> Result<(), AppError> {
    //Connect to database
    let (client, connection) = tokio_postgres::connect(DB_URL, NoTls).await?;
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            println!("connection error: {}", e);
        }
    });
    //Create table
    client
        .execute(
            "CREATE TABLE IF NOT EXISTS templates (
                id SERIAL PRIMARY KEY,
                subject TEXT,
                body TEXT
            )",
            &[],
        )
        .await
        .map_err(|e| AppError(e.into()))?;
    Ok(())
}


/// This is your template type. It is the type the database stores.
/// Modify this any way.
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct Template {
    pub id: i32,
    pub subject: String,
    pub body: String,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct PartialTemplate {
    pub subject: String,
    pub body: String,
}

// DATABASE_URL defined in compose.yaml
const DB_URL: &str = env!("DATABASE_URL");

#[tokio::main]
async fn main() {
    // create the database, you do not need to change this
    // let database: db::Database<Template> = db::Database::<Template>::new();

    //Set database
    match set_database().await {
        Ok(_) => {
            // Database setup successful
        }
        Err(err) => {
            // Handle specific error types or log the error
            println!("Error setting up database:");
        }
    }


    let cors = CorsLayer::new()
        .allow_origin(Any);

    let app = Router::new()
        // add the example route to the router
        .route("/create_template", post(create_template_handler))
        .route("/read_template", get(read_template))
        .route("/update_template", put(update_template))
        .route("/delete_template", delete(delete_template))
        // .route("/count_templates", get(example_handler_count_templates))
        .route("/select_templates", get(select_templates))
        .layer(CorsLayer::permissive());
        // add the database state to the app.
        // see how the database is retreived (extracted) in the example handler parameters
        // .with_state(db);
     
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

/// The return type of the following example handler.
#[derive(Debug, Clone, serde::Serialize)]
struct ExampleHandlerCountTemplatesResponse {
    count: usize,
}

// TODO: can add Option<i32> to handle missing ID case
#[derive(Debug, serde::Deserialize)]
pub struct CRUDTemplateParams {
    pub id: i32,
}

async fn create_template_handler(
        Json(partial_template): Json<PartialTemplate>,
    ) -> Result<Json<Template>, AppError> {
    // Generate a new ID for the template (you might want a more robust ID generation strategy)
    let new_id: i32 = 10;  ///(db.count_templates()?) as i32 + 1;
    let mut partTem = partial_template;
    let mut new_template = Template{ 
        id: new_id, 
        subject: partTem.subject, 
        body: partTem.body
    };

    // Connect to database asynchronously
    let (mut client, connection) = tokio_postgres::connect(DB_URL, NoTls).await?;
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });
    client.execute( "INSERT INTO templates (subject, body) VALUES ($1, $2) RETURNING id",
    &[&new_template.subject, &new_template.body]).await?;
    Ok(Json(new_template))
}

async fn read_template(
    // State(db): State<db::Database<Template>>,
    Query(query): Query<CRUDTemplateParams>,
) -> Result<Json<Option<Template>>, AppError> {
    let template_id = query.id;
    let (mut client, connection) = tokio_postgres::connect(DB_URL, NoTls).await?;
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });

    let row = client.query_one("SELECT * FROM templates WHERE id = $1", &[&template_id]).await?;
    let template: Template = Template {
        id: row.get(0),
        subject: row.get(1),
        body: row.get(2),
    };
    Ok(Json(Some(template)))
}

async fn update_template(
    Query(params): Query<CRUDTemplateParams>,
    Json(updated_template): Json<Template>,
) -> Result<Json<Template>, AppError> {
    let template_id = params.id;
    let mut updated_template = updated_template;
    updated_template.id = template_id;

    let (mut client, connection) = tokio_postgres::connect(DB_URL, NoTls).await?;
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });
    client.execute(
        "UPDATE templates SET subject = $1, body = $2 WHERE id = $3",
        &[&updated_template.subject, &updated_template.body, &template_id],
    )
        .await
        .map_err(|e| AppError(e.into()))?;

    Ok(Json(updated_template))
}

async fn delete_template(
    Query(params): Query<CRUDTemplateParams>,
) -> Result<StatusCode, AppError> {
    let template_id = params.id;

    let (mut client, connection) = tokio_postgres::connect(DB_URL, NoTls).await?;
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });

    client.execute("DELETE FROM templates WHERE id = $1", &[&template_id])
        .await
        .map_err(|e| AppError(e.into()))?;

    Ok(StatusCode::NO_CONTENT)
}

// /// Example handler that will count all the templates in the database and return it as json.
// async fn example_handler_count_templates(
//     State(db): State<db::Database<Template>>,
// ) -> Result<Json<ExampleHandlerCountTemplatesResponse>, AppError> {
//     // get the count from the database
//     let count = db.count_templates()?;
//     // construct the response struct
//     let response: ExampleHandlerCountTemplatesResponse = ExampleHandlerCountTemplatesResponse { count };

//     // convert the response struct into a Json and return it
//     Ok(response.into())
// }

async fn select_templates(
) -> Result<Json<Vec<Template>>, AppError> {

    let (mut client, connection) = tokio_postgres::connect(DB_URL, NoTls).await?;
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });

    let rows = client.query("SELECT * FROM templates", &[]).await?;
    let templates: Vec<Template> = rows.iter().map(|row| Template {
        id: row.get(0),
        subject: row.get(1),
        body: row.get(2),
    }).collect();
    Ok(Json(templates))
}

// Make our own error that wraps `anyhow::Error`.
struct AppError(anyhow::Error);

// Tell axum how to convert `AppError` into a response.
impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Something went wrong: {}", self.0),
        )
            .into_response()
    }
}

// This enables using `?` on functions that return `Result<_, anyhow::Error>` to turn them into
// `Result<_, AppError>`. That way you don't need to do that manually.
impl<E> From<E> for AppError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}
