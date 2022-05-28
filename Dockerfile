FROM python:3 AS build-stage

WORKDIR /app

COPY src-python/requirements.txt .
RUN pip install -r requirements.txt
COPY files/ .
COPY src-python/ .
RUN python3 sentiment.py

FROM scratch AS export-stage
COPY --from=build-stage /app/pyPhasesSentiment.json /