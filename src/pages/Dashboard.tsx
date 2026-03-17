import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, MessageSquare, Clock, Calculator, Trophy, Calendar, ArrowRight, Chrome as Home } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: BookOpen,
      title: "AI Notes Generator",
      description: "Generate beautiful, structured notes with diagrams and examples",
      color: "from-blue-500 to-blue-600",
      path: "/notes-generator"
    },
    {
      icon: Brain,
      title: "Practice Questions",
      description: "Get unlimited MCQs and board-style questions with solutions",
      color: "from-purple-500 to-purple-600",
      path: "/practice-questions"
    },
    {
      icon: MessageSquare,
      title: "Clear My Doubt",
      description: "Chat with AI tutor to clarify concepts and solve problems",
      color: "from-green-500 to-green-600",
      path: "/ai-tutor"
    },
    {
      icon: Clock,
      title: "Quick Revision",
      description: "One-page revision notes with key points and formulas",
      color: "from-orange-500 to-orange-600",
      path: "/quick-revision"
    },
    {
      icon: Calculator,
      title: "Formula Sheet",
      description: "Complete formula collections for Maths, Physics & Chemistry",
      color: "from-pink-500 to-pink-600",
      path: "/formula-sheet"
    },
    {
      icon: Trophy,
      title: "Quick Quiz",
      description: "Test your knowledge with instant quizzes and scores",
      color: "from-cyan-500 to-cyan-600",
      path: "/quick-quiz"
    },
    {
      icon: Calendar,
      title: "Study Strategy Assistant",
      description: "Get personalized study plans for your exams",
      color: "from-indigo-500 to-indigo-600",
      path: "/strategy-assistant"
    }
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
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-blue-600"
          >
            <Home className="mr-2 w-4 h-4" />
            Home
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your AI Learning Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Choose a tool to start studying smarter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(tool.path)}
              >
                <div className={`bg-gradient-to-r ${tool.color} p-6`}>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tool.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 group-hover:shadow-lg transition-all"
                  >
                    Start Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">
              Need Help Getting Started?
            </h2>
            <p className="text-blue-100 mb-4">
              Our AI assistant is here to guide you through your learning journey
            </p>
            <Button
              onClick={() => navigate("/ai-tutor")}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <MessageSquare className="mr-2 w-4 h-4" />
              Chat with AI Tutor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
