//Protected route

  const userVarification = async (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).json({ error: "Unauthorized!" })
    }
    return;
  }

  export default userVarification;