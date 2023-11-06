# Note it
**Note it** is a notes application that allows users to create folders and add multiple notes to the corresponding folder.

# Screenshots
![Screenshot 2023-11-05 at 20-40-47 Note it](https://github.com/abhijith-07/note-it-app/assets/67973073/16a711bb-da97-4c51-8172-83aa0ac8c073)

![Screenshot 2023-11-06 at 19-04-14 Note it](https://github.com/abhijith-07/note-it-app/assets/67973073/89dc42a5-4dbf-4a88-827b-70b21070c47c)

# Technologies Used
- Django Rest Framework
- ReactJs

# Installation
1. Clone the repository:
```
git clone https://github.com/abhijith-07/note-it-app.git
```  
2. Install the required dependencies for the Django backend:
```
cd note-it-app/backend
pip install -r requirements.txt
```
3. Make migrations and migrate the database:
```
python manage.py makemigrations
python manage.py migrate
```
4. Start the Django development server:
```
python manage.py runserver
```
5. Install the required dependencies for the ReactJS frontend:
```
cd ../frontend
npm install
```
6. Start the React development server:
```
npm start
```
7. You can access the application in your web browser at
   `http://localhost:3000`