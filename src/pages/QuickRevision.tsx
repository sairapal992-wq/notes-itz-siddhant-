import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Clock, ArrowLeft, Sparkles, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const QuickRevision = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [revision, setRevision] = useState<any>(null);
  const [formData, setFormData] = useState({
    subject: "",
    chapter: ""
  });

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography"];

  const generateRevision = async () => {
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
      const mockRevision = {
        subject: formData.subject,
        chapter: formData.chapter,
        keyPoints: [
          `${formData.chapter} is a fundamental topic in ${formData.subject}`,
          "Understanding the basic principles is crucial for problem-solving",
          "This chapter connects to multiple other topics in the curriculum",
          "Practice with various problem types ensures mastery"
        ],
        formulas: [
          { name: "Primary Formula", formula: "Result = (A × B) / C", usage: "Used for basic calculations" },
          { name: "Secondary Formula", formula: "Value = A² + B²", usage: "Applied in advanced problems" }
        ],
        definitions: [
          { term: "Key Term 1", definition: "The fundamental concept that describes the primary relationship" },
          { term: "Key Term 2", definition: "An important element that affects the overall outcome" }
        ],
        examTips: [
          "Always read the question carefully and identify what is being asked",
          "Show all steps in your calculations for partial marks",
          "Remember to write units in your final answer",
          "Double-check your work before moving to the next question",
          "Time management is key - don't spend too long on one question"
        ]
      };

      setRevision(mockRevision);
      setLoading(false);
      toast({
        title: "Revision Sheet Ready!",
        description: "Your quick revision notes are generated"
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Quick Revision Tool
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!revision ? (
            <Card className="p-8 animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Quick Revision Sheet
                  </h2>
                  <p className="text-gray-600">
                    Get one-page revision notes with all important points
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

                  <Button
                    onClick={generateRevision}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Clock className="mr-2 w-5 h-5 animate-pulse" />
                        Generating Revision Sheet...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 w-5 h-5" />
                        Generate Revision Sheet
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="animate-fade-in space-y-6">
              <Card className="p-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Quick Revision Sheet</span>
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{revision.chapter}</h1>
                  <p className="text-orange-100 text-lg">{revision.subject}</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Key Points to Remember</h2>
                </div>
                <ul className="space-y-3">
                  {revision.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Important Formulas</h2>
                </div>
                <div className="space-y-4">
                  {revision.formulas.map((item: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-blue-300">
                      <p className="font-semibold text-blue-900 mb-2">{item.name}</p>
                      <div className="bg-blue-100 rounded p-3 mb-2">
                        <code className="text-lg font-mono text-blue-700 font-semibold">{item.formula}</code>
                      </div>
                      <p className="text-sm text-gray-600">{item.usage}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-green-50 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Key Definitions</h2>
                </div>
                <div className="space-y-3">
                  {revision.definitions.map((item: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-green-300">
                      <p className="font-semibold text-green-900 mb-1">{item.term}</p>
                      <p className="text-gray-700">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">Exam Tips</h2>
                </div>
                <ul className="space-y-2">
                  {revision.examTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-200 font-bold">•</span>
                      <span className="text-purple-50">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <div className="flex gap-4">
                <Button onClick={() => setRevision(null)} variant="outline" className="flex-1">
                  Generate New Sheet
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500">
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickRevision;
