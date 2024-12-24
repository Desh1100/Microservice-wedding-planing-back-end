# Wedding Planner Application

Welcome to the **Wedding Planner Application**, a microservices-based solution designed to help couples efficiently organize their dream wedding. This project is part of **IT3103 - Service Oriented Web Programming Assignment 3** and is implemented using Node.js.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [APIs](#apis)
- [Contributions](#contributions)
- [License](#license)

---

## Overview

The Wedding Planner Application simplifies wedding planning by providing users with tools to:

- Manage wedding events
- Handle guest lists and RSVPs
- Schedule and manage vendor services
- Track wedding budgets and expenses
- Assign and manage wedding-related tasks
- Receive notifications and reminders

Each functionality is encapsulated in a **microservice** that ensures modularity, scalability, and independent service management.

---

## Features

1. **Wedding Event Management**

   - Create, view, update, and delete wedding events.
   - Manage event details such as date, venue, and event type.

2. **Guest Management**

   - Add, update, and remove guests.
   - Send RSVP requests and track guest responses.

3. **Vendor Scheduling**

   - Schedule and manage vendors like caterers, florists, and photographers.
   - View, update, and remove vendor details.

4. **Budget Tracking**

   - Set budgets for the wedding and track expenses.
   - View budget summaries and individual expense details.

5. **Task Management**

   - Create and manage a to-do list.
   - Update task statuses and track progress.

6. **Notification Service**
   - Receive reminders for tasks and upcoming events.
   - Manage notification preferences (e.g., email, SMS).

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB / PostgreSQL (depending on the microservice)
- **API Gateway**: [Insert gateway solution, e.g., Express Gateway or custom-built]
- **Communication**: RESTful APIs, Pub/Sub for asynchronous messaging
- **Tools**: Docker for containerization, Postman for API testing

---

## Architecture

The application follows the **microservices architecture**. Each core functionality is implemented as an independent microservice with its own database. The services communicate through synchronous and asynchronous messaging, routed via an **API Gateway**.

Refer to the `Architecture Diagram` in the repository for a detailed overview of the system design.

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/[YourUsername]/wedding-planner-app.git
   cd wedding-planner-app
   ```
