from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Table, ARRAY
from sqlalchemy.dialects.postgresql import JSON

from .database import Base
from datetime import datetime
from sqlalchemy.orm import relationship
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, default=True, nullable=False)

    promptAnses = relationship("PromptAns", back_populates="user")

    def hash_password(self, password):
        self.hashed_password = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.hashed_password)


# association table HashTag and PromptAns
PromptAns_HashTag = Table(
    "PromptAns_HashTag",
    Base.metadata,
    Column("prompt_ans_id", Integer, ForeignKey("PromptAns.id")),
    Column("hashtag_id", Integer, ForeignKey("HashTag.id")),
)


class PromptAns(Base):
    __tablename__ = "PromptAns"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    prompt = Column(String, nullable=False)
    template = Column(JSON, nullable=False)
    description = Column(String, nullable=False)
    documents = Column(ARRAY(String), nullable=False)
    created = Column(DateTime, default=datetime.now, nullable=False)
    uploaded = Column(
        DateTime, nullable=True
    )  # nullable. Hub에 업로드 하게 되면 이 값이 채워짐
    execution_cnt = Column(Integer, nullable=False)
    # username 필드를 외래 키로 설정합니다. 이 필드는 User 모델의 username 필드를 참조합니다.
    username = Column(String, ForeignKey("User.username"))

    # relationship 함수를 사용하여 PromptAns 모델과 User 모델 사이의 관계를 정의합니다.
    user = relationship("User", back_populates="promptAnses")

    # 다대다 관계 설정
    hashtag = relationship("HashTag", secondary=PromptAns_HashTag, backref="prompt_ans")


class HashTag(Base):
    __tablename__ = "HashTag"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    tag = Column(String, nullable=False)
