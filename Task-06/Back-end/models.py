# models.py is a Blue print for data base

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() # this controls the objects created in the db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(500), nullable=True, default='')  # Bio field
    total_time = db.Column(db.Integer, nullable=True, default=0) 

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio or '',
            'totalTime': self.total_time or 0  
        }
    
    def update_password(self, new_password):
        self.password = new_password
        db.session.commit()