import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft, CircleCheck as CheckCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PracticeQuestions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any>(null);
  const [showAnswers, setShowAnswers] = useState<{[key: number]: boolean}>({});
  const [formData, setFormData] = useState({
    subject: "",
    chapter: "",
    difficulty: ""
  });

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const generateQuestions = async () => {
    if (!formData.subject || !formData.chapter || !formData.difficulty) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const mockQuestions = {
        subject: formData.subject,
        chapter: formData.chapter,
        difficulty: formData.difficulty,
        questions: [
          {
            type: "mcq",
            question: `What is the primary concept behind ${formData.chapter}?`,
            options: ["Option A - Basic definition", "Option B - Advanced application", "Option C - Theoretical framework", "Option D - Practical implementation"],
            correct: 0,
            explanation: "This is the fundamental concept that forms the basis of understanding this chapter."
          },
          {
            type: "mcq",
            question: `Which formula is used in ${formData.chapter}?`,
            options: ["Formula A", "Formula B", "Formula C", "Formula D"],
            correct: 1,
            explanation: "Formula B is the correct formula used for calculations in this chapter, as it accounts for all variables."
          },
          {
            type: "short",
            question: `Define the key term in ${formData.chapter}.`,
            answer: `The key term refers to the fundamental concept that describes the relationship between various elements in ${formData.subject}.`,
            points: ["Clear definition", "Relevant examples", "Connection to other concepts"]
          },
          {
            type: "short",
            question: `Explain the importance of ${formData.chapter} in ${formData.subject}.`,
            answer: `This chapter is important because it provides the foundation for understanding advanced topics and has practical applications in real-world scenarios.`,
            points: ["Foundation for advanced topics", "Real-world applications", "Connection to curriculum"]
          },
          {
            type: "long",
            question: `Describe the main concepts of ${formData.chapter} with suitable examples.`,
            answer: `The main concepts include: 1) Basic principles and definitions, 2) Mathematical or theoretical framework, 3) Practical applications, 4) Problem-solving approaches. Each concept builds upon the previous one to create comprehensive understanding.`,
            structure: ["Introduction", "Main concepts (3-4 points)", "Examples for each concept", "Conclusion with practical applications"]
          }
        ]
      };

      setQuestions(mockQuestions);
      setShowAnswers({});
      setLoading(false);
      toast({
        title: "Questions Generated!",
        description: `${mockQuestions.questions.length} practice questions are ready`
      });
    }, 2000);
  };

  const toggleAnswer = (index: number) => {
    setShowAnswers(prev => ({...prev, [index]: !prev[index]}));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Practice Questions Generator
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!questions ? (
            <Card className="p-8 animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Generate Practice Questions
                  </h2>
                  <p className="text-gray-600">
                    Get MCQs and board-style questions with detailed solutions
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="chapter">Chapter Name</Label>
                    <Input
                      id="chapter"
                      placeholder="e.g., Quadratic Equations"
                      value={formData.chapter}
                      onChange={(e) => setFormData({...formData, chapter: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={generateQuestions}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Brain className="mr-2 w-5 h-5 animate-pulse" />
                        Generating Questions...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 w-5 h-5" />
                        Generate Questions
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="animate-fade-in space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{questions.subject}</h2>
                    <p className="text-gray-600">
                      {questions.chapter} • {questions.difficulty} Level • {questions.questions.length} Questions
                    </p>
                  </div>
                  <Button onClick={() => setQuestions(null)} variant="outline">
                    Generate New
                  </Button>
                </div>
              </Card>

              {questions.questions.map((q: any, index: number) => (
                <Card key={index} className="p-6">
                  {q.type === "mcq" && (
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                            Multiple Choice
                          </span>
                          <p className="text-lg text-gray-900 font-medium">{q.question}</p>
                        </div>
                      </div>

                      <div className="ml-11 space-y-2 mb-4">
                        {q.options.map((option: string, i: number) => (
                          <div
                            key={i}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              showAnswers[index] && i === q.correct
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            {option}
                            {showAnswers[index] && i === q.correct && (
                              <CheckCircle className="inline-block ml-2 w-5 h-5 text-green-600" />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="ml-11">
                        <Button
                          onClick={() => toggleAnswer(index)}
                          variant={showAnswers[index] ? "secondary" : "outline"}
                          size="sm"
                        >
                          {showAnswers[index] ? (
                            <>
                              <EyeOff className="mr-2 w-4 h-4" />
                              Hide Answer
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 w-4 h-4" />
                              Show Answer
                            </>
                          )}
                        </Button>

                        {showAnswers[index] && (
                          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="font-semibold text-blue-900 mb-2">Explanation:</p>
                            <p className="text-blue-800">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {q.type === "short" && (
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                            Short Answer (3-5 marks)
                          </span>
                          <p className="text-lg text-gray-900 font-medium">{q.question}</p>
                        </div>
                      </div>

                      <div className="ml-11">
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 min-h-[100px]">
                          <p className="text-gray-400 text-sm">Space to write your answer...</p>
                        </div>

                        <Button
                          onClick={() => toggleAnswer(index)}
                          variant={showAnswers[index] ? "secondary" : "outline"}
                          size="sm"
                        >
                          {showAnswers[index] ? (
                            <>
                              <EyeOff className="mr-2 w-4 h-4" />
                              Hide Answer
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 w-4 h-4" />
                              Show Answer
                            </>
                          )}
                        </Button>

                        {showAnswers[index] && (
                          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="font-semibold text-green-900 mb-2">Model Answer:</p>
                            <p className="text-green-800 mb-3">{q.answer}</p>
                            <p className="font-semibold text-green-900 mb-2 text-sm">Key Points to Include:</p>
                            <ul className="space-y-1">
                              {q.points.map((point: string, i: number) => (
                                <li key={i} className="text-green-800 text-sm flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {q.type === "long" && (
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                            Long Answer (5-10 marks)
                          </span>
                          <p className="text-lg text-gray-900 font-medium">{q.question}</p>
                        </div>
                      </div>

                      <div className="ml-11">
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 min-h-[200px]">
                          <p className="text-gray-400 text-sm">Space to write your detailed answer...</p>
                        </div>

                        <Button
                          onClick={() => toggleAnswer(index)}
                          variant={showAnswers[index] ? "secondary" : "outline"}
                          size="sm"
                        >
                          {showAnswers[index] ? (
                            <>
                              <EyeOff className="mr-2 w-4 h-4" />
                              Hide Answer
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 w-4 h-4" />
                              Show Answer
                            </>
                          )}
                        </Button>

                        {showAnswers[index] && (
                          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <p className="font-semibold text-purple-900 mb-2">Model Answer:</p>
                            <p className="text-purple-800 mb-3">{q.answer}</p>
                            <p className="font-semibold text-purple-900 mb-2 text-sm">Answer Structure:</p>
                            <ol className="space-y-1 list-decimal list-inside">
                              {q.structure.map((item: string, i: number) => (
                                <li key={i} className="text-purple-800 text-sm">{item}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestions;
