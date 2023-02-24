const asyncHandler = require('express-async-handler');
const Contact = require('../models/ContactSchema');

//@desc add contact
//@route: POST /api/contact
//@access public

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;

    // if (!name || !email || !phone) {
    //     res.status(400).json({
    //         message: "all fields are mandatory"
    //     })
    // }

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("all fields are mandatory");
    }

    const contact = await Contact.create({ name, email, phone });

    res.status(200).json({
        message: "Hurrey Data added successfully",
        data: contact
    })
})


//@desc get all contact
//@route GET /api/contact
//@access public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json({
        message: "All Contacts",
        data: contacts
    })
})

//@desc get individual contacts
//@route: GET /api/contact/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({
        message: "Single Contact",
        data: contact
    })
})


//@desc update contact
//@route PUT /api/contact
//@access public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json({
        message: "Successfully updated",
        data: updatedContact
    })
})


//@desc delete contact
//@route DELETE /api/contact
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.remove();

    res.status(200).json({
        message: "Deleted Successfully"
    })
})


module.exports = { getContact, getContacts, createContact, updateContact, deleteContact }