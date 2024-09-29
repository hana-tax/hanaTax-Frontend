#!/bin/bash

PROJECT_ROOT="/home/ubuntu/hanaTax-Frontend"
BUILD_DIR="$PROJECT_ROOT/build"
TARGET_DIR="/var/www/html"

# 기존 파일 삭제
echo "[$(date)] 기존 파일 삭제 중..." >> /home/ubuntu/deploy.log
sudo rm -rf $TARGET_DIR/*

# 빌드된 파일 복사
echo "[$(date)] 새로운 빌드 파일 복사 중..." >> /home/ubuntu/deploy.log
sudo cp -r $BUILD_DIR/* $TARGET_DIR/

# Nginx 재시작
echo "[$(date)] Nginx 재시작 중..." >> /home/ubuntu/deploy.log
sudo systemctl restart nginx

echo "[$(date)] 배포 완료" >> /home/ubuntu/deploy.log
