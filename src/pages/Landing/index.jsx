import { useState } from "react"
import Layout from "../../components/Layout/Layout"
import IntegratedPlatform from "../../components/Home/IntegratedPlatform"
import ParallaxVideo from "../../components/Home/ParallaxVideo"
import Steps from "../../components/Home/Steps"
import MarqueeSection from "../../components/Home/MarqueeSection"
import OurCompany from "../../components/Home/OurCompany"
import NewsRoom from "../../components/Home/NewsRoom"

export default function Landing() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <div
      className={
        introDone ? undefined : "h-screen overflow-hidden"
      }
    >
      <ParallaxVideo onIntroComplete={() => setIntroDone(true)} />
      <div
        className={introDone ? undefined : "hidden"}
        aria-hidden={!introDone}
      >
        <Layout>
          <IntegratedPlatform />
          <Steps />
          <MarqueeSection />
          <OurCompany />
          <NewsRoom />
        </Layout>
      </div>
    </div>
  )
}