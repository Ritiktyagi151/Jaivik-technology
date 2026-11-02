# Backend API Documentation

This is a comprehensive backend API built with Node.js, Express, TypeScript, and MongoDB for managing a digital agency website.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **File Upload**: Support for image and video uploads
- **Rate Limiting**: API rate limiting for security
- **Error Handling**: Comprehensive error handling and logging
- **Validation**: Input validation and sanitization
- **CORS**: Cross-origin resource sharing support
- **Compression**: Response compression for better performance

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Hero Section
- `GET /api/hero-section` - Get all hero sections
- `GET /api/hero-section/:id` - Get single hero section
- `POST /api/hero-section` - Create hero section (Admin)
- `PUT /api/hero-section/:id` - Update hero section (Admin)
- `DELETE /api/hero-section/:id` - Delete hero section (Admin)
- `PATCH /api/hero-section/order` - Update hero section order (Admin)

### Technologies
- `GET /api/technologies` - Get all technologies
- `GET /api/technologies/:id` - Get single technology
- `POST /api/technologies` - Create technology (Admin)
- `PUT /api/technologies/:id` - Update technology (Admin)
- `DELETE /api/technologies/:id` - Delete technology (Admin)
- `PATCH /api/technologies/order` - Update technology order (Admin)

### Reels
- `GET /api/reels` - Get all reels
- `GET /api/reels/:id` - Get single reel
- `POST /api/reels` - Create reel (Admin)
- `PUT /api/reels/:id` - Update reel (Admin)
- `DELETE /api/reels/:id` - Delete reel (Admin)
- `PATCH /api/reels/order` - Update reel order (Admin)
- `PATCH /api/reels/:id/views` - Increment reel views

### Mobile Apps
- `GET /api/mobile-apps` - Get all mobile apps
- `GET /api/mobile-apps/:id` - Get single mobile app
- `POST /api/mobile-apps` - Create mobile app (Admin)
- `PUT /api/mobile-apps/:id` - Update mobile app (Admin)
- `DELETE /api/mobile-apps/:id` - Delete mobile app (Admin)
- `PATCH /api/mobile-apps/order` - Update mobile app order (Admin)

### Team
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get single team member
- `POST /api/team` - Create team member (Admin)
- `PUT /api/team/:id` - Update team member (Admin)
- `DELETE /api/team/:id` - Delete team member (Admin)
- `PATCH /api/team/order` - Update team member order (Admin)

### Corporate Videos
- `GET /api/corporate-videos` - Get all corporate videos
- `GET /api/corporate-videos/:id` - Get single corporate video
- `POST /api/corporate-videos` - Create corporate video (Admin)
- `PUT /api/corporate-videos/:id` - Update corporate video (Admin)
- `DELETE /api/corporate-videos/:id` - Delete corporate video (Admin)
- `PATCH /api/corporate-videos/order` - Update corporate video order (Admin)
- `PATCH /api/corporate-videos/:id/views` - Increment corporate video views

### Testimonial Videos
- `GET /api/testimonial-videos` - Get all testimonial videos
- `GET /api/testimonial-videos/:id` - Get single testimonial video
- `POST /api/testimonial-videos` - Create testimonial video (Admin)
- `PUT /api/testimonial-videos/:id` - Update testimonial video (Admin)
- `DELETE /api/testimonial-videos/:id` - Delete testimonial video (Admin)
- `PATCH /api/testimonial-videos/order` - Update testimonial video order (Admin)
- `PATCH /api/testimonial-videos/:id/views` - Increment testimonial video views

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog (Admin)
- `PUT /api/blogs/:id` - Update blog (Admin)
- `DELETE /api/blogs/:id` - Delete blog (Admin)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create client (Admin)
- `PUT /api/clients/:id` - Update client (Admin)
- `DELETE /api/clients/:id` - Delete client (Admin)

### Videos
- `GET /api/videos` - Get all videos
- `GET /api/videos/:id` - Get single video
- `POST /api/videos` - Create video (Admin)
- `PUT /api/videos/:id` - Update video (Admin)
- `DELETE /api/videos/:id` - Delete video (Admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial (Admin)
- `PUT /api/testimonials/:id` - Update testimonial (Admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (Admin)

### Banners
- `GET /api/banners` - Get all banners
- `GET /api/banners/:id` - Get single banner
- `POST /api/banners` - Create banner (Admin)
- `PUT /api/banners/:id` - Update banner (Admin)
- `DELETE /api/banners/:id` - Delete banner (Admin)

### Websites
- `GET /api/websites` - Get all websites
- `GET /api/websites/:id` - Get single website
- `POST /api/websites` - Create website (Admin)
- `PUT /api/websites/:id` - Update website (Admin)
- `DELETE /api/websites/:id` - Delete website (Admin)

### Social Media
- `GET /api/social-media` - Get all social media posts
- `GET /api/social-media/:id` - Get single social media post
- `POST /api/social-media` - Create social media post (Admin)
- `PUT /api/social-media/:id` - Update social media post (Admin)
- `DELETE /api/social-media/:id` - Delete social media post (Admin)

### Team Videos
- `GET /api/team-videos` - Get all team videos
- `GET /api/team-videos/:id` - Get single team video
- `POST /api/team-videos` - Create team video (Admin)
- `PUT /api/team-videos/:id` - Update team video (Admin)
- `DELETE /api/team-videos/:id` - Delete team video (Admin)

### Contact
- `POST /api/contact` - Submit contact form

### Careers
- `POST /api/careers` - Submit career application

### Enquiries
- `POST /api/enquiries` - Submit enquiry form

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get single review
- `POST /api/reviews` - Create review (Admin)
- `PUT /api/reviews/:id` - Update review (Admin)
- `DELETE /api/reviews/:id` - Delete review (Admin)

### Gallery
- `GET /api/gallery` - Get all gallery images
- `GET /api/gallery/:id` - Get single gallery image
- `POST /api/gallery` - Create gallery image (Admin)
- `PUT /api/gallery/:id` - Update gallery image (Admin)
- `DELETE /api/gallery/:id` - Delete gallery image (Admin)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (Admin)
- `GET /api/dashboard/recent` - Get recent activities (Admin)

## Data Models

### Hero Section
```typescript
{
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
  order: number;
}
```

### Technology
```typescript
{
  name: string;
  description: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "mobile" | "other";
  isActive: boolean;
  order: number;
}
```

### Reel
```typescript
{
  title: string;
  description: string;
  videoUrl: string;
  posterImage: string;
  duration: number;
  platform: "instagram" | "tiktok" | "youtube" | "facebook" | "other";
  isActive: boolean;
  order: number;
  views: number;
  likes: number;
}
```

### Mobile App
```typescript
{
  title: string;
  description: string;
  platform: "ios" | "android" | "cross-platform";
  appStoreLink: string;
  playStoreLink: string;
  screenshots: string[];
  features: string[];
  technologies: string[];
  isActive: boolean;
  order: number;
}
```

### Team Member
```typescript
{
  name: string;
  position: string;
  bio: string;
  image: string;
  email: string;
  linkedin: string;
  twitter: string;
  github: string;
  skills: string[];
  isActive: boolean;
  order: number;
}
```

### Corporate Video
```typescript
{
  title: string;
  description: string;
  videoUrl: string;
  posterImage: string;
  duration: number;
  category: "promotional" | "training" | "testimonial" | "product" | "corporate" | "other";
  clientName: string;
  isActive: boolean;
  order: number;
  views: number;
}
```

### Testimonial Video
```typescript
{
  title: string;
  description: string;
  videoUrl: string;
  posterImage: string;
  duration: number;
  clientName: string;
  clientPosition: string;
  clientCompany: string;
  rating: number;
  isActive: boolean;
  order: number;
  views: number;
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with your configuration
4. Start the development server: `npm run dev`
5. For production: `npm run build && npm start`

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Security Features

- JWT authentication
- Role-based access control
- Rate limiting
- Input validation
- CORS protection
- Helmet security headers
- Request sanitization

## Error Handling

The API includes comprehensive error handling with:
- Custom error classes
- Centralized error handling middleware
- Detailed error logging
- User-friendly error messages

## Logging

Uses Winston for logging with:
- File-based logging
- Console logging in development
- Error tracking
- Request logging

## File Upload

Supports file uploads for:
- Images (JPG, PNG, GIF)
- Videos (MP4, MOV, AVI)
- Documents (PDF, DOC, DOCX)

## Database

MongoDB with Mongoose ODM featuring:
- Schema validation
- Indexing for performance
- Timestamps
- Soft deletes
- Data relationships

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "count": 1
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
