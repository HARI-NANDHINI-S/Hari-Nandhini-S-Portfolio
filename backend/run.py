import uvicorn
import os
import sys
from dotenv import load_dotenv

# Ensure backend folder is on sys.path so 'import app...' works from any working directory
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
load_dotenv()

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

