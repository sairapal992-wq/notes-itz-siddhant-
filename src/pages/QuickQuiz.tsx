import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Trophy, ArrowLeft, CircleCheck as CheckCircle, Circle as XCircle, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const QuickQuiz = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    chapter: ""
  });

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography"];

  const startQuiz = async () => {
    if (!formData.subject || !formData.chapter) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const mockQuiz = {
        subject: formData.subject,
        chapter: formData.chapter,
        questions: [
          {
            question: `What is the fundamental concept in ${formData.chapter}?`,
            options: ["Basic principle A", "Advanced concept B", "Theoretical framework C", "Practical application D"],
            correct: 0
          },
          {
            question: `Which formula is most commonly used?`,
            options: ["Formula X", "Formula Y", "Formula Z", "Formula W"],
            correct: 1
          },
          {
            question: `What is the main application of this chapter?`,
            options: ["Application 1", "Application 2", "Application 3", "Application 4"],
            correct: 2
          },
          {
            question: `Which statement is correct?`,
            options: ["Statement A is always true", "Statement B depends on conditions", "Statement C is never true", "Statement D is sometimes true"],
            correct: 1
          },
          {
            question: `What is the key takeaway from this chapter?`,
            options: ["Understanding basics", "Memorizing formulas", "Applying concepts", "All of the above"],
            correct: 3
          }
        ]
      };

      setQuiz(mockQuiz);
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowResults(false);
      setLoading(false);
      toast({
        title: "Quiz Started!",
        description: `${mockQuiz.questions.length} questions ready`
      });
    }, 1500);
  };

  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [questionIndex]: answerIndex}));
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    if (Object.keys(selectedAnswers).length < quiz.questions.length) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting",
        variant: "destructive"
      });
      return;
    }
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q: any, index: number) => {
      if (selectedAnswers[index] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-cyan-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Quick Quiz
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!quiz ? (
            <Card className="p-8 animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Start Quick Quiz
                  </h2>
                  <p className="text-gray-600">
                    Test your knowledge with 5 rapid questions
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
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
                    <Input
                      placeholder="Chapter name"
                      value={formData.chapter}
                      onChange={(e) => setFormData({...formData, chapter: e.target.value})}
                    />
                  </div>

                  <Button
                    onClick={startQuiz}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Trophy className="mr-2 w-5 h-5 animate-pulse" />
                        Loading Quiz...
                      </>
                    ) : (
                      <>
                        <Trophy className="mr-2 w-5 h-5" />
                        Start Quiz
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ) : showResults ? (
            <div className="animate-fade-in space-y-6">
              <Card className="p-8 text-center bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
                <Award className="w-20 h-20 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
                <div className="text-5xl font-bold my-6">
                  {calculateScore()} / {quiz.questions.length}
                </div>
                <p className="text-cyan-100 text-lg">
                  {calculateScore() === quiz.questions.length ? "Perfect Score! Excellent work!" :
                   calculateScore() >= quiz.questions.length * 0.7 ? "Great job! Keep it up!" :
                   "Good effort! Review the topics and try again."}
                </p>
              </Card>

              {quiz.questions.map((q: any, index: number) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedAnswers[index] === q.correct ? "bg-green-500" : "bg-red-500"
                    }`}>
                      {selectedAnswers[index] === q.correct ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <XCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-900 mb-3">{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option: string, i: number) => (
                          <div
                            key={i}
                            className={`p-3 rounded-lg border-2 ${
                              i === q.correct ? "border-green-500 bg-green-50" :
                              i === selectedAnswers[index] && i !== q.correct ? "border-red-500 bg-red-50" :
                              "border-gray-200"
                            }`}
                          >
                            {option}
                            {i === q.correct && <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>}
                            {i === selectedAnswers[index] && i !== q.correct && <span className="ml-2 text-red-600 font-semibold">✗ Your answer</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <Button onClick={() => setQuiz(null)} className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500" size="lg">
                Take Another Quiz
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm text-gray-600">{quiz.subject} • {quiz.chapter}</h3>
                    <h2 className="text-xl font-bold text-gray-900">
                      Question {currentQuestion + 1} of {quiz.questions.length}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-600">
                      {Object.keys(selectedAnswers).length} / {quiz.questions.length}
                    </div>
                    <div className="text-sm text-gray-600">Answered</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-gradient-to-r from-cyan-600 to-cyan-500 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                  ></div>
                </div>
              </Card>

              <Card className="p-8">
                <p className="text-2xl font-medium text-gray-900 mb-6">
                  {quiz.questions[currentQuestion].question}
                </p>

                <div className="space-y-3">
                  {quiz.questions[currentQuestion].options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(currentQuestion, index)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-cyan-600 bg-cyan-50"
                          : "border-gray-200 hover:border-cyan-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-cyan-600 bg-cyan-600"
                            : "border-gray-300"
                        }`}>
                          {selectedAnswers[currentQuestion] === index && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <div className="flex gap-4">
                <Button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="flex-1"
                >
                  Previous
                </Button>
                {currentQuestion === quiz.questions.length - 1 ? (
                  <Button
                    onClick={submitQuiz}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-500"
                  >
                    Next Question
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickQuiz;
