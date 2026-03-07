import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, FileText, MoreVertical, Copy, Trash2, Download, Edit } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

const Dashboard = () => {
  const { resumes, createResume, deleteResume, duplicateResume, setCurrentResume } = useResume();
  const navigate = useNavigate();

  const handleCreate = () => {
    const r = createResume();
    navigate(`/builder/${r.id}`);
  };

  const handleEdit = (id: string) => {
    const resume = resumes.find((r) => r.id === id);
    if (resume) {
      setCurrentResume(resume);
      navigate(`/builder/${id}`);
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateResume(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Resumes</h1>
              <p className="text-muted-foreground mt-1">Create and manage your resumes</p>
            </div>
            <Button onClick={handleCreate} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              New Resume
            </Button>
          </div>

          {resumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No resumes yet</h2>
              <p className="text-muted-foreground mb-6">Create your first resume to get started.</p>
              <Button onClick={handleCreate} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Create Resume
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Create new card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleCreate}
                className="rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-card cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-[3/4] hover:shadow-glow"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Plus className="w-7 h-7 text-primary" />
                </div>
                <p className="font-medium text-foreground">New Resume</p>
              </motion.div>

              {resumes.map((resume, i) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.05 }}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant hover:border-primary/30 transition-all duration-300"
                >
                  {/* Preview area */}
                  <div
                    className="aspect-[3/4] p-4 cursor-pointer relative"
                    onClick={() => handleEdit(resume.id)}
                  >
                    <div className="w-full h-full bg-background rounded-lg border border-border p-3 space-y-2 overflow-hidden">
                      <div className="h-6 bg-gradient-primary rounded opacity-80" />
                      <div className="h-2 bg-muted rounded w-3/4" />
                      <div className="h-2 bg-muted rounded w-1/2" />
                      <div className="border-t border-border pt-2 mt-2 space-y-1.5">
                        <div className="h-1.5 bg-muted rounded" />
                        <div className="h-1.5 bg-muted rounded w-5/6" />
                        <div className="h-1.5 bg-muted rounded w-4/6" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary">
                          <Edit className="w-3 h-3 mr-1" /> Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 border-t border-border flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{resume.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(resume.updatedAt), "MMM d, yyyy")}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(resume.id)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(resume.id)}>
                          <Copy className="w-4 h-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteResume(resume.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
