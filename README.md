# Project Name

## Backend Service for API Integrations

### Overview

This backend service is designed to seamlessly integrate with three different third-party applications: Google Calendar, Notion, and Airtable. The service is implemented using Node.js and Typescript, with a focus on API integrations. It incorporates OAuth 2.0 for Google Calendar, Notion token for Notion, and personal access token for Airtable.

### Technical Requirements

- **Language**: Node.js with Typescript
- **Setup**: Proper configuration for Typescript support

### API Service Creation

#### Google Calendar Integration

- **Authentication**: OAuth 2.0
- **Functionality**:
  - Fetch new calendar events
  - Create new events on the calendar

#### Notion Integration

- **Authentication**: Notion Token
- **Functionality**:
  - create block data
  - Update block data

#### Airtable Integration

- **Authentication**: Personal Access Token
- **Functionality**:
  - create record
  - list records

### How to Run

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sobebarali/daas-api-integration.git
   cd daas-api-integration
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file and add the following variables:

   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NOTION_TOKEN=your-notion-token
   AIRTABLE_PERSONAL_ACCESS_TOKEN=your-airtable-personal-access-token
   GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
   GOOGLE_SCOPES=https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events

   ```

4. **Run the Service:**
   ```bash
   npm start
   ```

### API Endpoints

- **Google Calendar:**

  - `GET api/calendar/lists`: Fetch new calendar events
  - `POST api/calendar/create`: Create a new event on the calendar

- **Notion:**

  - `GET api/block/create`: Create a new block in Notion page
  - `PUT /block/update`: Update data in Notion

- **Airtable:**
  - `GET api/task/list`: list all tasks
  - `POST api/task/create`: create a new task

### Error Handling

The service is designed to handle errors gracefully. In case of any issues, appropriate error messages and status codes are returned.

### Scalability Considerations

The service is built with scalability in mind, utilizing asynchronous operations where necessary. It can be easily scaled horizontally to handle increased loads.

### Code Quality

The code adheres to best practices, is well-documented, and follows a modular structure. Clean and efficient code is a priority.

### Conclusion

This backend service provides a robust solution for integrating with Google Calendar, Notion, and Airtable. The comprehensive readme ensures a smooth setup and understanding of the service's capabilities.
