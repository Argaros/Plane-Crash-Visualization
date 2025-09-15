# Plane Crash Visualization

A full-stack web application for visualizing and analyzing aircraft crash data. The project consists of an ASP.NET Core backend with SQL Server LocalDB and a Vue.js frontend.

## 📋 Prerequisites

### Required Software

### Docker

- **Docker Desktop** (Windows/Mac) or Docker Engine (Linux)
  - Download: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
  - Check: `docker --version`

### Development Environment (Optional)

- **Visual Studio 2022** or **Visual Studio Code**
- **Git** for version control

## 🏗️ Project Structure

```
Plane-Crash-Visualization/
├── Controllers/              # ASP.NET Core API Controllers
├── Data/                    # Database context and CSV data
├── Models/                  # C# data models
├── Services/                # Business logic services
├── Migrations/              # Entity Framework migrations
├── PlaneCrashVisualizationClient/  # Vue.js Frontend
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── views/          # Pages/Views
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── vite.config.js
├── Program.cs              # Backend entry point
├── appsettings.json        # Configuration
└── README.md
```

## 🚀 Installation and Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd Plane-Crash-Visualization
```

### 2. Setup

Copy the file `.env.dist` and rename it to `.env`.
Choose a password for the MSSQL super admin (`SA_PASSWORD`).

Copy the file `.env.dist` in "./PlaneCrashVisualizationClient" and rename it to `.env`.

The database will automatically be initialized on startup with the file `Data/skript.sql`.

### 3. Start Application

#### Development Mode (with hot-reloading)

```bash
docker compose up [--build] -d
```

Backend runs on: `http://localhost:5021`

Frontend runs on: `http://localhost:5173`

Hot reloading might not work with WSL on Windows. In this case you need to have Node.js installed to start the frontend manually:

```bash
cd PlaneCrashVisualizationClient
npm install
npm run dev -- --host
```

#### Production Mode

In this mode the frontend is built and served by Nginx. It is not a full production setup because it still builds all images locally before starting the containers.

```bash
docker compose -f compose.yml -f compose.prod.yml up [--build] -d
```

Frontend runs on: `http://localhost`

### 4. Stop Application

```bash
docker compose down
```

or

```bash
docker compose -f compose.yml -f compose.prod.yml down
```

## 📊 Features

### Backend (ASP.NET Core Web API)

- **RESTful API** for aircraft crash data
- **Entity Framework Core** for database access
- **SQL Server LocalDB** integration
- **Automatic CSV import** on first startup
- **Geocoding service** for coordinates
- **CORS support** for frontend integration
- **Swagger/OpenAPI** documentation

### Frontend (Vue.js 3)

- **Interactive map** with Leaflet.js
- **Charts and visualizations** with Chart.js
- **Responsive design** with Bootstrap 5
- **Advanced search functions**
- **Trend analysis and statistics**
- **Real-time data filtering**

## 🔧 Technologies Used

### Backend

- **ASP.NET Core 9.0** - Web API framework
- **Entity Framework Core 9.0** - ORM
- **SQL Server LocalDB** - Database
- **CsvHelper** - CSV data processing
- **Swashbuckle.AspNetCore** - Swagger/OpenAPI documentation
- **Microsoft.Data.SqlClient** - Database connection

### Frontend

- **Vue.js 3** - Frontend framework
- **Vite** - Build tool
- **Vue Router** - Navigation
- **Axios** - HTTP client
- **Leaflet.js** - Interactive maps
- **Chart.js** - Data visualization
- **Bootstrap 5** - UI framework
- **Bootstrap Icons** - Icons

## 🗃️ Database

### Manual Database Initialization

**Important**: The database must be created manually before the first application startup.

#### Create Database with SQL Script

Run the following command in Terminal/Command Prompt:

```bash
sqlcmd -S "(localdb)\mssqllocaldb" -i "Data\skript.sql"
```

**Notes:**

- Ensure SQL Server LocalDB is installed and running
- The path to `skript.sql` must be correct relative to the current directory
- The script creates the `PlaneCrashDB` database with all tables and data

#### Alternative: SQL Server Management Studio (SSMS)

1. Open SSMS
2. Connect to `(localdb)\mssqllocaldb`
3. Open the file `Data/skript.sql`
4. Execute the script (F5)

### Data Model

- **Crashes** - Main table with crash data
- **Fields**: Date, location, airline, aircraft type, passengers, casualties, etc.
- **Coordinates** for map visualization
- **Manufacturer/model extraction** from aircraft type

## 🌐 API Endpoints

### API Documentation

- **Swagger UI**: `http://localhost:5021/swagger/index.html`
  - Interactive API documentation
  - Direct endpoint testing available
  - Complete request/response schemas

### Main Endpoints

- `GET /api/crashes` - All crashes with filter options
- `GET /api/crashes/map-data` - Data for map visualization
- `GET /api/crashes/summary` - Summary statistics
- `GET /api/crashes/by-year` - Crashes by year
- `GET /api/crashes/by-operator` - Crashes by airline
- `GET /api/crashes/most-common-aircraft` - Most common aircraft models
- `GET /api/crashes/most-common-manufacturers` - Most common manufacturers
- `GET /api/crashes/by-continent` - Crashes by continent

## 🔍 Troubleshooting

### Common Issues

#### Backend doesn't start

- Check if .NET 9.0 SDK is installed: `dotnet --version`
- Ensure port 5021 is not occupied

#### Database errors

- Check if SQL Server LocalDB is running
- Ensure the database was created with the SQL script:
  ```bash
  sqlcmd -S "(localdb)\mssqllocaldb" -i "Data\skript.sql"
  ```
- Check the connection string in `appsettings.json`

#### Frontend doesn't load

- Check if Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Ensure the backend is running on port 5021

#### API errors (400 Bad Request)

- Ensure the database was created with the SQL script
- The backend requires data in the database - this is included in the SQL script
- Check the browser console for detailed error messages

## 📝 Development

### Adding New Features

1. Backend: Extend controllers/services
2. Frontend: Create new views/components
3. API integration with Axios

### Database Changes

```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

## 📄 License

[Insert license information here]

## 🤝 Contributing

Contributions are welcome! Please create a pull request or open an issue.

---

**Note**: This application serves educational and analytical purposes. The data comes from public sources and serves for historical documentation of aviation events.
