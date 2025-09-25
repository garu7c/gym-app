import React from "react";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Play, Clock, Target, Zap, User } from 'lucide-react';

// Pecho
const chestExercises = [
    {
        id: 1,
        name: "Press de Banca",
        muscle: "Pecho",
        difficulty: "Intermedio",
        duration: "3-4 series",
        reps: "8-12 repeticiones",
        description: "Ejercicio compuesto que trabaja principalmente el pectoral mayor, deltoides anterior y tríceps.",
        videoUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
        tips: [
            "Mantener los omoplatos retraídos durante todo el movimiento.",
            "Controla el descenso de la barra para evitar lesiones.",
            "No bloquees los codos al final del movimiento.",
            "No rebotes la barra en el pecho."
        ]
    },
    {
        id: 2,
        name: "Flexiones de Pecho",
        muscle: "Pecho",
        difficulty: "Principiante",
        duration: "3 series",
        reps: "10-20 repeticiones",
        description: "Ejercicio de peso corporal que trabaja el pectoral mayor, deltoides anterior y tríceps.",
        videoUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
        tips: [
            "Mantén el cuerpo en línea recta desde la cabeza hasta los talones.",
            "Coloca las manos ligeramente más anchas que los hombros.",
            "Baja el cuerpo hasta que el pecho casi toque el suelo.",
            "Inhala al bajar y exhala al subir."
        ]
    },
    {
        id: 3,
        name: "Aperturas con Mancuernas",
        muscle: "Pecho",
        difficulty: "Intermedio",
        duration: "3 series",
        reps: "12-15 repeticiones",
        description: "Ejercicio que aísla el pectoral mayor, trabajando también el deltoides anterior.",
        videoUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
        tips: [
            "Mantén una ligera flexión en los codos durante todo el movimiento.",
            "No dejes que las mancuernas bajen demasiado para evitar tensión en los hombros.",
            "Concéntrate en apretar el pecho al juntar las mancuernas.",
            "Realiza el movimiento de forma controlada."
        ]
    }
];
// Espalda
const backExercises = [
    {
        id: 1,
        name: "Dominadas",
        muscle: "Espalda",
        difficulty: "Intermedio",
        duration: "3-4 series",
        reps: "6-10 repeticiones",
        description: "Ejercicio compuesto que trabaja principalmente el dorsal ancho, trapecio y bíceps.",
        videoUrl: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
        tips: [
            "Activa el core durante todo el movimiento.",
            "Evita el balanceo del cuerpo para maximizar el trabajo de la espalda.",
            "Tira hasta arriba hasta que la barbilla supere la barra.",
            "Controla el descenso."
        ]
    },
    {
        id: 2,
        name: "Remo con Barra",
        muscle: "Espalda",
        difficulty: "Intermedio",
        duration: "3-4 series",
        reps: "8-12 repeticiones",
        description: "Ejercicio compuesto que trabaja el dorsal ancho, trapecio, romboides y bíceps.",
        videoUrl: "https://www.youtube.com/watch?v=FWJR5Ve8bnQ",
        tips: [
            "Mantén la espalda recta y el core activado durante todo el movimiento.",
            "Tira de la barra hacia el abdomen bajo",
            "Aprieta los omóplatos al final del movimiento.",
            "Evita usar el impulso para levantar la barra."
        ]
    },
    {
        id: 3,
        name: "Jalones al Pecho",
        muscle: "Espalda",
        difficulty: "Principiante",
        duration: "3 series",
        reps: "10-15 repeticiones",
        description: "Ejercicio que trabaja principalmente el dorsal ancho, trapecio y romboides.",
        videoUrl: "https://www.youtube.com/watch?v=CAwf7n6Luuc",
        tips: [
            "Siéntate con la espalda recta y los pies firmes en el suelo.",
            "Tira de la barra hacia el pecho",
            "Aprieta los omóplatos al final del movimiento.",
            "Controla el movimiento tanto al tirar como al soltar la barra."
        ]
    }
];
// Piernas
const legExercises = [
    {
        id: 1,
        name: "Sentadillas",
        muscle: "Piernas",
        difficulty: "Principiante",
        duration: "3-4 series",
        reps: "12-15 repeticiones",
        description: "Ejercicio compuesto que trabaja principalmente los cuádriceps, glúteos y femorales.",
        videoUrl: "https://www.youtube.com/watch?v=Dy28eq2PjcM",
        tips: [
            "Mantén el pecho erguido y la espalda recta durante todo el movimiento.",
            "Manten las rodillas alineadas con los pies.",
            "Baja hasta que los muslos estén paralelos al suelo o más bajos.",
            "Empuja a través de los talones al subir."
        ]
    },
    {
        id: 2,
        name: "Peso Muerto",
        muscle: "Piernas",
        difficulty: "Avanzado",
        duration: "3-4 series",
        reps: "6-10 repeticiones",
        description: "Ejercicio compuesto que trabaja principalmente los glúteos, femorales, espalda baja y core.",
        videoUrl: "https://www.youtube.com/watch?v=ytGi5aYfGGE",
        tips: [
            "Mantén la barra cerca del cuerpo",
            "Mantén la espalda recta y el core activado durante todo el movimiento.",
            "Empuja las caderas hacia atrás al bajar la barra.",
            "No bloquees las rodillas al final del movimiento."
        ]
    },
    {
        id: 3,
        name: "Prensa de Piernas",
        muscle: "Piernas",
        difficulty: "Principiante",
        duration: "3 series",
        reps: "10-15 repeticiones",
        description: "Ejercicio que trabaja principalmente los cuádriceps, glúteos y femorales.",
        videoUrl: "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
        tips: [
            "Coloca los pies a la anchura de los hombros en la plataforma.",
            "No bloquees las rodillas al extender las piernas.",
            "Controla el movimiento tanto al empujar como al regresar la plataforma.",
            "No dejes que la espalda se despegue del respaldo."
        ]
    }
];
// Hombros
const shoulderExercises = [
    {
        id: 1,
        name: "Press Militar",
        muscle: "Hombros",
        difficulty: "Intermedio",
        duration: "3-4 series",
        reps: "8-12 repeticiones",
        description: "Ejercicio compuesto que trabaja principalmente el deltoides, trapecio y tríceps.",
        videoUrl: "https://www.youtube.com/watch?v=QAQ64hK4Xxs",
        tips: [
            "Mantén la espalda recta y el core activado durante todo el movimiento.",
            "No arquees excesivamente la espalda al levantar la barra.",
            "Empuja la barra hacia arriba en línea recta.",
            "Controla el descenso de la barra."
        ]
    },
    {
        id: 2,
        name: "Elevaciones Laterales",
        muscle: "Hombros",
        difficulty: "Principiante",
        duration: "3 series",
        reps: "12-15 repeticiones",
        description: "Ejercicio que aísla el deltoides medio, trabajando también el trapecio.",
        videoUrl: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
        tips: [
            "Mantén una ligera flexión en los codos durante todo el movimiento.",
            "Eleva hasta la altura de los hombros.",
            "controla el movimiento tanto al subir como al bajar las mancuernas.",
            "No uses impulso para levantar las mancuernas."
        ]
    },
    {
        id: 3,
        name: "Pájaros con Mancuernas",
        muscle: "Hombros",
        difficulty: "Intermedio",
        duration: "3 series",
        reps: "12-15 repeticiones",
        description: "Ejercicio que aísla el deltoides posterior, trabajando también el trapecio y romboides.",
        videoUrl: "https://www.youtube.com/watch?v=6kALZikXxLc",
        tips: [
            "Mantén una ligera flexión en los codos durante todo el movimiento.",
            "Aprieta los omóplatos al final del movimiento.",
            "Controla el movimiento tanto al subir como al bajar las mancuernas.",
            "No uses impulso para levantar las mancuernas."
        ]
    }
];
// Brazos
const armExercises = [
    {
        id: 1,
        name: "Curl de Bíceps",
        muscle: "Brazos",
        difficulty: "Principiante",
        duration: "3 series",
        reps: "10-12 repeticiones",
        description: "Ejercicio que aísla el bíceps braquial, trabajando también el braquial y braquiorradial.",
        videoUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
        tips: [
            "Mantén los codos cerca del cuerpo durante todo el movimiento.",
            "No balancees el cuerpo para levantar las pesas.",
            "Controla el movimiento tanto al subir como al bajar las mancuernas.",
            "Concentrate en la contracción del bíceps."
        ]
    },
    {
        id: 2,
        name: "Fondos en Paralelas",
        muscle: "Brazos",
        difficulty: "Intermedio",
        duration: "3-4 series",
        reps: "8-12 repeticiones",
        description: "Ejercicio compuesto que trabaja principalmente el tríceps, pectorales y deltoides anterior.",
        videoUrl: "https://www.youtube.com/watch?v=2z8JmcrW-As",
        tips: [
            "Inclina ligeramente el torso hacia adelante para activar más el tríceps.",
            "Baja hasta sentir estiramiento en el pecho.",
            "Empuja hacia arriba con fuerza, extendiendo completamente los brazos.",
        ]
    },
    {
        id: 3,
        name: "Extensiones de Tríceps con Mancuerna",
        muscle: "Brazos",
        difficulty: "Intermedio",
        duration: "3 series",
        reps: "12-15 repeticiones",
        description: "Ejercicio que aísla el tríceps braquial.",
        videoUrl: "https://www.youtube.com/watch?v=nRiJVZDpdL0",
        tips: [
            "Mantén los codos cerca de la cabeza durante todo el movimiento.",
            "Controla el movimiento tanto al subir como al bajar la mancuerna.",
            "Evita arquear la espalda durante el ejercicio.",
            "Concentrate en la contracción del tríceps."
        ]
    }
];

const muscleGroups = [
    { id: 'all', name: 'Todos', exercises: [...chestExercises, ...backExercises, ...legExercises, ...shoulderExercises, ...armExercises], icon: <Badge className="w-4 h-4" /> },
    { id: 'chest', name: 'Pecho', exercises: chestExercises, icon: <Target className="w-4 h-4" /> },
    { id: 'back', name: 'Espalda', exercises: backExercises, icon: <User className="w-4 h-4" /> },
    { id: 'legs', name: 'Piernas', exercises: legExercises, icon: <Zap className="w-4 h-4" /> },
    { id: 'shoulders', name: 'Hombros', exercises: shoulderExercises, icon: <Clock className="w-4 h-4" /> },
    { id: 'arms', name: 'Brazos', exercises: armExercises, icon: <Play className="w-4 h-4" /> },
];

export const Training = ({ darkMode }) => {
    const [selectedMuscle, setSelectedMuscle] = useState('all');
    const [selectedExercise, setSelectedExercise] = useState(null);

    const allExercises = [...chestExercises, ...backExercises, ...legExercises, ...shoulderExercises, ...armExercises];

    const filteredExercises = selectedMuscle === 'all'
        ? allExercises
        : allExercises.filter(e => e.muscle === muscleGroups.find(m => m.id === selectedMuscle).name);

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

    return (
        <div className="space-y-8">
            {/* header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold">Rutinas de Entrenamiento</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Descubre nuestra biblioteca completa de ejercicios organizados por grupo muscular. 
                    Cada ejercicio incluye video instructivo y consejos profesionales.
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
                    {/* Exercise Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <Card className={`text-center ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
                            <CardContent className="pt-6">
                                <div className={`text-2xl font-bold ${darkMode ? "text-red-800" : "text-yellow-600"}`}>
                                    {filteredExercises.length}
                                </div>
                                <p className="text-sm text-muted-foreground">Ejercicios</p>
                            </CardContent>
                        </Card>

                        <Card className={`text-center ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
                            <CardContent className="pt-6">
                                <div className={`text-2xl font-bold ${darkMode ? "text-red-800" : "text-yellow-600"}`}>
                                    {filteredExercises.filter(e => e.difficulty === 'Principiante').length}
                                </div>
                                <p className="text-sm text-muted-foreground">Principiante</p>
                            </CardContent>
                        </Card>

                        <Card className={`text-center ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
                            <CardContent className="pt-6">
                                <div className={`text-2xl font-bold ${darkMode ? "text-red-800" : "text-yellow-600"}`}>
                                    {filteredExercises.filter(e => e.difficulty === 'Intermedio').length}
                                </div>
                                <p className="text-sm text-muted-foreground">Intermedio</p>
                            </CardContent>
                        </Card>

                        <Card className={`text-center ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
                            <CardContent className="pt-6">
                                <div className={`text-2xl font-bold ${darkMode ? "text-red-800" : "text-yellow-600"}`}>
                                    {filteredExercises.filter(e => e.difficulty === 'Avanzado').length}
                                </div>
                                <p className="text-sm text-muted-foreground text-white">Avanzado</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Exercises Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredExercises.map((exercise) => (
                            <Card key={exercise.id} className={"hover:shadow-lg transition-shadow"}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg font-bold">{exercise.name}</CardTitle>
                                            <CardDescription className="mt-2">
                                                {exercise.description}
                                            </CardDescription>
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

                                        <DialogContent className="sm:max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center space-x-2">
                                                    <span>{exercise.name}</span>
                                                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                                                        {exercise.difficulty}
                                                    </Badge>
                                                </DialogTitle>
                                                <DialogDescription>
                                                    {exercise.description}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-6">
                                                {/* Video Placeholder */}
                                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                                    <div className="text-center">
                                                        <Play className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                                                        <p className="text-muted-foreground">
                                                            Video instructivo disponible
                                                        </p>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-2"
                                                            onClick={() => window.open(exercise.videoUrl, '_blank')}
                                                        >
                                                            Ver en YouTube
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Exercise Details */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Clock className="w-4 h-4 text-yellow-500" />
                                                        <div>
                                                            <p className="font-semibold">Series</p>
                                                            <p className="text-sm text-muted-foreground">{exercise.duration}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <Target className="w-4 h-4 text-yellow-500" />
                                                        <div>
                                                            <p className="font-semibold">Repeticiones</p>
                                                            <p className="text-sm text-muted-foreground">{exercise.reps}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Tips */}
                                                <div>
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
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Tabs>
            
            {/* Training Tips Section */}

            <section className="bg-muted/30 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Consejos de Entrenamiento</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Forma Correcta</h3>
                        <p className="text-sm text-muted-foreground">
                            La técnica correcta es más importante que el peso. Siempre prioriza las forma sobre la cantidad.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Progresión Gradual</h3>
                        <p className="text-sm text-muted-foreground">
                            Aumenta la intensidad gradualmente. El progreso sostenible es la clave del éxito a largo plazo.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Descanso Adecuado</h3>
                        <p className="text-sm text-muted-foreground">
                            Dale tiempo a tus músculos para recuperarse. El descanso es cuando realmente crecen.
                        </p>
                    </div>
                </div>
            </section>
        </div>                                      
    );
};
