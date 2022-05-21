import Hero from '../Component/Hero'
import CallToActionLeft from '../Component/CallToAction'
import ImageGenerator from '../Component/ImageGenerator'

const Home = () => {
  return (
    <>
      <Hero />
      <ImageGenerator />
      <CallToActionLeft id="guide"/>
    </>
  )
  
}

export default Home