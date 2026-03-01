from flask import Flask, request, session
# session uses a browser cookies to store the data of the particular user

from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, User, Playlist, PlaylistSong
import bcrypt
from functools import wraps
import jwt
from datetime import datetime , timezone, timedelta


app = Flask(__name__)

# applies CORS headers to all routes, enabling resources to be accessed
CORS(app) # this allows the backend to accept the requests from different origins or ports
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # this basically informs/notifies all the changes taking place in db, so we turned it off. 
app.json.compact = False # we are telling to make the json data to be not be in compact form. so it displays neatly.

app.config['SECRET_KEY'] = 'your-strong-secret-key-here'

migrate = Migrate(app, db)
db.init_app(app)

with app.app_context(): # we are intializing the application db and setting up the RESTful API
    db.create_all()
api = Api(app)

# functions for hashing passwords
def hash_password(password):
    salt = bcrypt.gensalt()# salt is a random text that is added to a passwoed before it is run through a hash function.
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8') # unicode Transformation format-8 bit

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

# functions for Json web tokens
def generate_token(user_id):

    # here payload is a dictonary containing the data that we want to hide inside the token.
    payload ={
        'exp' : datetime.now(timezone.utc) + timedelta(days=1),
        'iat' : datetime.now(timezone.utc),
        'sub': str(user_id)
    }
    # exp: expiration time
    # datetime.datetime.now(timezone.utc) : gets the exact time in utc
    # iat : (issued at) its tly when the token was created.
    # sub:    subject

    return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
# jwt.encode  : makes a jumbled code 

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            print(f"Authorization header: {auth_header}") 
            try:
                token = auth_header.split(" ")[1]  # Standard practice to send tokens is "Bearer <token>", so it takes the actual token.
                print(f" Extracted token: {token[:20]}...") 
            except IndexError:
                print(" Invalid token format (missing token part)")
                return {'error': 'Invalid token format'}, 401
        if not token:
            print(" Token is missing")
            return {'error': 'Token is missing'}, 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user_id = int(data['sub'])
            print(f" Token valid for user {current_user_id}")   
        except jwt.ExpiredSignatureError:
            print(" Token expired") 
            return {'error': 'Token expired'}, 401
        except jwt.InvalidTokenError as e:
            print(f"Invalid token: {e}")     
            return {'error': 'Invalid token'}, 401
        request.user_id = current_user_id   # attach user id to request
        return f(*args, **kwargs)
    return decorated

class VerifyToken(Resource):
    @token_required
    def get(self):
        user = User.query.get(request.user_id)
        if not user:
            return {'error': 'User not found'}, 404
        return {'user': user.to_dict()}, 200

api.add_resource(VerifyToken, '/verify')










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
        
        token = generate_token(user.id)
        return {
            'message': 'Login successful',
            'user': user.to_dict(),
            'token':token
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
        
# decorators for the users; as they add the extra functionality 
def login_required(f):
    @wraps(f)
    #this wrap makes that all functions should be executed after the login is done. and now we use wraps for to execute the the functions to display the all the pages of the user after getting the jwt token after login thats it. for (JWT tokens)
    def decorated_function(*args, **kwargs): # *args **kwargs are called as "catch-alls" like it takes the inputs.
        # *args : catches positional arguments
        # **kwargs : catches the named inputs. 
        # basically we are making the decorator to fits all for any route.
# * will make the those args into a tuple form
# ** will make all keywordargs into dictonary form

        
        # Get user_id from headers / we can also use session.
        user_id = request.headers.get('X-User-ID') # request.headers is like security checkers, they look at the HTTP Headers sent by the react frontend.
        # X-User-ID is a custom ID Batch in react app shows to the backend.
        # process:
        # When your React app sends a request, it attaches X-User-ID: 5 to the "envelope" (the HTTP header).
        # now this request.header.get(X-User-ID ) checks the the X-User-ID 
        # if it finds it empty then it will show the error or else it will allows to login.


        if not user_id: # if header is missing then the user is not logged in, so f is never executed.
            return {'error': 'Authentication required'}, 401 #Unauthorized error
        return f(*args, **kwargs) 
    return decorated_function

class Playlists(Resource):
    @token_required
    def get(self, playlist_id=None):
        """Get all playlists for a user or a specific playlist"""
        user_id = request.user_id
        # if not user_id:
        #     return {'error': 'User ID required'}, 401
        
        if playlist_id:
            # Get specific playlist from the db.
            playlist = Playlist.query.filter_by(id=playlist_id, user_id=user_id).first() # checking whether the pl belong to the user or not.
            if not playlist:
                return {'error': 'Playlist not found'}, 404
            return {'playlist': playlist.to_dict()}, 200
        else:
            # Get all playlists for user
            playlists = Playlist.query.filter_by(user_id=user_id).all()
            return {'playlists': [p.to_dict() for p in playlists]}, 200

    @token_required
    def post(self):
        """Create a new playlist"""
        user_id = request.user_id
        
        
        data = request.get_json()
        playlist_name = data.get('name')
        
        if not playlist_name:
            return {'error': 'Playlist name is required'}, 400
        
        new_playlist = Playlist(
            name=playlist_name,
            user_id=user_id
        )
        
        db.session.add(new_playlist)
        db.session.commit()
        
        return {
            'message': 'Playlist created successfully',
            'playlist': new_playlist.to_dict()
        }, 201
    
    @token_required
    def put(self, playlist_id): 
        """Update playlist name"""
        user_id = request.user_id
        if not user_id:
            return {'error': 'User ID required'}, 401
        
        playlist = Playlist.query.filter_by(id=playlist_id, user_id=user_id).first()
        if not playlist:
            return {'error': 'Playlist not found'}, 404
        
        data = request.get_json()
        new_name = data.get('name')
        
        if new_name:
            playlist.name = new_name
            db.session.commit()
        
        return {
            'message': 'Playlist updated successfully',
            'playlist': playlist.to_dict()
        }, 200
    
    @token_required
    def delete(self, playlist_id):
        """Delete a playlist"""
        user_id = request.user_id
        if not user_id:
            return {'error': 'User ID required'}, 401
        
        playlist = Playlist.query.filter_by(id=playlist_id, user_id=user_id).first()
        if not playlist:
            return {'error': 'Playlist not found'}, 404
        
        db.session.delete(playlist)
        db.session.commit()
        
        return {'message': 'Playlist deleted successfully'}, 200
    
class PlaylistSongs(Resource):

    @token_required
    def post(self, playlist_id):
        """Add a song to playlist"""
        user_id = request.user_id
        if not user_id:
            return {'error': 'User ID required'}, 401
        
        playlist = Playlist.query.filter_by(id=playlist_id, user_id=user_id).first()
        if not playlist:
            return {'error': 'Playlist not found'}, 404
        
        data = request.get_json()
        
        # Check if song already exists in playlist
        existing = PlaylistSong.query.filter_by(
            playlist_id=playlist_id,
            song_id=data.get('_id')
        ).first()
        
        if existing:
            return {'error': 'Song already in playlist'}, 409
        
        # Get next position
        max_position = db.session.query(db.func.max(PlaylistSong.position)).filter_by(playlist_id=playlist_id).scalar()
        next_position = (max_position or 0) + 1
        
        playlist_song = PlaylistSong(
            playlist_id=playlist_id,
            song_id=data.get('_id'),
            song_name=data.get('songName'),
            singer=data.get('singer'),
            song_banner=data.get('songBanner'),
            song_url=data.get('url'),
            position=next_position
        )
        
        db.session.add(playlist_song)
        db.session.commit()
        
        return {
            'message': 'Song added to playlist',
            'playlist': playlist.to_dict()
        }, 201
    
class ReorderPlaylist(Resource):

    @token_required
    def post(self, playlist_id):
        """Reorder songs in playlist"""
        user_id = request.user_id
        if not user_id:
            return {'error': 'User ID required'}, 401
        
        playlist = Playlist.query.filter_by(id=playlist_id, user_id=user_id).first()
        if not playlist:
            return {'error': 'Playlist not found'}, 404
        
        data = request.get_json()
        song_order = data.get('song_order', [])  # List of song_ids in new order
        
        for position, song_id in enumerate(song_order, 1):
            playlist_song = PlaylistSong.query.filter_by(
                playlist_id=playlist_id,
                song_id=song_id
            ).first()
            if playlist_song:
                playlist_song.position = position
        
        db.session.commit()
        
        return {'message': 'Playlist reordered successfully'}, 200
    





# These are used to route the url paths to python classes --- END POINTS for the frontend
# api.add_resource --> means we are mapping the python classes logic to the url routes (addresses)
api.add_resource(Users, '/users', '/users/<int:user_id>') # users have diff url patterns, one for common and another unique.
api.add_resource(Login, '/login') # Login class was linked with login url.
api.add_resource(ResetPassword, '/reset-password')
api.add_resource(SearchSongs, '/search/songs')
api.add_resource(Profile, '/profile/<int:user_id>') # end point for profile.

# end points for playlist
api.add_resource(Playlists, '/playlists', '/playlists/<int:playlist_id>')
api.add_resource(PlaylistSongs, '/playlists/<int:playlist_id>/songs', '/playlists/<int:playlist_id>/songs/<string:song_id>')
api.add_resource(ReorderPlaylist, '/playlists/<int:playlist_id>/reorder')


if __name__ == '__main__': # this will make sures that it will run when we want to.
    
    # we are defining the port number to have a particular point where there is input and output going throught the website.
    # like it is the connection between frontend and backend
    app.run(port=5555, debug=True)

    
with app.app_context():
    db.create_all()