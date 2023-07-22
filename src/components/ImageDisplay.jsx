// components/ImageDisplay.js
import Image from 'next/image'

const ImageDisplay = () => {
  const imageUrl =
    'http://localhost:8000/storage/images/f452b445f08436137be393f8c0031d18.png' // Assuming your Laravel public images are in the "images" folder

  return (
    <div>
      <Image src={imageUrl} alt='Image' width={300} height={200} />
    </div>
  )
}

export default ImageDisplay
