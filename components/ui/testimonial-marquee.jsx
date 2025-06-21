import { Marquee } from "./marquee";

const testimonials = [
  {
    name: "Sarah Chen",
    username: "@sarahchen",
    body: "MATCH completely transformed my career trajectory. The personalized roadmap and mentor support helped me land my dream job in tech.",
    img: "https://images.unsplash.com/photo-1494790108755-2616b5b1dfb1?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    role: "Software Engineer at Google"
  },
  {
    name: "Rajesh Kumar",
    username: "@rajeshk",
    body: "The NCET assessments and premium features gave me the competitive edge I needed. Best investment in my career!",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    role: "Data Scientist at Microsoft"
  },
  {
    name: "Priya Sharma",
    username: "@priyasharma",
    body: "From freemium to premium - the jump in features and support is incredible. The mentorship calls are pure gold!",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    role: "Product Manager at Amazon"
  },
  {
    name: "Arjun Patel",
    username: "@arjunpatel",
    body: "The courses and certificates opened doors I never thought possible. MATCH Premium is worth every rupee.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    role: "Full Stack Developer at Flipkart"
  },
  {
    name: "Sneha Reddy",
    username: "@snehareddy",
    body: "The AI-generated career roadmap was spot-on. It's like having a personal career coach available 24/7.",
    img: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    role: "DevOps Engineer at Zomato"
  },
  {
    name: "Vikram Singh",
    username: "@vikramsingh",
    body: "The premium badge gave me visibility with corporates. Got 3 interview calls within a week of upgrading!",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    role: "Backend Developer at Paytm"
  }
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

function ReviewCard({ img, name, username, body, rating, role }) {
  return (
    <figure className="relative w-80 cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4">
      <div className="flex flex-row items-center gap-2 mb-4">
        <img className="rounded-full w-12 h-12 object-cover" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-gray-900">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500">{username}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {Array(rating).fill(0).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-sm text-gray-700 leading-relaxed">"{body}"</blockquote>
    </figure>
  );
}

export function TestimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What Our Premium Users Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of professionals who've transformed their careers with MATCH Premium
        </p>
      </div>
      
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white via-white/90 to-transparent"></div>
    </div>
  );
}