const ProductFullPic = (props) => {
  console.log(props.image);
  return (
    <div
      onClick={() => props.onSetFullPic(false)}
      className="fixed inset-0 top-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      <div className="w-[70%] max-h-96 my-auto">
        <img
          className="object-cover w-full h-full rounded-lg"
          alt="Product"
          src={`${process.env.REACT_APP_AWS_S3_BUCKET}/${props.image}`}
          srcSet={`${process.env.REACT_APP_IMAGE_KIT_URL}/${props.image}?tr=w-768, h-768, ${process.env.REACT_APP_IMAGE_KIT_URL}/${props.image}?tr=w-300, h-300, ${process.env.REACT_APP_IMAGE_KIT_URL}/${props.image}?tr=w-1200, h-700`}
          sizes="(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px"
        />
      </div>
    </div>
  );
};

export default ProductFullPic;
