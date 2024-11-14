import Carousel from "react-bootstrap/Carousel";

function SingleProjectCarousel({ data }) {
    const image1 = require("../images/union/projects-main-images/slide1-b.jpg");
  const image2 = require("../images/union/projects-main-images/slide2-b.jpg");
  const image3 = require("../images/union/projects-main-images/slide3-b.jpg");

  data = [image1, image2, image3]
  return (
    <Carousel className="w-100">
      {data &&
        data.map((item, i) => (
          <Carousel.Item key={i} className="singleProjectCarousel">
            <img src={item} />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default SingleProjectCarousel;
