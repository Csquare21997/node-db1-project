const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
try{
  const accounts = await Account.getAll()
  res.json(accounts)
}catch (err){
  next(err)
}
})

router.get('/:id', md.checkAccountId,  async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id)
    res.json(account)
  }catch(err){
    next(err)
  }
})

router.post('/'
  ,md.checkAccountPayload
  ,md.checkAccountNameUnique, 
  async (req, res, next) => {
  // DO YOUR MAGIC
try{
 const newAccount = await Account.create({
  name: req.body.name.trim(),
  budget: req.body.budget,
})
 res.status(201).json(newAccount)
}catch (err){
  next(err)
}
})

router.put(
  '/:id',md.checkAccountId,
  md.checkAccountPayload, 
  async(req, res, next) => {
    const updated = await Account.updateById(req.params.id, req.body)
    res.json(updated)
try{
res.json('updated account')
}catch (err){
  next(err)
}
});

router.delete('/:id',md.checkAccountId, async (req, res, next) => {
  try{
    await Account.deleteById(req.params.id)
    res.json(req.account)
  }catch(err){
    next(err)
  }

})
router.use((err, req, res, next) => { // eslint-disable-line
 res.status(err.status || 500).json({
  message:err.message,
 })
})

module.exports = router;
