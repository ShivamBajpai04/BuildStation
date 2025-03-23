/*
This is an example of how to use the POST endpoint to add a new company.
You can call this endpoint with a POST request to /api/companies with the following JSON body:

{
  "name": "Example Company",
  "logo": "/placeholder.svg?height=100&width=100",
  "industry": "Technology",
  "location": "Delhi, India",
  "openPositions": 5,
  "rating": 4.2,
  "featured": true,
  "description": "This is an example company description",
  "jobTypes": ["Full-time", "Remote", "Internship"]
}

The required fields are:
- name
- industry
- location
- description

All other fields have default values if not provided.

Example fetch call:
fetch('/api/companies', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "Example Company",
    industry: "Technology",
    location: "Delhi, India",
    description: "This is an example company description",
    openPositions: 5,
    rating: 4.2,
    featured: true,
    jobTypes: ["Full-time", "Remote", "Internship"]
  })
})
.then(response => response.json())
.then(data => console.log(data));
*/
