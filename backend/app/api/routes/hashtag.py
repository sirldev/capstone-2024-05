import os
import sys

from db.database import get_db
from db.models import HashTag
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


router = APIRouter()

resources = [
    "Amazon EC2",
    "AWS Lambda",
    "Amazon Lightsail",
    "AWS Batch",
    "Amazon ECS",
    "Amazon EKS",
    "AWS Fargate",
    "Amazon S3",
    "Amazon EBS",
    "Amazon Elastic File System",
    "AWS Storage Gateway",
    "Amazon FSx",
    "Amazon RDS",
    "Amazon DynamoDB",
    "Amazon ElastiCache",
    "Amazon Redshift",
    "Amazon Aurora",
    "AWS Database Migration Service",
    "Amazon VPC",
    "Amazon Route 53",
    "AWS Direct Connect",
    "Amazon CloudFront",
    "AWS CodeCommit",
    "AWS CodeBuild",
    "AWS CodeDeploy",
    "AWS CodePipeline",
    "AWS Cloud9",
    "AWS CloudFormation",
    "Amazon CloudWatch",
    "AWS Auto Scaling",
    "AWS CloudTrail",
    "AWS Config",
    "AWS Identity and Access Management",
    "Amazon GuardDuty",
    "AWS Key Management Service",
    "AWS Shield",
    "AWS WAF",
    "Amazon SageMaker",
    "AWS DeepRacer",
    "Amazon Comprehend",
    "Amazon Rekognition",
    "AWS DeepLens",
    "Amazon Athena",
    "Amazon EMR",
    "AWS Glue",
    "Amazon QuickSight",
    "AWS Lake Formation",
    "AWS Step Functions",
    "Amazon SQS",
    "Amazon SNS",
    "AWS AppSync",
    "Amazon Connect",
    "Amazon Simple Email Service",
    "Amazon Pinpoint",
]


# 해시태그를 사전에 만들어놓기 위한 코드입니다.
@router.get("/store_default_to_db")
def store_default_to_db(request: Request, db: Session = Depends(get_db)):
    for resource in resources:
        isntance = HashTag(tag=resource)
        db.add(isntance)
        db.commit()
        db.refresh(isntance)

    hashtag = db.query(HashTag).all()
    print(hashtag)
    return hashtag
