# API Configuration Troubleshooting Guide

## Current Issue
The Next.js app is getting 404/500 errors from the Laravel API.

## Steps to Debug

### 1. Verify Laravel API is Running
```bash
# In your Laravel project directory
php artisan serve
```
Should show: `Server running on [http://127.0.0.1:8000]`

### 2. Test API Endpoints Directly

Open your browser or use curl to test each endpoint:

```bash
# Test Profile
curl http://localhost:8000/api/profile

# Test Projects
curl http://localhost:8000/api/projects

# Test Skills
curl http://localhost:8000/api/skills

# Test Experiences
curl http://localhost:8000/api/experiences

# Test Blog Posts
curl http://localhost:8000/api/posts
```

### 3. Check API Response Structure

The Next.js app expects this structure:

```json
// Profile endpoint: /api/profile
{
  "data": {
    "id": 1,
    "name": "Ichwal",
    "bio": "...",
    "hero_image": "http://localhost:8000/storage/...",
    "social_links": {
      "github": "...",
      "linkedin": "...",
      "email": "..."
    }
  }
}
```

**If your API returns data directly (without "data" wrapper):**
```json
{
  "id": 1,
  "name": "Ichwal",
  ...
}
```

Then update the API service files to remove `.data` access.

### 4. Common Issues

#### Issue: 404 Not Found
- **Cause**: API routes not defined or wrong URL
- **Fix**: Check `routes/api.php` in Laravel
- **Fix**: Verify API URL in `.env.local` (currently: `http://localhost:8000/api`)

#### Issue: 500 Internal Server Error
- **Cause**: Database not set up, missing data, or Laravel error
- **Fix**: Check Laravel logs at `storage/logs/laravel.log`
- **Fix**: Run migrations: `php artisan migrate`
- **Fix**: Seed database: `php artisan db:seed`

#### Issue: CORS Error
- **Cause**: Laravel not allowing requests from Next.js
- **Fix**: Install Laravel CORS package or add to `config/cors.php`:
```php
'allowed_origins' => ['http://localhost:3000'],
```

### 5. Quick Fix for Testing

If you want to test the Next.js app without the API, you can create mock data:

1. Stop the dev server (Ctrl+C)
2. I can create a mock API layer for testing
3. Restart with `npm run dev`

## What to Check Now

1. **Is Laravel running?** Run `php artisan serve`
2. **Do the API endpoints exist?** Check `routes/api.php`
3. **Is there data in the database?** Run seeders if needed
4. **What's the actual API response structure?** Test with curl/browser

Let me know what you find, and I'll help fix the integration!
