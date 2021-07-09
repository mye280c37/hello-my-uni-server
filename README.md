## 서버 실행

`npm run build` :  dist directory create/renewal  
`npm run start` :  run server on 5000 port

### deployment mode
`env` 파일설정
```
# env

NODE_ENV=development
```


### production mode
`env` 파일설정
```
# env

NODE_ENV=production
MONGO_URI='mongo uri'
```

`PORT` 설정을 통해 port 변경도 가능