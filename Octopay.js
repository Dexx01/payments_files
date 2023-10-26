var crypto = require('crypto')


const apikey = "myapikey"
const secretkey = "mysecretkey"


const encrypt_decrypt = (action, data) => {
   const encryptionMethod = "AES-256-CBC"


   const key = crypto.createHash('sha256').update(apikey).digest()
   const iv = crypto.createHash('sha256').update(secretkey, 'utf8').digest('hex').substring(0,16)
  
   if (action == "encrypt") {
       const cipher = crypto.createCipheriv(encryptionMethod, key, iv)
       const res = encodeURIComponent(Buffer.from(
           cipher.update(data, 'utf8', 'base64') + cipher.final('base64')
       ).toString())
       console.log(res)
       return res
   } else if (action == "decrypt") {
       const buff = decodeURIComponent(Buffer.from(data))
       const decipher = crypto.createDecipheriv(encryptionMethod, key, iv)
       const res = (
         decipher.update(buff.toString('utf8'), 'base64', 'utf8') +
         decipher.final('utf8')
       )
       console.log(res)
       return res
   }
}


// example to encrypt data
encrypt_decrypt("encrypt", "currency_code=INR&merchant_code=SKU20230101012023&merchant_api_key=myapikey&transaction_code=TEST-DP-123&transaction_timestamp=1677495605&payment_code=PAY01D&transaction_amount=1000&user_id=test01")


// example to decrypt data
encrypt_decrypt("decrypt", "QqqF5QD9NdtM1O5JCpySZXyFT0gmXvEgWUEgoW19xajeviLAAlwzdDJmD7sgE2laIp7iEt%2F1SzUpquHykjfQP2eTTQGyR3Jw60iVniAayGxBOQRoPW9ln%2FT4DzQkZL1eqapgcum%2FyGKLErYJ0v1WedA2nYZ%2Fd64vZISGh3eA2PqDGJdLZWYKbAP7uGHzMGBslmx8CcBCFbjrKvfA5VGam6LHi1ZWTfv8eeHmlBv4CSI6pXzhb43UZ22uBQj%2FN8rc6oJQd7l14FK2A4sZhpUhZQ%3D%3D")
