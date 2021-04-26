exports.roleMiddlewaree = (role) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {     
      let hashRole = false
      if (role.includes(req.user.role)) {
        !hashRole
      }
      if(hashRole){
        return  res.status(403).json({ message: 'acсess denied' })
      }
      next()
    } catch {
      return res.status(403).json({ message: 'user not authorizate' })
    }
  }
}
