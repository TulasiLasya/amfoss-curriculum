# models.py is a Blue print for data base

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy() # this controls the objects created in the db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    # primary_key : every thing gets the unique id

    username = db.Column(db.String(50), unique=True, nullable=False)
    # nullable = false means it should have value null

    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(500), nullable=True, default='')  # Bio field
    total_time = db.Column(db.Integer, nullable=True, default=0) 
    playlists = db.relationship('Playlist', backref='user', lazy=True, cascade='all, delete-orphan')
    # relationship: connects the user to playlist
    # Backref: this is a shortcut that creates a reverse link.(allows playlist_name.user to work)
    # lazy : only load these playlists when needed (saves memory)
    # cascade: deleted the playlists if the user is deleted. (an action that goes from the parent to the child)

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

class Playlist(db.Model):
    __tablename__ = 'playlists'
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # user_id is a Foreign key here. it links the playlist to the specific user

    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    playlist_songs = db.relationship('PlaylistSong', backref='playlist', lazy=True, cascade='all, delete-orphan')
    # here when we delete the playlist then the songs also deleted.

    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'songs': [ps.song_data for ps in self.playlist_songs]  # This will include song details
        }
    
class PlaylistSong(db.Model):
    __tablename__ = 'playlist_songs'
    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False) # this is a child of the playlists table
    song_id = db.Column(db.String(100), nullable=False)  # Store the external API song ID
    song_name = db.Column(db.String(200), nullable=False)
    singer = db.Column(db.String(200), nullable=False)
    song_banner = db.Column(db.String(500), nullable=False)
    song_url = db.Column(db.String(500), nullable=False)
    added_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    position = db.Column(db.Integer, nullable=True)  # For ordering songs
    
    @property # allows us to call ps.song_data (ps temp variable) like a simple variable but it runs a function to build a dictonary.
    def song_data(self): # this converts the db into json
        return {
            '_id': self.song_id,
            'songName': self.song_name,
            'singer': self.singer,
            'songBanner': self.song_banner,
            'url': self.song_url,
            'added_at': self.added_at.isoformat() if self.added_at else None
        }
    # isoformat() : converts the complex date obj into a simple string.