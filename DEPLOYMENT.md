# Railway Deployment Guide

This guide will help you deploy your Team Task Manager application to Railway.

## Prerequisites

1. **Railway Account**: Create an account at [railway.app](https://railway.app)
2. **GitHub Repository**: Push your code to GitHub
3. **Railway CLI** (optional): Install Railway CLI for easier deployment

## Step-by-Step Deployment

### 1. Prepare Your Code

Your project is already configured with:
- `railway.toml` - Railway configuration file
- `Procfile` - Process configuration
- `application-prod.properties` - Production database settings
- PostgreSQL dependency in `pom.xml`

### 2. Push to GitHub

```bash
git add .
git commit -m "Configure for Railway deployment"
git push origin main
```

### 3. Deploy on Railway

#### Option A: Using Railway Web Interface

1. Go to [railway.app](https://railway.app) and log in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will automatically detect your project configuration

#### Option B: Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add PostgreSQL database
railway add postgresql

# Deploy
railway up
```

### 4. Configure Environment Variables

Railway will automatically set these variables from your `railway.toml`:

- `SPRING_DATASOURCE_URL` - PostgreSQL connection URL
- `SPRING_DATASOURCE_USERNAME` - Database username  
- `SPRING_DATASOURCE_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing secret
- `PORT` - Application port (default: 8080)

You may need to manually add:
- `JWT_SECRET` - Generate a secure random string
- `SPRING_PROFILES_ACTIVE` - Set to `prod`

### 5. Build and Deploy

Railway will automatically:
1. Build your Spring Boot backend using Maven
2. Build your React frontend using Vite
3. Start the application with PostgreSQL database
4. Deploy to a public URL

### 6. Verify Deployment

Once deployed, you should see:
- ✅ Backend API running at your Railway URL
- ✅ Frontend accessible at the same URL
- ✅ Database connected and working

## Troubleshooting

### Common Issues

**Build Fails:**
- Check `pom.xml` for correct dependencies
- Verify Java 17 is available (Railway supports this)

**Database Connection Issues:**
- Ensure PostgreSQL addon is added to your project
- Check environment variables are set correctly
- Verify database URL format

**Frontend Not Loading:**
- Check Vite build configuration
- Verify API proxy settings
- Ensure static files are served correctly

### Logs and Monitoring

- View logs in Railway dashboard
- Check build logs for compilation errors
- Monitor application health in Railway console

### Environment Variables

Generate a secure JWT secret:
```bash
# You can use this command to generate a secret
openssl rand -base64 32
```

## Production Considerations

- **Database**: Railway PostgreSQL is automatically backed up
- **SSL**: Railway provides SSL certificates automatically  
- **Scaling**: Upgrade your plan for better performance
- **Custom Domain**: Add custom domain in Railway settings

## Local Development vs Production

| Feature | Local | Production |
|---------|--------|------------|
| Database | H2 (in-memory) | PostgreSQL |
| Port | 8081 | 8080 |
| Frontend Dev | Vite dev server | Built static files |
| API URL | localhost:8081 | Railway domain |

## Support

- [Railway Documentation](https://docs.railway.app/)
- [Spring Boot Deployment](https://spring.io/guides/gs/spring-boot-docker/)
- [React Deployment](https://vitejs.dev/guide/build.html)
