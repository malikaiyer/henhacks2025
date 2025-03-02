| recipes userInput normalizedInput result jsonString fileStream |

"Define built-in recipes"
recipes := Dictionary new.

recipes at: 'popcorn' put: (Dictionary new
    at: 'title' put: 'Plain Popcorn';
    at: 'ingredients' put: #('popcorn');
    at: 'instructions' put: #(
        'Add popcorn kernels to a pot with a lid.'
        'Heat over medium-high heat until popping begins.'
        'Shake the pot occasionally to prevent burning.'
        'Continue cooking until popping slows down significantly.'
        'Remove from heat and enjoy.'
    );
    yourself).

recipes at: 'butter, potatoes, salt' put: (Dictionary new
    at: 'title' put: 'Salted Butter Potatoes';
    at: 'ingredients' put: #('potatoes' 'butter' 'salt');
    at: 'instructions' put: #(
        'Boil potatoes until tender.'
        'Melt butter in a pan.'
        'Add boiled potatoes to the pan with melted butter.'
        'Sprinkle generously with salt.'
        'Toss potatoes in butter and salt until coated.'
        'Serve hot.'
    );
    yourself).

recipes at: 'peanuts, jelly' put: (Dictionary new
    at: 'title' put: 'Peanut Jelly Bites';
    at: 'ingredients' put: #('peanuts' 'jelly');
    at: 'instructions' put: #(
        'Spread a thin layer of jelly on a flat surface.'
        'Sprinkle crushed peanuts over the jelly.'
        'Cut the jelly into small squares or use a cookie cutter to create shapes.'
        'Serve immediately or refrigerate for later.'
    );
    yourself).

recipes at: 'bread, cheese' put: (Dictionary new
    at: 'title' put: 'Grilled Cheese Sandwich';
    at: 'ingredients' put: #('bread' 'cheese' 'butter');
    at: 'instructions' put: #(
        'Butter one side of each bread slice.'
        'Place cheese between the unbuttered sides of the bread.'
        'Heat a pan over medium heat and place the sandwich in the pan.'
        'Cook until golden brown on one side, then flip and cook the other side.'
        'Remove from pan and serve hot.'
    );
    yourself).

recipes at: 'egg, bread' put: (Dictionary new
    at: 'title' put: 'Egg Toast';
    at: 'ingredients' put: #('egg' 'bread' 'butter' 'salt' 'pepper');
    at: 'instructions' put: #(
        'Toast the bread slices until golden brown.'
        'Fry an egg in butter to your desired doneness.'
        'Place the fried egg on the toasted bread.'
        'Season with salt and pepper to taste.'
        'Serve warm.'
    );
    yourself).

recipes at: 'banana, peanut butter' put: (Dictionary new
    at: 'title' put: 'Banana Peanut Butter Bites';
    at: 'ingredients' put: #('banana' 'peanut butter');
    at: 'instructions' put: #(
        'Slice the banana into small rounds.'
        'Spread peanut butter on one banana slice and place another slice on top.'
        'Repeat until all banana slices are paired.'
        'Serve immediately or refrigerate for later.'
    );
    yourself).

"Simulated user input (Replace with actual user input handling)"
userInput := 'potatoes, butter, salt'.  "Example: User input"
normalizedInput := (userInput findTokens: ', ') asSet asSortedCollection joinUsing: ', '.

"Find recipe based on normalized input"
result := recipes at: normalizedInput ifAbsent: [
    Dictionary new
        at: 'title' put: 'Unknown Recipe';
        at: 'ingredients' put: #('N/A');
        at: 'instructions' put: #('No instructions available.');
        yourself
].

"Print ALL Recipes in Transcript"
Transcript show: '---- ALL RECIPES ----'; cr.
recipes keysAndValuesDo: [:key :recipe |
    jsonString := String new writeStream.
    
    jsonString nextPutAll: '{'; cr.
    jsonString nextPutAll: '  "title": "'; nextPutAll: (recipe at: 'title'); nextPutAll: '",'; cr.
    
    "Format ingredients"
    jsonString nextPutAll: '  "ingredients": ['; cr.
    (recipe at: 'ingredients') do: [:ingredient | 
        jsonString nextPutAll: '    "'; nextPutAll: ingredient; nextPutAll: '",'; cr].
    jsonString position > 5 ifTrue: [ jsonString position: jsonString position - 2 ]. "Remove last comma"
    jsonString nextPutAll: ''; cr.
    jsonString nextPutAll: '  ],'; cr.
    
    "Format instructions"
    jsonString nextPutAll: '  "instructions": ['; cr.
    (recipe at: 'instructions') do: [:step | 
        jsonString nextPutAll: '    "'; nextPutAll: step; nextPutAll: '",'; cr].
    jsonString position > 5 ifTrue: [ jsonString position: jsonString position - 2 ]. "Remove last comma"
    jsonString nextPutAll: ''; cr.
    jsonString nextPutAll: '  ]'; cr.
    
    jsonString nextPutAll: '}'. cr.

    "Print to Transcript"
    Transcript show: jsonString contents; cr.
    Transcript show: '-------------------------'; cr.
].

"Print User-Specified Recipe in Transcript"
Transcript show: '---- USER REQUESTED RECIPE ----'; cr.
jsonString := String new writeStream.

jsonString nextPutAll: '{'; cr.
jsonString nextPutAll: '  "title": "'; nextPutAll: (result at: 'title'); nextPutAll: '",'; cr.

"Format ingredients"
jsonString nextPutAll: '  "ingredients": ['; cr.
(result at: 'ingredients') do: [:ingredient | 
    jsonString nextPutAll: '    "'; nextPutAll: ingredient; nextPutAll: '",'; cr].
jsonString position > 5 ifTrue: [ jsonString position: jsonString position - 2 ]. "Remove last comma"
jsonString nextPutAll: ''; cr.
jsonString nextPutAll: '  ],'; cr.

"Format instructions"
jsonString nextPutAll: '  "instructions": ['; cr.
(result at: 'instructions') do: [:step | 
    jsonString nextPutAll: '    "'; nextPutAll: step; nextPutAll: '",'; cr].
jsonString position > 5 ifTrue: [ jsonString position: jsonString position - 2 ]. "Remove last comma"
jsonString nextPutAll: ''; cr.
jsonString nextPutAll: '  ]'; cr.

jsonString nextPutAll: '}'. cr.

"Print to Transcript"
Transcript show: jsonString contents; cr.
Transcript show: '-------------------------'; cr.

Save JSON to a file"
fileStream := 'recipe.json' asFileReference writeStream.
fileStream nextPutAll: jsonString contents.
fileStream close.
