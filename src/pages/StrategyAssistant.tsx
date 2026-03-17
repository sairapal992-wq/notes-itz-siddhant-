import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowLeft, Sparkles, BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const StrategyAssistant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [formData, setFormData] = useState({
    class: "",
    subjects: "",
    weakSubjects: "",
    examDate: "",
    dailyHours: ""
  });

  const classes = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

  const generatePlan = async () => {
    if (!formData.class || !formData.subjects || !formData.examDate || !formData.dailyHours) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const subjects = formData.subjects.split(",").map(s => s.trim());
      const weakSubjects = formData.weakSubjects ? formData.weakSubjects.split(",").map(s => s.trim()) : [];

      const mockPlan = {
        class: formData.class,
        subjects: subjects,
        weakSubjects: weakSubjects,
        examDate: formData.examDate,
        dailyHours: parseInt(formData.dailyHours),
        schedule: [
          {
            week: "Week 1-2",
            focus: "Foundation Building",
            tasks: [
              "Complete all chapter readings",
              "Create summary notes for each chapter",
              "Identify difficult topics",
              "Practice basic problems"
            ]
          },
          {
            week: "Week 3-4",
            focus: "Concept Strengthening",
            tasks: [
              "Deep dive into weak subjects",
              "Solve previous year questions",
              "Create formula sheets",
              "Practice medium difficulty problems"
            ]
          },
          {
            week: "Week 5-6",
            focus: "Advanced Practice",
            tasks: [
              "Solve sample papers",
              "Time yourself on practice tests",
              "Review and revise weak areas",
              "Practice hard difficulty problems"
            ]
          },
          {
            week: "Final Week",
            focus: "Revision & Mock Tests",
            tasks: [
              "Daily revision of all subjects",
              "Take full-length mock tests",
              "Review formula sheets",
              "Light revision, no new topics"
            ]
          }
        ],
        dailyRoutine: {
          morning: "2 hours - Focus on weak subjects",
          afternoon: "1 hour - Practice problems",
          evening: `${formData.dailyHours - 3} hour(s) - Revision and doubt clearing`
        },
        tips: [
          "Start with your weakest subject when your mind is fresh",
          "Take 10-minute breaks every hour",
          "Practice time management with mock tests",
          "Review mistakes thoroughly",
          "Get adequate sleep (7-8 hours)",
          "Stay consistent with your schedule"
        ]
      };

      setPlan(mockPlan);
      setLoading(false);
      toast({
        title: "Study Plan Generated!",
        description: "Your personalized strategy is ready"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Study Strategy Assistant
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {!plan ? (
            <Card className="p-8 animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Create Your Study Plan
                  </h2>
                  <p className="text-gray-600">
                    Get a personalized study strategy based on your exam schedule
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="class">Class</Label>
                    <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subjects">Subjects (comma separated)</Label>
                    <Input
                      id="subjects"
                      placeholder="e.g., Mathematics, Physics, Chemistry"
                      value={formData.subjects}
                      onChange={(e) => setFormData({...formData, subjects: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="weakSubjects">Weak Subjects (optional, comma separated)</Label>
                    <Input
                      id="weakSubjects"
                      placeholder="e.g., Physics, Chemistry"
                      value={formData.weakSubjects}
                      onChange={(e) => setFormData({...formData, weakSubjects: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="examDate">Exam Start Date</Label>
                    <Input
                      id="examDate"
                      type="date"
                      value={formData.examDate}
                      onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dailyHours">Daily Available Study Hours</Label>
                    <Select value={formData.dailyHours} onValueChange={(value) => setFormData({...formData, dailyHours: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        {[3, 4, 5, 6, 7, 8].map((hours) => (
                          <SelectItem key={hours} value={hours.toString()}>{hours} hours</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={generatePlan}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Calendar className="mr-2 w-5 h-5 animate-pulse" />
                        Creating Your Plan...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 w-5 h-5" />
                        Generate Study Plan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="animate-fade-in space-y-6">
              <Card className="p-8 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
                <div className="text-center">
                  <Target className="w-16 h-16 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold mb-2">Your Personalized Study Plan</h1>
                  <p className="text-indigo-100 text-lg">
                    {plan.class} • {plan.subjects.length} Subjects • {plan.dailyHours} Hours/Day
                  </p>
                  <p className="text-indigo-200 mt-2">Exam Date: {new Date(plan.examDate).toLocaleDateString()}</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Daily Routine</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border-2 border-orange-200">
                    <h3 className="font-semibold text-orange-900 mb-2">Morning</h3>
                    <p className="text-orange-800 text-sm">{plan.dailyRoutine.morning}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Afternoon</h3>
                    <p className="text-blue-800 text-sm">{plan.dailyRoutine.afternoon}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">Evening</h3>
                    <p className="text-purple-800 text-sm">{plan.dailyRoutine.evening}</p>
                  </div>
                </div>
              </Card>

              {plan.weakSubjects.length > 0 && (
                <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Focus Areas</h2>
                  </div>
                  <p className="text-gray-700">
                    Extra attention needed: <span className="font-semibold text-yellow-800">{plan.weakSubjects.join(", ")}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Allocate more time to these subjects during your study sessions
                  </p>
                </Card>
              )}

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  Week-by-Week Strategy
                </h2>
                {plan.schedule.map((week: any, index: number) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-900">{week.week}</h3>
                          <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
                            {week.focus}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {week.tasks.map((task: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                              </div>
                              <span className="text-gray-700">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Pro Tips for Success</h2>
                </div>
                <ul className="space-y-2">
                  {plan.tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-800">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <div className="flex gap-4">
                <Button onClick={() => setPlan(null)} variant="outline" className="flex-1">
                  Create New Plan
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500">
                  Download Plan
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyAssistant;
