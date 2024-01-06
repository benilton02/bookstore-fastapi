FROM python:3.10-slim

WORKDIR /docker-fastapi-books

ADD . /docker-fastapi-books

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7070", "--reload"]
