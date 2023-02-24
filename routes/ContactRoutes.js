const express = require('express');
const router = express.Router();

const { getContact, getContacts, createContact, updateContact, deleteContact } = require('../controllers/ContactController');
const validateToken = require('../middleware/ValidateToken');

// VALIDATING ROUTES WITH TOKEN 
router.use(validateToken)

router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).post(createContact).put(updateContact).delete(deleteContact);


module.exports = router;