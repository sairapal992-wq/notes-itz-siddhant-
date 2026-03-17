import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import Dashboard from "@/pages/Dashboard";
import NotesGenerator from "@/pages/NotesGenerator";
import PracticeQuestions from "@/pages/PracticeQuestions";
import AITutor from "@/pages/AITutor";
import QuickRevision from "@/pages/QuickRevision";
import FormulaSheet from "@/pages/FormulaSheet";
import QuickQuiz from "@/pages/QuickQuiz";
import StrategyAssistant from "@/pages/StrategyAssistant";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes-generator" element={<NotesGenerator />} />
          <Route path="/practice-questions" element={<PracticeQuestions />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/quick-revision" element={<QuickRevision />} />
          <Route path="/formula-sheet" element={<FormulaSheet />} />
          <Route path="/quick-quiz" element={<QuickQuiz />} />
          <Route path="/strategy-assistant" element={<StrategyAssistant />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
