var Blog = require('../model/index').Blog;

exports.insertBlog = function *(BlogToInsert) {

    return yield Blog.create(BlogToInsert);
};

/**
 * 倒序读取博客数据
 * @param pageId 分页ID 从1开始
 * @returns {*}
 */

exports.findBlog = function *(params, select) {
    var pageId = params.pageId || 1;
    var count = (pageId - 1)*5;
    var maxPerCount = params.maxPerCount || 5;
    select = select || {};

    return yield Blog.find(select).sort({'_id':-1}).skip(count).limit(maxPerCount).exec();
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
 * 找到所有条数
 * @param author
 * @returns {*}
 */
exports.findAllCount = function *(select) {
    select = select || {};
    return yield Blog.find(select).count().exec();
};

/**
 * 删除博客
 */
exports.deleteBlog = function *(conditions) {
    return yield Blog.findOneAndRemove(conditions).exec();
};
