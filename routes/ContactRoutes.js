const express = require('express');
const router = express.Router();

const { getContact, getContacts, createContact, updateContact, deleteContact } = require('../controllers/ContactController');

router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).post(createContact).put(updateContact).delete(deleteContact);


module.exports = router;