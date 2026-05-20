import FeaturedPage from "@/components/FeaturedCard";
import SportVerseBanner from "@/components/SportVerseBanner";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <>
    <SportVerseBanner></SportVerseBanner>
    <FeaturedPage></FeaturedPage>
    <WhyChooseUs></WhyChooseUs>
    <Testimonials></Testimonials>
    </>
  );
}
