# JWT

+ Json web token (JWT), 是一种用于双方之间传递安全信息的简洁的、URL安全的表述性声明规范。JWT定义了一种简洁的，自包含的方法用于通信双方之间以Json对象的形式安全的传递信息。因为数字签名的存在，这些信息是可信的，JWT可以使用HMAC算法或者是RSA的公私秘钥对进行签名。

+ JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可直接被用于认证，也可被加密。

+ 基于token的鉴权机制流程:
    1. 用户使用用户名密码来请求服务器
    2. 服务器进行验证用户的信息
    3. 服务器通过验证发送给用户一个token
    4. 客户端存储token,并在每次请求是附送上这个token值
    5. 服务端验证token值,并返回数据

+ 这个token必须要在每次请求时传递给服务端，它应该保存在请求头里， 另外，服务端要支持CORS(跨来源资源共享)策略，一般我们在服务端这么做就可以了`Access-Control-Allow-Origin: *`

+ JWT是由三段信息构成的，将这三段信息文本用 `.` 链接一起就构成了Jwt字符串,例如:
    ```js
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
    ```

+ 第一部分我们称它为头部（header),第二部分我们称其为载荷（payload)，第三部分是签证（signature)

+ 头部(header)承载两部分信息：
    1. 声明类型，这里是jwt
    2. 声明加密的算法 通常直接使用 HMAC SHA256
    ```js
    {
    'typ': 'JWT',
    'alg': 'HS256'
    }
    ```
    然后将头部进行base64加密（该加密是可以对称解密的),构成了第一部分。

+ 载荷(playload)就是存放有效信息的地方，这些有效信息包含三个部分:
    1. 标准中注册的声明(Reserved claims)
    2. 公共的声明(Public claims)
    3. 私有的声明(Private claims)

  + 标准中注册的声明 (建议但不强制使用) ：
    + iss: jwt签发者
    + sub: jwt所面向的用户
    + aud: 接收jwt的一方
    + exp: jwt的过期时间，这个过期时间必须要大于签发时间
    + nbf: 定义在什么时间之前，该jwt都是不可用的
    + iat: jwt的签发时间
    + jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。

  + 公共的声明 ：
    公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密.

  + 私有的声明 ：
    私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为base64是对称解密的，意味着该部分信息可以归类为明文信息。

    定义一个payload:
    ```js
    {
        "iss": "Online JWT Builder",
        "iat": 1416797419,
        "exp": 1448333419,
        "userid":10001,
        "sub": "1234567890",
        "name": "John Doe",
        "admin": true
    }
    ```
    然后将其进行base64加密，得到Jwt的第二部分。

+ 签名信息(signature)，这个签证信息由三部分组成
    1. header (base64编码后的)
    2. payload (base64编码后的)
    3. secret (服务器自己提供的一个字符串)

    创建签名需要使用编码后的header和payload以及一个秘钥，使用 `.` 连接组成的字符串，然后通过header中声明的加密方式进行secret组合加密，然后就构成了jwt的第三部分。
    ```js
    HMACSHA256(base64UrlEncode(header) + "." +base64UrlEncode(payload),secret)
    ```
    签名用于验证消息的发送者以及消息是没有经过篡改的。

+ secret是保存在服务器端的，jwt的签发生成也是在服务器端的，secret就是用来进行jwt的签发和jwt的验证，所以，它就是你服务端的私钥，在任何场景都不应该流露出去。

+ 如何使用

  + 当用户使用它的认证信息登陆系统之后，会返回给用户一个JWT，用户只需要本地保存该token（通常使用local storage，也可以使用cookie）即可。
  + 当用户希望访问一个受保护的路由或者资源的时候，通常应该在Authorization头部使用Bearer模式添加JWT，并加上Bearer标注：
    ```js
    fetch('api/user/1', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    ```
    因为用户的状态在服务端的内存中是不存储的，所以这是一种无状态的认证机制。服务端将会检查请求头Authorization中的JWT信息，如果合法，就会返回相应的资源。由于JWT是自包含的，因此减少了需要查询数据库的需要。因为JWT并不使用Cookie的，所以你可以使用任何域名提供你的API服务而不需要担心跨域资源共享问题（CORS）。