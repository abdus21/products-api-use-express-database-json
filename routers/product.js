const express = require('express');
const router = express.Router();
const {getAlldata,getSingleData,ddeleteData,patchData,postNewData} = require('../controller/product')

router.route('/').get(getAlldata).post(postNewData)
router.route('/:id').get(getSingleData).delete(ddeleteData).patch(patchData)




  module.exports = router