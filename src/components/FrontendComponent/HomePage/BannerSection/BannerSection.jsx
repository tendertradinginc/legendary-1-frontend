import SliderHero from "./SliderHero";

const sliderData = [
  {
    title: "Built on Trust Since 1980",
    subtitle:
      "Focusing on medium to large-scale commercial construction projects...",
    backgroundImage: "/slider2.jpeg",
    buttonText: "Explore Our Project",
    link: "/projects",
    location: "Airport terminal, ",
  },
  {
    title: "Innovative Designs, Quality Work",
    subtitle:
      "Delivering exceptional construction solutions for over 40 years.",
    backgroundImage: "slider1.jpg",

    buttonText: "Discover More",
    link: "/services",
    location: "Downtown, Dhaka",
  },
  {
    title: "Innovative Designs, Quality Work",
    subtitle:
      "Delivering exceptional construction solutions for over 40 years.",
    backgroundImage: "/slider3.png",
    buttonText: "Discover More",
    link: "/services",
    location: "Downtown, Dhaka",
  },
  {
    title: "Innovative Designs, Quality Work",
    subtitle:
      "Delivering exceptional construction solutions for over 40 years.",
    backgroundImage: "/slider4.jpg",
    buttonText: "Discover More",
    link: "/services",
    location: "Downtown, Dhaka",
  },
];

const BannerSection = () => {
  return (
    <div>
      <SliderHero slides={sliderData} />
    </div>
  );
};

export default BannerSection;
