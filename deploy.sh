#!/bin/bash
cd /home/ubuntu/hanaTax-Frontend
git pull origin main  # 최신 코드 가져오기
npm install --prefer-offline --no-audit --progress=false  # 의존성 설치
npm run build  # 빌드 실행
