# Product Mapping Section

## Gap #1: The user cannot send an email.
** Solution:** After a template is selected, a user should be able to send an email to the recipient. This will be much easier for the user, and will increase efficiency.

This will require a robust library that can handle emailing on the backend. When the client sends a, the backend will process everything and send the email.

## Gap #2: Database is not replicated and points of failure exist.
Users trying to connect to the server might be unable to if the web server is offline for some reason. Or in another case, when there is high traffic (if not now, the future of Rubicon), the server can reach its load limit and users can experience slow or no response.

** Solution:** Horizontal scaling is adding more servers in to the pool of resources. There can be one primary and potentially multiple secondary databases. The secondary is a replication of the primary (copy), and if the primary fails, one the secondaries take over as the primary, and all operations will be temporarily executed on the primary.

## Gap #3: We do not have all fields for the email template.
** Solution:** Add more fields to the Template like email address, signature, etc. This will be easy to do in the back and front -end; add new fields to the 'Template' structures and modify the queries to also handle the new fields. 

One problem will be that the existing tables do not have this new field, so we must alter the table, and handle existing data. if there is a large amount of data, we can use database tools or scripts to populate the new column (data migration).


## Scalability and Flexibility
Other police stations will have their own email templates that they would like to use. 

My backenbd can register a table for each police station, and one meta table storing the ID's of each police station's table with other information about that station. This way, when a station is sending a request, the template response can be processsed by going through the "policeStation" table and finding the correct "Template" table to query on.

This can be done esier than original scaffolding code because I have used Postgres database where SQL queries can be run on.