# TradeWind - Trading Platform (React + Django + MySQL)

TradeWind is a **full-stack trading simulation platform** where users can register, log in, view stock prices, maintain a watchlist, place buy/sell orders, and manage their portfolio holdings.

Built using **React + Vite** for frontend, **Django** for backend, and **MySQL** for database management.

---

## Technologies and Frameworks Used

| Area     | Stack                               |
| -------- | ----------------------------------- |
| Frontend | React (with Vite), Bootstrap        |
| Backend  | Django, Django REST Framework (DRF) |
| Database | MySQL                               |

---

## 📦 Project Structure

```
/backend (Django Project)
  /api (Django App for APIs)
    - models.py
    - views.py
    - serializers.py
    - urls.py
/frontend (React Vite App)
  - src/
    - components/
    - pages/
- README.md
- requirements.txt (for backend)
- package.json (for frontend)
```

---

## Backend Setup (Django)

### 1. Install Python dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Database Setup (MySQL)

- Create a new database (example: `project`)
- Update `backend/settings.py`:
  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',
          'NAME': 'project',
          'USER': 'your_mysql_username',
          'PASSWORD': 'your_mysql_password',
          'HOST': 'localhost',
          'PORT': '3306',
      }
  }
  ```
- Make sure you replace `your_mysql_username` and `your_mysql_password`.

### 3. Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (optional)

Only create this if you want an admin option in the django panel

```bash
python manage.py createsuperuser
```

### 5. Run the Server

```bash
python manage.py runserver
```

Backend will start on:  
📍 `http://localhost:8000/`

---

## Frontend Setup (React + Vite)

### 1. Install Node modules

```bash
cd frontend
npm install
```

### 2. Run the Vite Dev Server

```bash
npm run dev
```

Frontend will start on:  
📍 `http://localhost:3000/`

> **Note:** Ensure that the backend is running on `localhost:8000` for API calls.

---

## 📜 Requirements Files

### Backend `requirements.txt`

```plaintext
django
djangorestframework
mysqlclient
djangorestframework-simplejwt
```

### Frontend dependencies (from `package.json`)

```json
  "dependencies": {
    "@tailwindcss/vite": "^4.1.3",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.8.4",
    "bootstrap": "^5.3.5",
    "lucide-react": "^0.488.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.5.0",
    "web-vitals": "^2.1.4"
  }
```

---

## Database Tables Required

You will need to **create and populate** the following tables:

- `User` (already populated)
- `User_Auth` (synced with Django `auth_user`)
- `Stock`
- `Portfolio`
- `Transaction`

We provide two SQL files:

- **create_tables.sql** ➔ defines the table structure.
- **insert_tables.sql** ➔ inserts initial sample data (users, stocks, transactions, portfolios).

> Upload both SQL files to your GitHub repo alongside the code.

### Running SQL manually:

```bash
mysql -u your_user -p your_database_name < create_tables.sql
mysql -u your_user -p your_database_name < insert_tables.sql
```

---

## Features Implemented

- User Login/Register
- JWT/Session Authentication
- Watchlist (add/remove stocks)
- Orders (place buy/sell orders)
- Portfolio view (live calculated)
- Basic Bootstrap responsive frontend
- RESTful APIs (Django REST Framework)
- MySQL database for storage

---

## To-Do

- Add toast notifications on API calls
- Modal-based forms for placing orders
- Live stock price updates from external APIs
- Portfolio analytics and charts
- Admin panel for managing stocks
- Transaction history improvements (Pending/Executed/Canceled orders)
- Mobile responsive UI improvements
- Full deployment

---

## 👨‍💻 Contributors

- **Rishabh** — Full Stack Developer, Project Creator
- (Add teammates if any)

---

# Thank you for visiting and using TradeWind!
