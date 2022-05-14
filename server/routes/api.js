const express = require('express');
const router = express.Router();
/**
* @openapi
* /api/hello:
*   get:
*     description: Welcome to swagger-jsdoc!
*     parameters:
*       - name: name
*         in: query
*         required: false
*         schema:
*           type: string
*     responses:
*       200:
*         description: Returns a mysterious string.
*/
router.get('/hello', function (req, res, next) {
  const name = req.query.name || 'World';
  res.json({ message: `Hello ${name}` });
});
module.exports = router;    


// API 샘플 추가
// API를 추가해서 실제로 swagger가 동작하는지 테스트해보자.
// jsdoc 주석을 통해서 api의 정보를 swagger에 전달할 수 있다.
