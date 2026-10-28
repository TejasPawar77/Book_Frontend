import bookImage from '../../assets/image.png';

const BookGraphic = () => {
  return (
    <div className="bg-white border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div
        className="w-full h-56 md:h-64 border-4 border-black flex flex-col justify-between p-4 relative bg-no-repeat bg-contain bg-center"
        style={{ backgroundImage: `url(${bookImage})` }}
      >
      </div>
    </div>
  );
};

export default BookGraphic;