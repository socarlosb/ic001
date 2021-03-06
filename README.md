# ic001

A discussion thread using infinite scroll (a ReactJS exercise).
You can see a result in <a href="https://confident-montalcini-7c0ad1.netlify.app/" target="_blank">confident-montalcini-7c0ad1.netlify.app</a>

[![Netlify Status](https://api.netlify.com/api/v1/badges/fbc25464-343b-498e-932a-e96defdd43cc/deploy-status)](https://app.netlify.com/sites/confident-montalcini-7c0ad1/deploys)

## use cases

implement the following features on a page:

- Display a discussion composed of comments
- Filter the list of posts to display only validated comments
- Create a new post

## api endpoints

GET
/api/posts
Provides a paginated list of posts. You don’t need to worry about the order of the posts.
Query string Parameters
page : the page number to be fetched
filter : a string the specifies the current filter; it only supports “verified”

PUT
/api/posts
Creates a new post. Takes a JSON object in the body.
Request Body Schema.
userName (text)
userProfileImgUrl (text)
comment (text)
validated (boolean)

## ui inspiration

- initial page

![page](/ui/page.jpg)

- posts list

![posts list](/ui/posts-list.jpg)

- post creation

![post creations](/ui/post-create.jpg)

## things to consider

- functionality
- react client state
- code structure
- file structure
- ui
- ux
- typescript
- [virtualized list component](https://virtuoso.dev/) (although it seems there is a limit of 1032443 items 🤔)
  - add option to resume reading? (or select specific page)

## notes

[HTML Symbols](https://www.toptal.com/designers/htmlarrows/)

[CSS box-shadow examples](https://getcssscan.com/css-box-shadow-examples)

## next tasks

- ~~add the 'Comments' title~~
- ~~change NewPost semantic to `<form>`~~
- ~~add a dropdown with pages~~
- ~~implement `virtuoso`~~
- ~~save _last read_ post in `sessionStorage`~~
- ~~save _reply_ in `sessionStorage`~~
- ~~check issue of duplicate requests (duplicate posts)~~
- ~~navigate to saved _last read_ is having 🐛~~

# my notes

- [ ] improve `back to top`, it stops on 2nd item instead of the first item
- [ ] validate the `Uncaught TypeError: e.getBoundingClientRect is not a function` error
- [ ]
- [ ]

# "client" notes

## to improve

##
