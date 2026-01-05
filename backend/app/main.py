from fastapi import FastAPI

app = FastAPI(title="Kanban API")

@app.get("/health")
def health_check():
    return {"status": "ok"}
