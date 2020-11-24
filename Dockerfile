FROM python:3.9.0-alpine

MAINTAINER "掛號對不隊"

# Copy requirements and install
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt

COPY . /app

ENTRYPOINT ["gunicorn", "bot:create_app()"]
