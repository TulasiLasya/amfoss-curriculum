from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

from models import db, User

app = Flask(__name__)
# applies CORS headers to all routes, enabling resources to be accessed
CORS(app) # this allows the backend to accept the requests from different origins or ports
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # this basically informs/notifies all the changes taking place in db, so we turned it off. 
app.json.compact = False # we are telling to make the json data to be not be in compact form. so it displays neatly.

migrate = Migrate(app, db)
db.init_app(app)

# Add this after db.init_app(app)
with app.app_context():
    db.drop_all()
    db.create_all()
api = Api(app)

class Users(Resource):

    def get(self, user_id=None): # we will get the data from the server
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return {'error': 'User not found'}, 404
            return {'user': user.to_dict()}, 200
        else:
            users = User.query.all()
            return {'users': [user.to_dict() for user in users]}, 200


    def post(self): # creating new data
        data = request.get_json() # will change the json data from http request to python dic of application memory. (it was received from frontend)
        username = data.get('username') # gets all the info from data
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return {'error': 'Username and email are required'}, 400
        
        existing_user = User.query.filter_by(email=email).first() # Check if user already exists 
        if existing_user:
            return {'error': 'User with this email already exists'}, 409

        # creates a user in db
        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User added successfully'}, 201

    # def put(self, user_id): # updating the data 
    #     user = User.query.get(user_id)
    #     if not user:
    #         return {'error': 'User not found'}, 404
        
    #     data = request.get_json()
    #     # user.username = data.get('username', user.username)
    #     # user.email = data.get('email', user.email)
    #     # new_password = data.get('password')
    #     # if new_password:
    #     #     user.password = new_password 
    
    #     db.session.commit()
    #     return {'message': 'Profile updated successfully'}, 200

    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 200


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return {'error': 'Email and password are required'}, 400
        
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return {'error': 'User not found'}, 404
        
    
        if user.password != password:
            return {'error': 'Invalid password'}, 401
        
        return {
            'message': 'Login successful',
            'user': user.to_dict()
        }, 200


# These are used to route the url paths to python classes
api.add_resource(Users, '/users', '/users/<int:user_id>') # users have diff url patterns, one for common and another unique.
api.add_resource(Login, '/login') # Login class was linked with login url.

if __name__ == '__main__':
    app.run(port=5555, debug=True)
    