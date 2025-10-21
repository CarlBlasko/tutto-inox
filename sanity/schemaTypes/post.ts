import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "designer", title: "Designer", type: "string" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "image", title: "Image", type: "image" }),
  ],
});
