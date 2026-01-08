from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # we use cros , as there are different ports.

def valid_user(email, password): # for testing purpose
    return email == "test@gmail.com" and password == "1234"

@app.route("/login", methods=["POST"])

def login():
    data = request.json # gets the data from frontend
    email = data.get("email")
    password = data.get("password")
    if valid_user(email, password):
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})

if __name__ == "__main__":
    app.run(debug=True)
