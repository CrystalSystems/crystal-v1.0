import { userRoutes } from './user-routes.js';
import { postRoutes } from './post-routes.js';
import { hashtagRoutes } from './hashtag-routes.js';
import { likedRoutes } from './liked-routes.js';

export const registeredRoutes = (app) => {
    app.use('/user', userRoutes);
    app.use('/post', postRoutes);
    app.use('/hashtag', hashtagRoutes);
    app.use('/liked', likedRoutes);
};
