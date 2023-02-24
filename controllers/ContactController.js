const asyncHandler = require('express-async-handler');
const Contact = require('../models/ContactSchema');

//@desc add contact
//@route: POST /api/contact
//@access private

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

    const contact = await Contact.create({ name, email, phone, user_id: req.user.id });

    res.status(200).json({
        message: "Hurrey Data added successfully",
        data: contact
    })
})


//@desc get all contact
//@route GET /api/contact
//@access private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json({
        message: "All Contacts",
        data: contacts
    })
})

//@desc get individual contacts
//@route: GET /api/contact/:id
//@access private

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
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to update other contact");
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
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to delete other contact");
    }

    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json({
        message: "Deleted Successfully"
    })
})


module.exports = { getContact, getContacts, createContact, updateContact, deleteContact }