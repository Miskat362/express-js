let posts = [
  { id: 1, title: 'Post 1', content: 'This is the first post' },
  { id: 2, title: 'Post 2', content: 'This is the second post' },
  { id: 3, title: 'Post 3', content: 'This is the third post' },
];

// @desc Get all posts
// @route GET /api/posts
const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
}

// @desc Get a single post by id
// @route GET /api/posts/:id
const getPostById = (req, res, next) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (!post) {
        const error = new Error(`The post with id ${postId} not found`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post);
}

// @desc Create a new post
// @route POST /api/posts
const createPost = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        const error = new Error('Title and content are required');
        error.status = 400;
        return next(error);
    }
    const newPost = {
        id: posts.length + 1,
        title,
        content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
}

// @desc Update a post
// @route PUT /api/posts/:id
const updatePost = (req, res, next) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = { id: postId, title, content };
        return res.status(200).json(posts[postIndex]);
    }
    const error = new Error(`The post with id ${postId} not found`);
    error.status = 404;
    return next(error);
}

// @desc Delete a post
// @route DELETE /api/posts/:id
const deletePost = (req, res, next) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        return res.status(200).json({ message: 'Post deleted successfully' });
    }
    const error = new Error(`The post with id ${postId} not found`);
    error.status = 404;
    return next(error);
}

export { getPosts, getPostById, createPost, updatePost, deletePost };
