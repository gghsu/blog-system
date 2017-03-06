require('../lib/db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');



/* 使用者註冊介面 */
router.get('/register', function(req, res, next) {
	if (req.session.logined) {
		res.redirect('/');
		return;
	}
	res.render('users/register');
});

/* 使用者登入介面 */
router.get('/signin', function(req, res, next) {
    if (req.session.logined) {
        res.redirect('/');
        return;
    }
    res.render('users/signin');
});

/* 使用者出介面 */
router.get('/signout',function(req, res, next){
	req.session.logined = false;
	res.redirect('/');
	res.end();
});

/* 忘記密碼葉面 */
router.get('/forget', function(req, res, next) {
    if (req.session.logined) {
        res.redirect('/');
        return;
    }  
    res.render('users/forget');  
});

/* 新增文章頁面 */
router.get('/add_article', function(req, res, next) {
    if ((!req.session.name) || (!req.session.logined)) {
        res.redirect('/');
        return;
    }
    res.locals.username = req.session.name ;
    res.locals.authenticated = req.session.logined;
    res.render('users/add_article');
});

/* 使用者管理頁面. */
router.get('/profile', function(req, res, next) {
    if ((!req.session.name) || (!req.session.logined)) {
        res.redirect('/');
        return;
    }
    res.locals.username = req.session.name ;
    res.locals.authenticated = req.session.logined;
    Blog.find({ Username: req.session.name },  function ( err, blogs, count ){
        res.render( 'users/profile', {
            title : 'Blog System',
            blogs: blogs
        });
    });
});

/* 修改文章頁面. */
router.get('/modify/:id', function(req, res, next) {
    if ((!req.session.name) || (!req.session.logined)) {
        res.redirect('/');
        return;
    }
    res.locals.username = req.session.name ;
    res.locals.authenticated = req.session.logined;
    res.locals.messageID = req.params.id;
    Blog.find({ _id: req.params.id }, function ( err, blogs, count ){
        res.render( 'users/modify', {
            blogs: blogs
        });
    });		
});

/* 訪客留言頁面. */
router.get('/message/:id', function(req, res, next) {
    res.locals.username = req.session.name ;
    res.locals.authenticated = req.session.logined;
    res.locals.messageID = req.params.id;
    Blog.find({ _id: req.params.id }, function ( err, blogs, count ){
        Comment.find({ MessageID: req.params.id }, function ( err, comments, count ){
            res.render( 'users/message', {
                blogs: blogs,
                comments: comments
            });
        });	
    });	
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next){
	res.send("This is the register page.");
});

router.get('/signin', function(req, res, next){
	res.send("This is the signin page.");
});

router.get('/signout', function(req, res, next){
	res.send("This is the signout page.");
});

router.get('/forget', function(req, res, next){
	res.send("This is the forget page.");
});

router.get('/profile', function(req, res, next){
	res.send("This is the profile page.");
});

router.get('/add_article', function(req, res, next){
	res.send("This is the add_article page.");
});

router.get('/message/:id', function(req, res, next){
	res.send("This is the message page.");
});

module.exports = router;
