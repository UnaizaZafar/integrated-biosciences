import Layout from "../../components/Layout/Layout"
import IntegratedPlatform from "../../components/Home/IntegratedPlatform"
import ParallaxVideo from "../../components/Home/ParallaxVideo"
import Steps from "../../components/Home/Steps"
import MarqueeSection from "../../components/Home/MarqueeSection"
import OurCompany from "../../components/Home/OurCompany"
import NewsRoom from "../../components/Home/NewsRoom"
export default function Landing() {

  return (
    <Layout>
      <ParallaxVideo />
      <IntegratedPlatform />
      <Steps />
      <MarqueeSection />
      <OurCompany />
      <NewsRoom />
    </Layout>
  )
}