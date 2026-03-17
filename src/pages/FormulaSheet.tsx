import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calculator, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const FormulaSheet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formulas, setFormulas] = useState<any>(null);
  const [subject, setSubject] = useState("");

  const subjects = ["Mathematics", "Physics", "Chemistry"];

  const generateFormulas = async () => {
    if (!subject) {
      toast({
        title: "Select a Subject",
        description: "Please choose a subject to generate formulas",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const mockFormulas = {
        subject: subject,
        categories: [
          {
            name: "Algebra",
            formulas: [
              { name: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac)) / 2a", description: "Solves quadratic equations of the form ax² + bx + c = 0" },
              { name: "Sum of n terms", formula: "Sₙ = n/2 [2a + (n-1)d]", description: "Sum of arithmetic progression" }
            ]
          },
          {
            name: "Geometry",
            formulas: [
              { name: "Area of Circle", formula: "A = πr²", description: "Where r is the radius of the circle" },
              { name: "Pythagorean Theorem", formula: "a² + b² = c²", description: "In a right triangle, where c is the hypotenuse" }
            ]
          },
          {
            name: "Trigonometry",
            formulas: [
              { name: "Sine Rule", formula: "a/sin(A) = b/sin(B) = c/sin(C)", description: "Relates sides and angles in any triangle" },
              { name: "Cosine Rule", formula: "c² = a² + b² - 2ab·cos(C)", description: "Another relationship between sides and angles" }
            ]
          },
          {
            name: "Calculus",
            formulas: [
              { name: "Derivative of xⁿ", formula: "d/dx(xⁿ) = nxⁿ⁻¹", description: "Power rule for differentiation" },
              { name: "Integration of xⁿ", formula: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C", description: "Power rule for integration, where n ≠ -1" }
            ]
          }
        ]
      };

      setFormulas(mockFormulas);
      setLoading(false);
      toast({
        title: "Formulas Generated!",
        description: `${mockFormulas.categories.length} categories of formulas ready`
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Formula Sheet Generator
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {!formulas ? (
            <Card className="p-8 animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-pink-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Generate Formula Sheet
                  </h2>
                  <p className="text-gray-600">
                    Get organized formula collections for your subject
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger className="w-full text-lg py-6">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subj) => (
                          <SelectItem key={subj} value={subj} className="text-lg py-3">
                            {subj}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={generateFormulas}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Calculator className="mr-2 w-5 h-5 animate-pulse" />
                        Generating Formulas...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 w-5 h-5" />
                        Generate Formula Sheet
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="animate-fade-in space-y-6">
              <Card className="p-6 bg-gradient-to-r from-pink-600 to-pink-500 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{formulas.subject} Formula Sheet</h1>
                    <p className="text-pink-100">Complete formula reference for your studies</p>
                  </div>
                  <Button onClick={() => setFormulas(null)} variant="secondary">
                    Change Subject
                  </Button>
                </div>
              </Card>

              {formulas.categories.map((category: any, catIndex: number) => (
                <Card key={catIndex} className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-pink-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {category.formulas.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl p-6 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-pink-900 mb-3">{item.name}</h3>
                            <div className="bg-white rounded-lg p-4 mb-3 border-2 border-pink-300">
                              <code className="text-xl font-mono text-pink-700 font-bold break-all">
                                {item.formula}
                              </code>
                            </div>
                            <p className="text-gray-700 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}

              <div className="flex gap-4">
                <Button onClick={() => setFormulas(null)} variant="outline" className="flex-1">
                  Generate New Sheet
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-pink-600 to-pink-500">
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

export default FormulaSheet;
