from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Table
from .database import Base
from datetime import datetime
from sqlalchemy.orm import relationship
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, default=True, nullable=False)

    promptAnses = relationship("PromptAns", back_populates="user")

    def hash_password(self, password):
        self.hashed_password = pwd_context.hash(password)


class PromptAns(Base):
    __tablename__ = "promptAns"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    prompt = Column(String, index=True, nullable=False)
    description = Column(String, index=True, nullable=False)
    created = Column(DateTime, default=datetime.now, index=True, nullable=False)
    uploaded = Column(
        DateTime, index=True, nullable=True
    )  # nullable. Hub에 업로드 하게 되면 이 값이 채워짐

    # user_id 필드를 외래 키로 설정합니다. 이 필드는 User 모델의 id 필드를 참조합니다.
    user_id = Column(Integer, ForeignKey("users.id"))

    # relationship 함수를 사용하여 PromptAns 모델과 User 모델 사이의 관계를 정의합니다.
    user = relationship("User", back_populates="promptAnses")


class HashTag(Base):
    __tablename__ = "hashtags"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    tag = Column(String, index=True, nullable=False)


# association table HashTag and PromptAns
PromptAns_HashTag = Table(
    "PromptAns-HashTag",
    Base.metadata,
    Column("prompt_ans_id", Integer, ForeignKey("promptAns.id")),
    Column("hashtag_id", Integer, ForeignKey("hashtags.id")),
)
# association table PromptAns and Document from other DBMS
PromptAns_Documents = Table(
    "PromptAns-Documents",
    Base.metadata,
    Column("prompt_ans_id", Integer, ForeignKey("promptAns.id")),
    Column("document_id", Integer),  # 이 값은 Pinecone 에서 가져와야합니다.
)
