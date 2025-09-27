import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Play, Clock, Target, Zap, User, Crown, Sparkles, Hammer, BowArrow } from 'lucide-react';

export const Training = ({ darkMode }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar datos desde API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("https://cla-royaleazure-api.net/api/exercises");
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Error cargando ejercicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const muscleGroups = [
    { id: "all", name: "Todos", icon: <Badge className="w-4 h-4" /> },
    { id: "Pecho", name: "Pecho", icon: <Sparkles className="w-4 h-4" /> },
    { id: "Espalda", name: "Espalda", icon: <Crown className="w-4 h-4" /> },
    { id: "Piernas", name: "Piernas", icon: <Zap className="w-4 h-4" /> },
    { id: "Hombros", name: "Hombros", icon: <Hammer className="w-4 h-4" /> },
    { id: "Brazos", name: "Brazos", icon: <BowArrow className="w-4 h-4" /> }
  ];

  const filteredExercises =
    selectedMuscle === "all"
      ? exercises
      : exercises.filter((e) => e.muscle === selectedMuscle);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Principiante":
        return "bg-green-100 text-green-800";
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800";
      case "Avanzado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando ejercicios...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Rutinas de Entrenamiento</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Descubre nuestra biblioteca de ejercicios obtenida dinámicamente desde la API.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={selectedMuscle} onValueChange={setSelectedMuscle} className="w-full">
        <TabsList className={`grid w-full grid-cols-6 ${darkMode ? "bg-slate-900":"bg-gray-100"}`}>
          {muscleGroups.map((group) => (
            <TabsTrigger key={group.id} value={group.id} className={`text-sm ${darkMode ? "text-white hover:bg-slate-800":"hover:bg-gray-200"}`}>
              <span className="mr-1">{group.icon}</span>
              {group.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className={"hover:shadow-lg transition-shadow dark:bg-slate-900"}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold">{exercise.name}</CardTitle>
                  <CardDescription className="mt-2">{exercise.description}</CardDescription>
                </div>
                <Badge className={getDifficultyColor(exercise.difficulty)}>
                  {exercise.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{exercise.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{exercise.reps}</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Ver Técnica
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl dark:bg-gray-950">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <span>{exercise.name}</span>
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>{exercise.description}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Video instructivo disponible</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => window.open(exercise.videoUrl, "_blank")}
                        >
                          Ver en YouTube
                        </Button>
                      </div>
                    </div>

                    <h4 className="font-semibold mb-3 flex items-center">
                      <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                      Consejos de Técnica
                    </h4>
                    <ul className="space-y-2">
                      {exercise.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
