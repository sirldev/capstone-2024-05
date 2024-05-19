git pull
cd ./backend
pip install -r requirements.txt
cd ./app
pkill -9 gunicorn
gunicorn -k uvicorn.workers.UvicornWorker --access-logfile ./gunicorn-access.log main:app --bind 0.0.0.0:8001 --workers 2 --daemon --timeout 300