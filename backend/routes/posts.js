const express = require("express")
const router = express.Router();
const Post = require('../models/post')

router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save((err, resp) => {
        if(err) return res.status(400).json({message: err})
        const response = resp.toObject()
        res.status(201).json({
                title: response.title,    
                content: response.content,
                _id: response._id
            })
    })
})

router.get('', async (req, res, next) => {
    const posts = await Post.find({})
    res.status(200).json({
        message: "Sending posts",
        posts
    })
})

router.delete('', async(req, res, next) => {
    await Post.findByIdAndDelete({_id: req.query.id}, (err) => {
        if(err) res.status(400).json(err)
        res.status(200).json()
    })
})

module.exports = router