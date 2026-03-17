import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, MessageSquare, Clock, Calculator, Trophy, Calendar, Sparkles, ArrowRight, CircleCheck as CheckCircle2 } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "AI Notes Generator",
      description: "Generate beautiful, structured notes instantly for any subject and chapter"
    },
    {
      icon: Brain,
      title: "Practice Questions",
      description: "Get unlimited practice questions with step-by-step solutions"
    },
    {
      icon: MessageSquare,
      title: "AI Tutor Chat",
      description: "Clear your doubts anytime with our intelligent AI tutor"
    },
    {
      icon: Clock,
      title: "Quick Revision",
      description: "One-page revision notes with all important points and formulas"
    },
    {
      icon: Calculator,
      title: "Formula Sheets",
      description: "Organized formula collections for Maths, Physics, and Chemistry"
    },
    {
      icon: Trophy,
      title: "Quick Quiz",
      description: "Test your knowledge with instant quizzes and get immediate feedback"
    },
    {
      icon: Calendar,
      title: "Study Planner",
      description: "Get personalized study plans based on your exam schedule"
    },
    {
      icon: Sparkles,
      title: "Smart Assistant",
      description: "AI-powered study assistant available across the platform"
    }
  ];

  const benefits = [
    "Study faster with AI-generated content",
    "Access unlimited practice questions",
    "Get instant doubt clarification",
    "Personalized study plans",
    "Beautiful, easy-to-understand notes",
    "Prepare better for exams"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              StudentGen AI
            </span>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Learning for Class 8-12
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Study Smarter, Not Harder with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your personal AI study assistant that helps you generate notes, practice questions,
            clear doubts, and prepare for exams efficiently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
            >
              Start Learning Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="text-lg px-8 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Explore Tools
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-blue-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose StudentGen AI?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of students who are already studying smarter with AI
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-50">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Studies?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start using StudentGen AI today and experience the future of learning
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
          >
            Get Started for Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 StudentGen AI. Empowering students to learn smarter.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
