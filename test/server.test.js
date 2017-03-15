var test = require('tape');
var server = require('../index.js');

const requestDefaults = {
    method: 'GET',
    url: '/blog',

};

test('endpoint test | GET/ | Right Request', t => {
    const request = Object.assign({}, requestDefaults); //this method is to re-write the same request with different parameters or payload instead of re-writting the same request a couple of times
    return server.inject(request)
        .then(response => {
            t.is(response.statusCode, 200, 'status code is 200');

            server.stop(t.end);
        });
});
// test('endpoint test | GET/main | Bad Request', t => {
//     const request = Object.assign({}, requestDefaults, {
//         url: '/main'
//     }); //this method is to re-write the same request with different parameters or payload instead of re-writting the same request a couple of times
//     return server.inject(request)
//         .then(response => {
//             t.is(response.statusCode, 404, 'status code is 400');
//
//             server.stop(t.end);
//         });
// });
//
// test('endpoint test | GET/blog | return html page of articles', t => {
//   const request = Object.assign({},requestDefaults,{
//     url:'/blog'
//   });
//   return server.inject(request)
//     .then(reply => {
//       var found = reply.payload.indexOf('title');
//       t.notEqual(found,-1,"The url GET/blog return list of articles");
//       server.stop(t.end);
//     });
//
//
// });
// test('endpoint test | GET/aboutme | return html page of about theadmin', t => {
//   const request = Object.assign({},requestDefaults,{
//     url:'/aboutme'
//   });
//   return server.inject(request)
//     .then(reply => {
//       var found = reply.payload.indexOf('name');
//       t.notEqual(found,-1,"The url GET/blog return bio about the auther");
//       server.stop(t.end);
//     });
// });
// test('endpoint test | GET/contact | return html page of about theadmin', t => {
//   const request = Object.assign({},requestDefaults,{
//     url:'/contact'
//   });
//   return server.inject(request)
//     .then(reply => {
//       var found = reply.payload.indexOf('contact');
//       t.notEqual(found,-1,"The url GET/blog return contact form");
//       server.stop(t.end);
//     });
// });
//
// test('controlpanel test | Post/controller/addArticle | add new article to db', t => {
//     server.stop(t.end);
// });
// test('endpoint test | Post/controller/deleteArticle | return html page with articles', t => {
//     server.stop(t.end);
// });
