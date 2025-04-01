import UseFetchArticlesImages from "../../hooks/UseFetchArticlesImages";

const FileUpload = () => {
  const { images, loading, error } = UseFetchArticlesImages();
  console.log(images);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching images</div>;
  }

  return (
    <div>
      {images.map((image) => (
        <img key={image.id} src={image.url} alt="Article" />
      ))}
    </div>
  );
};

export default FileUpload;
