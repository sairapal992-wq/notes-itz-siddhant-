import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, ArrowLeft, Send, Bot, User, Lightbulb } from "lucide-react";

const AITutor = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([
    {
      role: "assistant",
      content: "Hello! I'm your AI tutor. I'm here to help you understand concepts, solve problems, and clear your doubts. What would you like to learn about today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "Explain photosynthesis in simple terms",
    "How do I solve quadratic equations?",
    "What is Newton's second law?",
    "Help me understand chemical bonding"
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    setTimeout(() => {
      const aiResponse = generateResponse(userMessage);
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
      setLoading(false);
    }, 1500);
  };

  const generateResponse = (question: string) => {
    const responses = [
      `Great question! Let me break this down for you:\n\n**Key Concept:**\nThe topic you're asking about involves understanding the fundamental principles that govern this area.\n\n**Simple Explanation:**\nThink of it like this - imagine you're building blocks. Each concept builds on the previous one to create a complete understanding.\n\n**Step-by-Step:**\n1. First, we identify the main components\n2. Then, we understand how they interact\n3. Finally, we see how this applies to real-world situations\n\n**Example:**\nFor instance, if we take a practical scenario, we can see how this concept works in action.\n\nDoes this help? Feel free to ask for more clarification on any part!`,

      `Excellent question! Here's how I would explain this:\n\n**Understanding the Basics:**\nThis concept is fundamental to the subject and forms the foundation for more advanced topics.\n\n**Key Points to Remember:**\n• The main principle involves understanding the relationship between different elements\n• It's important to recognize patterns and connections\n• Practice with various examples helps solidify understanding\n\n**Practical Application:**\nIn real-world scenarios, this concept is used in many ways. For example, it helps us solve problems by providing a systematic approach.\n\nWould you like me to explain any specific part in more detail?`,

      `That's a smart question to ask! Let me help you understand:\n\n**Simple Definition:**\nAt its core, this concept describes how different factors work together to produce a result.\n\n**Why It Matters:**\nUnderstanding this helps you:\n- Solve related problems more easily\n- Connect different topics in the subject\n- Prepare better for exams\n\n**Memory Tip:**\n💡 Remember it this way: Think of the key word in the concept and associate it with a real-life example you can easily recall.\n\n**Practice Suggestion:**\nTry solving 2-3 problems related to this concept to strengthen your understanding.\n\nWhat else would you like to know?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                AI Tutor - Clear My Doubt
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col h-[calc(100vh-180px)]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                )}

                <Card className={`p-4 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                    : "bg-white"
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                </Card>

                {message.role === "user" && (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <Card className="p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                  </div>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">Suggested Questions:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-left justify-start h-auto py-3 px-4 hover:bg-green-50 hover:border-green-300"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0 text-green-600" />
                    <span className="text-sm">{question}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Ask me anything about your studies..."
              className="flex-1"
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
