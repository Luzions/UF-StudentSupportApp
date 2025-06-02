# UF-StudentSupportApp
This application serves as a personal wellness companion for UF students, designed to improve mental health, self-care habits, and time management. By offering daily check-ins, stress management tools, goal tracking, and peer support, the app provides an interactive way for students to maintain balance amidst academic and personal responsibilities.

---

# Development Setup

## Step 1: Navigate to Your Repository
1. Open your terminal (Command Prompt, Git Bash, or VS Code Terminal).
2. Change directory to your repository folder:  
   **Example:** `cd path/to/your/repository`

---

## Step 2: Set Up a Virtual Environment (Recommended)
1. Create a virtual environment by running the following command:  
   ```bash
   python -m venv venv

2. Activate the virtual environment:
 - Windows:
   ```bash
   venv\Scripts\activate
- Mac/Linux:
   ```bash
  source venv/bin/activate
  
## Step 3: Install Django
Inside the activated virtual environment, install Django:
   ```bash
    pip install django
```

### Dependencies
- **Python**: Ensure you have Python 3.10 or higher installed. You can check your version by running:
  ```bash
  python --version
  
- **Django**: The project uses the latest version of Django (5.2.1). It will be installed automatically when you run:
  ```bash
   pip install django

- pip: Make sure you have the latest version of pip installed. Upgrade it if necessary:
  ```bash
   python -m pip install --upgrade pip 

--- 

## Step 4: Create Your Django Project
1. Run the following command inside your repository folder:
   ```bash
   django-admin startproject student_wellness_app .
    ```
   - You can name the project whatever you’d like. In this example, it is named student_wellness_app.
   - The . at the end ensures Django files are created inside the repository folder, not as a nested directory.

---

## Step 5: Verify Setup
1. Check your folder structure: you should see a `student_wellness_app` (or whatever you named it) directory with essential Django files.
2. Run the development server to test:
   ```bash
   python manage.py runserver
   
3. If everything is set up correctly, you should see Django’s default welcome page letting you know the installation was successful in your browser at http://127.0.0.1:8000/.