const ejercicios=[
    {
    nombre: "Press de banca",
    musculo: "PECHO",
    descripcion: "Elevación de pesas desde una posición acostada, trabajando los músculos pectorales.",
    },
    {
    nombre: "Flexiones declinadas",
    musculo: "PECHO",
    descripcion: "Variante de las flexiones que se realizan con los pies en una posición elevada.",
    },
    {
    nombre: "Aperturas con mancuernas",
    musculo: "PECHO",
    descripcion: "Ejercicio de aislamiento que trabaja los músculos pectorales mediante la apertura de brazos con mancuernas.",
    },
    {
    nombre: "Fondos en paralelas",
    musculo: "PECHO",
    descripcion: "Elevación del cuerpo entre dos barras paralelas, enfocándose en los músculos del pecho y tríceps.",
    },
    {
    nombre: "Pullover con barra",
    musculo: "PECHO",
    descripcion: "Movimiento que implica la extensión de la barra desde la posición sobre la cabeza hasta la parte superior del pecho.",
    },
    {
    nombre: "Flexiones diamante",
    musculo: "PECHO",
    descripcion: "Variante de flexiones con las manos juntas en forma de diamante, enfocándose en el tríceps y pecho.",
    },
    {
    nombre: "Curl de bíceps con barra",
    musculo: "BICEPS",
    descripcion: "Ejercicio de aislamiento que trabaja los músculos del bíceps mediante la flexión de los codos con una barra.",
    },
    {
    nombre: "Martillo con mancuernas",
    musculo: "BICEPS",
    descripcion: "Variante de curl de bíceps que implica levantar las mancuernas en un movimiento de martillo.",
    },
    {
    nombre: "Curl concentrado",
    musculo: "BICEPS",
    descripcion: "Ejercicio de aislamiento para los bíceps, realizado sentado y apoyando el brazo en la pierna.",
    },
    {
    nombre: "Flexiones de bíceps en polea",
    musculo: "BICEPS",
    descripcion: "Movimiento de flexión de los codos utilizando una polea para trabajar los músculos del bíceps.",
    },
    {
    nombre: "Bíceps 21s",
    musculo: "BICEPS",
    descripcion: "Ejercicio que involucra tres series de 7 repeticiones con diferentes rangos de movimiento para el bíceps.",
    },
    {
    nombre: "Curl de hombro con mancuernas",
    musculo: "HOMBRO",
    descripcion: "Ejercicio que trabaja los músculos del hombro mediante la elevación de las mancuernas hacia los lados.",
    },
    {
    nombre: "Press militar",
    musculo: "HOMBRO",
    descripcion: "Ejercicio compuesto que trabaja los deltoides mediante la elevación de pesas desde los hombros.",
    },
    {
    nombre: "Elevaciones frontales con barra",
    musculo: "HOMBRO",
    descripcion: "Movimiento que trabaja los músculos del hombro al levantar una barra hacia adelante.",
    },
    {
    nombre: "Face pulls",
    musculo: "HOMBRO",
    descripcion: "Ejercicio de aislamiento que trabaja los músculos del hombro y la parte superior de la espalda.",
    },
    {
    nombre: "Rotaciones externas con banda",
    musculo: "HOMBRO",
    descripcion: "Ejercicio para fortalecer los músculos del hombro mediante rotaciones externas con una banda elástica.",
    },
    {
    nombre: "Shrugs con mancuernas",
    musculo: "HOMBRO",
    descripcion: "Movimiento que trabaja los músculos trapecios mediante la elevación de hombros con mancuernas.",
    },
    {
    nombre: "Crunches",
    musculo: "ABDOMEN",
    descripcion: "Ejercicio abdominal que involucra la contracción de los músculos abdominales al levantar el torso.",
    },
    {
    nombre: "Plancha",
    musculo: "ABDOMEN",
    descripcion: "Posición de cuerpo entero sostenida sobre los codos, fortaleciendo el core y los músculos abdominales.",
    },
    {
    nombre: "Levantamiento de piernas acostado",
    musculo: "ABDOMEN",
    descripcion: "Ejercicio que trabaja los músculos abdominales inferiores al levantar las piernas mientras estás acostado.",
    },
    {
    nombre: "Russian twists con balón medicinal",
    musculo: "ABDOMEN",
    descripcion: "Movimiento que fortalece los oblicuos al girar el torso y golpear un balón medicinal en cada lado.",
    },
    {
    nombre: "Hollow body hold",
    musculo: "ABDOMEN",
    descripcion: "Posición de cuerpo en forma de 'U' invertida, trabajando los músculos abdominales y del core.",
    },
    {
    nombre: "Mountain climbers",
    musculo: "ABDOMEN",
    descripcion: "Ejercicio cardiovascular que implica correr en el lugar mientras estás en una posición de flexión.",
    },
    {
    nombre: "Fondos en máquina",
    musculo: "TRICEPS",
    descripcion: "Ejercicio que trabaja los tríceps mediante la extensión de los codos en una máquina especializada.",
    },
    {
    nombre: "Rompecráneos",
    musculo: "TRICEPS",
    descripcion: "Variante de extensión de tríceps que implica el movimiento de la barra hacia la frente.",
    },
    {
    nombre: "Patada de tríceps con mancuerna",
    musculo: "TRICEPS",
    descripcion: "Ejercicio aislado para los tríceps que involucra la extensión de la parte superior del brazo con una mancuerna.",
    },
    {
    nombre: "Tríceps en polea alta",
    musculo: "TRICEPS",
    descripcion: "Ejercicio que trabaja los tríceps mediante la extensión de los codos con una polea alta.",
    },
    {
    nombre: "Press de tríceps",
    musculo: "TRICEPS",
    descripcion: "Ejercicio compuesto que trabaja los tríceps al presionar una barra hacia arriba desde una posición acostada.",
    },
    {
    nombre: "Flexiones con agarre cerrado",
    musculo: "TRICEPS",
    descripcion: "Variante de flexiones que trabaja los tríceps al tener las manos más cerca entre sí.",
    },
    {
    nombre: "Pull-ups",
    musculo: "ESPALDA",
    descripcion: "Ejercicio que trabaja los músculos de la espalda al levantar el cuerpo hacia una barra fija.",
    },
    {
    nombre: "Remo con barra T",
    musculo: "ESPALDA",
    descripcion: "Ejercicio de remo que trabaja los músculos de la espalda baja y media con una barra en forma de T.",
    },
    {
    nombre: "Pulldown en polea",
    musculo: "ESPALDA",
    descripcion: "Movimiento que trabaja los músculos de la espalda al tirar hacia abajo de una barra en una polea alta.",
    },
    {
    nombre: "Hiperextensiones",
    musculo: "ESPALDA",
    descripcion: "Ejercicio que fortalece los músculos de la espalda baja al levantar el torso desde una posición horizontal.",
    },
    {
    nombre: "Pull-ups con agarre inverso",
    musculo: "ESPALDA",
    descripcion: "Variante de pull-ups que trabaja los músculos de la espalda con un agarre inverso.",
    },
    {
    nombre: "Peso muerto",
    musculo: "ESPALDA",
    descripcion: "Ejercicio compuesto que trabaja varios músculos de la espalda y las piernas al levantar peso desde el suelo.",
    },
    {
    nombre: "Sentadillas",
    musculo: "PIERNAS",
    descripcion: "Ejercicio compuesto que trabaja los músculos de las piernas al flexionar las rodillas y las caderas.",
    },
    {
    nombre: "Extensiones de cuádriceps",
    musculo: "PIERNAS",
    descripcion: "Ejercicio de aislamiento para los cuádriceps que implica la extensión de las rodillas.",
    },
    {
    nombre: "Prensa de piernas",
    musculo: "PIERNAS",
    descripcion: "Ejercicio de fuerza que trabaja los músculos de las piernas mediante la extensión de las rodillas.",
    },
    {
    nombre: "Curl femoral",
    musculo: "PIERNAS",
    descripcion: "Ejercicio que trabaja los músculos posteriores de las piernas al flexionar las rodillas.",
    },
    {
    nombre: "Elevaciones de talones",
    musculo: "PIERNAS",
    descripcion: "Ejercicio que trabaja los músculos de la pantorrilla al levantar los talones del suelo.",
    },
    {
    nombre: "Zancadas",
    musculo: "PIERNAS",
    descripcion: "Ejercicio que trabaja los músculos de las piernas al dar pasos largos y flexionar las rodillas.",
    },
];

function obtenerEjerciciosPorMusculo( musculoBuscado) {
    return ejercicios.filter(ejercicio => ejercicio.musculo === musculoBuscado);
}

export {obtenerEjerciciosPorMusculo};