export default {
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Gallery title",
    },
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            source: "sanity.media",
          },
        },
      ],
      options: {
        sortable: true,
      },
    },
  ],
};
