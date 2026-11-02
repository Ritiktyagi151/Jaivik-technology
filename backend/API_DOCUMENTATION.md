# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User

```http
GET /auth/me
Authorization: Bearer <token>
```

## Blogs

### Get All Blogs

```http
GET /blogs?page=1&limit=10
```

**Response:**

```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 10
    }
  },
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "title": "Sample Blog Post",
      "excerpt": "This is a sample blog post excerpt...",
      "author": "John Doe",
      "category": "Technology",
      "featuredImage": "https://example.com/image.jpg",
      "status": "published",
      "views": 150,
      "likes": 25,
      "createdAt": "2023-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get Single Blog

```http
GET /blogs/60f7b3b3b3b3b3b3b3b3b3b3
```

### Create Blog (Admin)

```http
POST /blogs
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "New Blog Post",
  "content": "This is the full content of the blog post...",
  "excerpt": "This is a brief excerpt of the blog post...",
  "author": "John Doe",
  "tags": ["technology", "web development"],
  "category": "Technology",
  "featuredImage": "https://example.com/image.jpg",
  "status": "draft",
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description"
}
```

### Update Blog (Admin)

```http
PUT /blogs/60f7b3b3b3b3b3b3b3b3b3b3
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Blog Post",
  "status": "published"
}
```

### Delete Blog (Admin)

```http
DELETE /blogs/60f7b3b3b3b3b3b3b3b3b3b3
Authorization: Bearer <admin_token>
```

### Search Blogs

```http
GET /blogs/search?q=technology
```

### Get Blogs by Category

```http
GET /blogs/category/technology
```

## Contact

### Submit Contact Form

```http
POST /contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "General Inquiry",
  "message": "I would like to know more about your services..."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "General Inquiry",
    "message": "I would like to know more about your services...",
    "status": "new",
    "createdAt": "2023-01-15T10:30:00.000Z"
  }
}
```

### Get All Contacts (Admin)

```http
GET /contact?page=1&limit=10
Authorization: Bearer <admin_token>
```

### Update Contact Status (Admin)

```http
PUT /contact/60f7b3b3b3b3b3b3b3b3b3b3
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "read",
  "priority": "high"
}
```

## Services

### Get All Services

```http
GET /services
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "title": "Web Development",
      "shortDescription": "Custom web development solutions",
      "category": "Development",
      "icon": "web-icon",
      "image": "https://example.com/service.jpg",
      "features": ["Responsive Design", "SEO Optimized"],
      "status": "active",
      "order": 1
    }
  ]
}
```

### Create Service (Admin)

```http
POST /services
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "New Service",
  "description": "Detailed service description...",
  "shortDescription": "Brief service description",
  "category": "Development",
  "icon": "service-icon",
  "image": "https://example.com/service.jpg",
  "features": ["Feature 1", "Feature 2"],
  "benefits": ["Benefit 1", "Benefit 2"],
  "process": ["Step 1", "Step 2"],
  "pricing": {
    "basic": {
      "price": 999,
      "features": ["Basic Feature 1", "Basic Feature 2"]
    },
    "professional": {
      "price": 1999,
      "features": ["Pro Feature 1", "Pro Feature 2"]
    }
  },
  "status": "active"
}
```

## Videos

### Get All Videos

```http
GET /videos
```

### Create Video (Admin)

```http
POST /videos
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Sample Video",
  "description": "Video description...",
  "videoUrl": "https://example.com/video.mp4",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "category": "Tutorial",
  "tags": ["web development", "tutorial"],
  "status": "published",
  "featured": false
}
```

## Testimonials

### Get All Testimonials

```http
GET /testimonials
```

### Create Testimonial (Admin)

```http
POST /testimonials
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "clientName": "Jane Smith",
  "clientPosition": "CEO",
  "company": "Tech Corp",
  "companyLogo": "https://example.com/logo.png",
  "content": "Great service and excellent results...",
  "rating": 5,
  "image": "https://example.com/client.jpg",
  "category": "Web Development",
  "featured": true
}
```

## Clients

### Get All Clients

```http
GET /clients
```

### Create Client (Admin)

```http
POST /clients
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Tech Corp",
  "logo": "https://example.com/logo.png",
  "description": "Client description...",
  "website": "https://techcorp.com",
  "industry": "Technology",
  "services": ["Web Development", "Mobile App"],
  "projectDetails": "Project details...",
  "featured": true
}
```

## Careers

### Get All Careers

```http
GET /careers
```

### Create Career (Admin)

```http
POST /careers
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "position": "Senior Developer",
  "department": "Engineering",
  "location": "Remote",
  "type": "full-time",
  "experience": "3-5 years",
  "salary": "$80,000 - $120,000",
  "description": "Job description...",
  "requirements": ["React", "Node.js", "MongoDB"],
  "responsibilities": ["Develop features", "Code review"],
  "benefits": ["Health insurance", "Remote work"],
  "status": "open"
}
```

## File Upload

### Upload Single File

```http
POST /upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [file]
```

### Upload Multiple Files

```http
POST /upload/multiple
Authorization: Bearer <token>
Content-Type: multipart/form-data

files: [file1, file2, file3]
```

## Error Responses

### Validation Error

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email",
      "value": "invalid-email"
    }
  ]
}
```

### Authentication Error

```json
{
  "success": false,
  "message": "Not authorized, token failed"
}
```

### Not Found Error

```json
{
  "success": false,
  "error": "Resource not found"
}
```

### Server Error

```json
{
  "success": false,
  "error": "Server Error"
}
```

## Pagination

Most list endpoints support pagination with the following query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Example:**

```http
GET /blogs?page=2&limit=5
```

## Filtering

Some endpoints support filtering:

### Blogs by Status

```http
GET /blogs?status=published
```

### Services by Category

```http
GET /services?category=development
```

## Sorting

Endpoints support sorting with the `sort` parameter:

```http
GET /blogs?sort=createdAt:desc
GET /blogs?sort=title:asc
```

## Search

Search functionality is available for blogs:

```http
GET /blogs/search?q=technology
```

## Rate Limiting

API requests are rate-limited to prevent abuse:

- 100 requests per 15 minutes per IP address
- Rate limit headers are included in responses

## CORS

The API supports CORS for cross-origin requests:

- Allowed origin: `http://localhost:3000` (configurable)
- Credentials: true

## Authentication Headers

For protected routes, include the JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## File Upload Limits

- Maximum file size: 5MB
- Allowed file types: JPEG, PNG, GIF, PDF, MP4, WebM
- Files are stored in the `uploads` directory

## Environment Variables

Make sure to configure these environment variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/company_website_db
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

## Testing the API

You can test the API using tools like:

- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

### Example curl commands:

```bash
# Get all blogs
curl http://localhost:5000/api/blogs

# Create a blog (requires admin token)
curl -X POST http://localhost:5000/api/blogs \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Blog","content":"Test content","author":"Test Author"}'

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"1234567890","subject":"Test","message":"Test message"}'
```
