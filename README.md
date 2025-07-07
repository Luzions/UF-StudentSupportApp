```markdown
# UF-StudentSupportApp

This application serves as a personal wellness companion for UF students, designed to improve mental health, self-care habits, and time management. By offering daily check-ins, stress management tools, goal tracking, and peer support, the app provides an interactive way for students to maintain balance amidst academic and personal responsibilities.

---

# Development Setup

## Prerequisites

- **Python 3.10+**  
- **Node.js & npm** (for React)  
- **Git**  
- **Virtualenv** (built into Python 3.5+)

---

## Backend (Django) Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/UF-StudentSupportApp.git
cd UF-StudentSupportApp
git checkout development
git pull origin development
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```

### 3. Install Python dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

> **Note:** If you don’t have a `requirements.txt` yet, run  
> `pip install django Pillow djangorestframework django-cors-headers`  
> then  
> `pip freeze > requirements.txt`.

> **CORS Setup:**  
> In `settings.py`, add the following to allow React to access the Django API:
> ```python
> CORS_ALLOWED_ORIGINS = [
>     "http://localhost:3000",
> ]
> ```

### 4. Apply database migrations

```bash
python manage.py migrate
```

### 5. Run the Django development server

```bash
python manage.py runserver
```

The backend will be available at http://127.0.0.1:8000/.

---

## Frontend (React) Setup

### 1. Generate the React app (one-time)

From the project root (next to `manage.py`):

```bash
npx create-react-app frontend
```

### 2. Install any additional packages (inside `frontend/`)

```bash
cd frontend
npm install axios react-scripts@5.0.1
```

> Use Axios (or `fetch`) to call your Django API.

### 3. Start the React development server

```bash
npm start
```

The frontend will be available at http://localhost:3000/.

---

## Running the Full Stack

You’ll have two servers running:

- **Django API:**  http://127.0.0.1:8000  
- **React UI:**    http://localhost:3000  

When building components, React will fetch data from your Django endpoints. Make sure you’ve configured CORS in Django (`django-cors-headers`) to allow requests from the React origin.

---

# Additional Tips

- To add new Python packages: `pip install <package>` → `pip freeze > requirements.txt`
- If you ever restructure apps or URLs, remember to update:
  - `INSTALLED_APPS` & `apps.py` names  
  - `ROOT_URLCONF` & `WSGI_APPLICATION` in `settings.py`  
  - `include()` paths in your `urls.py` modules  
- Branch workflow:
  ```bash
  git checkout -b feature/your-feature development
  git push origin feature/your-feature
  ```
- Deployment (Coming Soon)  
  While this app currently runs in a local development environment using React and Django, future plans include publishing it online so others can easily access and use it. We'll likely explore deployment platforms such as Heroku, Vercel, or Docker, which can help:
  - Keep everyone’s setup consistent by containerizing the project (so it runs the same across all machines)
  - Host both the frontend and backend so users can interact with the app from anywhere
  - Enable automatic updates and version control using Git integration

---
```
