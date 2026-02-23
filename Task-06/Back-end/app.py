from flask import Flask, request
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, User
import bcrypt

app = Flask(__name__)

# applies CORS headers to all routes, enabling resources to be accessed
CORS(app) # this allows the backend to accept the requests from different origins or ports
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # this basically informs/notifies all the changes taking place in db, so we turned it off. 
app.json.compact = False # we are telling to make the json data to be not be in compact form. so it displays neatly.

migrate = Migrate(app, db)
db.init_app(app)

with app.app_context(): # we are intializing the application db and setting up the RESTful API
    db.create_all()
api = Api(app)

def hash_password(password):
    salt = bcrypt.gensalt()# salt is a random text that is added to a passwoed before it is run through a hash function.
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8') # unicode Transformation format-8 bit

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

class Users(Resource):

    def get(self, user_id=None): # we will get the data from the server
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return {'error': 'User not found'}, 404 # HTTP Status code for NOT FOUND 
            return {'user': user.to_dict()}, 200 # for OK
        else:
            users = User.query.all()
            return {'users': [user.to_dict() for user in users]}, 200


    def post(self): # creating new data
        data = request.get_json() # will change the json data from http request to python dic of application memory. (it was received from frontend)
        username = data.get('username') # gets all the info from data
        email = data.get('email')
        password = data.get('password')

        #checking
        if not username or not email or not password:
            return {'error': 'Username and email are required'}, 400
        existing_user = User.query.filter_by(email=email).first() # Check if user already exists 
        if existing_user: 
            return {'error': 'User with this email already exists'}, 409 # Status code for Conflict

        #hashing the pw
        hashed_password = hash_password(password)

        # creates a user in db
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User added successfully', 'user': new_user.to_dict()}, 201 # Code for Created

    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        db.session.delete(user) # deleting
        db.session.commit()
        return {'message': 'Deleted successfully'}, 200


class Login(Resource):

    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        #checking
        if not email or not password:
            return {'error': 'Email and password are required'}, 400 # Status code for Bad Request
        
        #checking the user for login
        user = User.query.filter_by(email=email).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        #checking the pw for login
        if not verify_password(password, user.password):
            return {'error': 'Invalid password'}, 401 # HTTP Status code for "Unauthorized"
        
        return {
            'message': 'Login successful',
            'user': user.to_dict()
        }, 200

class Profile(Resource):

    def get(self, user_id):
        """Get user profile by ID""" # this will let you know what does this function does
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404 
        return {'user': user.to_dict()}, 200

    def put(self, user_id):
        """Update user profile (bio, etc.)"""
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        
        data = request.get_json()
        
        # Update bio if provided in the frontend 
        if 'bio' in data:
            user.bio = data['bio']
        
        # Update total time if provided
        if 'totalTime' in data:
            user.total_time = data['totalTime']
        
        # Update username if provided
        if 'username' in data:
            # Check if username is already taken 
            existing = User.query.filter_by(username=data['username']).first()
            if existing and existing.id != user.id:
                return {'error': 'Username already taken'}, 409
            user.username = data['username']
        
        # Update email if provided
        if 'email' in data:
            # Check if email is already taken
            existing = User.query.filter_by(email=data['email']).first()
            if existing and existing.id != user.id:
                return {'error': 'Email already taken'}, 409
            user.email = data['email']
        
        db.session.commit()
        return {'message': 'Profile updated successfully', 'user': user.to_dict()}, 200
    


class ResetPassword(Resource):
    def post(self):
        try:
            data = request.get_json()
            email = data.get('email')
            new_password = data.get('new_password')
            confirm_password = data.get('confirm_password')
            
            # Checking
            if not email or not new_password or not confirm_password:
                return {'error': 'All fields are required'}, 400
            
            if new_password != confirm_password:
                return {'error': 'Passwords do not match'}, 400
            
            user = User.query.filter_by(email=email).first()
            if not user:
                return {'error': 'Email not found'}, 404
            
            hash_pw = hash_password(new_password) # hashing the new password
            user.password = hash_pw # updating the the user password with the hashed password.
            db.session.commit()
            return {'message': 'Password reset successfully'}, 200
        except Exception as e:
            print("Server error:", str(e)) 
            import traceback # it will let you know that error is occured than crashing
            traceback.print_exc()
            return {'error': 'Server error occurred'}, 500

class SearchSongs(Resource):

    def get(self):
        query = request.args.get('q', '').lower() # looks for search parameter in the url and converts them into lower

        if not query or len(query) <1:
            return { 'songs' : []} , 200
        try :

            import requests
            responce = requests.get("https://free-music-api2.vercel.app/getSongs") # this will get the full lsit of songs 
            if responce.status_code !=200:
                return {'error' : 'Could not fetch songs'}, 500 # Code for error
            all_songs = responce.json()

            filtered_songs = [
                song for song in all_songs 
                if query in song.get('songName', '').lower()  # Convert to lowercase for comparison
                or query in song.get('singer', '').lower()
            ]

            return {
                'query': query,
                'count': len(filtered_songs),
                'songs': filtered_songs
            }, 200
            
        except Exception as e:
            print(f"Search error: {str(e)}")
            return {'error': 'Search failed'}, 500
        



# These are used to route the url paths to python classes --- END POINTS for the frontend
# api.add_resource --> means we are mapping the python classes logic to the url routes (addresses)
api.add_resource(Users, '/users', '/users/<int:user_id>') # users have diff url patterns, one for common and another unique.
api.add_resource(Login, '/login') # Login class was linked with login url.
api.add_resource(ResetPassword, '/reset-password')
api.add_resource(SearchSongs, '/search/songs')
api.add_resource(Profile, '/profile/<int:user_id>') # end point for profile.

if __name__ == '__main__': # this will make sures that it will run when we want to.
    
    # we are defining the port number to have a particular point where there is input and output going throught the website.
    # like it is the connection between frontend and backend
    app.run(port=5555, debug=True)

    