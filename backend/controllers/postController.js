import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { content, imageUrl } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Post content is required' });
  }

  try {
    const newPost = await Post.create({
      user: req.user._id,
      authorName: req.user.username,
      content,
      imageUrl: imageUrl || '',
    });

    // Broadcast through socket.io if attached
    const io = req.app.get('io');
    if (io) {
      io.emit('post:created', newPost);
    }

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { content, imageUrl } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Authorization: author or admin
    if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Not authorized to edit this post' });
    }

    post.content = content !== undefined ? content : post.content;
    post.imageUrl = imageUrl !== undefined ? imageUrl : post.imageUrl;

    const updatedPost = await post.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('post:updated', updatedPost);
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Not authorized to delete this post' });
    }

    await post.deleteOne();

    const io = req.app.get('io');
    if (io) {
      io.emit('post:deleted', req.params.id);
    }

    res.json({ message: 'Post removed successfully', postId: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isLiked = post.likes.some((id) => id.toString() === req.user._id.toString());

    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('post:liked', { postId: post._id, likes: post.likes });
    }

    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Comment text is required' });

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      user: req.user._id,
      username: req.user.username,
      text,
    };

    post.comments.push(comment);
    await post.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('post:commented', { postId: post._id, comments: post.comments });
    }

    res.status(201).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};