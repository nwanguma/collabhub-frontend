# **Collabhub**

## **Overview**

**Collabhub** is a dynamic platform designed to connect individuals seeking collaborators with specific skills for their projects. Beyond matchmaking, CollabHub offers real-time guidance and feedback to help users refine their work.

## **Features**

- Professional profiles
- Project listings
- JWT authentication
- In-app & email notifications (Mailjet integration)
- File (avatar, banner, resume) uploads (AWS S3)
- Caching
- (Near) Real-time chat (long-polling)

### **Upcoming features**

- OATH (google and linkedin)
- Improved chat and notifications with pusher

## **Tech Stack**

- **Frontend**: [Next.js](https://nextjs.org/) (React framework)
- **Backend**: [NestJS](https://nestjs.com/) (Node.js framework)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (with TypeORM)
- **Authentication**: JWT
- **Deployment**: Vercel/Fly.io (fly.toml file already included)
- **Caching**: Redis

## **How It Works**

1. **Sign Up**: Create an account with your details.
2. **Update Profile**: Update your profile to unlock full access.
3. **Create a Project**: Post your project idea, specifying the skills and collaborators you're looking for.
4. **Connect with Collaborators**: Browse through profiles and match with developers who share your vision.

## **Demo**

Please find recorded demos below

1. [Demo - platform overview](https://www.loom.com/share/bbfc871cc7924a1fa65d9fdedbd35364?sid=ca8fe2e7-e175-45e0-9560-01ce3ab28ea9)
2. [Demo - chat feature](https://www.loom.com/share/4e18fc4eaa9940edbd714cd4696f7b0c?sid=3d5c42cd-4563-4bef-a38f-10baa9a8190c)

## **Installation**

### **Prerequisites**

- Node.js (v16 or higher)
- Docker (optional, for containerized deployment)

### **Steps to Run Locally**

1. Clone the repository:

   ```bash
   git clone https://github.com/nwanguma/collabhub-frontend.git
   cd collabhub-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your `.env.local` file (refer to `env.example` for required variables):

   ```bash
   cp env.example .env.local
   ```

4. Start the application:

   ```bash
   npm run dev
   ```

5. The app should now be running at [http://localhost:3000](http://localhost:3000).

6. The server lives in a different repo at [Collabhub-api](https://github.com/nwanguma/collabhub-api). Please follow instructions in the backend's readme to run the app end-to-end

## **Contributing**

Contributions are not welcome yet! App is purely to demonstrate my working knowledge of the stack employed in building this project.

## **Contact**

For any inquiries, please contact [nwangumat@gmail.com](mailto:nwangumat@gmail.com).
