import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

export default function ClubhouseSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[100rem] mx-auto">
        {/* Grid layout: Image on left, content on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 sm:h-80 lg:h-[500px] rounded-lg overflow-hidden">
              <Image src="https://static.wixstatic.com/media/cef78c_337e817a4d1f487fb149116fa0aab218~mv2.png" alt="The Clubhouse at Codename: Unstoppable 2.0" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Content Section - Vertically stacked */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-6"
          >
            {/* Main Heading */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary">
              The Clubhouse.
            </h1>

            {/* Subheadline */}
            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl text-primary uppercase indent-0 font-normal">The Social Anchor <span className="text-lg sm:text-xl lg:text-2xl font-normal" />of an Elite Community</h3>

            {/* Body Copy */}
            <p className="font-paragraph text-base leading-relaxed text-foreground lg:text-sm">
              Anchored by a grand 15,000+ sq. ft. Clubhouse, the leisure ecosystem at Codename: Unstoppable 2.0 is meticulously designed for wellness, recreation, and high-end social networking. From sophisticated indoor lounges to pristine riverfront terraces and biodiversity parks, every amenity serves as an extension of your private estate - offering an unparalleled lifestyle surrounded by nature.
            </p>

            {/* Highlight Features */}
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="font-paragraph text-foreground text-sm">Sophisticated indoor lounges for refined gatherings</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="font-paragraph text-foreground text-sm">Pristine riverfront terraces with panoramic views</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="font-paragraph text-foreground text-sm">Biodiversity parks for wellness and recreation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
