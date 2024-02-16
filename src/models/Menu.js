import mongoose, { Schema } from "mongoose";

const topicShema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        dish: {
            type: String,
        },
        desc: {
            type: String,
            required: true
        },
        category: {
            type: String,
        },
        prices: {
            type: [Number],
            required: true,
          },
    },
    {
        timestamps: new Date()
    }
);

const Menu = mongoose.models.Menu || mongoose.model("Menu", topicShema);

export default Menu; 