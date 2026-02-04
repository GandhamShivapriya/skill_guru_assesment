# skill_guru_assesment
📝 Notes Management Backend API
Task Description

Developed a minimal yet intelligent RESTful backend API for managing notes, focusing on clean API design, validation, and smart behavior beyond basic CRUD operations.

The application is built using Node.js and Express with a modular architecture (routes, controllers, middlewares, and utilities) to ensure readability, maintainability, and scalability.

🔹 Features & Functionalities
1. Create Note
POST /notes
Accepts title and content as input
Validates required fields
Trims extra spaces from input
Rejects empty or whitespace-only strings
Automatically assigns created_at and updated_at timestamps
Rate-limited to 5 note creations per minute per client

2. Get All Notes
GET /notes
Returns a list of all notes
Notes are sorted by most recently updated first
Ensures predictable and user-friendly data ordering

3. Update Note
PUT /notes/:id
Supports partial updates
Updates only fields that have changed
Detects no-op updates and returns a meaningful response if no changes are made
Automatically updates the updated_at timestamp

4. Search Notes
GET /notes/search?q=keyword
Searches across both title and content
Case-insensitive matching
Ignores extra spaces in the search query
Supports partial matching (e.g., "meet" matches "meeting")
Returns an error for empty search queries

