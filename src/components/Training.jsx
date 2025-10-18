import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Play, Clock, Target, User, Crown, Sparkles, Hammer, Zap, BowArrow } from 'lucide-react';

export const Training = ({ darkMode, texts }) => {
  const [selectedMuscle, setSelectedMuscle] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState({
    chest: [],
    back: [],
    legs: [],
    shoulders: [],
    arms: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const categories = [
            { key: "chest", endpoint: "exercises/chest" },
            { key: "back", endpoint: "exercises/back" },
            { key: "legs", endpoint: "exercises/legs" },
            { key: "shoulders", endpoint: "exercises/shoulders" },
            { key: "arms", endpoint: "exercises/arms" }
        ];

        const results = await Promise.all(
        categories.map(cat =>
            fetch(`https://cla-royale.azure-api.net/${cat.endpoint}`)
            .then(res => res.json())
        )
        );


        setExercises({
          chest: results[0],
          back: results[1],
          legs: results[2],
          shoulders: results[3],
          arms: results[4]
        });
      } catch (error) {
        console.error("Error cargando ejercicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const muscleGroups = [
    { id: 'all', name: 'Todos', exercises: [...exercises.chest, ...exercises.back, ...exercises.legs, ...exercises.shoulders, ...exercises.arms], icon: <Badge className="w-4 h-4" /> },
    { id: 'chest', name: 'Pecho', exercises: exercises.chest, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'back', name: 'Espalda', exercises: exercises.back, icon: <Crown className="w-4 h-4" /> },
    { id: 'legs', name: 'Piernas', exercises: exercises.legs, icon: <Zap className="w-4 h-4" /> },
    { id: 'shoulders', name: 'Hombros', exercises: exercises.shoulders, icon: <Hammer className="w-4 h-4" /> },
    { id: 'arms', name: 'Brazos', exercises: exercises.arms, icon: <BowArrow className="w-4 h-4" /> },
  ];

  const allExercises = muscleGroups.find(m => m.id === 'all').exercises;
  const filteredExercises = selectedMuscle === 'all'
    ? allExercises
    : muscleGroups.find(m => m.id === selectedMuscle).exercises;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Principiante':
        return 'bg-green-100 text-green-800';
      case 'Intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-6 text-center">{texts.cargando}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{texts.rtnTitle}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {texts.rtnText}
        </p>
      </div>

      {/* Muscle Group Tabs */}
      <Tabs value={selectedMuscle} onValueChange={setSelectedMuscle} className="w-full">
        <TabsList className={`grid w-full grid-cols-6 ${darkMode ? "bg-slate-900":"bg-gray-100"}`}>
          {muscleGroups.map(group => (
            <TabsTrigger key={group.id} value={group.id} className={`text-sm ${darkMode ? "text-white hover:bg-slate-800":"hover:bg-gray-200"}`}>
              <span className="mr-1">{group.icon}</span> 
              {group.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className={`text-center ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
              <CardContent className="pt-6">
                <div className={`text-2xl font-bold ${darkMode ? "text-red-800" : "text-yellow-600"}`}>
                  {filteredExercises.length}
                </div>
                <p className="text-sm text-muted-foreground">{texts.ejs}</p>
              </CardContent>
            </Card>
            <Card className={`text-center ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
              <CardContent className="pt-6">
                <div className={`text-2xl font-bold ${darkMode ? "text-red-800" : "text-yellow-600"}`}>
                  {filteredExercises.filter(e => e.difficulty === 'Principiante').length}
                </div>
                <p className="text-sm text-muted-foreground">{texts.prncpt}</p>
              </CardContent>
            </Card>
            <Card className={`text-center ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
              <CardContent className="pt-6">
                <div className={`text-2xl font-bold ${darkMode ? "text-red-800" : "text-yellow-600"}`}>
                  {filteredExercises.filter(e => e.difficulty === 'Intermedio').length}
                </div>
                <p className="text-sm text-muted-foreground">{texts.intmd}</p>
              </CardContent>
            </Card>
            <Card className={`text-center ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
              <CardContent className="pt-6">
                <div className={`text-2xl font-bold ${darkMode ? "text-red-800" : "text-yellow-600"}`}>
                  {filteredExercises.filter(e => e.difficulty === 'Avanzado').length}
                </div>
                <p className="text-sm text-muted-foreground">{texts.advnc}</p>
              </CardContent>
            </Card>
          </div>

          {/* Exercises */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className={"hover:shadow-lg dark:hover:shadow-slate-800 transition-shadow dark:bg-slate-900"}>
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
                  <div className="flex items-center justify-between text-sm text-muted-foreground dark:text-gray-100">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{exercise.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{exercise.reps}</span>
                    </div>
                  </div>

                  {/* Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-yellow-500 dark:bg-red-800 dark:text-white dark:hover:bg-red-800/50 hover:bg-yellow-600 text-black"
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
                      <div className="space-y-6 ">
                        {/* Video */}
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Play className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">{texts.vdInstr}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => window.open(exercise.videoUrl, '_blank')}
                            >
                              {texts.vrYt}
                            </Button>
                          </div>
                        </div>
                        {/* Tips */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Zap className="w-4 h-4 text-yellow-500 dark:text-red-800 mr-2" />
                            {texts.cnsjTec}
                          </h4>
                          <ul className="space-y-2 ">
                            {exercise.tips?.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-yellow-500 dark:bg-red-800 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Tabs>

      {/* Training Tips Section (sin cambios) */}
      <section className="bg-gray-100 dark:bg-gray-950 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{cnsjEntr}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-yellow-500 dark:text-red-800" />
            </div>
            <h3 className="font-semibold mb-2">{texts.r1Title}</h3>
            <p className="text-sm text-muted-foreground">
              {texts.r1Text}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-yellow-500 dark:text-red-800" />
            </div>
            <h3 className="font-semibold mb-2">{texts.r2Title}</h3>
            <p className="text-sm text-muted-foreground">
              {texts.r2Text}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-yellow-500 dark:text-red-800" />
            </div>
            <h3 className="font-semibold mb-2">{texts.r3Title}</h3>
            <p className="text-sm text-muted-foreground">
              {texts.r3Text}
            </p>
          </div>
        </div>
      </section>

      {/* Footer (sin cambios) */}
      <footer
        className={`py-10 text-center ${
          darkMode ? "bg-[#0a1229] text-gray-400" : "bg-black text-gray-400"
        }`}
      >
        <p>&copy; {new Date().getFullYear()} {texts.footer}</p>
      </footer>
    </div>
  );
};
