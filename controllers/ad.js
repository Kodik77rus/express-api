exports.createAd = async (req, res) => {
  try {
    res.status(201).json()
  } catch (err) {
    res.status(500).json({ messege: err.messege })
  }
}

exports.getTenAd = async (req, res) => {
  try {
    res.status(201).json()
  } catch (err) {
    res.status(500).json({ messege: err.messege })
  }
}

exports.getOneAd = async (req, res) => {
  try {
    res.status(200).json()
  } catch (err) {
    res.status(500).json({ messege: err.messege })
  }
}