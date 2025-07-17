import { PostModel } from "../../modules/post/index.js";
import {
    handleServerError
} from "../../shared/helpers/index.js";

export const getHashtags = async (req, res) => {
    const { limit } = req.query;
    const max = parseInt(limit) || 6;
    let result = await PostModel.aggregate([
        {
            $unwind: "$hashtags"
        },
        {
            $group: {
                _id: "$hashtags",
                "hashtag": {
                    $first: "$hashtags"
                },
                "numberPosts": {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                "numberPosts": -1,
                "hashtag": 1
            }
        },
        {
            $project: {
                "_id": false
            }
        }
    ]).collation({ locale: 'en', strength: 2 }).limit(max).exec();
    try {
        return res.status(200).json(result);
    } catch (error) {
        handleServerError(res, error);
    }
};
