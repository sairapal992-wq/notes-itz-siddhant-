import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft, Sparkles, BookOpen, Lightbulb, CircleAlert as AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const NotesGenerator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<any>(null);
  const [formData, setFormData] = useState({
    subject: "",
    chapter: "",
    topic: "",
    class: ""
  });

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science"];
  const classes = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

  const generateNotes = async () => {
    if (!formData.subject || !formData.chapter || !formData.topic || !formData.class) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const mockNotes = {
        title: formData.topic,
        subject: formData.subject,
        chapter: formData.chapter,
        class: formData.class,
        sections: [
          {
            type: "intro",
            title: "Introduction",
            content: `${formData.topic} is a fundamental concept in ${formData.subject} that helps students understand key principles. This topic is essential for ${formData.class} students preparing for their examinations.`
          },
          {
            type: "definition",
            title: "Key Definition",
            term: formData.topic,
            definition: `${formData.topic} refers to the fundamental concept that describes the relationship between various elements in ${formData.subject}.`
          },
          {
            type: "content",
            title: "Main Concepts",
            points: [
              `Understanding the basic principles of ${formData.topic}`,
              "Application of theoretical knowledge to practical problems",
              "Relationship with other concepts in the chapter",
              "Common misconceptions and how to avoid them"
            ]
          },
          {
            type: "formula",
            title: "Important Formula",
            formula: "Result = (Factor A × Factor B) / Constant",
            explanation: "This formula helps calculate the key values in problems related to this topic."
          },
          {
            type: "example",
            title: "Solved Example",
            problem: `Calculate the value when Factor A = 10 and Factor B = 5`,
            solution: [
              "Given: Factor A = 10, Factor B = 5",
              "Using the formula: Result = (10 × 5) / 1",
              "Result = 50 / 1 = 50",
              "Therefore, the answer is 50"
            ]
          },
          {
            type: "highlight",
            title: "Key Points to Remember",
            points: [
              `${formData.topic} is crucial for understanding advanced concepts`,
              "Always verify your calculations",
              "Practice multiple problems for better understanding",
              "Connect this topic with real-world applications"
            ]
          },
          {
            type: "summary",
            title: "Summary",
            content: `In this topic, we learned about ${formData.topic} and its applications in ${formData.subject}. Remember to practice regularly and revise the key formulas and concepts before exams.`
          }
        ]
      };

      setNotes(mockNotes);
      setLoading(false);
      toast({
        title: "Notes Generated Successfully!",
        description: "Your study notes are ready"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                AI Notes Generator
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!notes ? (
            <Card className="p-8 animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Generate Beautiful Notes
                  </h2>
                  <p className="text-gray-600">
                    Fill in the details below to create structured study notes
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
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Solving by Factorization"
                      value={formData.topic}
                      onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    />
                  </div>

                  <Button
                    onClick={generateNotes}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Brain className="mr-2 w-5 h-5 animate-pulse" />
                        Generating Notes...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 w-5 h-5" />
                        Generate Notes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="animate-fade-in">
              <Card className="p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-notes-title">{notes.title}</h1>
                        <p className="text-notes-subtitle">{notes.subject} • {notes.chapter} • {notes.class}</p>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => setNotes(null)} variant="outline">
                    Generate New Notes
                  </Button>
                </div>

                <div className="space-y-6">
                  {notes.sections.map((section: any, index: number) => (
                    <div key={index}>
                      {section.type === "intro" && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                          <h2 className="text-xl font-semibold text-notes-h3 mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            {section.title}
                          </h2>
                          <p className="text-notes-text leading-relaxed">{section.content}</p>
                        </div>
                      )}

                      {section.type === "definition" && (
                        <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Lightbulb className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
                              <p className="text-gray-700">
                                <span className="font-semibold text-green-700">{section.term}:</span> {section.definition}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {section.type === "content" && (
                        <div>
                          <h2 className="text-2xl font-semibold text-notes-h3 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-blue-600" />
                            </div>
                            {section.title}
                          </h2>
                          <ul className="space-y-3">
                            {section.points.map((point: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                                  {i + 1}
                                </div>
                                <span className="text-notes-text">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.type === "formula" && (
                        <div className="bg-notes-formula-bg border-2 border-notes-formula-border rounded-xl p-6">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <AlertCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-notes-h3 mb-3">{section.title}</h3>
                              <div className="bg-white rounded-lg p-4 mb-3 border border-blue-200">
                                <code className="text-xl font-mono text-blue-700 font-semibold">
                                  {section.formula}
                                </code>
                              </div>
                              <p className="text-gray-700 text-sm">{section.explanation}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {section.type === "example" && (
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-purple-900 mb-4">{section.title}</h3>
                          <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
                            <p className="font-medium text-gray-900 mb-2">Problem:</p>
                            <p className="text-gray-700">{section.problem}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="font-medium text-gray-900 mb-3">Solution:</p>
                            <ol className="space-y-2">
                              {section.solution.map((step: string, i: number) => (
                                <li key={i} className="text-gray-700">
                                  <span className="font-semibold text-purple-700">Step {i + 1}:</span> {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}

                      {section.type === "highlight" && (
                        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            {section.title}
                          </h3>
                          <ul className="space-y-2">
                            {section.points.map((point: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold">★</span>
                                <span className="text-gray-800">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.type === "summary" && (
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-6">
                          <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                          <p className="leading-relaxed">{section.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesGenerator;
