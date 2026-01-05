from fastapi import FastAPI

from app.core.database import Base, engine
from app.models import task
from app.api.routes import tasks

app = FastAPI(title="Kanban API")


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


app.include_router(tasks.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}

