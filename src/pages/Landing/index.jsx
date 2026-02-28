import Layout from "../../components/Layout/Layout"
import IntegratedPlatform from "../../components/Home/IntegratedPlatform"
import ParallaxVideo from "../../components/Home/ParallaxVideo"


export default function Landing() {

  return (
    <Layout>
      <ParallaxVideo />
      <IntegratedPlatform />
    </Layout>
  )
}