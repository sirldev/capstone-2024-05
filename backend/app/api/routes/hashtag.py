import os
import sys

from db.database import get_db
from db.models import HashTag
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


router = APIRouter()

resources = [
    "EC2",
    "Lambda",
    "Lightsail",
    "Batch",
    "ECS",
    "EKS",
    "Fargate",
    "S3",
    "EBS",
    "Elastic File System",
    "Storage Gateway",
    "FSx",
    "RDS",
    "DynamoDB",
    "ElastiCache",
    "Redshift",
    "Aurora",
    "Database Migration Service",
    "VPC",
    "Route 53",
    "Direct Connect",
    "CloudFront",
    "CodeCommit",
    "CodeBuild",
    "CodeDeploy",
    "CodePipeline",
    "Cloud9",
    "CloudWatch",
    "Auto Scaling",
    "CloudTrail",
    "Config",
    "Identity and Access Management",
    "GuardDuty",
    "Key Management Service",
    "Shield",
    "WAF",
    "SageMaker",
    "DeepRacer",
    "Comprehend",
    "Rekognition",
    "DeepLens",
    "Athena",
    "EMR",
    "Glue",
    "QuickSight",
    "Lake Formation",
    "Step Functions",
    "SQS",
    "SNS",
    "AppSync",
    "Connect",
    "Simple Email Service",
    "Pinpoint",
]


# 해시태그를 사전에 만들어놓기 위한 코드입니다.
@router.get("/store_default_to_db", include_in_schema=False)
def store_default_to_db(request: Request, db: Session = Depends(get_db)):
    for resource in resources:
        isntance = HashTag(tag=resource)
        db.add(isntance)
        db.commit()
        db.refresh(isntance)

    hashtag = db.query(HashTag).all()
    return hashtag
