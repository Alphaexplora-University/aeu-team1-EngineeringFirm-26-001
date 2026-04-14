import { motion } from "motion/react"
import { Compass, Cpu, Award } from "lucide-react"

const MissionSection = () => (
  <section className="mx-64 mt-32 mb-16">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-8 md:grid-cols-12">
      <div className="md:col-span-5">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-headline mb-8 text-4xl font-bold tracking-tight"
        >
          Engineering the future through rigorous technical mastery.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-on-surface-variant font-body mb-8 text-justify text-lg leading-relaxed"
        >
          Founded on the principles of architectural integrity and structural
          innovation, AlphaExplora has spent decades redefining what is possible
          in modern engineering. We don't just build; we orchestrate complexity
          into seamless performance.
        </motion.p>
      </div>
      <div className="space-y-12 md:col-span-6 md:col-start-7">
        {[
          {
            icon: Award,
            title: "Certified Excellence",
            desc: "We hold ISO 9001 certifications and multiple international awards for architectural innovation.",
            color: "fill-yellow-400",
          },
          {
            icon: Compass,
            title: "Uncompromising Quality",
            desc: "Every joint, every line of code, and every structural beam undergoes a rigorous validation process that exceeds industry standards.",
            color: "fill-red-400",
          },
          {
            icon: Cpu,
            title: "Technical Integrity",
            desc: "We maintain an unwavering commitment to the mathematical truth of our projects, ensuring longevity and safety in every environment.",
            color: "fill-blue-400",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * idx }}
            className="group"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="bg-tertiary-fixed/20 rounded-lg p-2">
                {item.icon && (
                  <item.icon
                    className={`text-tertiary-fixed-dim h-6 w-6 ${item.color}`}
                  />
                )}
              </div>
              <h3 className="font-headline text-xl font-bold">{item.title}</h3>
            </div>
            <p className="text-on-surface-variant font-body pl-14 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const LeadershipSection = () => (
  <section className="bg-surface-container-low pb-16">
    <div className="mx-auto max-w-7xl px-8">
      <div className="mb-16">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight">
          The Architects of AlphaExplora
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            name: "Dr. Marcus Sterling",
            role: "Chief Executive Officer",
            desc: "A visionary with over 25 years in structural thermodynamics and corporate strategy.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAeraKPUFrQ27a_sFOmzrg0AomQBn_1KfY7oTbrW6MaKUJMkF_IGnkSCM7_hZvy7EZ8MYHUyzTcIca8xYqHkzri8Ns0XnGGood6wfBedv3-FvxdFMvMsAEvfM4Yp53GG9NsLgFLE9bJdIaoTyA35RbNN-lBplrCPPaf7p6FV1LsOZDX6CoJGlDde375gfx-VLWKSdR4iBu8sjTCQ8Q7gsCpKtKp839SajeanFz7F7rE_BtDjLY6lwsm7NdwlCKufamYXm19D6YHs1n",
          },
          {
            name: "Elena Vance",
            role: "Chief Technology Officer",
            desc: "Leading the digital twin revolution and automated infrastructure diagnostics.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-o25AIZoYeRCjYX1CqP12ep1PF8R5BZkX3ZVF0fZuFIn-PIQJmz0lkjFC_3MiLbV7qWygfYDsNhwdKyKNXTdnshtRfGEfPwGBxQqIIZql9JD4-RHKmodlcXt_R2_cfCYCfkSHkL9JmuYy4fo4RSOwEHGKK23gvrvturXuIXCdT5xZCM5m_LC3ocxGMe2M0BG_MPL1-H4bp1zNq_RJTpn1qJYv2hi-fEBTVJTv2e7ak5XpYpk4-wuov2NaBJM_7b69Zxy2uaE3AcnV",
          },
          {
            name: "Julian Thorne",
            role: "Head of Design Systems",
            desc: "Bridging the gap between aesthetic brilliance and functional engineering requirements.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaIlRPr39PXE4nv9ORLz53l_cn2v8AtfFQ4xIjm3fXaF8JLrkwhFLMYVHNhXAyxh5iNWlzf-P4c0uGMI4OITNfq6zalbcN0wnp3knQN1zmYU9YKOXzOmKqwus1UXnBRW7pshQtoHKCbuq_HMD6QKYGFRN45I86lm5hXUmZvrpL7zyZadptuGyeSIlBsUUMGoQKCB0l81MpvH305s2DQL_DwlAx5kXQQkB-A8z2fO4b-9uXuOTLNZQj3oWlmVXcBRZFAh1b25bxRRV6",
          },
        ].map((person, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * idx }}
            className="bg-surface-container-lowest group overflow-hidden bg-card shadow-sm transition-all duration-500 hover:shadow-xl"
          >
            <div className="aspect-4/5 overflow-hidden grayscale transition-all duration-700 group-hover:grayscale-0">
              <img
                className="h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-100"
                src={person.img}
                alt={person.name}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8">
              <h4 className="font-headline mb-1 text-xl font-bold">
                {person.name}
              </h4>
              <p className="font-label tracking-widest text-accent uppercase">
                {person.role}
              </p>
              <div className="bg-tertiary-fixed mb-4 h-1 w-12"></div>
              <p className="text-on-surface-variant leading-relaxed">
                {person.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default function App() {
  return (
    <main>
      <MissionSection />
      <LeadershipSection />
    </main>
  )
}
