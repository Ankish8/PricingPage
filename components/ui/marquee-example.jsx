import { Marquee } from "./marquee";
import { TestimonialMarquee } from "./testimonial-marquee";

// Simple text marquee example
export function SimpleTextMarquee() {
  const technologies = [
    "React", "TypeScript", "Node.js", "Python", "JavaScript", 
    "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes"
  ];

  return (
    <div className="w-full py-8">
      <h3 className="text-xl font-semibold text-center mb-6">Technologies You'll Master</h3>
      <Marquee pauseOnHover className="[--duration:30s]">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="mx-4 rounded-lg bg-primary/10 px-6 py-3 text-primary font-medium shadow-sm"
          >
            {tech}
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// Logo marquee example
export function LogoMarquee() {
  const companies = [
    { name: "Google", logo: "🏢" },
    { name: "Microsoft", logo: "🏢" },
    { name: "Amazon", logo: "🏢" },
    { name: "Apple", logo: "🏢" },
    { name: "Meta", logo: "🏢" },
    { name: "Netflix", logo: "🏢" },
    { name: "Tesla", logo: "🏢" },
    { name: "Spotify", logo: "🏢" }
  ];

  return (
    <div className="w-full py-8 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
        Our Students Work At
      </h3>
      <Marquee pauseOnHover className="[--duration:25s]">
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-6 flex items-center space-x-3 rounded-lg bg-white px-8 py-4 shadow-sm border border-gray-200"
          >
            <span className="text-2xl">{company.logo}</span>
            <span className="font-medium text-gray-800">{company.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// Stats marquee example
export function StatsMarquee() {
  const stats = [
    { number: "10,000+", label: "Students Placed" },
    { number: "500+", label: "Partner Companies" },
    { number: "95%", label: "Success Rate" },
    { number: "₹12L", label: "Average Package" },
    { number: "50+", label: "Course Modules" },
    { number: "24/7", label: "Mentor Support" }
  ];

  return (
    <div className="w-full py-8">
      <Marquee pauseOnHover className="[--duration:35s]">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="mx-6 text-center rounded-lg bg-gradient-to-br from-primary to-primary-dark px-8 py-6 text-white shadow-lg"
          >
            <div className="text-2xl font-bold mb-1">{stat.number}</div>
            <div className="text-sm opacity-90">{stat.label}</div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// Main component that includes all examples
export function MarqueeExamples() {
  return (
    <div className="space-y-12 py-8">
      <SimpleTextMarquee />
      <LogoMarquee />
      <StatsMarquee />
      <TestimonialMarquee />
    </div>
  );
}