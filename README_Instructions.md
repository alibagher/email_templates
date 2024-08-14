# Rubicon Email Templates Management

Welcome to the Rubicon Email Templates Management take-home project! As a Full-Stack Developer on the Rubicon team, your task is to develop a new customer feature from end to end for our online non-emergency reporting system. This system accepts crime reports from citizens, and officers then process the reports and respond back to the citizen with instructions for next steps (if any).

## Project Overview

Officers from the Gotham Police Service have asked for a way to manage and use email templates when responding to online report submissions. They said that current responses “are often very similar each time and can be lengthy.” They want a way to streamline the response process, saving time and ensuring consistency.

## Technical Implementation Section

Implement the following functionality to support this feature:

### Email Templates Management

#### Template List

- Create a page to display a list of current templates stored in the database.
- Allow users to edit and delete existing templates.

#### Template Creation

- Provide a form to create new templates.
- The editing interface for creating or modifying a template can be on the same page or a different page, based on your preference.

#### Report Response

- **Template Loading:** Load the list of templates from the database via a network call. Note: Reading from a local cache or state variable defeats the purpose of the exercise.
- **Display Templates:** Display the list of templates for users to select from.
- **Template Application:** Populate a text box with the selected template's contents. Allow users to complete and personalize their message.

### Bonus Extensions

- Implement support for rich-text templates using Markdown or HTML.

## Technology Stack

You will need to create pages, routes, network endpoints, and data models to complete this task. On the back-end, you can use an in-memory data store if not connecting to a formal database helps reduce complexity.

We have provided a base project in React and Rust to reduce some of the admin overhead. The front-end must be in React, but the back-end can use another framework. We use Rust in-house and all team members will learn to work with it, but recognize learning this for the take-home task is likely out of scope. Choose what you can shine in!

## Product Mapping Section

### Overview

This section assesses your ability to foresee future requirements and scalability needs based on user feedback or potential expansion to more agencies.

### Objectives

#### Identifying Gaps

- Reflect on unaddressed user and/or Rubicon scaling needs beyond the minimum requirements.

#### Solutions and Implementation

- For each gap, propose a solution, its purpose, and potential impact. Briefly discuss its integration within the current codebase. NO CODING required.

#### Scalability and Flexibility

- Considering that other police services might adopt a similar system, describe how your solution can be scalable to cater to slight variations.

### Instructions

- Identify at least three user requirements as gaps.
- Discuss adaptability for different police service requirements.
- Document your findings in a clear manner, either in a README, Word document, or any other format.

This exercise is to understand your foresight and ability to think from a product mindset in a concise manner.

## Time Frame

We estimate that the above sections will take about 10 hours total. To be respectful of your time, complete what you are able to in that time allowance and provide us a brief summary of improvements and extensions that you would like to make given more time.

Please complete the submission within 5 business days of receiving this email.

## Sample Project

To help speed things up, we have provided a starter project for you to use. The repository is split into frontend and backend sections. At the root is a Docker Compose file that you can use to build and run both the client and server applications.

After cloning the repository, simply run `docker compose up -w --build` to get going.
- The `-w` flag watches for changes in the directories. Your updates should be automatically copied into the containers from your local machine
- The `--build` flag triggers a fresh build to confirm everything is up to date before the watcher is enabled

### Front-end

This starter React application gives you some scaffolding to get started quick. Take a look through the project to see the style of routing, layouts, and network calls. Feel free to customize this base project if you wish, but your primary focus should be the added functionality.

After the Docker containers are running, you should be able to access the site by visiting http://localhost:8080

### Back-end

This starter Rust server provides the basics of a Template database model, standard CRUD functions, and an example route. This foundation should give you a springboard to extend it and create the required calls. 

You are not required to use this code if you are not comfortable using/learning Rust in this time period. Feel free to choose a server framework in another language if it helps you to be successful. There will be no penalties for consideration if you choose a different path.

## Submission Requirements

### Code Repository

- Share a link to your private repository with daniyar@tryrubicon.com, daniel@tryrubicon.com, and alistair@tryrubicon.com, supriya@tryrubicon.com containing all source code, assets, and relevant files for the task.
- Do NOT make this repository public, as other candidates will receive the same take-home project.

### Send us an email

When you are finished, send us an email letting us know your code is ready for review. Please include a link to your repository. You can include any answers for the Product Mapping section in this email or as a file in your repo.

### Hosting (Optional)

- If you've chosen to host the web app, provide the direct link to access it online.

### Documentation

- Include a well-structured README or another documentation file. This should encompass setup and run instructions for local development if any changes have been made to our initial Docker setup.

Your efforts will give us insights into your coding capabilities, design choices, and product mindset. Best of luck!
