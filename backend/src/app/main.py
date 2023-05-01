from typing import Generic, TypeVar

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic.generics import GenericModel

app = FastAPI()
origins = [
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


DataT = TypeVar("DataT")


class Card(BaseModel):
    content: str


class Page(GenericModel, Generic[DataT]):
    index: int
    first: bool
    last: bool
    content: list[DataT]


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/cards")
async def get_cards() -> Page[Card]:
    return Page(
        index=0,
        first=True,
        last=True,
        content=[
            Card(content="First card"),
            Card(content="Second card"),
            Card(content="Third card"),
            Card(content="Fourth card"),
        ],
    )
