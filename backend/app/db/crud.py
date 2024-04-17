from sqlalchemy.orm import Session

# 기존에 생성한 모델과 스키마 불러오기
from . import models, schemas


# 데이터 읽기 - 여러 항목 읽어오기
def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
