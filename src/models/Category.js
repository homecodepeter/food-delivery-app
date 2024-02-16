import mongoose, { Schema } from "mongoose";

const categoryShema = new Schema(
    {
        img: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    {
        timestamps: new Date()
    }
);

const Category = mongoose.models.Category || mongoose.model("Category", categoryShema);

export default Category; 