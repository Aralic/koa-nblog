var Blog = require('../model/index').Blog;

exports.insertBlog = function *(BlogToInsert) {

    return yield Blog.create(BlogToInsert);
};

/**
 * 倒序读取博客数据
 * @param pageId 分页ID 从1开始
 * @returns {*}
 */
exports.findBlog = function *(pageId) {
    pageId = pageId || 1;
    var count = (pageId-1) * 5;
    return yield Blog.find({}).sort({'_id':-1}).skip(count).limit(5).exec();
};

/**
 * 根据ID读取博客数据
 * @param articleid 博客ID
 * @returns {*}
 */
exports.findOneBlog = function *(articleid) {
    return yield Blog.findOne({'_id': articleid}).exec();
};

/**
 * 根据author读取博客数据
 * @param author
 * @param pageId 分页ID 从1开始
 * @returns {*}
 */
exports.findAuthorBlog = function *(author, pageId) {
    pageId = pageId || 1;
    var count = (pageId-1) * 5;
    return yield Blog.find({'author': author}).sort({'_id':-1}).skip(count).limit(5).exec();
};

exports.findAllCount = function *(author) {
    if (author) {
        return yield Blog.find({'author': author}).count().exec();
    }
    else {
        return yield Blog.find({}).count().exec();
    }
};

