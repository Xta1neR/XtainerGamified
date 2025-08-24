// All require paths have been corrected to use relative paths (../) instead of the alias (@/).
export const fullSchedule = [
    // Sunday (Index 0)
    {
        day: "Sunday",
        focus: "Rest + Active Recovery",
        meals: [{ name: "Breakfast", description: "Protein oats + banana + chia seeds + almonds" }, { name: "Snack", description: "Apple + 1 scoop protein (water)" }, { name: "Lunch", description: "Chicken curry (200g) + 2 rotis" }, { name: "Dinner", description: "Paneer bhurji (150g) + 2 rotis + salad" }],
        workout: [{ name: "Light Walk", sets: 1, reps: '10,000 steps', icon: "🚶" }, { name: "Stretching", sets: 1, reps: '15 minutes', icon: "🧘" }],
        nightCircuit: [{ name: "Push-ups (Light)", sets: 1, reps: 10, icon: "💪" }, { name: "Squats (Light)", sets: 1, reps: 20, icon: "🦵" }],
    },
    // Monday (Index 1)
    {
        day: "Monday",
        focus: "Chest + Triceps",
        meals: [{ name: "Breakfast", description: "Protein-curd bowl (curd, protein, oats, granola, seeds, banana, almonds)" }, { name: "Snack", description: "Soaked chana + 5 almonds" }, { name: "Lunch", description: "2 boiled eggs + chickpea salad + 2 scoops sattu with lemon + salad" }, { name: "Pre-workout", description: "1 scoop protein in water + papaya" }, { name: "Dinner", description: "3 besan cheelas + curd" }],
        workout: [
            { name: "Bench Press", sets: 4, reps: 10, icon: "🏋️", tutorialAsset: require('../assets/workouts/bench-press.gif') },
            { name: "Incline Dumbbell Press", sets: 4, reps: 10, icon: "🏋️", tutorialAsset: require('../assets/workouts/incline-dumbbell-press.gif') },
            { name: "Cable Flys", sets: 3, reps: 12, icon: "🤸", tutorialAsset: require('../assets/workouts/cable-flys.gif') },
            { name: "Tricep Dips", sets: 3, reps: 12, icon: "🤸", tutorialAsset: require('../assets/workouts/tricep-dips.gif') },
            { name: "Overhead Tricep Extension", sets: 3, reps: 12, icon: "🤸", tutorialAsset: require('../assets/workouts/overhead-tricep-extension.gif') },
        ],
        nightCircuit: [{ name: "Push-ups", sets: 1, reps: 15, icon: "💪" }, { name: "Squats", sets: 1, reps: 30, icon: "🦵" }, { name: "Crunches", sets: 1, reps: 15, icon: "🔥" }, { name: "Leg Raises", sets: 1, reps: 15, icon: "🔥" }],
    },
    // Tuesday (Index 2)
    {
        day: "Tuesday",
        focus: "Back + Biceps",
        meals: [{ name: "Breakfast", description: "Protein oats (50g oats + milk + 1 scoop protein + flax seeds + banana)" }, { name: "Snack", description: "200g papaya + 5 walnuts" }, { name: "Lunch", description: "Paneer bhurji (150g) + 2 rotis + salad" }, { name: "Pre-workout", description: "2 scoops sattu with lemon" }, { name: "Dinner", description: "150g grilled chicken breast + sautéed veggies + 1 roti" }],
        workout: [
            { name: "Deadlifts", sets: 4, reps: 8, icon: "🏋️", tutorialAsset: require('../assets/workouts/deadlift.gif') },
            { name: "Lat Pulldown", sets: 4, reps: 10, icon: "🏋️", tutorialAsset: require('../assets/workouts/lat-pulldown.gif') },
            { name: "Barbell Rows", sets: 4, reps: 10, icon: "🏋️", tutorialAsset: require('../assets/workouts/barbell-row.gif') },
            { name: "Dumbbell Curls", sets: 3, reps: 12, icon: "💪", tutorialAsset: require('../assets/workouts/dumbbell-curl.gif') },
            { name: "Hammer Curls", sets: 3, reps: 12, icon: "💪", tutorialAsset: require('../assets/workouts/hammer-curl.gif') },
        ],
        nightCircuit: [{ name: "Push-ups", sets: 1, reps: 15, icon: "💪" }, { name: "Squats", sets: 1, reps: 30, icon: "🦵" }, { name: "Crunches", sets: 1, reps: 15, icon: "🔥" }, { name: "Leg Raises", sets: 1, reps: 15, icon: "🔥" }],
    },
    // Wednesday (Index 3)
    {
        day: "Wednesday",
        focus: "Legs + Core",
        meals: [{ name: "Breakfast", description: "2 boiled eggs + 2 slices whole wheat bread + peanut butter (10g) + 1 scoop protein" }, { name: "Snack", description: "150g curd + 1 spoon pumpkin seeds" }, { name: "Lunch", description: "Chickpea salad + 2 scoops sattu + 2 boiled eggs" }, { name: "Pre-workout", description: "Banana + 1 scoop protein in water" }, { name: "Dinner", description: "3 cheelas + peanut chutney" }],
        workout: [
            { name: "Squats", sets: 5, reps: 10, icon: "🏋️", tutorialAsset: require('../assets/workouts/squat.gif') },
            { name: "Romanian Deadlifts", sets: 4, reps: 10, icon: "🏋️", tutorialAsset: require('../assets/workouts/romanian-deadlift.gif') },
            { name: "Leg Press", sets: 4, reps: 12, icon: "🦵", tutorialAsset: require('../assets/workouts/leg-press.gif') },
            { name: "Calf Raises", sets: 4, reps: 20, icon: "🦵", tutorialAsset: require('../assets/workouts/calf-raise.gif') },
            { name: "Hanging Leg Raises", sets: 3, reps: 15, icon: "🔥", tutorialAsset: require('../assets/workouts/leg-raise.gif') },
            { name: "Plank", sets: 3, reps: '1 min', icon: "🔥", tutorialAsset: require('../assets/workouts/plank.gif') },
        ],
        nightCircuit: [{ name: "Push-ups", sets: 1, reps: 15, icon: "💪" }, { name: "Squats", sets: 1, reps: 30, icon: "🦵" }, { name: "Crunches", sets: 1, reps: 15, icon: "🔥" }, { name: "Leg Raises", sets: 1, reps: 15, icon: "🔥" }],
    },
    // Thursday (Index 4)
    {
        day: "Thursday",
        focus: "Shoulders + Abs",
        meals: [{ name: "Breakfast", description: "Protein smoothie (1 scoop protein, 200ml milk, 1 banana, flax seeds)" }, { name: "Snack", description: "Apple + 5 almonds" }, { name: "Lunch", description: "Chicken curry (150g) + 1 bowl rice + salad" }, { name: "Pre-workout", description: "2 scoops sattu + lemon" }, { name: "Dinner", description: "3 cheelas + curd" }],
        workout: [
            { name: "Overhead Press", sets: 4, reps: 10, icon: "🏋️", tutorialAsset: require('../assets/workouts/overhead-press.gif') },
            { name: "Side Lateral Raises", sets: 3, reps: 12, icon: "🏋️", tutorialAsset: require('../assets/workouts/lateral-raise.gif') },
            { name: "Front Raises", sets: 3, reps: 12, icon: "🏋️", tutorialAsset: require('../assets/workouts/front-raise.gif') },
            { name: "Shrugs", sets: 4, reps: 15, icon: "🤷", tutorialAsset: require('../assets/workouts/shrug.webp') },
            { name: "Russian Twists", sets: 3, reps: 20, icon: "🔥", tutorialAsset: require('../assets/workouts/russian-twist.webp') },
            { name: "Bicycle Crunches", sets: 3, reps: 20, icon: "🔥", tutorialAsset: require('../assets/workouts/bicycle-crunch.gif') },
        ],
        nightCircuit: [{ name: "Push-ups", sets: 1, reps: 15, icon: "💪" }, { name: "Squats", sets: 1, reps: 30, icon: "🦵" }, { name: "Crunches", sets: 1, reps: 15, icon: "🔥" }, { name: "Leg Raises", sets: 1, reps: 15, icon: "🔥" }],
    },
    // Friday (Index 5)
    {
        day: "Friday",
        focus: "Chest + Arms",
        meals: [{ name: "Breakfast", description: "150g curd + 50g oats + 1 scoop protein + almonds + chia" }, { name: "Snack", description: "200g watermelon" }, { name: "Lunch", description: "Paneer pulao (100g paneer + rice + peas)" }, { name: "Pre-workout", description: "2 boiled eggs + 2 scoops sattu" }, { name: "Dinner", description: "150g chicken breast + 2 rotis + salad" }],
        workout: [
            { name: "Bench Press", sets: 4, reps: 8, icon: "🏋️", tutorialAsset: require('../assets/workouts/bench-press.gif') },
            { name: "Incline Press", sets: 4, reps: 10, icon: "🏋️", tutorialAsset: require('../assets/workouts/incline-dumbbell-press.gif') },
            { name: "Dumbbell Flys", sets: 3, reps: 12, icon: "🤸", tutorialAsset: require('../assets/workouts/dumbbell-fly.gif') },
            { name: "Barbell Curls", sets: 4, reps: 12, icon: "💪", tutorialAsset: require('../assets/workouts/barbell-curl.gif') },
            { name: "Tricep Pushdowns", sets: 4, reps: 12, icon: "💪", tutorialAsset: require('../assets/workouts/tricep-pushdown.gif') },
        ],
        nightCircuit: [{ name: "Push-ups", sets: 1, reps: 15, icon: "💪" }, { name: "Squats", sets: 1, reps: 30, icon: "🦵" }, { name: "Crunches", sets: 1, reps: 15, icon: "🔥" }, { name: "Leg Raises", sets: 1, reps: 15, icon: "🔥" }],
    },
    // Saturday (Index 6)
    {
        day: "Saturday",
        focus: "Legs + Full Body Pump",
        meals: [{ name: "Breakfast", description: "2 boiled eggs + 2 bread slices + 1 scoop protein shake" }, { name: "Snack", description: "Papaya + pumpkin seeds" }, { name: "Lunch", description: "Chickpea salad + 2 scoops sattu" }, { name: "Pre-workout", description: "Banana + soaked almonds" }, { name: "Dinner", description: "3 cheelas + curd" }],
        workout: [
            { name: "Front Squats", sets: 4, reps: 10, icon: "🏋️", tutorialAsset: require('../assets/workouts/front-squat.gif') },
            { name: "Walking Lunges", sets: 4, reps: 12, icon: "🚶", tutorialAsset: require('../assets/workouts/walking-lunge.gif') },
            { name: "Leg Curl", sets: 4, reps: 12, icon: "🦵", tutorialAsset: require('../assets/workouts/leg-curl.gif') },
            { name: "Push-ups", sets: 3, reps: 20, icon: "💪", tutorialAsset: require('../assets/workouts/push-up.gif') },
            { name: "Pull-ups", sets: 3, reps: 'Max', icon: "💪", tutorialAsset: require('../assets/workouts/pull-up.gif') },
            { name: "Core Plank Hold", sets: 3, reps: '1 min', icon: "🔥", tutorialAsset: require('../assets/workouts/plank.gif') },
        ],
        nightCircuit: [{ name: "Push-ups", sets: 1, reps: 15, icon: "💪" }, { name: "Squats", sets: 1, reps: 30, icon: "🦵" }, { name: "Crunches", sets: 1, reps: 15, icon: "🔥" }, { name: "Leg Raises", sets: 1, reps: 15, icon: "🔥" }],
    },
];