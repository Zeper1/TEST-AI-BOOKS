import { Button } from "@/components/ui/button"
import { BookOpen, Sparkles, Wand2, BookOpenCheck, Stars } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                Create Magical{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Personalized Stories
                </span>{" "}
                for Your Children
              </h1>
              <p className="text-xl text-muted-foreground mb-8 lg:max-w-2xl">
                Transform your child into the hero of their own adventure with AI-powered storytelling and beautiful illustrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/create">
                    <Wand2 className="w-5 h-5" />
                    Start Creating
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <Link href="/examples">
                    <BookOpenCheck className="w-5 h-5" />
                    See Examples
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative lg:h-[600px]">
              <Image
                src="https://images.unsplash.com/photo-1512076249812-fd58fb2c7c28?q=80&w=2069"
                alt="Children reading a magical story"
                className="rounded-lg shadow-2xl"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How the Magic Happens</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create personalized stories in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Stars className="w-10 h-10 text-primary" />}
              title="Personalize"
              description="Tell us about your child and their interests to create a unique story tailored just for them."
            />
            <FeatureCard
              icon={<Wand2 className="w-10 h-10 text-primary" />}
              title="Generate"
              description="Our AI creates a magical story and beautiful illustrations featuring your child as the hero."
            />
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-primary" />}
              title="Download"
              description="Get your personalized storybook instantly in a beautiful PDF format, ready to read and share."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Story?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of parents creating magical memories for their children
            </p>
            <Button size="lg" className="gap-2" asChild>
              <Link href="/create">
                <Sparkles className="w-5 h-5" />
                Start Your Journey
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
      <div className="relative bg-background/80 backdrop-blur-sm p-8 rounded-xl border shadow-sm">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}