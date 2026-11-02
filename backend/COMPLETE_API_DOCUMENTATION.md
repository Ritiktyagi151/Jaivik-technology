# Complete API Documentation

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

### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User

```http
GET /auth/me
Authorization: Bearer <token>
```

### Logout

```http
POST /auth/logout
Authorization: Bearer <token>
```

## User Management (Admin Only)

### Get All Users

```http
GET /users?page=1&limit=10&role=admin&status=active
Authorization: Bearer <admin_token>
```

### Get Single User

```http
GET /users/:id
Authorization: Bearer <admin_token>
```

### Create User

```http
POST /users
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "admin"
}
```

### Update User

```http
PUT /users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "admin"
}
```

### Delete User

```http
DELETE /users/:id
Authorization: Bearer <admin_token>
```

### Update Profile

```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

### Change Password

```http
PUT /users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### Toggle User Status

```http
PUT /users/:id/toggle-status
Authorization: Bearer <admin_token>
```

## Blog Management

### Get All Blogs

```http
GET /blogs?page=1&limit=10&category=technology&status=published
```

### Get Single Blog

```http
GET /blogs/:id
```

### Create Blog (Admin)

```http
POST /blogs
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "New Blog Post",
  "content": "Full blog content...",
  "excerpt": "Brief excerpt...",
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
PUT /blogs/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Blog Post",
  "status": "published"
}
```

### Delete Blog (Admin)

```http
DELETE /blogs/:id
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

## Contact Management

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

### Get All Contacts (Admin)

```http
GET /contact?page=1&limit=10
Authorization: Bearer <admin_token>
```

### Get Single Contact (Admin)

```http
GET /contact/:id
Authorization: Bearer <admin_token>
```

### Update Contact (Admin)

```http
PUT /contact/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "read",
  "priority": "high"
}
```

### Delete Contact (Admin)

```http
DELETE /contact/:id
Authorization: Bearer <admin_token>
```

## Service Management

### Get All Services

```http
GET /services?page=1&limit=10&category=development&status=active
```

### Get Single Service

```http
GET /services/:id
```

### Create Service (Admin)

```http
POST /services
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Web Development",
  "description": "Full service description...",
  "shortDescription": "Brief description",
  "category": "Development",
  "icon": "web-icon",
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
  "technologies": ["React", "Node.js"],
  "status": "active"
}
```

### Update Service (Admin)

```http
PUT /services/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Service",
  "status": "active"
}
```

### Delete Service (Admin)

```http
DELETE /services/:id
Authorization: Bearer <admin_token>
```

### Get Services by Category

```http
GET /services/category/development
```

### Get Featured Services

```http
GET /services/featured?limit=6
```

## Video Management

### Get All Videos

```http
GET /videos?page=1&limit=10&category=tutorial&status=published&featured=true
```

### Get Single Video

```http
GET /videos/:id
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

### Update Video (Admin)

```http
PUT /videos/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Video",
  "status": "published"
}
```

### Delete Video (Admin)

```http
DELETE /videos/:id
Authorization: Bearer <admin_token>
```

### Get Videos by Category

```http
GET /videos/category/tutorial
```

### Get Featured Videos

```http
GET /videos/featured?limit=6
```

### Like Video

```http
POST /videos/:id/like
```

## Testimonial Management

### Get All Testimonials

```http
GET /testimonials?page=1&limit=10&category=website-development&status=active&featured=true
```

### Get Single Testimonial

```http
GET /testimonials/:id
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

### Update Testimonial (Admin)

```http
PUT /testimonials/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "content": "Updated testimonial content",
  "rating": 5
}
```

### Delete Testimonial (Admin)

```http
DELETE /testimonials/:id
Authorization: Bearer <admin_token>
```

### Get Testimonials by Category

```http
GET /testimonials/category/website-development
```

### Get Featured Testimonials

```http
GET /testimonials/featured?limit=6
```

### Get Testimonials by Rating

```http
GET /testimonials/rating/5
```

## Client Management

### Get All Clients

```http
GET /clients?page=1&limit=10&industry=technology&status=active&featured=true
```

### Get Single Client

```http
GET /clients/:id
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

### Update Client (Admin)

```http
PUT /clients/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Client Name",
  "featured": true
}
```

### Delete Client (Admin)

```http
DELETE /clients/:id
Authorization: Bearer <admin_token>
```

### Get Clients by Industry

```http
GET /clients/industry/technology
```

### Get Featured Clients

```http
GET /clients/featured?limit=6
```

### Get Clients by Service

```http
GET /clients/service/website-development
```

## Career Management

### Get All Careers

```http
GET /careers?page=1&limit=10&department=engineering&type=full-time&location=remote&status=open
```

### Get Single Career

```http
GET /careers/:id
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

### Update Career (Admin)

```http
PUT /careers/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "position": "Updated Position",
  "status": "open"
}
```

### Delete Career (Admin)

```http
DELETE /careers/:id
Authorization: Bearer <admin_token>
```

### Get Careers by Department

```http
GET /careers/department/engineering
```

### Get Careers by Type

```http
GET /careers/type/full-time
```

### Get Careers by Location

```http
GET /careers/location/remote
```

### Search Careers

```http
GET /careers/search?q=developer
```

## Team Video Management

### Get All Team Videos

```http
GET /team-videos?page=1&limit=10&category=interview&department=engineering&status=published&featured=true
```

### Get Single Team Video

```http
GET /team-videos/:id
```

### Create Team Video (Admin)

```http
POST /team-videos
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Team Member Interview",
  "description": "Video description...",
  "videoUrl": "https://example.com/video.mp4",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "teamMember": "John Doe",
  "position": "Senior Developer",
  "department": "Engineering",
  "category": "Interview",
  "tags": ["team", "interview"],
  "status": "published",
  "featured": false
}
```

### Update Team Video (Admin)

```http
PUT /team-videos/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Team Video",
  "status": "published"
}
```

### Delete Team Video (Admin)

```http
DELETE /team-videos/:id
Authorization: Bearer <admin_token>
```

### Get Team Videos by Category

```http
GET /team-videos/category/interview
```

### Get Team Videos by Department

```http
GET /team-videos/department/engineering
```

### Get Featured Team Videos

```http
GET /team-videos/featured?limit=6
```

## Banner Management

### Get All Banners

```http
GET /banners?page=1&limit=10&category=hero&status=active&featured=true
```

### Get Single Banner

```http
GET /banners/:id
```

### Create Banner (Admin)

```http
POST /banners
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Welcome Banner",
  "subtitle": "Subtitle text",
  "description": "Banner description...",
  "image": "https://example.com/banner.jpg",
  "buttonText": "Learn More",
  "buttonUrl": "https://example.com",
  "category": "hero",
  "status": "active",
  "featured": true
}
```

### Update Banner (Admin)

```http
PUT /banners/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Banner",
  "status": "active"
}
```

### Delete Banner (Admin)

```http
DELETE /banners/:id
Authorization: Bearer <admin_token>
```

### Get Banners by Category

```http
GET /banners/category/hero
```

### Get Featured Banners

```http
GET /banners/featured?limit=6
```

## Dashboard (Admin Only)

### Get Dashboard Statistics

```http
GET /dashboard/stats
Authorization: Bearer <admin_token>
```

### Get Analytics

```http
GET /dashboard/analytics?period=30
Authorization: Bearer <admin_token>
```

### Get System Health

```http
GET /dashboard/health
Authorization: Bearer <admin_token>
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

Endpoints support various filtering options:

### Blogs

- `status`: published, draft, archived
- `category`: technology, business, etc.
- `author`: author name

### Services

- `status`: active, inactive, draft
- `category`: development, marketing, etc.

### Videos

- `status`: published, draft, archived
- `category`: tutorial, interview, etc.
- `featured`: true, false

### Testimonials

- `status`: active, inactive, draft
- `category`: website-development, mobile-app, etc.
- `featured`: true, false
- `rating`: 1-5

### Clients

- `status`: active, inactive, draft
- `industry`: technology, healthcare, etc.
- `featured`: true, false

### Careers

- `status`: open, closed, draft
- `department`: engineering, marketing, etc.
- `type`: full-time, part-time, contract, internship
- `location`: remote, on-site, hybrid

## Sorting

Endpoints support sorting with the `sort` parameter:

```http
GET /blogs?sort=createdAt:desc
GET /blogs?sort=title:asc
GET /blogs?sort=views:desc
```

## Search

Search functionality is available for blogs and careers:

```http
GET /blogs/search?q=technology
GET /careers/search?q=developer
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

# Get dashboard stats (requires admin token)
curl http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer <admin_token>"
```

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "count": 10,
  "total": 100,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 10
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Status Codes

- `200`: OK - Request successful
- `201`: Created - Resource created successfully
- `400`: Bad Request - Invalid request data
- `401`: Unauthorized - Authentication required
- `403`: Forbidden - Access denied
- `404`: Not Found - Resource not found
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server error

This comprehensive API documentation covers all endpoints for both the frontend and admin panel functionality.
