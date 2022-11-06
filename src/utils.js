const decodeToken = (token) => {
  const hash = jwt.decode(token);
  return hash
}

const getStoreId = (req, authToken) => {
  if(req){
    // confirm exist token at header
    const authHedaer = req.headers.authorization;

    if(authHedaer){
      const token = authHedaer.replace("Bearer", "");
      if(!token){
        throw new Error("missing token")
      }
      // decode token
      return decodeToken(token)
    }
  }
}

module.exports = {
  getStoreId
}