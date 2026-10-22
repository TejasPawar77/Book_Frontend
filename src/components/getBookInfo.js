export const getBookInfo = (book = {}) => {
  const info = book.volumeInfo || book;
  const rawAuthors = info.authors ?? info.author ?? "Unknown Author";

  const authors = Array.isArray(rawAuthors)
    ? rawAuthors.map(String)
    : typeof rawAuthors === "string"
      ? [rawAuthors]
      : ["Unknown Author"];

  const rawRating = info.averageRating ?? info.average_rating ?? info.rating;
  const rating =
    rawRating !== undefined &&
      rawRating !== null &&
      rawRating !== "" &&
      Number.isFinite(Number(rawRating))
      ? Number(rawRating)
      : null;

  return {
    id: book.id ?? info.id ?? info.title,
    title: info.title || info.name || "Untitled Book",
    authors,
    description:
      typeof info.description === "string"
        ? info.description.replace(/<[^>]*>/g, "")
        : "No description available.",
    image:
      info.imageLinks?.thumbnail ||
      info.imageLinks?.smallThumbnail ||
      info.thumbnail ||
      info.image ||
      info.coverImage ||
      info.image_url ||
      "",
    rating,
    link: info.previewLink || info.preview_link || info.infoLink || "",
  };
};

export const imageUrl = (image) => image.replace(/^http:/, "https:");