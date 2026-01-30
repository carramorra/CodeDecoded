from flask import Flask, send_from_directory
import os

# Create a Flask app that treats the current directory as the static folder
app = Flask(__name__, static_url_path='', static_folder='.')

@app.route('/')
def index():
    """Serves the main HTML entry point."""
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    print("--- The Silent Guide is starting ---")
    print("Access the app at http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
